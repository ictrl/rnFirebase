import createDataContext from './createDataContext';
import {navigate} from '../navigationRef';

const languageReducer = (state, action) => {
  switch (action.type) {
    case 'change_language':
      navigate('LoginScreen');
      return {...state, language: action.payload};
    default:
      return state;
  }
};

const changeLanguage = (dispatch) => (language) => {
  dispatch({type: 'change_language', payload: language});
};

export const {Context, Provider} = createDataContext(
  languageReducer,
  {changeLanguage},
  {language: 'English'},
);
