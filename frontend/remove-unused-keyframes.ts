import postcss from "postcss";

/**
 * Removes unused CSS `@keyframes` rules from the input CSS string.
 *
 * This optimization identifies `@keyframes` definitions that are never referenced
 * by any `animation` or `animation-name` property in the CSS and removes them
 * from the final output.
 *
 * @param css The input CSS as a string.
 * @returns The optimized CSS, with unused `@keyframes` removed.
 */
export const removeUnusedKeyframes = (css: string) => {
  // Parse the input CSS string into a PostCSS Root object for manipulation
  const root = postcss.parse(css);

  // Map to track all `@keyframes` rules and whether they are used
  const keyframes = new Map<string, boolean>();

  // Step 1: Walk through all nodes in the CSS to record keyframes and detect usage
  root.walk((node) => {
    if (node.type === "atrule" && node.name === "keyframes") {
      // If the node is a `@keyframes` rule, add it to the keyframes map
      // Mark it as unused (false) initially
      keyframes.set(node.params, false);
    } else if (node.type === "decl") {
      // If the node is a CSS declaration (e.g., `animation: slide-in 1s`)
      const decl = node;

      // Determine if the declaration relates to `animation` or `animation-name`
      // For `animation`, we'll extract the first value as the animation name
      const animationName = decl.prop === "animation"
        ? decl.value.split(" ")[0] // Extract the animation name from `animation`
        : decl.value; // For `animation-name`, it's just the value

      // If the keyframe referenced by the declaration exists, mark it as used
      if (
        (decl.prop === "animation" || decl.prop === "animation-name") &&
        keyframes.has(animationName)
      ) {
        keyframes.set(animationName, true);
      }
    }
  });

  // Step 2: Remove unused keyframes from the CSS
  root.walkAtRules("keyframes", (rule) => {
    // Check if the keyframe is marked as unused (false)
    if (keyframes.get(rule.params) === false) {
      rule.remove(); // Remove the `@keyframes` rule from the CSS
    }
  });

  // Return the cleaned CSS as a string
  return root.toString();
};
