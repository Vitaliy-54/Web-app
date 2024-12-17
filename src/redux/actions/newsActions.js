import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosConfig from '../../api/axiosConfig';

export const fetchNews = createAsyncThunk('news/fetchNews', async () => {
  const response = await axiosConfig.get('/news');
  return response.data;
});