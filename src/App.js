import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.scss";
import AuthContext from "./contexts/AuthContext";
import { isAuthenticated } from "./utils/auth";
import { getVerifiedUser } from "./utils/verifyUser";
// import { setAdmin } from "./utils/seed"

function App(props) {
  // setAdmin();
  const history = useHistory();
  const [userObject, setUserObject] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(true);

  const logInFunc = (user) => {
    setUserObject(user);
    setIsLogged(true);
  };
  const logOutFunc = () => {
    setIsLogged(false);
    setUserObject(null);
    window.localStorage.clear();
  };

  useEffect(() => {
    if (!isAuthenticated()) {
      setLoading(false);
      logOutFunc();
      return;
    }
    getVerifiedUser().then((response) => {
      if (response.user) {
        logInFunc(response.user);
      } else {
        logOutFunc();
        history.push("/");
      }
         //като приключи рекуеста сетваме флага на false
        setLoading(false);
    });
 
  }, []);

  if (loading) {
    return <div>Loading....</div>;
  }

  return (
    <div>
      <AuthContext.Provider
        value={{
          user: userObject,
          isLogged,
          logIn: logInFunc,
          logOut: logOutFunc
        }}
      >
          {props.children}
      </AuthContext.Provider>
    </div>
  );
}
export default App;
