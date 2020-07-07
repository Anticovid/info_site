import {Badge, Button, Card, CardTitle} from "reactstrap";
import React from "react";
import firebase from "../firebase";

const ModeratorCard = ({moderation,dateOfUpdate,address,id,index,removeItem,type,changeModer,showModal,phoneNumber,countOfPlace}) => {

  const date = new Date(dateOfUpdate)

  const deleteItem = () => {
    const bool = window.confirm("Вы уверены что хотите удалить этот пункт?");
    if(bool) {
      firebase.firestore().collection('points').doc(id).delete()
        .then(() => {
          removeItem(index);
          alert("Пункт успешно удален")
        })
        .catch(e => alert("Произошло ошибка! Мы уже ее решаем"))
    }
  }

  const acceptPoint = () => {
    firebase.firestore().collection('points').doc(id).update({
      moderation: true
    }).then(res => {
      changeModer(index)
      alert("Документ успешно показан")
    })
      .catch(e => alert("Произошла ошибка, мы над ней уже работаем"))
  }

  return (
    <>
    <Card body className="mb-3">
      {moderation ? (
        <Badge color="success">Проверен</Badge>
      ) : (
        <Badge>Не проверен</Badge>
      )}
      <CardTitle className="h3 mt-3">
        {address}
      </CardTitle>
      <div className="d-flex justify-content-between mb-2">
        <span className="text-muted">Тип пациентов</span>
        <b>{type}</b>
      </div>
      <div className="d-flex justify-content-between mb-2">
        <span className="text-muted">Осталось мест</span>
        <b>{countOfPlace}</b>
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
      <Button tag={"a"} href={`tel:${phoneNumber}`} className="mb-2">Позвонить {phoneNumber}</Button>
      <Button color="success" className="mb-2" onClick={acceptPoint}>
        Принять
      </Button>
      <Button color="primary" className="mb-2" onClick={() => showModal(index)}>Изменить</Button>
      <Button color="danger" className="mb-2" onClick={deleteItem}>Удалить</Button>
    </Card>
      </>
  )
}

export default ModeratorCard;
