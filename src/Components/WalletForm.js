import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import {
  actionFetchApi,
  actionFetchCurrenciesList,
  actionCalculateInitialExpenses,
} from '../actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      value: '0',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      id: 0,
    };
  }

  componentDidMount = () => {
    const { saveCurrenciesList, calculateInitialExpenses } = this.props;
    saveCurrenciesList();
    calculateInitialExpenses();
  };

  handleState = () => {
    const { submitFormInformations } = this.props;
    submitFormInformations(this.state);
    this.setState({ value: '0' });
  };

  handleSubmitClick = (event) => {
    event.preventDefault();
    const { handleState } = this;
    const { currentExpenses } = this.props;
    const actualExpensesSize = currentExpenses.length;
    this.setState({ id: actualExpensesSize }, () => handleState());
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { handleSubmitClick, handleChange } = this;
    const { value, description, currency, method, tag } = this.state;
    const { currenciesList } = this.props;
    return (
      <div>
        <form>
          <label
            htmlFor="value-input"
          >
            Valor:
            <input
              type="number"
              data-testid="value-input"
              id="value-input"
              onChange={ handleChange }
              name="value"
              value={ value }
            />
          </label>
          <label
            htmlFor="description-input"
          >
            Descrição:
            <input
              type="text"
              data-testid="description-input"
              id="description-input"
              onChange={ handleChange }
              name="description"
              value={ description }
            />
          </label>
          <label
            htmlFor="currency-input"
          >
            Moeda:
            <select
              data-testid="currency-input"
              id="currency-input"
              onChange={ handleChange }
              name="currency"
              value={ currency }
            >
              {
                currenciesList.map((coin, index) => (
                  <option
                    key={ index }
                    value={ coin.code }
                  >
                    { coin.code }
                  </option>
                ))
              }
            </select>
          </label>
          <label
            htmlFor="method-input"
          >
            Método de Pagamento:
            <select
              data-testid="method-input"
              id="method-input"
              onChange={ handleChange }
              name="method"
              value={ method }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de débito">Cartão de débito</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
            </select>
          </label>
          <label
            htmlFor="tag-input"
          >
            Categoria:
            <select
              data-testid="tag-input"
              id="tag-input"
              onChange={ handleChange }
              name="tag"
              value={ tag }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button
            type="submit"
            onClick={ handleSubmitClick }
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentExpenses: state.wallet.expenses,
  currenciesList: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  submitFormInformations:
    (expenseInformations) => dispatch(actionFetchApi(expenseInformations)),
  saveCurrenciesList:
    () => dispatch(actionFetchCurrenciesList()),
  calculateInitialExpenses: () => dispatch(actionCalculateInitialExpenses()),
});

WalletForm.propTypes = {
  currentExpenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  submitFormInformations: PropTypes.func.isRequired,
  saveCurrenciesList: PropTypes.func.isRequired,
  currenciesList: PropTypes.arrayOf(PropTypes.object).isRequired,
  calculateInitialExpenses: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
