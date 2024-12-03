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

const NewsCategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const [newsCategories, setNewsCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

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
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingCategory(null);
  };

  const handleCategoryUpdated = (updatedCategory) => {
    setCategories((prevCategories) =>
      prevCategories.map((cat) => (cat.id === updatedCategory.id ? updatedCategory : cat))
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
              <TableCell>Заголовки новостей</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map(category => (
              <TableRow key={category.id}>
                <TableCell>
                  <Typography variant="h6">{category.name}</Typography>
                </TableCell>
                <TableCell>
                  <TableContainer>
                    <Table>
                      <TableBody>
                        {newsCategories
                          .filter(nc => nc.categories.id === category.id)
                          .map(nc => (
                            <TableRow key={nc.id}>
                              <TableCell>{nc.news.title}</TableCell>
                              <TableCell>
                                <Button 
                                  variant="contained" 
                                  color="error" 
                                  onClick={() => handleDeleteNewsCategory(nc.id)}
                                >
                                  Удалить
                                </Button>
                                <Button 
                                  variant="contained" 
                                  color="primary" 
                                  onClick={() => handleEditOpen(nc)} // Open edit dialog with selected news-category
                                  sx={{ marginLeft: 1 }}
 >
                                  Изменить
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingCategory ? 'Изменить связь' : 'Добавить связь'}</DialogTitle>
        <DialogContent>
          <NewsCategoriesForm 
            category={editingCategory} 
            onClose={handleClose} 
            onCategoryUpdated={handleCategoryUpdated} 
            newsList={newsList} 
            categoriesList={categories} 
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Отменить</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default NewsCategoriesList;