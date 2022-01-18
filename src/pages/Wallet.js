import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import WalletHeader from '../Components/WalletHeader';
import WalletForm from '../Components/WalletForm';
import WalletChart from '../Components/WalletChart';
import WalletEditForm from '../Components/WalletEditForm';

class Wallet extends React.Component {
  render() {
    const { stateInfoId, stateInfoClicked } = this.props;
    const mainComponent = (
      <div>
        <WalletHeader />
        <WalletForm />
        <WalletChart />
      </div>
    );
    const auxComponent = (
      <div>
        <WalletHeader />
        <WalletEditForm position={ stateInfoId } />
      </div>
    );
    return (
      <div>
        {
          stateInfoClicked
            ? auxComponent
            : mainComponent
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  stateInfoId: state.user.id,
  stateInfoClicked: state.user.isClicked,
});

Wallet.propTypes = {
  stateInfoId: PropTypes.number.isRequired,
  stateInfoClicked: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, null)(Wallet);
