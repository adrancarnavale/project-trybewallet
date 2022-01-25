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
    const inputStyles = "ml-1 rounded-lg border-1 border-solid border-slate-500 focus:border focus:border-solid focus:border-trybe";
    return (
      <div className="p-4">
        <form className=" p-4 flex flex-col border-4 border-solid border-trybe rounded-lg hover:shadow-lg hover:shadow-lightgreen">
        <label
            className="text-lg mx-auto"
            htmlFor="value-input"
          >
            Valor:
            <input
              className={ inputStyles }
              type="number"
              data-testid="value-input"
              id="value-input"
              onChange={ handleChange }
              name="value"
              value={ value }
            />
          </label>
          <label
            className="text-lg mt-4 mx-auto"
            htmlFor="description-input"
          >
            Descrição:
            <input
              className={ inputStyles }
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
            className="text-lg mt-4 mx-auto"
          >
            Moeda:
            <select
              data-testid="currency-input"
              className={ inputStyles }
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
            className="text-lg mt-4 mx-auto"
          >
            Método de Pagamento:
            <select
              className={ inputStyles }
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
            className="text-lg mt-4 mx-auto"
            htmlFor="tag-input"
          >
            Categoria:
            <select
              className={ inputStyles }
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
            className="mt-4 text-sm bg-lightgreen w-32 text-trybe px-2 py-1 mx-auto rounded-lg shadow-lg hover:bg-trybe hover:text-lightgreen hover:shadow-xl"
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
