import React, { useEffect, useState } from 'react';
import {Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import axiosConfig from '../../api/axiosConfig';

const NewsCategoriesForm = ({ category, onClose, onCategoryUpdated, newsList, categoriesList }) => {
  const [selectedNews, setSelectedNews] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    if (category) {
      setSelectedNews(category.news.id);
      setSelectedCategory(category.categories.id);
    } else {
      setSelectedNews('');
      setSelectedCategory('');
    }
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        news: { id: selectedNews },
        categories: { id: selectedCategory }
      };

      if (category) {
        const response = await axiosConfig.put(`/newscategories/${category.id}`, data);
        onCategoryUpdated(response.data);
      } else {
        const response = await axiosConfig.post('/newscategories', data);
        onCategoryUpdated(response.data);
      }
      onClose();
    } catch (error) {
      console.error("Ошибка при сохранении категории:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl fullWidth variant="outlined" margin="dense">
        <InputLabel id="news-select-label">Выбрать новость</InputLabel>
        <Select
          labelId="news-select-label"
          value={selectedNews}
          onChange={(e) => setSelectedNews(e.target.value)}
          required
        >
          {newsList.length > 0 ? (
            newsList.map(news => (
              <MenuItem key={news.id} value={news.id}>{news.title}</MenuItem>
            ))
          ) : (
            <MenuItem disabled>Нет новостей</MenuItem>
          )}
        </Select>
      </FormControl>
      <FormControl fullWidth variant="outlined" margin="dense">
        <InputLabel id="categories-select-label">Выбрать категорию</InputLabel>
        <Select
          labelId="categories-select-label"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          required
        >
          {categoriesList.length > 0 ? (
            categoriesList.map(category => (
              <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
            ))
          ) : (
            <MenuItem disabled>Нет категорий</MenuItem>
          )}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
        {category ? 'Обновить' : 'Создать'}
      </Button>
    </form>
  );
};

export default NewsCategoriesForm;