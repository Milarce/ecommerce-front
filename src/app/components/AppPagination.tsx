import { Box, Typography, Pagination } from "@mui/material";
import React from "react";
import { MetaData } from "../models/pagination";

interface Props {
  metaData: MetaData;
  onPageChange: (event: any, page: number) => void;
}

const AppPagination = (props: Props) => {
  const { currentPage, totalCount, totalPages, pageSize } = props.metaData;

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography>
        Displaying {(currentPage - 1) * pageSize + 1} -{" "}
        {currentPage * pageSize > totalCount
          ? totalCount
          : currentPage * pageSize}{" "}
        of {totalCount} items
      </Typography>
      <Pagination
        size="large"
        count={totalPages}
        page={currentPage}
        color="secondary"
        onChange={props.onPageChange} //page is a built-in property inside the <Pagination> onChange method
      />
    </Box>
  );
};

export default AppPagination;
