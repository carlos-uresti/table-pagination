import React, { useEffect, useState, useRef } from "react";
import useTable from "../hooks/useTable";
import "./PaginatedTable.css";
import TableFooter from "./table_footer/TableFooter";

import { Button, Table, InputGroup, FormControl } from "react-bootstrap";
import useFetch from "../hooks/useFetch";

const PaginatedTable = () => {
  const limit = 50;
  const rowsPerPage = 10;
  const [search, setSearch] = useState(); //batches of 50 records at a time
  const tempSearch = useRef(null); //batches of 50 records at a time
  const [page, setPage] = useState(1); //makes table start at page 1
  const [batch, setBatch] = useState(1); //batches of 50 records at a time
  const url = ` http://localhost:8000/data?q=${search}&_page=${batch}&_limit=${limit}`;
  const { rows, isLoading } = useFetch(url, batch);
  const { slice, range } = useTable(rows, page, rowsPerPage);

  const handleSearch = () => {
    setSearch(tempSearch.current);
    setBatch(1);
    setPage(1);
  };

  const handleChange = (e) => {
    tempSearch.current = e.target.value;
  };

  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      setSearch(tempSearch.current);
      setBatch(1);
      setPage(1);
    }
  };

  const handleRowSelect = (e) => {
    console.log(e.target.value);
  };

  return (
    <div className="table-search">
      <div className="search-bar">
        <InputGroup className="mb-3">
          <FormControl
            onChange={(e) => handleChange(e)}
            onKeyPress={(e) => handleKeyPress(e)}
          />
          <Button variant="dark" onClick={(e) => handleSearch(e)}>
            Search
          </Button>
        </InputGroup>
      </div>
      <>
        <Table className="table" size="sm" striped bordered hover>
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
    </div>
  );
};
export default PaginatedTable;
