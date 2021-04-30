import React, {Component} from 'react';
import './App.css';
import Login from './components/Auth/Login';
import CareIndex from './components/Care/CareIndex';
import Register from './components/Auth/Register'
import Navigation from './components/Navigation/Navigation';
import CreateInfant from './components/Infants/CreateInfant';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


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
    return (localStorage.getItem('token')) ? <><Navigation/><CreateInfant token={localStorage.getItem('token')}/> </>: (<Login updateSessionToken={this.updateSessionToken} />)
  }
  //use localStorage.getItem('token')  - if I can't hunt this down

  careIndexView = () => {
    return (localStorage.getItem('token')) ? <><Navigation/><CareIndex  token={localStorage.getItem('token')}/> </>: (<Login updateSessionToken={this.updateSessionToken} />)
  }

  registerView = () => {
    return (<Register />)
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
              <Route path='/register' component={this.registerView} />
            </Switch>
          </Router>
          <footer></footer>
        </div>
      );
    }


}
 

export default App;