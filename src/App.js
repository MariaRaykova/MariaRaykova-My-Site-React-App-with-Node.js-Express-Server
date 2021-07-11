import { Route, Switch } from 'react-router-dom'
import './App.scss';
import Header from './components/Header'
import Footer from './components/Footer'

import Aside from './components/Aside'
import Item from './components/Item'
import Main from './components/Main'
// import Categories from './components/Categories'
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import CreateItem from './components/CreateItem';

import AuthContext from './contexts/AuthContext';

function App(props) {
  return (
   <body>
                 <AuthContext.Provider value={{}}>
 {props.children}

      <Header />
      <div className="content-container content-limiter">
      <Switch>
        <Route path="/" exact component={ Main } />
        <Route path="/item" exact component={ Item } />
        <Route path="/item/create" component={ CreateItem } />
        <Route path="/login" component={ LoginPage } />
        <Route path="/register" component={ RegisterPage } />
      </Switch>
      {/* <Main /> */}
      {/* <Item /> */}
      {/* <LoginPage/> */}
      <Aside />
      </div>
    

      <Footer />
      </AuthContext.Provider>
      </body>
  );
}
export default App;