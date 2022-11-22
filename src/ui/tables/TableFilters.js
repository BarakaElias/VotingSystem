import React from "react";
import { Form } from "react-bootstrap";

export const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <span>
      <Form.Group className="mb-3">
        <Form.Control
          value={filterValue || ""}
          onChange={(e) => setFilter(e.target.value)}
        />
      </Form.Group>
    </span>
  );
};

export const SelectColumnFilter = ({
  column: { filterValue, setFilter, preFilteredRows, id },
}) => {
  return (
    <Form.Group className="mb-3">
      <Form.Select
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
      >
        <option value="">All</option>
        <option value="Mr">Mr</option>
        <option value="Mrs">Mrs</option>
        <option value="Ms">Ms</option>
        <option value="Dr">Dr</option>
      </Form.Select>
    </Form.Group>
  );
};

export const DateColumnFilter = ({ column: { filterValue, setFilter } }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Control
        onChange={(event) => setFilter(event.target.value)}
        type="datetime-local"
        min="11/07/2021 19:30 21"
        placeholder=""
      />
    </Form.Group>
  );
};

export const EmptyColumnFilter = () => {
  return <div className="mb-4">&nbsp;</div>;
};

export const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <span>
      <Form.Group className="mb-3">
        <Form.Label>Search All</Form.Label>
        <Form.Control
          value={filter || ""}
          onChange={(e) => setFilter(e.target.value)}
        />
      </Form.Group>
    </span>
  );
};
