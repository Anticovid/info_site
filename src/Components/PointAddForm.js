import React, {useState, useContext, useEffect} from 'react';
import { Col, Form, FormGroup, Input, Button, Label, Badge  } from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';
import firebase from '../firebase';
import AuthContext from "./Context";

const dataInit = {
  countOfPlace: 0,
  phoneNumber: '',
  address: '',
  dateOfUpdate: '',
  type: 'Легкий'
}

const PointAddForm = ({customData = dataInit, changeData = false, push = false}) => {

  const [data, setData] = useState(dataInit);
  let [places,setPlaces] = useState([]);
  const Context = useContext(AuthContext);

  useEffect(() => {
    if(customData.point) {
      setData(customData.point);
    }else {
      setData(customData);
    }
  },[customData]);

  const getData = () => {
    firebase.firestore().collection("points").get().then(function(querySnapshot) {
      places = querySnapshot.docs.map(item => item.data());
      places = places.map(item => item.address);

      localStorage.setItem('bosh-tizme-lifetime', JSON.stringify({
        places,
        expires_in: new Date().getTime() + (1 * 60 * 60 * 1000)
      }))

      setPlaces(places);
    })
  }

  useEffect(() => {
    if(localStorage.getItem('bosh-tizme-lifetime')) {
      const data = JSON.parse(localStorage.getItem('bosh-tizme-lifetime'));
      if(new Date(data.expires_in).getTime() >= new Date().getTime()) {
        getData();
      }else {
        setPlaces(data.places);
      }
    }else {
      getData();
    }

  },[]);

  const addId = () => {
    if(customData.pointId) return customData.pointId;
    else if(window.location.pathname === '/admin') return Context.isAuth.id;
    else uuidv4();
  };

  const formSubmit = e => {

    e.preventDefault();
    data.dateOfUpdate = Date.now();
    data.moderation === undefined && (data.moderation = false);
    setData({...data});
    const doc = firebase.firestore()
      .collection('points')
      .doc(addId());

      doc.set(data).then(() => {
        data.moderation === true ? alert("Успешно обновлено") : alert("Ожидайте проверку модератора");
        if(push) push({
          point: data,
          pointId: doc.id,
        })
      })
      .catch(e => alert("Произошла ошибка! Мы ее уже исправляем"))
  }

  const IsModeret = () => {
    if(data.moderation !== undefined) {
      return data.moderation === true ? <Badge color="success" className={"mt-3"}>Проверено</Badge> : <Badge color="secondary" className={"mt-3"}>Находиться на рассмотрении</Badge>;
    }
    return null;
  }

  return (
    <Col md={12}>
      <p className="h2 mt-3 mb-3">Добавить пункт</p>
      <Form onSubmit={formSubmit}>
        <FormGroup>
          <Label htmlFor="how-many" className="form-label">Сколько может принимать ваш пункт на данный момент?</Label>
          <Input required onChange={e => setData({ ...data, countOfPlace: e.target.value })} value={data.countOfPlace} type="number" id="how-many" placeholder="Введите число" />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="phone-number" className="form-label">Служебный номер пункта</Label>
          <Input required onChange={e => setData({ ...data, phoneNumber: e.target.value })} value={data.phoneNumber} type="number" id="phone-number" placeholder="Введите номер телефона" />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="phone-number" className="form-label">Тип принимаемых пациентов</Label>
          <select value={data.type} onChange={e => setData({...data, type: e.target.value})} className="form-control">
            <option>Лёгкий</option>
            <option>Среднетяжелый</option>
            <option>Тяжёлый</option>
            <option>Крайне тяжёлый</option>
          </select>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="address" className="form-label">Зафиксированный адрес пункта</Label>
          <Input list="wizards-list" required onChange={e => setData({ ...data, address: e.target.value })} value={data.address} type="text" id="address" placeholder="Введите адрес вашего пункта" />
          <datalist id="wizards-list">
            {places && places.length ? places.map((item,idx) => (<option key={idx}>{item}</option>)) : null}
          </datalist>
          {IsModeret()}
        </FormGroup>
        <Button block>{data.moderation === undefined ? "Добавить" : "Изменить"}</Button>
      </Form>
    </Col>
  )
}

export default PointAddForm;
