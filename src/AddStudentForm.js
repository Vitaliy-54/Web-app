import React, { useState } from "react";

const AddStudentForm = ({ addStudent }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [group, setGroup] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newStudent = {
      id: Date.now(),
      name,
      surname,
      group,
    };
    addStudent(newStudent);
    setName("");
    setSurname("");
    setGroup("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Фамилия"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Группа"
        value={group}
        onChange={(e) => setGroup(e.target.value)}
        required
      />
      <button type="submit">Добавить</button>
    </form>
  );
};

export default AddStudentForm;
