const initialState = {
    news: [],
  };
  
  const newsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_NEWS':
        return { ...state, news: action.payload };
      case 'ADD_NEWS':
        return { ...state, news: [...state.news, action.payload] };
      case 'EDIT_NEWS':
        return {
          ...state,
          news: state.news.map(newsItem =>
            newsItem.id === action.payload.id ? action.payload : newsItem
          ),
        };
      case 'DELETE_NEWS':
        return {
          ...state,
          news: state.news.filter(newsItem => newsItem.id !== action.payload),
        };
      default:
        return state;
    }
  };
  
  export default newsReducer;