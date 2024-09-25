import './App.css';
import EmployeeAPI from "./api/service";
import Table from "./Table";
import AddStudentForm from "./AddStudentForm";
import { useState, useEffect } from "react";

function App() {
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
    <div className="App">
      <p>Студенты</p>
      <AddStudentForm addStudent={addEmp} />
      <Table employees={employees} delEmployee={delEmp} />
    </div>
  );
}

export default App;
