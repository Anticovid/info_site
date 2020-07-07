import React, {useEffect, useState} from "react";
import { Button, Card, CardTitle, Col} from 'reactstrap';
import firebase from "../firebase";

const Main = () => {

  let [data,setData] = useState([]);

  useEffect(() => {
    firebase.firestore().collection("points").where("moderation", "==", true)
      .get()
      .then(function(querySnapshot) {
        data = querySnapshot.docs.map(item => item.data())
        setData(data);
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  },[])

  return (
    <Col className="mt-5">
      {data && data.length ? data.map((item,idx) => {
        const date = new Date(item.dateOfUpdate)
        return (
          <Card body key={idx} className="mb-3">
            <CardTitle className="h3">
              {item.address}
            </CardTitle>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Тип пациентов</span>
              <b>{item.type}</b>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Осталось мест</span>
              <b>20</b>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Последнее обновление</span>
              <div className="d-flex flex-column">
                <b>
                  {String(date.getDate()).length === 1 ? `0${date.getDate()}` : date.getDate()}
                  .
                  {String(date.getMonth()).length === 1 ? `0${date.getMonth()}` : date.getMonth()}
                  .
                  {date.getFullYear()}
                </b>
                <span>
                  {String(date.getHours()).length === 1 ? `0${date.getHours()}` : date.getHours()}
                  :
                  {String(date.getMinutes()).length === 1 ? `0${date.getMinutes()}` : date.getMinutes()}
                </span>
              </div>
            </div>
            <Button tag={"a"} href={`tel:${item.phoneNumber}`} className="mb-2">Позвонить {item.phoneNumber}</Button>
          </Card>
        )
      }) : (
        <p className="text-center h5">Загрузка...</p>
      )}
    </Col>
  )
};

export default Main;
