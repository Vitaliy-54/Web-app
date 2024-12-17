import React, { useEffect, useState } from 'react';
import axiosConfig from '../../api/axiosConfig';
import {
  Paper,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import NewsCategoriesForm from './NewsCategoriesForm';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const NewsCategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const [newsCategories, setNewsCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const validationSchema = Yup.object({
    selectedNews: Yup.string().required('Выберите новость'),
    selectedCategory: Yup.string().required('Выберите категорию'),
  });

  const formik = useFormik({
    initialValues: {
      selectedNews: '',
      selectedCategory: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const data = {
          news: { id: values.selectedNews },
          categories: { id: values.selectedCategory },
        };

        if (editingCategory) {
          const response = await axiosConfig.put(`/newscategories/${editingCategory.id}`, data);
          handleCategoryUpdated(response.data);
        } else {
          const response = await axiosConfig.post('/newscategories', data);
          handleCategoryUpdated(response.data);
        }
        handleClose();
      } catch (error) {
        console.error("Ошибка при сохранении связи новостей и категорий:", error);
      }
    },
  });

  const fetchCategories = async () => {
    try {
      const response = await axiosConfig.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error("Ошибка при получении категорий:", error);
    }
  };

  const fetchNews = async () => {
    try {
      const response = await axiosConfig.get('/news');
      setNewsList(response.data);
    } catch (error) {
      console.error("Ошибка при получении новостей:", error);
    }
  };

  const fetchNewsCategories = async () => {
    try {
      const response = await axiosConfig.get('/newscategories');
      setNewsCategories(response.data);
    } catch (error) {
      console.error("Ошибка при получении связей новостей и категорий:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchNews();
    fetchNewsCategories();
  }, []);

  const handleAddOpen = () => {
    setEditingCategory(null);
    formik.resetForm();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingCategory(null);
  };

  const handleCategoryUpdated = (updatedCategory) => {
    setNewsCategories((prevNewsCategories) =>
      prevNewsCategories.map((nc) => (nc.id === updatedCategory.id ? updatedCategory : nc))
    );
    fetchNewsCategories();
  };

  const handleDeleteNewsCategory = async (newsCategoryId) => {
    try {
      await axiosConfig.delete(`/newscategories/${newsCategoryId}`);
      setNewsCategories(prevNewsCategories => prevNewsCategories.filter(nc => nc.id !== newsCategoryId));
    } catch (error) {
      console.error("Ошибка при удалении связи:", error);
    }
  };

  const handleEditOpen = (newsCategory) => {
    setEditingCategory(newsCategory);
    formik.setFieldValue('selectedNews', newsCategory.news.id);
    formik.setFieldValue('selectedCategory', newsCategory.categories.id);
    setOpen(true);
  };

  return (
    <Paper elevation={3} sx={{ padding: 3 }}>
      <Typography variant="h5" align="center">Связь новость-категория</Typography>
      <Button 
        variant="contained" 
        onClick={handleAddOpen} 
        sx={{ backgroundColor: 'green', color: 'white', marginBottom: 2 }}
      >
        Добавить связь
      </Button>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Категория</TableCell>
              <TableCell>Новость</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {newsCategories.map((newsCategory) => (
              <TableRow key={newsCategory.id}>
                <TableCell>{newsCategory.categories.name}</TableCell>
                <TableCell>{newsCategory.news.title}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEditOpen(newsCategory)}>Редактировать</Button>
                  <Button onClick={() => handleDeleteNewsCategory(newsCategory.id)}>Удалить</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingCategory ? 'Редактировать связь' : 'Добавить связь'}</DialogTitle>
        <DialogContent>
          <NewsCategoriesForm formik={formik} categories={categories} newsList={newsList} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={formik.handleSubmit}>Сохранить</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default NewsCategoriesList;