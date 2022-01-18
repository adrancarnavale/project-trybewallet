const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  totalExpenses: '',
};

const calculateIndividualExpenses = ({ value, currency, exchangeRates }) => {
  const newValue = Number(value);
  const newRates = Number(exchangeRates[currency].ask);
  return (newValue * newRates);
};

const calculateTotalExpenses = (arrayOfExpenses) => {
  if (arrayOfExpenses.length === 0) {
    return '0';
  }
  const arrayOfValues = arrayOfExpenses.map(
    (expense) => calculateIndividualExpenses(expense),
  );
  return arrayOfValues.reduce((acc, curr) => acc + curr).toFixed(2).toString();
};

const getCurrenciesList = (currencies) => {
  const arrayOfCurrencies = Object.values(currencies);
  const filteredArrayOfCurrencies = arrayOfCurrencies.filter(
    (element) => element.codein !== 'BRLT',
  );
  return filteredArrayOfCurrencies;
};

const wallet = (state = INITIAL_STATE, action) => {
  const walletObject = {
    SUBMIT_FORM_INFORMATIONS: () => ({
      ...state,
      expenses: [...state.expenses, action.expenseInformation],
      totalExpenses:
        calculateTotalExpenses([...state.expenses, action.expenseInformation]),
    }),
    SAVE_CURRENCIES_LIST: () => ({
      ...state,
      currencies: getCurrenciesList(action.currenciesList),
    }),
    CALCULATE_INITIAL_EXPENSES: () => ({
      ...state,
      totalExpenses:
        calculateTotalExpenses(state.expenses),
    }),
    UPDATE_EXPENSES_INFOS: () => ({
      ...state,
      expenses: [...action.newExpenses],
      totalExpenses:
        calculateTotalExpenses(action.newExpenses),
    }),
    DEFAULT: () => ({
      ...state,
    }),
  };
  return (walletObject[action.type] || walletObject.DEFAULT)();
};

export default wallet;
