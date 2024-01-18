import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function DescriptionModal({ show, movieForModal, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{movieForModal.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>Fecha de publicación: </strong> {movieForModal.release_date}
        </p>
        <p>
          <strong>Resumen: </strong>
          {movieForModal.overview}
        </p>
        <p>
          <strong>Rating: </strong>
          {movieForModal.vote_average}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DescriptionModal;
