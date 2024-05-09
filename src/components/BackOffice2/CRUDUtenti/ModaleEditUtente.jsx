import { Button, Modal } from "react-bootstrap";
import FormModificaUtente from "./FormModificaUtente";
import { useDispatch, useSelector } from "react-redux";
import { isModaleEditUtenteVisible } from "../../../redux/reducers/backOffice2Reducer";

const ModaleEditUtente = () => {
    const dispatch = useDispatch();
    const { showModaleEditUtente } = useSelector((store) => store.BackOffice2);
    return (
        <>
            {" "}
            <Modal show={showModaleEditUtente} onHide={() => dispatch(isModaleEditUtenteVisible(false))}>
                <Modal.Body className="py-4 px-3">
                    <h3 className="text-dark display-6">
                        <p className="m-0">Modifica Utente Selezionato:</p>
                    </h3>
                    <FormModificaUtente color={"text-dark"} />
                    <Button
                        onClick={() => dispatch(isModaleEditUtenteVisible(false))}
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

export default ModaleEditUtente;

{
    /* <Modal show={showModale} onHide={() => dispatch(isModalVisible(false))}>
<Modal.Body className="py-4 px-3">
    <h3 className="text-dark display-6">
        <p className="m-0">Modifica Prodotto Selezionato:</p>
    </h3>
    <FormModificaProdotto textColor={"text-dark"} />
    <Button
        onClick={() => dispatch(isModalVisible(false))}
        variant="light"
        className="rounded-4 text-warning border-warning fw-bold mt-3"
    >
        Chiudi
    </Button>
</Modal.Body>
</Modal> */
}
