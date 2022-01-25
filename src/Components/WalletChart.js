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
      <div className="p-4 w-full flex flex-col items-center">
        <table className="table-auto w-11/12 border border-trybe">
          <thead className="table-row">
            <th className="table-cell text-center text-xl border border-trybe hover:bg-slate-200">Descrição</th>
            <th className="table-cell text-center border text-xl border-trybe hover:bg-slate-200">Tag</th>
            <th className="table-cell text-center border text-xl border-trybe hover:bg-slate-200">Método de pagamento</th>
            <th className="table-cell text-center border text-xl border-trybe hover:bg-slate-200">Valor</th>
            <th className="table-cell text-center border text-xl border-trybe hover:bg-slate-200">Moeda</th>
            <th className="table-cell text-center border text-xl border-trybe hover:bg-slate-200">Câmbio utilizado</th>
            <th className="table-cell text-center border text-xl border-trybe hover:bg-slate-200">Valor convertido</th>
            <th className="table-cell text-center border text-xl border-trybe hover:bg-slate-200">Moeda de conversão</th>
            <th className="table-cell text-center border text-xl border-trybe hover:bg-slate-200">Editar/Excluir</th>
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
                    className="table-row"
                  >
                    <td className="table-cell text-center border border-trybe hover:bg-green-200">{description}</td>
                    <td className="table-cell text-center border border-trybe hover:bg-green-200">{tag}</td>
                    <td className="table-cell text-center border border-trybe hover:bg-green-200">{method}</td>
                    <td className="table-cell text-center border border-trybe hover:bg-green-200">{value}</td>
                    <td className="table-cell text-center border border-trybe hover:bg-green-200">
                      {
                        exchangeRates[currency].name.split('/')[0]
                      }
                    </td>
                    <td className="table-cell text-center border border-trybe hover:bg-green-200">
                      {
                        Number(exchangeRates[currency].ask).toFixed(2)
                      }
                    </td>
                    <td className="table-cell text-center border border-trybe hover:bg-red-200">
                      {
                        (value * exchangeRates[currency].ask)
                          .toFixed(2)
                      }
                    </td>
                    <td className="table-cell text-center border border-trybe hover:bg-green-200">Real</td>
                    <td className="table-cell text-center border border-trybe hover:bg-slate-200">
                      <button
                        className="p-1 bg-lightgreen text-trybe hover:bg-trybe hover:text-white rounded-lg my-1 mx-1"
                        type="button"
                        data-testid="edit-btn"
                        onClick={ handleEditButtonClick }
                        name={ id }
                      >
                        Editar
                      </button>
                      <button
                        className="p-1 bg-red-500 text-white hover:bg-red-700 rounded-lg my-1 mx-1"
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
