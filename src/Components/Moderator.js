import React, {useEffect, useState,useContext} from "react";
import {Col} from 'reactstrap';
import {Redirect} from 'react-router-dom';
import firebase from '../firebase';
import ModeratorCard from "./ModeratorCard";
import {Moderator} from './ModeratorContext';
import {AddPointByModeratorContext} from './AddPointByModerator';
import ModeratorModal from "./Modals";
import plus from "../assets/plus.png";

const ModeratorPage = () => {

  let [places,setPlaces] = useState([]);
  const [redirect,setRedirect] = useState(undefined);
  const [modal,setModal] = useState(false);
  const Context = useContext(Moderator);
  const PointContext = useContext(AddPointByModeratorContext);

  useEffect(() => {
    if(Context.isAuth.role) {
      firebase.firestore().collection("points").get().then(function(querySnapshot) {
        places = querySnapshot.docs.map(item => ({
          point: item.data(),
          pointId: item.id
        }));
        setPlaces(places);
      });
    }
  },[]);

  useEffect(() => {
    !Context.isAuth.role && setRedirect(true)
  },[Context.isAuth.role])

  const pushItem = data => {
    places.push(data);
    setPlaces([...places])
  }

  const removeItem = index => {
    places.splice(index,1);
    setPlaces([...places]);
  };

  const changeModer = index => {
    places[index].point.moderation = true;
    setPlaces([...places]);
  }

  const showModalInCard = index => {
    setModal(!modal);
    PointContext.setPoint(places[index])
  }

  const openModal = () => {
    PointContext.setPoint({});
    setModal(!modal)
  }

  if(redirect) return <Redirect to="/moderator-auth"/>

  return (
    <>
    <Col className="mt-5">
      {places && places.length ? places.map((item,idx) => {
        return <ModeratorCard key={idx}
                              {...item.point}
                              id={item.pointId}
                              index={idx}
                              showModal={showModalInCard}
                              changeModer={changeModer} removeItem={removeItem}/>
      }) : <p className="text-center h5">Загрузка</p>}
    </Col>
      <div onClick={() => setModal(!modal)} className="position-fixed d-flex justify-content-center align-items-center to-top-button rounded-circle shadow">
        <img src={plus} alt="plus icon" style={{width: '20px'}}/>
      </div>
      <ModeratorModal push={pushItem} modal={modal} setModal={openModal}/>
    </>
  )
};

export default ModeratorPage;
