import AuthContext from "../contexts/AuthContext";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
//пo принцип ако използваме на ниво Router в props имаме history, но ако не ще покажем този вариант

const isAuth = (CurrentComponent) => {
  //това е функция, която ще wrap-не един компонент с друг и ще го върне и външния ще подаде на вътрешния нещо през пропс. Тук подаваме единия компонент

  const NewComponent = (props) => {
    const { user } = useContext(AuthContext);
    const history = useHistory();
    if (!user) {
      //така няма да стане защото и празен обект пак няма да го хване
      history.push("/login");
      return null; //защото history push не спира изпълнението на компонента, null e валиден компонент, няма да покаже нищо на екрана
    }
    return <CurrentComponent {...props} />;
  };
  return NewComponent; //създаваме новия компонент и го return-ваме от hoc функцията
};
export default isAuth;
