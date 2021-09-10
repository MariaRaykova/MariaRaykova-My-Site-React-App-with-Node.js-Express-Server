import { useContext, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import "./index.scss";
import AuthContext from "../../../contexts/AuthContext";
import PageWrapper from "../../PageWrapper";
import { logInHandler } from "../../../utils/submitHandler";

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
              <p className="form_instructions">
                Please enter your e-mail and password:
              </p>
              <p className="field">
                <label htmlFor="email">Email</label>
                <span className="input">
                  <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="email"
                  />
                  <span className="actions"></span>
                </span>
              </p>
              <p className="field">
                <label htmlFor="password">Password</label>
                <span className="input">
                  <input
                    type="text"
                    name="password"
                    id="password"
                    placeholder="Password"
                  />
                  <span className="actions"></span>
                </span>
              </p>
              <Link
                href="#"
                className="login_forgot-link link"
                data-action="display-recover-form"
              >
                Forgot your password?
              </Link>
              <input
                className="btn btn-pink"
                type="submit"
                className="submit"
                value="Login"
              />
              <p className="login_register-link">
                Don't have an account?{" "}
                <Link className="link link--secondary" href="/account/register">
                  Register
                </Link>
              </p>
            </fieldset>
          </form>
        </section>
      </main>
    </PageWrapper>
  );
};
export default LoginPage;
