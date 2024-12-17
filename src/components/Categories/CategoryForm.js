import React, { useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import { useFormik } from 'formik';
import axiosConfig from '../../api/axiosConfig';
import { useNavigate, useParams } from 'react-router-dom';

const CategoryForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: async (values) => {
      try {
        if (id) {
          await axiosConfig.put(`/categories/${id}`, values);
        } else {
          await axiosConfig.post('/categories', values);
        }
        navigate('/categories');
      } catch (error) {
        console.error('Ошибка при сохранении категории:', error);
      }
    },
  });

  useEffect(() => {
    if (id) {
      const fetchCategory = async () => {
        try {
          const response = await axiosConfig.get(`/categories/${id}`);
          const category = response.data;
          formik.setFieldValue('name', category.name);
        } catch (error) {
          console.error('Ошибка при получении категории:', error);
        }
      };

      fetchCategory();
    }
  }, [id, formik]);

  return (
    <Paper elevation={3} sx={{ padding: 3 }}>
      <Typography variant="h5" align="center">{id ? 'Изменить категорию' : 'Добавить категорию'}</Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          label="Имя категории"
          variant="outlined"
          fullWidth
          margin="normal"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          required
        />
        <Button variant="contained" type="submit" fullWidth>
          {id ? 'Обновить категорию' : 'Добавить категорию'}
        </Button>
      </form>
    </Paper>
  );
};

export default CategoryForm;