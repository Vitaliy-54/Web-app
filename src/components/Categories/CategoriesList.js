import React, { useEffect, useState } from 'react';
import axiosConfig from '../../api/axiosConfig';
import { Paper, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axiosConfig.get('/categories');
      setCategories(response.data);
    };

    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axiosConfig.delete(`/categories/${id}`);
      setCategories(categories.filter(item => item.id !== id));
    } catch (error) {
      console.error("Ошибка при удалении категории:", error);
    }
  };

  const handleEdit = (id) => {
    const categoryToEdit = categories.find(item => item.id === id);
    if (categoryToEdit) {
      setNewCategoryName(categoryToEdit.name);
      setEditId(id);
      setOpen(true);
    }
  };

  const handleAddOpen = () => {
    setNewCategoryName('');
    setEditId(null);
    setOpen(true);
  };

  const handleAddClose = () => {
    setOpen(false);
    setNewCategoryName('');
  };

  const handleAddSubmit = async () => {
    try {
      if (editId) {
        await axiosConfig.put(`/categories/${editId}`, { name: newCategoryName });
        setCategories(categories.map(item => (item.id === editId ? { ...item, name: newCategoryName } : item)));
      } else {
        const response = await axiosConfig.post('/categories', { name: newCategoryName });
        setCategories([...categories, response.data]);
      }
      handleAddClose();
      navigate('/categories');
    } catch (error) {
      console.error("Ошибка при добавлении/обновлении категории:", error);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3 }}>
      <Typography variant="h5" align="center">Категории</Typography>
      <Button 
        variant="contained" 
        onClick={handleAddOpen} 
        sx={{ backgroundColor: 'green', color: 'white', marginBottom: 2 }}
      >
        Добавить категорию
      </Button>
      {categories.map(item => (
        <div key={item.id} style={{ marginBottom: 16 }}>
          <Typography variant="h6">{item.name}</Typography>
          <Button variant="contained" onClick={() => handleEdit(item.id)} sx={{ marginRight: 1 }}>Изменить</Button>
          <Button variant="contained" color="error" onClick={() => handleDelete(item.id)}>Удалить</Button>
        </div>
      ))}

      <Dialog open={open} onClose={handleAddClose}>
        <DialogTitle>{editId ? 'Изменить категорию' : 'Добавить категорию'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Имя категории"
            type="text"
            fullWidth
            variant="outlined"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddClose} color="primary">Отменить</Button>
          <Button onClick ={handleAddSubmit} color="primary">{editId ? 'Обновить' : 'Добавить'}</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default CategoriesList; 