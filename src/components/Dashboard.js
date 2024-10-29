import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addEmployee, deleteEmployee } from "../redux/actions/employeeActions";
import EmployeeTable from "./Table";
import AddStudentForm from "./AddStudentForm";
import { Container, Typography } from "@mui/material";

function Dashboard() {
  const employees = useSelector((state) => state.employees.employees);
  const dispatch = useDispatch();

  const addEmp = (employee) => {
    dispatch(addEmployee(employee));
  };

  const delEmp = (id) => {
    dispatch(deleteEmployee(id));
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Студенты
      </Typography>
      <AddStudentForm addStudent={addEmp} />
      <EmployeeTable employees={employees} delEmployee={delEmp} />
    </Container>
  );
}

export default Dashboard;