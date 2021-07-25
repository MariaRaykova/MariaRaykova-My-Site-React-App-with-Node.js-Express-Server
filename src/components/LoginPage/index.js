import { useContext, useState} from 'react'
import AuthContext from '../../contexts/AuthContext';
import ButtonLight from '../ButtonLight'
import './index.scss'
import {logInHandler} from '../../utils/submitHandler'
import { useHistory, Redirect } from 'react-router-dom';
import PageWrapper from '../PageWrapper'

const LoginPage = () => {
  const context = useContext(AuthContext);
  const history = useHistory();
 
  const onLoginSubmitHandler = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    logInHandler({ email, password }).then((data) => {
      context.logIn(data);
      history.push("/");
    });
  };

  return (
 
    <PageWrapper>
    <main>
      <section className="login">
        <form onSubmit={onLoginSubmitHandler}>
          <fieldset>
            <legend>Login</legend>
            <p className="form_instructions">Please enter your e-mail and password:</p>
            <p className="field">
              <label htmlFor="email">Email</label>
              <span className="input">
                <input type="text" name="email" id="email" placeholder="email" />
                <span className="actions"></span>
              </span>
            </p>
            <p className="field">
              <label htmlFor="password">Password</label>
              <span className="input">
                <input type="text" name="password" id="password" placeholder="Password" />
                <span className="actions"></span>
              </span>
            </p>
            <a href="#" className="login_forgot-link link" data-action="display-recover-form">Forgot your password?</a>
            <input className="btn btn-pink" type="submit" className="submit" value="Login" />
            <p className="login_register-link">Don't have an account? <a className="link link--secondary" href="/account/register">Register</a></p>
          </fieldset>

        </form>
      </section>

    </main>
    </PageWrapper>
  )
}
export default LoginPage