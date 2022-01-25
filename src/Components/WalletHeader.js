import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

class WalletHeader extends Component {
  render() {
    const { userEmail, totalExpenses } = this.props;
    const myClass = "text-xl text-white";
    const spamClass = "mr-1 text-lightgreen";
    return (
      <div className="w-full bg-trybe flex flex-col items-center py-4 px-3">
        <div className={myClass}>
          <p
            data-testid="email-field"
          >
            <spam className={ spamClass }>
              E-mail:
            </spam>
            {userEmail}
          </p>
        </div>
        <div className={ myClass }>
          <p
            data-testid="total-field"
          >
            <spam className={ spamClass }>
              Despesa Total:
            </spam>
            { totalExpenses }
          </p>
        </div>
        <div className={ myClass }>
          <p
            data-testid="header-currency-field"
          >
            <spam className={ spamClass }>
              Moeda Utilizada:
            </spam>
            BRL
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  totalExpenses: state.wallet.totalExpenses,
});

WalletHeader.propTypes = {
  userEmail: PropTypes.string.isRequired,
  totalExpenses: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(WalletHeader);
