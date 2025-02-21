import postcss from "postcss";

type UseRecord = {
  // The variables this custom property depends on (e.g., `--a: var(--b)` -> `--b` is a dependency)
  dependencies: Set<string>,
  // Where this custom property is declared in the CSS
  declarations: Set<postcss.Declaration>,
};

/**
 * Removes unused CSS variables from a CSS input string.
 * Modified version of https://github.com/chakra-ui/panda/blob/main/sandbox/vite-ts/remove-unused-css-vars.ts
 *
 * This implementation works by **reverse-tracking** used variables from final CSS rules:
 * 1. Identifies all variables referenced in CSS rules (e.g., `var(--x)`).
 * 2. Builds a map of variable dependencies (`--x` depends on `--y`).
 * 3. Resolves all variables transitively used in the final CSS.
 * 4. Prunes unused variables from the output.
 *
 * @param css The input CSS as a string.
 * @returns The cleaned CSS with only used variables retained.
 */
export const removeUnusedCssVars = (css: string) => {
  const root = postcss.parse(css); // Parse the input CSS into a PostCSS AST
  const records = new Map<string, UseRecord>(); // Tracks information about each variable
  const usedVariables = new Set<string>(); // Tracks variables explicitly used in rules

  /**
   * Retrieves or creates a record for a given variable.
   *
   * @param variable The name of the variable (e.g., `--x`).
   * @returns The record for the variable.
   */
  const getRecord = (variable: string): UseRecord => {
    let record = records.get(variable);
    if (!record) {
      record = {
        dependencies: new Set(),
        declarations: new Set(),
      };
      records.set(variable, record);
    }

    return record;
  };

  /**
   * Marks a variable as being used and recursively resolves its dependencies.
   *
   * @param variable The variable that is being marked as used.
   * @param visited A set of visited variables to prevent infinite loops in dependency chains.
   */
  const resolveDependencies = (variable: string, visited = new Set<string>()) => {
    if (visited.has(variable)) {
      return;
    } // Prevent infinite recursion on circular dependencies
    visited.add(variable);

    usedVariables.add(variable); // Mark the variable as used

    const record = records.get(variable);
    if (record) {
      for (const dependency of record.dependencies) {
        resolveDependencies(dependency, visited); // Recursively mark dependencies as used
      }
    }
  };

  // Step 1: Parse CSS and build a map of variable declarations and their dependencies
  root.walkDecls((decl) => {
    if (decl.prop.startsWith("--")) {
      // If it's a CSS variable declaration (e.g., `--x: ...`)
      const record = getRecord(decl.prop); // Get or create a record for this variable
      record.declarations.add(decl); // Track where this variable is declared

      // Look for dependencies within the declaration value (e.g., `--x: var(--y)`)
      const matches = decl.value.matchAll(/var\((--[^ ,);]+)/g); // Regex to match `var(--y)`
      for (const match of matches) {
        const dependency = match[1].trim(); // Extract the variable name (e.g., `--y`)
        record.dependencies.add(dependency); // Register the dependency
      }
    } else if (decl.value.includes("var(")) {
      // If this is a regular declaration (e.g., `color: var(--x)`)
      const matches = decl.value.matchAll(/var\((--[^ ,);]+)/g); // Regex to match `var(--x)`
      for (const match of matches) {
        const variable = match[1].trim(); // Extract the variable name
        usedVariables.add(variable); // Mark the variable as explicitly used
      }
    }
  });

  // Step 2: Starting from all explicitly used variables, resolve their dependencies
  for (const variable of Array.from(usedVariables)) {
    resolveDependencies(variable);
  }

  // Step 3: Remove unused variables from the CSS
  for (const [variable, { declarations }] of records.entries()) {
    if (!usedVariables.has(variable)) {
      // If the variable is not used, we remove it
      for (const decl of declarations) {
        if (decl.parent?.nodes.length === 1) {
          decl.parent.remove(); // Remove the entire rule if it's the only property
        } else {
          decl.remove(); // Otherwise, just remove the declaration itself
        }
      }
    }
  }

  return root.toString(); // Return the cleaned CSS as a string
};
