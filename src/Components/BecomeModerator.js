import React, {useState} from 'react';
import {Form,Input,Label,Col,FormGroup,Button} from 'reactstrap';
import firebase from '../firebase';

const BecomeModerator = () => {

  const [user,setUser] = useState('');

  const formSubmit = e => {
    e.preventDefault();
    const addAdminRole = firebase.functions().httpsCallable('addAdminRole');
    addAdminRole({email: user})
      .then(res => alert("Модератор успешно добавлен"))
      .catch(e => alert("Произошла ошибка! Мы над ней уже работаем!"))
  }

  return (
    <Col className={"mt-5"}>
      <Form onSubmit={formSubmit}>
        <FormGroup>
          <Label htmlFor="email">Введите электронную почту</Label>
          <Input value={user} onChange={e => setUser(e.target.value)} required type="email"/>
        </FormGroup>
        <Button block type="submit">Сделать модератором</Button>
      </Form>
    </Col>
  )
}

export default BecomeModerator;
