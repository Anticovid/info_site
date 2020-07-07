import React, {useEffect, useState,useContext} from "react";
import { Col, Form, FormGroup, Input, Button } from 'reactstrap';
import {Redirect} from 'react-router-dom';
import firebase from "../firebase";
import {Moderator} from "./ModeratorContext";

const adminInit = {
  email: '',
  password: '',
}

const ModeratorAuth = () => {

  const [admin,setAdmin] = useState(adminInit);
  const [redirect,setRedirect] = useState(false);
  const ModeratorContext = useContext(Moderator);

  useEffect(() => {
    setRedirect(ModeratorContext.isAuth.role)
    ModeratorContext.isAuth.role === false && alert("У вас нет доступа")
  },[ModeratorContext.isAuth.role]);

  const formSubmit = e => {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(admin.email, admin.password)
      .catch(e => {
        if(e.code === 'auth/user-not-found') alert('Такого пользователя не существует');
        else if(e.code === 'auth/wrong-password') alert('Неправильный пароль');
        else alert("Произошла ошибка! Мы ее уже исправляем");
      })
  }

  if(redirect) return <Redirect to={'/moderator'}/>

  return (
    <Col md={12} className="mt-5">
      <Form className="border pl-3 pr-3 pt-4 pb-4" onSubmit={formSubmit}>
        <p className="text-center h3 mb-4">
          Войти как модератор
        </p>
        <FormGroup>
          <Input
            required
            placeholder={"Введите электронную почту"}
            value={admin.email} onChange={e => setAdmin({...admin, email: e.target.value})} type={"email"}/>
        </FormGroup>
        <FormGroup>
          <Input
            required
            placeholder={"Введите пароль"}
            value={admin.password} onChange={e => setAdmin({...admin, password: e.target.value})} type={"password"}/>
        </FormGroup>
        <Button block>Войти</Button>
      </Form>
    </Col>
  )
}

export default ModeratorAuth;
