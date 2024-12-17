import React, { useEffect, useState } from 'react';
import { Paper, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import axiosConfig from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    title: Yup.string().required('Заголовок обязателен'),
    content: Yup.string().required('Содержимое обязательно'),
    publishDate: Yup.date().required('Дата публикации обязательна').nullable(),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
      publishDate: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (editId) {
          await axiosConfig.put(`/news/${editId}`, values);
          setNews(news.map(item => (item.id === editId ? { ...item, ...values } : item)));
        } else {
          const response = await axiosConfig.post('/news', values);
          setNews([...news, response.data]);
        }
        handleClose();
        navigate('/news');
      } catch (error) {
        console.error("Ошибка при сохранении новости:", error);
      }
    },
  });

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
      formik.setFieldValue('title', newsToEdit.title);
      formik.setFieldValue('content', newsToEdit.content);
      formik.setFieldValue('publishDate', newsToEdit.publishDate ? newsToEdit.publishDate.split('T')[0] : '');
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
          <form onSubmit={formik.handleSubmit}>
            <TextField
              autoFocus
              margin=" dense"
              label="Заголовок"
              type="text"
              fullWidth
              variant="outlined"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.title)}
              helperText={formik.errors.title}
              required
            />
            <TextField
              margin="dense"
              label="Содержимое"
              type="text"
              fullWidth
              variant="outlined"
              multiline
              rows={4}
              name="content"
              value={formik.values.content}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.content)}
              helperText={formik.errors.content}
              required
            />
            <TextField
              margin="dense"
              label="Дата публикации"
              type="date"
              fullWidth
              variant="outlined"
              name="publishDate"
              value={formik.values.publishDate}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.publishDate)}
              helperText={formik.errors.publishDate}
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

export default NewsList;