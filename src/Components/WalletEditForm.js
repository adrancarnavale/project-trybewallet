import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { actionUpdateExpensesInfos, actionLoadEditionForm } from '../actions';

class WalletEditForm extends Component {
  constructor() {
    super();
    this.state = {
      value: '0',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      isClicked: false,
      id: 0,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleEditButtonClick = (event) => {
    event.preventDefault();
    const { name } = event.target;
    const { currentExpenses, updateExpensesInfos, loadEditionForm } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const expenseToBeEdited = currentExpenses.find(
      (expense) => Number(expense.id) === Number(name),
    );

    expenseToBeEdited.value = value;
    expenseToBeEdited.description = description;
    expenseToBeEdited.currency = currency;
    expenseToBeEdited.method = method;
    expenseToBeEdited.tag = tag;

    updateExpensesInfos(currentExpenses);
    this.setState({ isClicked: false, id: name }, () => loadEditionForm(this.state));
  };

  render() {
    const { handleEditButtonClick, handleChange } = this;
    const { value, description, currency, method, tag } = this.state;
    const { position, currenciesList } = this.props;
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
                Object.keys(currenciesList).map((coin, index) => (
                  <option
                    key={ index }
                    value={ coin }
                  >
                    { coin }
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
            onClick={ handleEditButtonClick }
            name={ position }
          >
            Editar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentExpenses: state.wallet.expenses,
  currenciesList: state.wallet.expenses[0].exchangeRates,
});

const mapDispatchToProps = (dispatch) => ({
  updateExpensesInfos: (newExpenses) => dispatch(actionUpdateExpensesInfos(newExpenses)),
  loadEditionForm: (state) => dispatch(actionLoadEditionForm(state)),
});

WalletEditForm.propTypes = {
  currentExpenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  position: PropTypes.number.isRequired,
  updateExpensesInfos: PropTypes.func.isRequired,
  currenciesList: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadEditionForm: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletEditForm);
