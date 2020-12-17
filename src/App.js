import './App.css';
import 'antd/dist/antd.css'
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./component/Home/Home"
import Register from './component/Register/Register';
import Contact from './component/user/user';
import Login from './component/Login/Login';
import { useEffect, useState } from 'react';
import Add from './component/Add/Add'


function App() {
  const [role, setrole] = useState("guest");

  useEffect(() => {
    const a = localStorage.getItem('token')
    if (a) setrole("user");
    else setrole("guest");
  }, [])

  return (
    <div className="App">
      <Switch>
        <Route path="/home" exact>
          <Home role={role} setrole={setrole} />
        </Route>

        <Route path="/add" exact>
          <Add role={role} setrole={setrole} />
        </Route>

        <Route path="/user" exact>
          <Contact role={role} setrole={setrole} />
        </Route>

        <Route path="/register" exact>
          <Register role={role} setrole={setrole} />
        </Route>

        <Route path="/login" exact>
          <Login role={role} setrole={setrole} />
        </Route>

        <Redirect to="/home" />
      </Switch>
    </div>
  );
}

export default App;
