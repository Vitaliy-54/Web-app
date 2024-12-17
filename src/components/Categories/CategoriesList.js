import React, { useEffect, useState } from 'react';
import axiosConfig from '../../api/axiosConfig';
import { Paper, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required('Имя категории обязательно'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (editId) {
          await axiosConfig.put(`/categories/${editId}`, values);
          setCategories(categories.map(item => (item.id === editId ? { ...item, ...values } : item)));
        } else {
          const response = await axiosConfig.post('/categories', values);
          setCategories([...categories, response.data]);
        }
        handleClose();
        navigate('/categories');
      } catch (error) {
        console.error("Ошибка при сохранении категории:", error);
      }
    },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axiosConfig.get('/categories');
      setCategories(response.data);
    };

    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axiosConfig.delete(`/categories/${id}`);
      setCategories(categories.filter(item => item.id !== id));
    } catch (error) {
      console.error("Ошибка при удалении категории:", error);
    }
  };

  const handleEdit = (id) => {
    const categoryToEdit = categories.find(item => item.id === id);
    if (categoryToEdit) {
      formik.setFieldValue('name', categoryToEdit.name);
      setEditId(id);
      setOpen(true);
    }
  };

  const handleAddOpen = () => {
    formik.resetForm();
    setEditId(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditId(null);
  };

  return (
    <Paper elevation={3} sx={{ padding: 3 }}>
      <Typography variant="h5" align="center">Категории</Typography>
      <Button 
        variant="contained" 
        onClick={handleAddOpen} 
        sx={{ backgroundColor: 'green', color: 'white', marginBottom: 2 }}
      >
        Добавить категорию
      </Button>
      {categories.map(item => (
        <div key={item.id} style={{ marginBottom: 16 }}>
          <Typography variant="h6">{item.name}</Typography>
          <Button variant="contained" onClick={() => handleEdit(item.id)} sx={{ marginRight: 1 }}>Изменить</Button>
          <Button variant="contained" color="error" onClick={() => handleDelete(item.id)}>Удалить</Button>
        </div>
      ))}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editId ? 'Изменить категорию' : 'Добавить категорию'}</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              autoFocus
              margin="dense"
              label="Имя категории"
              type="text"
              fullWidth
              variant="outlined"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.name)}
              helperText={formik.errors.name}
              required
            />
            <DialogActions>
              <Button onClick={handleClose} color="primary">Отмена</Button>
              <Button type="submit" color="primary">{editId ? 'Сохранить' : 'Добавить'}</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Paper>
  );
};

export default CategoriesList;