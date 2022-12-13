import React, { useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import "./TableFooter.css";

const TableFooter = ({
  range,
  setPage,
  page,
  slice,
  batch,
  setBatch,
  isLoading,
}) => {
  const active = "dark";
  const inactive = "secondary";
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
    <>
      {slice.length === 0 && (
        <h5 style={{ textAlign: "center" }}>end of results</h5>
      )}
      <div className={footer}>
        {batch > 1 && (
          <Button
            variant="dark"
            disabled={isLoading}
            onClick={!isLoading ? handleLessBatch : null}
          >
            {isLoading ? <Spinner animation="border" size="sm" variant="light" /> : "<<"}
          </Button>
        )}
        {range.map((element, index) => (
          <Button
            key={index}
            variant={`${page === element ? active : inactive}`}
            onClick={() => setPage(element)}
          >
            {element + batch * pagesPerBatch - pagesPerBatch}
          </Button>
        ))}

        {slice.length !== 0 && (
          <Button
            variant="dark"
            disabled={isLoading}
            onClick={!isLoading ? handleMoreBatch : null}
          >
            {" "}
            {isLoading ? (
              <Spinner animation="border" size="sm" variant="light" />
            ) : (
              ">>"
            )}{" "}
          </Button>
        )}
      </div>
    </>
  );
};

export default TableFooter;
