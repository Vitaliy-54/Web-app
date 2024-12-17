import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosConfig from '../../api/axiosConfig';

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await axiosConfig.get('/categories');
  return response.data;
});