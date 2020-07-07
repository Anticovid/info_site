import React, { useState,useContext } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import firebase from "../firebase";
import AuthContext from './Context';
import {Moderator} from "./ModeratorContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const Context = useContext(AuthContext);
  const ModeratorContext = useContext(Moderator);

  const signOut = () => {
    Context.setAuth({isAuth: false,id: undefined})
    ModeratorContext.setAuth({role: false})
    firebase.auth().signOut()
  }


  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand tag="div" >
          <Link to="/" className={"text-dark"}>
            Anticovid
          </Link>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {!Context.isAuth.isAuth ? (
              <>
                <NavItem>
                  <NavLink tag="div">
                    <Link to="/login" className={"text-dark"}>Войти</Link>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag="div">
                    <Link to="/register" className={"text-dark"}>Регистрация</Link>
                  </NavLink>
                </NavItem>
              </>
            ) : (
              <NavItem>
                <NavLink tag="div">
                  <Link to="/admin" className={"text-dark"}>Мой пункт</Link>
                </NavLink>
              </NavItem>
            )}

            {ModeratorContext.isAuth.role && (
              <NavItem>
                <NavLink tag="div">
                  <Link to="/moderator" className={"text-dark"}>Модерация</Link>
                </NavLink>
              </NavItem>
            )}

            {Context.isAuth.isAuth && (
              <NavItem onClick={signOut}>
                <NavLink tag="div">
                  <Link to="/" className={"text-dark"}>Выйти</Link>
                </NavLink>
              </NavItem>
            )}

          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
