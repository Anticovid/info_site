import React, { useEffect, useState,useContext } from 'react';
import { Redirect } from 'react-router-dom';
import firebase from '../firebase';
import AuthContext from "./Context";
import PointAddForm from './PointAddForm';

const dataInit = {
  countOfPlace: 0,
  phoneNumber: '',
  address: '',
  dateOfUpdate: '',
  type: 'Легкий'
}

const AdminPanel = () => {

  const [auth,setAuth] = useState(false);
  const [data, setData] = useState(dataInit);
  const Context = useContext(AuthContext);

  useEffect(() => {
    !Context.isAuth.isAuth && setAuth(true);
  },[Context.isAuth.isAuth])

  useEffect(() => {
    if(Context.isAuth.id) {
      firebase.firestore().collection('points').doc(Context.isAuth.id).get()
        .then(e => setData(e.data() ? e.data() : dataInit))
        .catch(e => console.error(e))
    }
  }, []);

  if (auth) return <Redirect to="/login" />

  return <PointAddForm customData={data}/>
}

export default AdminPanel;
