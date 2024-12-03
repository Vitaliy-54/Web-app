export const setNews = (news) => ({
  type: 'SET_NEWS',
  payload: news
});

export const addNews = (news) => ({
  type: 'ADD_NEWS',
  payload: news
});

export const editNews = (news) => ({
  type: 'EDIT_NEWS',
  payload: news
});

export const deleteNews = (id) => ({
  type: 'DELETE_NEWS',
  payload: id
});
