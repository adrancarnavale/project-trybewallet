import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

class WalletHeader extends Component {
  render() {
    const { userEmail, totalExpenses } = this.props;
    return (
      <div>
        <p
          data-testid="email-field"
        >
          E-mail:
          {userEmail}
        </p>
        <p
          data-testid="total-field"
        >
          Despesa Total:
          { totalExpenses }
        </p>
        <p
          data-testid="header-currency-field"
        >
          Moeda Utilizada: BRL
        </p>
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
