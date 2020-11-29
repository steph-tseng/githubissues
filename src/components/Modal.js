import React from "react";
import { Modal, Button } from "react-bootstrap";

function ModalPop({ item }) {
  console.log(item);
  return (
    <Modal
      // {...item}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {item.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>{item.body}</div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={item.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalPop;

<ul>
  {item.comments_url.map((i) => {
    return (
      <li key={i.id}>
        <img src={i.user.avatar_url} alt="User avatar" />
        <div>{i.body}</div>
      </li>
    );
  })}
</ul>;
