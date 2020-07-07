import React, { useContext } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import PointAddForm from "./PointAddForm";
import {AddPointByModeratorContext} from './AddPointByModerator';

const ModeratorModal = ({modal,setModal,push}) => {

  const Context = useContext(AddPointByModeratorContext)

  const toggle = () => setModal();

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Добавить пункт</ModalHeader>
        <ModalBody className="pt-0">
          <PointAddForm customData={Context.point} push={push} changeData={Context.setPoint}/>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ModeratorModal;
