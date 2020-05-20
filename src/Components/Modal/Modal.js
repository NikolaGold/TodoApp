import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const TodoModal = ({message, title, textOnButton}) => {

    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => setIsOpen(false);
    const handleShow = () => setIsOpen(true);

    return (
        <>
            <div className="d-flex justify-content-center">
                <Button variant="warning" onClick={handleShow}>{textOnButton}</Button>
            </div>
            <Modal show={isOpen} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{message}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
};
export default Modal;
