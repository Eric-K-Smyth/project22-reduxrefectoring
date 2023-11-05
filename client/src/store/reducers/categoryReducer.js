import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from '../utils/actions';

const initialState = {
  categories: [],
  currentCategory: '',
};

export default function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_CATEGORIES:
      // Updates the category list when fetching data or from cache
      return {
        ...state,
        categories: action.categories,
      };

    case UPDATE_CURRENT_CATEGORY:
      // Updates the currently selected category
      return {
        ...state,
        currentCategory: action.currentCategory,
      };

    default:
      return state;
  }
}
