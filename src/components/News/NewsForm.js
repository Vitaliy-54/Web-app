import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import axiosConfig from '../../api/axiosConfig';
import { useNavigate, useParams } from 'react-router-dom';

const NewsForm = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [publishDate, setPublishDate] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchNews = async () => {
        try {
          const response = await axiosConfig.get(`/news/${id}`);
          const news = response.data;
          setTitle(news.title);
          setContent(news.content);
          setPublishDate(news.publishDate ? news.publishDate.split('T')[0] : '');
        } catch (error) {
          setError('Ошибка при получении данных новостей');
          console.error('Ошибка при получении новостей:', error);
        }
      };

      fetchNews();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newsData = { title, content, publishDate };

    try {
      if (id) {
        await axiosConfig.put(`/news/${id}`, newsData);
      } else {
        await axiosConfig.post('/news', newsData);
      }
      navigate('/news');
    } catch (error) {
      setError('Ошибка при сохранении новостей');
      console.error('Ошибка при сохранении новостей:', error);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3 }}>
      <Typography variant="h5" align="center">{id ? 'Редактировать Новость' : 'Добавить Новость'}</Typography>
      {error && <Typography color="error" align="center">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Заголовок"
          variant="outlined"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          label="Содержимое"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <TextField
          label="Дата публикации"
          variant="outlined"
          type="date"
          fullWidth
          margin="normal"
          value={publishDate}
          onChange={(e) => setPublishDate(e.target.value)}
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