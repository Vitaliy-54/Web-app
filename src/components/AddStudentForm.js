import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

const AddStudentForm = ({ addStudent }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [group, setGroup] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addStudent({ name, surname, group });
    setName("");
    setSurname("");
    setGroup("");
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
      <TextField label="Имя" value={name} onChange={(e) => setName(e.target.value)} margin="normal" required/>
      <TextField label="Фамилия" value={surname} onChange={(e) => setSurname(e.target.value)} margin="normal" required/>
      <TextField label="Группа" value={group} onChange={(e) => setGroup(e.target.value)} margin="normal" required/>
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Добавить
      </Button>
    </Box>
  );
};

export default AddStudentForm;