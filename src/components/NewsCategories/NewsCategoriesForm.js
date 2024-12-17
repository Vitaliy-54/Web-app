import React from 'react';
import { MenuItem, FormControl, InputLabel, Select } from '@mui/material';

const NewsCategoriesForm = ({ formik, categories, newsList }) => {
  return (
    <form>
      <FormControl fullWidth margin="normal">
        <InputLabel>Выберите новость</InputLabel>
        <Select
          name="selectedNews"
          value={formik.values.selectedNews}
          onChange={formik.handleChange}
          error={Boolean(formik.errors.selectedNews)}
        >
          {newsList.map((news) => (
            <MenuItem key={news.id} value={news.id}>
              {news.title}
            </MenuItem>
          ))}
        </Select>
        {formik.errors.selectedNews && <div style={{ color: 'red' }}>{formik.errors.selectedNews}</div>}
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Выберите категорию</InputLabel>
        <Select
          name="selectedCategory"
          value={formik.values.selectedCategory}
          onChange={formik.handleChange}
          error={Boolean(formik.errors.selectedCategory)}
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
        {formik.errors.selectedCategory && <div style={{ color: 'red' }}>{formik.errors.selectedCategory}</div>}
      </FormControl>
    </form>
  );
};

export default NewsCategoriesForm;