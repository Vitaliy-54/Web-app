import './App.css';
import EmployeeAPI from "./api/service";
import Table from "./Table";
import { useState, useEffect } from "react";

function App() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    setEmployees(EmployeeAPI.all());
  }, []);

  const delEmp = (id) => {
    if (EmployeeAPI.delete(id)) {
      setEmployees(employees.filter((employee) => employee.id !== id));
    }
  };

  return (
    <div className="App">
      <p>Студенты</p>
      <Table employees={employees} delEmployee={delEmp} />
    </div>
  );
}

export default App;