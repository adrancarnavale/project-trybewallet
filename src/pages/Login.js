import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import actionSaveUserEmail from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isButtonDisabled: true,
    };
  }

  emailValidation = (email) => {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (email.match(regex)) return true;
    return false;
  }

  passwordValidation = (password) => {
    const MINIMAL_LENGTH_REQUIRED = 6;
    if (password.split('').length >= MINIMAL_LENGTH_REQUIRED) return true;
    return false;
  };

  verifyButtonDisablement = () => {
    const { email, password } = this.state;
    const { emailValidation, passwordValidation } = this;
    if (emailValidation(email) && passwordValidation(password)) {
      this.setState({ isButtonDisabled: false });
    } else {
      this.setState({ isButtonDisabled: true });
    }
  };

  handleChange = ({ target }) => {
    const { value, name } = target;
    const { verifyButtonDisablement } = this;
    this.setState({ [name]: value }, () => verifyButtonDisablement());
  };

  handleClick = () => {
    const { email } = this.state;
    const { saveUserEmail, history } = this.props;
    saveUserEmail(email);
    this.setState({ password: '' }, () => history.push('/carteira'));
  };

  render() {
    const { handleChange, handleClick } = this;
    const { isButtonDisabled } = this.state;
    return (
      <div className="flex flex-col items-center">
        <h1 className="text-7xl mt-10 text-white bg-green-700 px-20 py-10 rounded-lg">
          TRYBE
          <spam className="text-7xl text-black">WALLET</spam>
        </h1>
        <label className="mt-10 ml-4" htmlFor="user-email-input">Email:</label>
        <input
          className="mt-1 ml-4 flex w-3/5 px-3 py-2 bg-white border border-slate-300
            rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-green-500
            focus:ring-1 focus:ring-green-500"
          data-testid="email-input"
          placeholder="Insert your E-mail here"
          type="text"
          name="email"
          onChange={handleChange}
        />
        <label className="mt-5 ml-4" htmlFor="user-password-input">Password:</label>
        <input
          className="mt-1 ml-4 flex w-3/5 px-3 py-2 bg-white border border-slate-300
            rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-green-500
            focus:ring-1 focus:ring-green-500"
          data-testid="password-input"
          placeholder="Insert your password here"
          type="password"
          name="password"
          onChange={handleChange}
        />
        <button
          className="mt-5 bg-green-500 w-20 mx-auto py-1 rounded-md
            text-white shadow-md shadow-grey-500 hover:shadow-xl hover:shadow-grey-500
              hover:bg-green-600"
          disabled={ isButtonDisabled }
          onClick={ handleClick }
          type="button"
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveUserEmail: (email) => dispatch(actionSaveUserEmail(email)),
});

Login.propTypes = {
  saveUserEmail: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(connect(null, mapDispatchToProps)(Login));
