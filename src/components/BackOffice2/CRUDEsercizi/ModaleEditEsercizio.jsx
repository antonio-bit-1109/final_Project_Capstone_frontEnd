import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { isModaleModificaEsercizioVisible } from "../../../redux/reducers/backOffice2Reducer";
import FormModificaEsercizio from "./FormModificaEsercizio";

const ModaleEditEsercizio = () => {
    const dispatch = useDispatch();
    const { showModaleModificaEsercizio } = useSelector((store) => store.BackOffice2);

    return (
        <>
            <Modal show={showModaleModificaEsercizio} onHide={() => dispatch(isModaleModificaEsercizioVisible(false))}>
                <div className="p-4">
                    <div>
                        <h3 className="text-dark display-6">
                            <p className="m-0">Modifica Esercizio Selezionato:</p>
                        </h3>
                    </div>
                    <FormModificaEsercizio color={"text-dark"} />
                    <div>
                        <Button
                            variant="light"
                            className="rounded-4 text-warning border-warning fw-bold mt-3"
                            onClick={() => dispatch(isModaleModificaEsercizioVisible(false))}
                        >
                            Chiudi
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ModaleEditEsercizio;
