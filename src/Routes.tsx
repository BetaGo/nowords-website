import React from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import styled from "styled-components";
import PrivateRoute from "./components/PrivateRoute";

import { Header, TabBar } from "./components/shell";
import Login from "./pages/user/Login";
import SignUp from "./pages/user/SignUp";
import Memorize from "./pages/words/Memorize/Memorize";
import MyWords from "./pages/words/MyWords/MyWords";

const FlexContent = styled.div`
  display: flex;
  flex: 1;
  overflow: auto;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
`;

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/user/login" exact component={Login} />
        <Route path="/user/signup" component={SignUp} />
        <PrivateRoute path="/">
          <Container>
            <Header />
            <Route path="/words">
              <FlexContent>
                <Switch>
                  <Route path="/words/memorize" component={Memorize}></Route>
                  <Route path="/words/my-words" component={MyWords}></Route>
                  <Route path="/words/statistics">statistics</Route>
                  <Redirect to="/words/memorize" />
                </Switch>
              </FlexContent>
              <TabBar />
            </Route>
          </Container>
        </PrivateRoute>
      </Switch>
    </Router>
  );
};

export default Routes;
