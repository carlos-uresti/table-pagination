import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import "./TableFooter.css";

const TableFooter = ({ range, setPage, page, slice, batch, setBatch }) => {
  const basic = "button";
  const active = "activeButton";
  const inactive = "inactiveButton";
  const footer = "tableFooter";
  const pagesPerBatch = 5;

  const handleMoreBatch = () => {
    setBatch(++batch);
  };

  const handleLessBatch = () => {
    if (batch > 1) {
      setBatch(--batch);
    }
  };

  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);
  return (
    <div className={footer}>
      <Button onClick={handleLessBatch}>{"<<"}</Button>
      {range.map((element, index) => (
        <button
          key={index}
          className={`${basic} ${page === element ? active : inactive}`}
          onClick={() => setPage(element)}
        >
          {element + batch * pagesPerBatch - pagesPerBatch}
        </button>
      ))}
      <Button onClick={handleMoreBatch}> {">>"} </Button>
    </div>
  );
};

export default TableFooter;
