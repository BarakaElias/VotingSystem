import React, { useState } from "react";
import { Card, Row, Container, Col, Button, Table } from "react-bootstrap";
import {
  useSortBy,
  useTable,
  useGlobalFilter,
  useFilters,
  usePagination,
} from "react-table";
import {
  faKey,
  faEdit,
  faSort,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GlobalFilter } from "./TableFilters";

const FlatSimpleTable = (props) => {
  const { values, cols, k } = props;
  let i = 0;
  let j = 99;

  const data = React.useMemo(() => values, [values]);
  const columns = React.useMemo(() => cols, []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    { columns, data },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  const { globalFilter } = state;
  const { pageIndex } = state;
  return (
    <React.Fragment>
      <Table
        className="table table-sm table-borderless"
        {...getTableProps()}
        responsive
      >
        <thead className="thead-dark">
          {headerGroups.map((headerGroup) => (
            <tr key={i++ + k} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th key={j++ + k}>
                  <div
                    className="mb-1"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                  </div>
                  {/* <div>{column.canFilter ? column.render("Filter") : null}</div> */}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="table-hover" {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr key={j++} {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td key={j} {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </React.Fragment>
  );
};

export default FlatSimpleTable;
