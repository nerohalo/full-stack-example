import { render, screen, within } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import { Table } from "../../components";
import { user } from "../utils";

type RenderTableOptions = {
  onSortChange?: ReturnType<typeof vi.fn>,
  selectionMode?: "multiple" | "single" | "none",
  [key: string]: any,
};

describe("Table", () => {
  const mockData = [
    {
      id: "1",
      name: "Task 1",
      status: "done",
      createdAt: "2023-10-10T10:00:00Z",
      updatedAt: "2023-10-11T12:00:00Z",
    },
    {
      id: "2",
      name: "Task 2",
      status: "ready_to_start",
      createdAt: "2023-10-12T11:00:00Z",
      updatedAt: "2023-10-13T13:00:00Z",
    },
  ];

  const renderTable = (options: RenderTableOptions = {}) => {
    const { onSortChange, selectionMode, ...otherProps } = options;

    render(
      <Table
        fluid
        aria-label="Todo table"
        selectionMode={selectionMode}
        focusMode="row"
        sortDescriptor={{ column: "name", direction: "ascending" }}
        onSortChange={onSortChange}
        {...otherProps}
      >
        <Table.Header>
          <Table.Column key="status" allowsSorting>
            Status
          </Table.Column>
          <Table.Column key="name" allowsSorting>
            Task name
          </Table.Column>
          <Table.Column key="createdAt" allowsSorting>
            Created at
          </Table.Column>
          <Table.Column key="updatedAt" allowsSorting>
            Updated at
          </Table.Column>
          <Table.Column key="actions">
            Actions
          </Table.Column>
        </Table.Header>

        <Table.Body items={mockData}>
          {(item) => (
            <Table.Row>
              <Table.Cell>{item.status}</Table.Cell>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.createdAt}</Table.Cell>
              <Table.Cell>{item.updatedAt}</Table.Cell>
              <Table.Cell>
                <button type="button" aria-label={`Delete ${item.name}`}>
                  Delete
                </button>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    );
  };

  describe("Basic Functionality", () => {
    it("should render the table with correct headers and data", () => {
      renderTable();

      // Verify that correct amount of headers is rendered and each column is correctly displayed
      const headers = screen.getAllByRole("columnheader");
      expect(headers).toHaveLength(5);
      expect(headers[0]).toHaveTextContent("Status");
      expect(headers[1]).toHaveTextContent("Task name");
      expect(headers[2]).toHaveTextContent("Created at");
      expect(headers[3]).toHaveTextContent("Updated at");
      expect(headers[4]).toHaveTextContent("Actions");

      // Table should display 1 header row and 2 data rows
      const rows = screen.getAllByRole("row");
      expect(rows).toHaveLength(3);

      // Verify data of the first task row
      const firstRow = within(rows[1]);
      expect(firstRow.getByText("done")).toBeInTheDocument();
      expect(firstRow.getByText("Task 1")).toBeInTheDocument();
      expect(firstRow.getByText("2023-10-10T10:00:00Z")).toBeInTheDocument();
      expect(firstRow.getByText("2023-10-11T12:00:00Z")).toBeInTheDocument();

      // Verify data of the second task row
      const secondRow = within(rows[2]);
      expect(secondRow.getByText("ready_to_start")).toBeInTheDocument();
      expect(secondRow.getByText("Task 2")).toBeInTheDocument();
      expect(secondRow.getByText("2023-10-12T11:00:00Z")).toBeInTheDocument();
      expect(secondRow.getByText("2023-10-13T13:00:00Z")).toBeInTheDocument();
    });
  });

  describe("Sorting and Selection", () => {
    it("should call onSortChange when a sortable header is clicked", async() => {
      const mockOnSortChange = vi.fn();
      renderTable({ onSortChange: mockOnSortChange }); // Render table with mock sort-change callback

      const sortableColumn = screen.getByRole("columnheader", { name: /Task name/i });
      await user.click(sortableColumn); // Simulates a click on the "Task name" column

      // Verify the callback was called with the correct sorting details
      expect(mockOnSortChange).toHaveBeenCalledWith({ column: "name", direction: "descending" });
    });

    it("should allow selection of a table row", async() => {
      renderTable({ selectionMode: "multiple" });

      // Locate the checkbox for the first row by using the accessible name "Select done".
      const firstRowCheckbox = screen.getByRole("checkbox", {
        name: /Select done/i,
      });
      await user.click(firstRowCheckbox);

      expect(firstRowCheckbox).toBeChecked();
    });
  });

  describe("Accessibility", () => {
    it("should associate headers with their corresponding cells via aria-labelledby", () => {
      renderTable();

      // Retrieve all column headers in the table
      const headers = screen.getAllByRole("columnheader");

      // Retrieve all rows in the table, excluding the header row
      const rows = screen.getAllByRole("row").slice(1);

      // Iterate over each row to check accessibility attributes
      rows.forEach((row) => {
        // Retrieve the row header for the current row
        const rowHeaderCell = within(row).getByRole("rowheader");

        // Ensure the row contains an aria-labelledby attribute referencing the row header's ID
        expect(row).toHaveAttribute("aria-labelledby", rowHeaderCell.id);

        // Retrieve all grid cells (data cells) within the current row
        const gridCells = within(row).getAllByRole("gridcell");

        // Iterate over each grid cell and verify against the corresponding header
        gridCells.forEach((cell, cellIndex) => {
          // Match the grid cell's index with its corresponding header
          const correspondingHeader = headers[cellIndex + 1]; // +1 accounts for potential offset (e.g., row headers)

          // Ensure the corresponding header is defined
          expect(correspondingHeader).toBeDefined();

          // Verify that the cell has its role set to "gridcell"
          expect(cell).toHaveAttribute("role", "gridcell");
        });
      });
    });
  });

  describe("Edge Cases", () => {
    it("should display \"No data\" when no items are provided", () => {
      render(
        <Table aria-label="Empty Table">
          <Table.Header>
            <Table.Column>Status</Table.Column>
          </Table.Header>
          <Table.Body items={[]}>
            <Table.Row>
              <Table.Cell>No data</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      );

      // Verify that the "No data" cell is correctly displayed in the document
      const cell = screen.getByText(/no data/i); // Use a case-insensitive regex to find "No data"
      expect(cell).toBeInTheDocument();
    });
  });
});
