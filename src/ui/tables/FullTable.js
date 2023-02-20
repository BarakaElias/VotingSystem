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
import Spinner from "react-bootstrap/Spinner";

const FullTable = (props) => {
  const { values, cols } = props;
  let i = 0;

  const data = React.useMemo(() => values, [values]);
  const columns = React.useMemo(() => cols, []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pagecount,
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
      <Row>
        <Col md={8}></Col>
        <Col>
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        </Col>
      </Row>
      <Table className="table" {...getTableProps()} responsive>
        <thead className="thead-dark">
          {headerGroups.map((headerGroup) => (
            <tr key={i + "tr"} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th key={column.Header}>
                  <div
                    className="mb-1"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <FontAwesomeIcon className="ms-2" icon={faSortDown} />
                        ) : (
                          <FontAwesomeIcon className="ms-2" icon={faSortUp} />
                        )
                      ) : (
                        <FontAwesomeIcon className="ms-2" icon={faSort} />
                      )}
                    </span>
                  </div>
                  {/* <div>{column.canFilter ? column.render("Filter") : null}</div> */}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {data.length !== 0 ? (
          <tbody className="table-hover" {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr key={i + "rowtr"} {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td key={i + "td"} {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        ) : (
          <React.Fragment>
            <tbody>
              <tr>
                <td>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />{" "}
                  Loading. Please wait
                </td>
              </tr>
            </tbody>
          </React.Fragment>
        )}
      </Table>
      <Row>
        <Col md={8}></Col>
        <Col md={4}>
          <div>
            <span>
              page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>
            </span>
            <button
              className="btn"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              {"<<"}
            </button>
            <button
              className="btn"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              Previous
            </button>
            <button
              className="btn"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              Next
            </button>
            <button
              className="btn"
              onClick={() => gotoPage(pagecount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </button>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default FullTable;
