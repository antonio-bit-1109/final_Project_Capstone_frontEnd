import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { isModalVisible } from "../../../redux/reducers/backOffice2Reducer";
import FormModificaProdotto from "./FormModificaProdotto";

const ModaleEditProdotto = () => {
    const dispatch = useDispatch();

    const { showModale } = useSelector((store) => store.BackOffice2);
    return (
        <>
            <Modal show={showModale} onHide={() => dispatch(isModalVisible(false))}>
                <Modal.Body className="py-4 px-3">
                    <h3 className="text-dark display-6">
                        <p className="m-0">Modifica Prodotto Selezionato:</p>
                    </h3>
                    <FormModificaProdotto />
                    <Button
                        onClick={() => dispatch(isModalVisible(false))}
                        variant="light"
                        className="rounded-4 text-warning border-warning fw-bold mt-3"
                    >
                        Chiudi
                    </Button>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ModaleEditProdotto;
