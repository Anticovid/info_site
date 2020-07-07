import React, { useState, useEffect,useContext } from 'react';
import { Link,Redirect } from 'react-router-dom';
import { Col, Form, FormGroup, Input, Button } from 'reactstrap';
import firebase from '../firebase';
import AuthContext from "./Context";

const userInit = {
  email: "",
  password: ""
}

const MultiForm = (props) => {

  const [path, setPath] = useState('');
  const [user,setUser] = useState(userInit);
  const [isAuth,setIsAuth] = useState(false);
  const Context = useContext(AuthContext);

  useEffect(() => {
    Context.isAuth.isAuth && setIsAuth(true)
  },[Context.isAuth.isAuth]);

  useEffect(() => {
    setPath(props.location.pathname);
    setUser(userInit)
  }, [props.location.pathname]);

  const formSubmit = e => {
    e.preventDefault();
    if(path === '/register') {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .catch(e => {
          if(e.code === 'auth/email-already-in-use') {
            alert("Пользователь уже существует")
            return
          }
          alert("Произошла ошибка! Мы ее уже исправляем")
        })
        .then(() => setIsAuth(true))
    }else {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .catch(e => {
          if(e.code === 'auth/user-not-found') alert('Такого пользователя не существует');
          else if(e.code === 'auth/wrong-password') alert('Неправильный пароль');
          else alert("Произошла ошибка! Мы ее уже исправляем")
        })
    }
  }

  if(isAuth) return <Redirect to="/admin"/>

  return (
    <Col md={12} className="mt-5">
      <Form className="border pl-3 pr-3 pt-4 pb-4" onSubmit={formSubmit}>
        <p className="text-center h3 mb-4">{path === '/login' ? "Войти" : "Регистрация"}</p>
        <FormGroup className="mb-4">
          <Input required onChange={e => setUser({...user, email: e.target.value})} value={user.email} type="email" placeholder="Электронная почта" />
        </FormGroup>
        <FormGroup className="mb-4">
          <Input required onChange={e => setUser({...user, password: e.target.value})} value={user.password} type="password" placeholder="Пароль" />
        </FormGroup>
        <Button block type="submit">
          {path === '/login' ? "Войти" : "Региcтрация"}
        </Button>
        <Link
          to={path === '/login' ? '/register' : '/login'}
          className="mt-3 d-inline-block">
          {path === '/login' ? "Если у вас нет аккаунта" : "Если у вас есть аккаунт"}
        </Link>
      </Form>
    </Col>
  )
}

export default MultiForm;
