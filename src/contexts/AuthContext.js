import React from 'react'
const AuthContext = React.createContext({
    loggedIn: false,
    user: null,
    // logIn: () => {},
    // logOut: () => {}
})
 
export default AuthContext
