import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

const EmployeeTable = ({ employees, delEmployee }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Имя</TableCell>
            <TableCell>Фамилия</TableCell>
            <TableCell>Группа</TableCell>
            <TableCell>Удаление</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.id}</TableCell>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.surname}</TableCell>
              <TableCell>{employee.group}</TableCell>
              <TableCell>
                <Button variant="contained" color="error" onClick={() => delEmployee(employee.id)} >
                  Удалить
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeTable;
