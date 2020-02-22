import React, {Fragment} from 'react';
import {Container, Nav, Navbar, NavbarBrand, NavItem, NavLink} from "reactstrap";
import {NavLink as RouterNavLink, Route, Switch} from 'react-router-dom';
import News from "./containers/News";
import NewPost from "./containers/NewPost";
import SinglePost from "./containers/SinglePost";
function App() {
  return (
    <Fragment>
      <Navbar color="light" light >
        <NavbarBrand tag={RouterNavLink} to='/'>News</NavbarBrand>
          <Nav className="float-right" navbar>
            <NavItem>
              <NavLink tag={RouterNavLink} to='/news/new'>Add new post</NavLink>
            </NavItem>
          </Nav>
      </Navbar>
      <Container>
        <Switch>
          <Route path='/' exact component={News}/>
          <Route path='/news/new' component={NewPost}/>
          <Route path='/news/:id' component={SinglePost}/>
        </Switch>
      </Container>
    </Fragment>
  );
}

export default App;
