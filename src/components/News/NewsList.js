import React, { useEffect, useState } from 'react';
import { Paper, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import axiosConfig from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [publishDate, setPublishDate] = useState('');
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      const response = await axiosConfig.get('/news');
      setNews(response.data);
    };

    fetchNews();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axiosConfig.delete(`/news/${id}`);
      setNews(news.filter(item => item.id !== id));
    } catch (error) {
      console.error("Ошибка при удалении новости:", error);
    }
  };

  const handleEdit = (id) => {
    const newsToEdit = news.find(item => item.id === id);
    if (newsToEdit) {
      setTitle(newsToEdit.title);
      setContent(newsToEdit.content);
      setPublishDate(newsToEdit.publishDate ? newsToEdit.publishDate.split('T')[0] : '');
      setEditId(id);
      setOpen(true);
    }
  };

  const handleAddOpen = () => {
    setTitle('');
    setContent('');
    setPublishDate('');
    setEditId(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newsData = { title, content, publishDate };

    try {
      if (editId) {
        await axiosConfig.put(`/news/${editId}`, newsData);
        setNews(news.map(item => (item.id === editId ? { ...item, ...newsData } : item)));
      } else {
        const response = await axiosConfig.post('/news', newsData);
        setNews([...news, response.data]);
      }
      handleClose();
      navigate('/news');
    } catch (error) {
      console.error("Ошибка при сохранении новости:", error);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3 }}>
      <Typography variant="h5" align="center">Новости</Typography>
      <Button 
        variant="contained" 
        onClick={handleAddOpen} 
        sx={{ backgroundColor: 'green', color: 'white', marginBottom: 2 }}
      >
        Добавить новость
      </Button>
      {news.map(item => (
        <div key={item.id} style={{ marginBottom: 16 }}>
          <Typography variant="h6">{item.title}</Typography>
          <Typography variant="body1" color="textSecondary">{item.content}</Typography>
          <Typography variant="body2" color="textSecondary">Дата публикации: {item.publishDate ? item.publishDate.split('T')[0] : 'N/A'}</Typography>
          <Button variant="contained" onClick={() => handleEdit(item.id)} sx={{ marginRight: 1 }}>Изменить</Button>
          <Button variant="contained" color="error" onClick={() => handleDelete(item.id)}>Удалить</Button>
        </div>
      ))}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editId ? 'Изменить новость' : 'Добавить новость'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Заголовок"
            type="text"
            fullWidth
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            label="Содержание"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            label="Дата публикации"
            type="date"
            fullWidth
            variant="outlined"
            value={publishDate}
            onChange={(e) => setPublishDate(e.target.value)}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Отменить</Button>
          <Button onClick={handleSubmit} color="primary">{editId ? 'Обновить' : 'Добавить'}</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default NewsList;