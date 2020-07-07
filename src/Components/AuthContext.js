import React,{useState,useEffect} from 'react';
import firebase from "../firebase";
import AuthContext from './Context';

const AuthWrapper = (props) => {

  const [auth,setAuth] = useState({isAuth: false,id: undefined});

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        setAuth({isAuth: true, id: user.uid});
      }
    })
  },[]);

  return (
    <AuthContext.Provider value={{isAuth: auth, setAuth }}>
      {props.children}
    </AuthContext.Provider>
  )
};

export default AuthWrapper;
