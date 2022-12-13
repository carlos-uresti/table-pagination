import React, { useEffect, useState } from "react";
import useTable from "../hooks/useTable";
import "./PaginatedTable.css";
import TableFooter from "./table_footer/TableFooter";
import { Button, Table } from "react-bootstrap";
import useFetch from "../hooks/useFetch";

const PaginatedTable = () => {
  const limit = 50;
  const rowsPerPage = 10;
  const [page, setPage] = useState(1); //makes table start at page 1
  const [batch, setBatch] = useState(1);//batches of 50 records at a time
  const url = ` http://localhost:8000/data?_page=${batch}&_limit=${limit}`;
  const { rows, isLoading } = useFetch(url, batch);
  const { slice, range } = useTable(rows, page, rowsPerPage);

  const handleRowSelect = (e) => {
    console.log(e.target.value);
  };

  return (
    <>
      <Table className="title" size="sm" striped bordered hover>
        <thead className="header">
          <tr>
            <th className="tableHeader">Select</th>
            <th className="tableHeader">First Name</th>
            <th className="tableHeader">Last Name</th>
            <th className="tableHeader">Email</th>
            <th className="tableHeader">Gender</th>
            <th className="tableHeader">IP_Adress</th>
          </tr>
        </thead>
        <tbody>
          {slice.map((element) => (
            <tr className="tableRowItems" key={element.id}>
              <td>
                <Button
                  key={element.key}
                  size="sm"
                  variant="dark"
                  value={element.first_name}
                  onClick={(e) => handleRowSelect(e)}
                >
                  +
                </Button>
              </td>
              <td className="tableRowItems">{element.first_name}</td>
              <td className="tableRowItems">{element.last_name}</td>
              <td className="tableRowItems">{element.email}</td>
              <td className="tableRowItems">{element.gender}</td>
              <td className="tableRowItems">{element.ip_address}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <TableFooter
        range={range}
        slice={slice}
        setPage={setPage}
        page={page}
        batch={batch}
        setBatch={setBatch}
        isLoading={isLoading}
      />
    </>
  );
};
export default PaginatedTable;
