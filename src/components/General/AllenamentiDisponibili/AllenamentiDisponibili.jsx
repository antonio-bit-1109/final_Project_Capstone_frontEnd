import { useEffect, useState } from "react";
import { CancellaAllenamento, GetListaAllenamenti } from "../../../redux/actions/fetchAllenamento";
import { LocalHostPath } from "../../../functions/localHostPath";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "react-bootstrap";
// import { setAllenamentoSceltogiaCreato } from "../../../redux/reducers/allenamentiReducer";
// import { useNavigate } from "react-router-dom";
// import { Trash3Fill } from "react-bootstrap-icons";
import RowInputRicerca from "./InputRicerca/RowInputRicerca";
import AllenamentiSelezionabili from "./AllenamentiSelezionabili";
import ModaleCancellaAllSelezionato from "./ModaleCancellaAllSelezionato";
import ModaleMostraDettagliAllenamento from "./ModaleMostraDettagliAllenamento";

const AllenamentiDisponibili = () => {
    const dispatch = useDispatch();

    const [show, setShow] = useState(false);
    const [showEsercizi, setShowEsercizi] = useState(false);
    const [AllenamDacancellare, setAllenamDacancellare] = useState(null);
    const [DettagliAllenamento, setDettagliAllenamento] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseEsercizi = () => setShowEsercizi(false);
    const handleShowEsercizi = () => setShowEsercizi(true);

    useEffect(() => {
        dispatch(GetListaAllenamenti(LocalHostPath + "/Allenamento/ListaAllenamenti"));
    }, [dispatch]);

    const handleDelete = (id) => {
        // cancella allenamento a partire dall'id
        dispatch(CancellaAllenamento(LocalHostPath + `/Allenamento/CancellaAllenamento/${id}`)).then(() => {
            // Aggiorna la lista degli allenamenti dopo aver cancellato un allenamento
            dispatch(GetListaAllenamenti(LocalHostPath + "/Allenamento/ListaAllenamenti"));
        });
    };

    return (
        <div className="Bg-sfondo-dark min-vh-100">
            <Container>
                <RowInputRicerca />

                <AllenamentiSelezionabili
                    handleShow={handleShow}
                    handleShowEsercizi={handleShowEsercizi}
                    setAllenamDacancellare={setAllenamDacancellare}
                    setDettagliAllenamento={setDettagliAllenamento}
                />
            </Container>
            <ModaleCancellaAllSelezionato
                show={show}
                handleClose={handleClose}
                handleDelete={handleDelete}
                AllenamDacancellare={AllenamDacancellare}
            />

            <ModaleMostraDettagliAllenamento
                showEsercizi={showEsercizi}
                handleCloseEsercizi={handleCloseEsercizi}
                DettagliAllenamento={DettagliAllenamento}
            />
        </div>
    );
};

export default AllenamentiDisponibili;
