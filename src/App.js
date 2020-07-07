import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container, Row } from 'reactstrap';
import Header from './Components/Header';
import MultiForm from './Components/Form';
import AdminPanel from './Components/Admin';
import AuthWrapper from "./Components/AuthContext";
import ModeratorAuth from "./Components/ModeratorAuth";
import ModeratorWrapper from "./Components/ModeratorContext";
import Moderator from "./Components/Moderator";
import Main from './Components/Main';
import BecomeModerator from "./Components/BecomeModerator";
import AddPointByModeratorWrap from './Components/AddPointByModerator';


function App() {
  return (
    <BrowserRouter>
      <ModeratorWrapper>
      <AuthWrapper>
        <Header />
        <Container>
          <Row>
            <AddPointByModeratorWrap>
              <Switch>
                <Route exact path='/' component={Main}/>
                <Route exact path={['/login','/register']} component={MultiForm} />
                <Route exact path="/admin" component={AdminPanel}/>
                <Route exact path="/moderator-auth" component={ModeratorAuth}/>
                <Route exact path="/moderator" component={Moderator}/>

              </Switch>
            </AddPointByModeratorWrap>
          </Row>
        </Container>
      </AuthWrapper>
      </ModeratorWrapper>
    </BrowserRouter>
  );
}

export default App;
