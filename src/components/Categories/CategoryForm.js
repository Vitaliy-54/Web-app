import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import axiosConfig from '../../api/axiosConfig';
import { useNavigate, useParams } from 'react-router-dom';

const CategoryForm = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchCategory = async () => {
        try {
          const response = await axiosConfig.get(`/categories/${id}`);
          const category = response.data;
          setName(category.name);
        } catch (error) {
          console.error('Ошибка при получении категории:', error);
        }
      };

      fetchCategory();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const categoryData = { name };

    try {
      if (id) {
        await axiosConfig.put(`/categories/${id}`, categoryData);
      } else {
        await axiosConfig.post('/categories', categoryData);
      }
      navigate('/categories');
    } catch (error) {
      console.error('Ошибка при сохранении категории:', error);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3 }}>
      <Typography variant="h5" align="center">{id ? 'Изменить категорию' : 'Добавить категорию'}</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Имя категории"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
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