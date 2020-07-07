import React,{useState,useEffect,createContext} from 'react';
import firebase from "../firebase";

export const Moderator = createContext({role: undefined})

const ModeratorWrapper = (props) => {

  const [auth,setAuth] = useState({role: undefined});

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        user.getIdTokenResult().then(idTokenResult => {
          if(idTokenResult.claims.moderator) {
            setAuth({role: idTokenResult.claims.moderator})
          }else {
            setAuth({role: false})
          }
        })
      }
    })
  },[]);

  return (
    <Moderator.Provider value={{isAuth: auth, setAuth }}>
      {props.children}
    </Moderator.Provider>
  )
};

export default ModeratorWrapper;
