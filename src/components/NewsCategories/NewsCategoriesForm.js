import React, { useEffect } from 'react';
import { Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useFormik } from 'formik';
import axiosConfig from '../../api/axiosConfig';

const NewsCategoriesForm = ({ category, onClose, onCategoryUpdated, newsList, categoriesList }) => {
  const formik = useFormik({
    initialValues: {
      selectedNews: '',
      selectedCategory: '',
    },
    onSubmit: async (values) => {
      console.log("Submitting:", values); // Отладочное сообщение
      try {
        const data = {
          news: { id: values.selectedNews },
          categories: { id: values.selectedCategory }
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
        alert("Произошла ошибка при сохранении. Пожалуйста, попробуйте еще раз.");
      }
    },
  });

  useEffect(() => {
    if (category) {
      formik.setFieldValue('selectedNews', category.news.id);
      formik.setFieldValue('selectedCategory', category.categories.id);
    } else {
      formik.setFieldValue('selectedNews', '');
      formik.setFieldValue('selectedCategory', '');
    }
  }, [category, formik]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl fullWidth variant="outlined" margin="dense">
        <InputLabel id="news-select-label">Выбрать новость</InputLabel>
        <Select
          labelId="news-select-label"
          name="selectedNews"
          value={ formik.values.selectedNews}
          onChange={formik.handleChange}
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
          name="selectedCategory"
          value={formik.values.selectedCategory}
          onChange={formik.handleChange}
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