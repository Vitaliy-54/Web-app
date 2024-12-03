import React, { useEffect, useState } from 'react';
import axiosConfig from '../api/axiosConfig';
import { Paper, Typography, Grid } from '@mui/material';

const Home = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axiosConfig.get('/news');
        setNews(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div style={{ padding: '16px' }}>
      <Typography variant="h4" align="center" sx={{ marginBottom: 4 }}>
        Актуальные новости
      </Typography>
      <Grid container spacing={3}>
        {news.map(item => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6">{item.title}</Typography>
              <Typography variant="body1" color="textSecondary">
                {item.content}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Дата публикации: {item.publishDate ? item.publishDate.split('T')[0] : 'N/A'}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;