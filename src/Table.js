import React from "react";
import './Table.css';

const Table = ({ employees, delEmployee }) => {
  return (
    <table className="employee-table">
      <thead>
        <tr>
        <th>ID</th>
          <th>Имя</th>
          <th>Фамилия</th>
          <th>Группа</th>
          <th>Удаление</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee.id}>
              <td>{employee.id}</td>
            <td>{employee.name}</td>
            <td>{employee.surname}</td>
            <td>{employee.group}</td>
            <td>
              <button onClick={() => delEmployee(employee.id)}>Удалить</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
