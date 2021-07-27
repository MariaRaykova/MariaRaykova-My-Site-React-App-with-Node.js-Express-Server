import './index.scss'
import { useContext } from 'react'
import AuthContext from '../../../contexts/AuthContext';
import { registerHandler } from '../../../utils/submitHandler'
import { useHistory } from 'react-router-dom';
import PageWrapper from '../../PageWrapper';

const RegisterPage = () => {

    const history = useHistory();
    const context = useContext(AuthContext)

    const onRegisterSubmitHandler = (e) => {
        e.preventDefault()
        const name = e.target.name.value
        const email = e.target.name.value
        const password = e.target.password.value
        const rePassword = e.target.rePassword.value
        
        if (password === rePassword) {
            registerHandler({ name, email, password }).then(() => {
              history.push("/login");
            });
          }
    }

    return (
<PageWrapper>
        <main>
            <section className="register">
                <form onSubmit={onRegisterSubmitHandler}>
                    <fieldset>
                        <legend>Register</legend>
                        <p className="form_instructions">Please enter your e-mail and password:</p>
                        <p className="field">
                            <label htmlFor="name">Name</label>
                            <span className="input">
                                <input type="text" name="name" id="name" placeholder="Name" />
                                <span className="actions"></span>
                            </span>
                        </p>
                        <p className="field">
                            <label htmlFor="email">Email</label>
                            <span className="input">
                                <input type="text" name="email" id="email" placeholder="Email" />
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
                        <p className="field">
                            <label htmlFor="rePassword">Repeat Password</label>
                            <span className="input">
                                <input type="text" name="rePassword" id="rePassword" placeholder="Repeat Password" />
                                <span className="actions"></span>
                            </span>
                        </p>

                        <input className="btn btn-pink" type="submit" className="submit" value="Register" />
                    </fieldset>
                </form>
            </section>
        </main>
        </PageWrapper>
    )
}
export default RegisterPage