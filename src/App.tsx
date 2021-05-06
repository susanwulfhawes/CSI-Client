import React, {Component} from 'react';
import './App.css';
import Login from './components/Auth/Login';
import CareIndex from './components/Care/CareIndex';
import Register from './components/Auth/Register'
import Navigation from './components/Navigation/Navigation';
import CreateInfant from './components/Infants/CreateInfant';
import InfantIndex from './components/Infants/InfantIndex'
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import RoleUsers from './components/Auth/RoleUsers';


type LoginState = {
  isLoggedIn: boolean,
  sessionToken: string | any
};

class App extends Component<{}, LoginState> {
         constructor(props: {}) {
           super(props);
           this.state = {
            isLoggedIn: false,
            sessionToken: ''
         }
}

  isLoggedId = () => {
    if (localStorage.getItem('token')){
      this.setState(
        {isLoggedIn: true}
      )
      }
  };

  updateSessionToken = (newToken: string) => {
    localStorage.setItem("token", newToken);
    this.setState({ sessionToken: newToken });
    console.log(`Token: ${newToken}`);
  };

  clearToken =() => {
    localStorage.clear();
    this.setState({sessionToken: ''});
  }

  // protectViews = () => {
  //   console.log(this.updateSessionToken);
  //   return <Login updateSessionToken={this.updateSessionToken} />
  // }

  homeView = () => {
    return (localStorage.getItem('token')) ? <><Navigation/><CareIndex  token={localStorage.getItem('token')}/> </>: (<Login updateSessionToken={this.updateSessionToken} />)
  };

  // createInfantView = () => {
  //   console.log(this.state.sessionToken)
  //   return (localStorage.getItem('token')) ? <><Navigation/><CreateInfant token={this.state.sessionToken}/> </>: (<Login updateSessionToken={this.updateSessionToken} />)
  // }
  createInfantView = () => {
    console.log(this.state.sessionToken)
    return (localStorage.getItem('token')) ? <><Navigation/><InfantIndex token={localStorage.getItem('token')}/> </>: (<Login updateSessionToken={this.updateSessionToken} />)
  }
  //use localStorage.getItem('token')  - if I can't hunt this down

  careIndexView = () => {
    return (localStorage.getItem('token')) ? <><Navigation/><CareIndex  token={localStorage.getItem('token')}/> </>: (<Login updateSessionToken={this.updateSessionToken} />)
  }

  registerView = () => {
    return (<Register />)
  }

  createUserRoleView = () => {
    return (localStorage.getItem('token')) ? <><Navigation/><RoleUsers token={localStorage.getItem('token')}/> </>: (<Login updateSessionToken={this.updateSessionToken} />)
  }

    render(){
      return (
        <div>
          <Router>
            {/* <Navigation clickLogout={clearToken} /> */}
            <Switch>
              <Route exact path="/" component={this.homeView} />
              <Route path="/createinfant" component={this.createInfantView} /> 
              <Route path="/careindex" component={this.careIndexView} />
              <Route path="/roleusers" component={this.createUserRoleView} />
              <Route path='/register' component={this.registerView} />
            </Switch>
          </Router>
          <Footer />
        </div>
      );
    }


}
 

export default App;