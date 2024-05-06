import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { cancellaProdotto } from "../../redux/actions/prodottiFetch";
import { LocalHostPath } from "../../functions/localHostPath";

// eslint-disable-next-line react/prop-types
const ModaleEliminaProdottoBackOffice = ({ handleCloseModalDelete, showModalDelete }) => {
    const dispatch = useDispatch();
    const { idProdotto } = useSelector((store) => store.BackOffice2);

    const eraseProduct = (id) => {
        dispatch(cancellaProdotto(LocalHostPath, id));
        handleCloseModalDelete();
    };

    return (
        <>
            {/* MODALE ELIMINA PRODOTTO */}
            <Modal show={showModalDelete} onHide={() => handleCloseModalDelete()}>
                <Modal.Header closeButton>
                    <Modal.Title>Elimina Prodotto </Modal.Title>
                </Modal.Header>
                <Modal.Body>Stai per eliminare il Prodotto Selezionato, Vuoi continuare ?</Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="light"
                        className="rounded-4 text-warning border-warning fw-bold"
                        onClick={handleCloseModalDelete}
                    >
                        Chiudi
                    </Button>
                    <Button
                        variant="warning "
                        className="rounded-4 text-light fw-bold"
                        onClick={() => eraseProduct(idProdotto)}
                    >
                        Elimina Definitivamente
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModaleEliminaProdottoBackOffice;
