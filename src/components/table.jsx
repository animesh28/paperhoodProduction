import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ExpandMenu from "./expand";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
];

export default function AcccessibleTable({ mrgtop }) {
  return (
    <TableContainer
      component={Paper}
      className={`${mrgtop ? "mt-20" : ""} dash_table`}
    >
      <div className="dash_table-head my-3 mx-3 d-flex align-items-center justify-content-between">
        <p>Recent Store Orders</p>
        <ExpandMenu />
      </div>
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Billing Name</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row" sx={{ borderBottom: 0 }}>
                {row.name}
              </TableCell>
              <TableCell sx={{ borderBottom: 0 }} align="right">
                {row.calories}
              </TableCell>
              <TableCell sx={{ borderBottom: 0 }} align="right">
                {row.fat}
              </TableCell>
              <TableCell sx={{ borderBottom: 0 }} align="right">
                {row.carbs}
              </TableCell>
              <TableCell sx={{ borderBottom: 0 }} align="right">
                {row.protein}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
