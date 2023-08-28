import React, { useState } from "react";
import {
  makeStyles,
  Table,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  table: {
    width: "100%",
    border: "none",
    marginTop: theme.spacing(6),
    "& thead th": {
      fontWeight: "bold",
      fontSize: "14px",
      fontStyle: "normal",
      lineHeight: "20px",
      /* identical to box height, or 167% */
      letterSpacing: "0.2px",
      /* Gray 1 */
      color: "#FFFFFF",
      backgroundColor: "#00416b",
    
    },
    "& thead td": {
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "12px",
      lineHeight: "20px",
      /* identical to box height, or 167% */
      letterSpacing: "0.2px",
      /* Gray 2 */
      color: "#66666B",
    },
    "& tbody tr:hover": {
      backgroundColor: "#F5F7F9",
      curser: "pointer",
    },
  },
}));
export default function useTable(
  records = [],
  headCells,
  filterFn,
  searchInput
) {
  console.log("test", records,filterFn);
  const classes = useStyles();

  const pages = [5, 10, 25, 100, 1500, 10000];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
//   console.log("searchInput", searchInput);
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();

  const TblContainer = (props) => (
    <Table
      stickyHeader
      aria-label="sticky table"
      className={classes.table}
      style={{ width: "100%", overflow: "auto",marginTop:"8px" }}
    >
      {props.children}
    </Table>
  );
  const TblHead = (props) => {
    const handleSortRequest = (cellId) => {
      const isAsc = orderBy === cellId && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(cellId);
    };
    return (
      <TableHead style={{ width: "100%", overflow: "auto",backgroundColor:"light",marginTop:"8rem!important" }}>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              // style={{textAlign:"center"}}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              {headCell.disableSorting ? (
                headCell.label
              ) : (
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={() => {
                    handleSortRequest(headCell.id);
                  }}
                >
                  {headCell.label}
                </TableSortLabel>
              )}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };
  function stableSort(arr, comparator) {
    const stabilizedThis = arr && arr.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  const recordsAfterPagingAndSorting = () => {
    return stableSort(
      filterFn.fn(records),
      getComparator(order, orderBy)
    ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  };

  const getTotalrecordsAfterSearch = () => {
    return stableSort(
      filterFn.fn(records),
      getComparator(order, orderBy)
    ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  };
  const TblPagination = () => (
    <TablePagination
      component="div"
      page={page}
      rowsPerPageOptions={pages}
      rowsPerPage={rowsPerPage}
      count=
      {
        !!!searchInput
          ? records?.length > 0
            ? records.length
            : 0
          : getTotalrecordsAfterSearch()?.length > 0
          ? getTotalrecordsAfterSearch().length
          : 0
      }
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
  return {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
    getTotalrecordsAfterSearch
  };
}
