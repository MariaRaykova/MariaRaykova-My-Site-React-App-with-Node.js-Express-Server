import ButtonLight from '../ButtonLight'
import './index.scss'

const RegisterPage = ({history}) => {
    const onRegisterSubmitHandler = (e) => {
        e.preventDefault()
        const username = e.target.username.value
        const password = e.target.password.value
        const rePassword = e.target.rePassword.value

        if (password === rePassword) {
            fetch('http://localhost:9999/api/user/register', {
                method: 'POST',
                body: JSON.stringify({ //зависи как е настроено АПИ-то
                    username,
                    password
                }),
                headers: {
                    'Content-Type': 'application/json'
                }})
                .then(promise => { //fetch-a връща promise...
                    const authToken = promise.headers.get('Authorization')
                    document.cookie = `x-auth-token=${authToken}` //записваме токен-а от хедъра в самото cookie 
                    return promise.json()
                }).then(() => {
                    history.push('/login')
                })
                // .then(res => this.setState({ pets: res }))
                // .catch(err => console.log(err))
    
        }
    }

    return (

        <main>
            <section className="register">
                <form onSubmit={onRegisterSubmitHandler}>
                    <fieldset>
                        <legend>Register</legend>
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
                        <p className="field">
                            <label htmlFor="rePassword">Repeat Password</label>
                            <span className="input">
                                <input type="text" name="rePassword" id="rePassword" placeholder="Password" />
                                <span className="actions"></span>
                            </span>
                        </p>

                        <input className="btn btn-pink" type="submit" className="submit" value="Register" />
                    </fieldset>
                </form>
            </section>
        </main>
    )
}
export default RegisterPage