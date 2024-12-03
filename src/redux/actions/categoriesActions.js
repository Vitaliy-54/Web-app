export const setCategories = (categories) => ({
  type: 'SET_CATEGORIES',
  payload: categories
});

export const addCategory = (category) => ({
  type: 'ADD_CATEGORY',
  payload: category
});

export const editCategory = (category) => ({
  type: 'EDIT_CATEGORY',
  payload: category
});

export const deleteCategory = (id) => ({
  type: 'DELETE_CATEGORY',
  payload: id
});