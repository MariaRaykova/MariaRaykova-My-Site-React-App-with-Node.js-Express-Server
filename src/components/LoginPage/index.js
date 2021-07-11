import ButtonLight from '../ButtonLight'
import './index.scss'

const LoginPage = ({history}) => {

  const onLoginSubmitHandler = (e) => {
    e.preventDefault();

    const username = e.target.username.value
    const password = e.target.password.value
    fetch('http://localhost:9999/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ //зависи как е настроено АПИ-то
        username,
        password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      const authToken = res.headers.get('Authorization')
      document.cookie = `x-auth-token=${authToken}` 
      console.log(authToken);
      return res.json()
    }).then(()=> {
      history.push('/')
    })
  }
  return (
    <main>
      <section className="login">
        <form onSubmit={onLoginSubmitHandler}>
          <fieldset>
            <legend>Login</legend>
            <p className="form_instructions">Please enter your e-mail and password:</p>
            <p className="field">
              <label htmlFor="username">Username</label>
              <span className="input">
                <input type="text" name="username" id="username" placeholder="Username" />
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
  )
}
export default LoginPage