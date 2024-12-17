import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import { useFormik } from 'formik';
import axiosConfig from '../../api/axiosConfig';
import { useNavigate, useParams } from 'react-router-dom';

const NewsForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
      publishDate: '',
    },
    onSubmit: async (values) => {
      try {
        if (id) {
          await axiosConfig.put(`/news/${id}`, values);
        } else {
          await axiosConfig.post('/news', values);
        }
        navigate('/news');
      } catch (error) {
        setError('Ошибка при сохранении новостей');
        console.error('Ошибка при сохранении новостей:', error);
      }
    },
  });

  useEffect(() => {
    if (id) {
      const fetchNews = async () => {
        try {
          const response = await axiosConfig.get(`/news/${id}`);
          const news = response.data;
          formik.setFieldValue('title', news.title);
          formik.setFieldValue('content', news.content);
          formik.setFieldValue('publishDate', news.publishDate ? news.publishDate.split('T')[0] : '');
        } catch (error) {
          setError('Ошибка при получении данных новостей');
          console.error('Ошибка при получении новостей:', error);
        }
      };

      fetchNews();
    }
  }, [id, formik]);

  return (
    <Paper elevation={3} sx={{ padding: 3 }}>
      <Typography variant="h5" align="center">{id ? 'Редактировать Новость' : 'Добавить Новость'}</Typography>
      {error && <Typography color="error" align="center">{error}</Typography>}
      <form onSubmit={formik.handleSubmit}>
        <TextField
          label="Заголовок"
          variant="outlined"
          fullWidth
          margin="normal"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          required
        />
        <TextField
          label="Содержимое"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          name="content"
          value={formik.values.content}
          onChange={formik.handleChange}
          required
        />
        <TextField
          label="Дата публикации"
          variant="outlined"
          type="date"
          fullWidth
          margin="normal"
          name="publishDate"
          value={formik.values.publishDate}
          onChange={formik.handleChange}
          required
        />
        <Button variant="contained" type="submit" fullWidth>
          {id ? 'Обновить Новость' : 'Добавить Новость'}
        </Button>
      </form>
    </Paper>
  );
};

export default NewsForm;