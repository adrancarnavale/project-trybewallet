import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { actionLoadEditionForm, actionUpdateExpensesInfos } from '../actions';

class WalletChart extends Component {
  constructor() {
    super();
    this.state = {
      isClicked: false,
      id: 0,
    };
  }

  handleDeleteButtonClick = ({ target }) => {
    const { expensesInfos, updateExpensesInfos } = this.props;
    const { name } = target;
    const newExpenses = expensesInfos.filter(
      (expense) => (expense.id).toString() !== name,
    );
    updateExpensesInfos(newExpenses);
  };

  loadEditForm = () => {
    const { loadEditionForm } = this.props;
    loadEditionForm(this.state);
  };

  handleEditButtonClick = ({ target }) => {
    const { loadEditForm } = this;
    this.setState({ isClicked: true, id: Number(target.name) }, () => loadEditForm());
  };

  render() {
    const { handleDeleteButtonClick, handleEditButtonClick } = this;
    const { expensesInfos } = this.props;
    return (
      <div>
        <table>
          <thead>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </thead>
          <tbody>
            {
              expensesInfos.length === 0
                ? ''
                : expensesInfos.map(({
                  description,
                  tag, method,
                  value,
                  currency,
                  exchangeRates,
                  id,
                }, index) => (
                  <tr
                    key={ index }
                  >
                    <td>{description}</td>
                    <td>{tag}</td>
                    <td>{method}</td>
                    <td>{value}</td>
                    <td>
                      {
                        exchangeRates[currency].name.split('/')[0]
                      }
                    </td>
                    <td>
                      {
                        Number(exchangeRates[currency].ask).toFixed(2)
                      }
                    </td>
                    <td>
                      {
                        (value * exchangeRates[currency].ask)
                          .toFixed(2)
                      }
                    </td>
                    <td>Real</td>
                    <td>
                      <button
                        type="button"
                        data-testid="edit-btn"
                        onClick={ handleEditButtonClick }
                        name={ id }
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        data-testid="delete-btn"
                        onClick={ handleDeleteButtonClick }
                        name={ id }
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expensesInfos: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  updateExpensesInfos: (newExpenses) => dispatch(actionUpdateExpensesInfos(newExpenses)),
  loadEditionForm: (state) => dispatch(actionLoadEditionForm(state)),
});

WalletChart.propTypes = {
  expensesInfos: PropTypes.arrayOf(PropTypes.Object).isRequired,
  updateExpensesInfos: PropTypes.func.isRequired,
  loadEditionForm: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletChart);
