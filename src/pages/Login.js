import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import actionSaveUserEmail from '../actions';
import './Login.css';

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
      <div className="login-container">
        <label
          htmlFor="user-email-input"
        >
          E-mail:
          <input
            data-testid="email-input"
            type="text"
            name="email"
            onChange={ handleChange }
          />
        </label>
        <label
          htmlFor="user-password-input"
        >
          Password:
          <input
            data-testid="password-input"
            type="password"
            name="password"
            onChange={ handleChange }
          />
        </label>
        <button
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
