import React, { useState, useEffect } from "react";
import EmployeeAPI from "./api/service";
import EmployeeTable from "./Table";
import AddStudentForm from "./AddStudentForm";
import { Container, Typography } from "@mui/material";

function Dashboard() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    setEmployees(EmployeeAPI.all());
  }, []);

  useEffect(() => {
    const uniqueEmployees = employees.reduce((acc, current) => {
      const x = acc.find(item => item.name === current.name && item.surname === current.surname);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);
    if (uniqueEmployees.length !== employees.length) {
      setEmployees(uniqueEmployees);
    }
  }, [employees]);

  const delEmp = (id) => {
    if (EmployeeAPI.delete(id)) {
      setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee.id !== id));
    }
  };

  const addEmp = (employee) => {
    const exists = employees.some(
      (emp) => emp.name === employee.name && emp.surname === employee.surname
    );
    if (!exists) {
      const newEmployee = {
        ...employee,
        id: employees.length ? employees[employees.length - 1].id + 1 : 1,
      };
      EmployeeAPI.add(newEmployee);
      setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
    } else {
      alert("Студент с таким именем и фамилией уже существует.");
    }
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