import fetchApi from '../services/fetchApi';

export const SAVE_USER_EMAIL = 'SAVE_USER_EMAIL';
const actionSaveUserEmail = (email) => ({ type: SAVE_USER_EMAIL, email });
export default actionSaveUserEmail;

export const SUBMIT_FORM_INFORMATIONS = 'SUBMIT_FORM_INFORMATIONS';
export const actionSubmitFormInformations = (expenseInformation, exchangeRates) => {
  expenseInformation.exchangeRates = exchangeRates;

  return {
    type: SUBMIT_FORM_INFORMATIONS,
    expenseInformation,
  };
};

export const SAVE_CURRENCIES_LIST = 'SAVE_CURRENCIES_LIST';
export const actionSaveCurrenciesList = (currenciesList) => ({
  type: SAVE_CURRENCIES_LIST,
  currenciesList,
});

export const CALCULATE_INITIAL_EXPENSES = 'CALCULATE_INITIAL_EXPENSES';
export const actionCalculateInitialExpenses = () => ({
  type: CALCULATE_INITIAL_EXPENSES,
});

export const actionFetchCurrenciesList = () => (dispatch) => {
  fetchApi()
    .then((response) => dispatch(actionSaveCurrenciesList(response)))
    .catch((err) => console.log(err));
};

export const actionFetchApi = (expenseInformation) => (dispatch) => {
  fetchApi()
    .then((response) => dispatch(
      actionSubmitFormInformations(expenseInformation, response),
    ))
    .catch((err) => console.log(err));
};

export const UPDATE_EXPENSES_INFOS = 'UPDATE_EXPENSES_INFOS';
export const actionUpdateExpensesInfos = (newExpenses) => ({
  type: UPDATE_EXPENSES_INFOS,
  newExpenses,
});

export const LOAD_EDITION_FORM = 'LOAD_EDITION_FORM';
export const actionLoadEditionForm = (state) => ({
  type: LOAD_EDITION_FORM,
  state,
});
