const INITIAL_STATE = {
  email: '',
  id: 0,
  isClicked: false,
};

const user = (state = INITIAL_STATE, action) => {
  const userObj = {
    SAVE_USER_EMAIL: () => ({
      email: action.email,
    }),
    LOAD_EDITION_FORM: () => ({
      ...state,
      id: action.state.id,
      isClicked: action.state.isClicked,
    }),
    DEFAULT: () => ({
      ...state,
    }),
  };

  return (userObj[action.type] || userObj.DEFAULT)();
};

export default user;
