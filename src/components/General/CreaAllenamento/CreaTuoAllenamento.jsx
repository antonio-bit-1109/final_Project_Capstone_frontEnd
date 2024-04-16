import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import {
    // PushInArrayAllenamento,
    SvuotaArrayAllenamento,
    setnomeAllenamentoCreato,
} from "../../../redux/reducers/allenamentiReducer";
// import { toast } from "react-toastify";
// import { PlusCircleFill } from "react-bootstrap-icons";
import ModaleCreazioneNuovoEsercizio from "./ModaleCreazioneNuovoEsercizio";
import ModaleInserimentoNomeAllenamento from "./ModaleInserimentoNomeAllenamento";
// import { GetEsercizi } from "../../../redux/actions/fetchEsercizi";
// import { LocalHostPath } from "../../../functions/localHostPath";
// import workout from "../../../assets/workout.svg";
// import Dumbell from "../../../assets/dumbbell.svg";

import BottoniSvuotaConferma from "./BottoniSvuotaConferma";
import EserciziSelezionati from "./EserciziSelezionati";
import ElencoEsercizi from "./ElencoEsercizi";
import PannelloSceltaEsercizi from "./PannelloSceltaEsercizi";
import RowSuperioreIcone from "./RowSuperioreIcone";

const CreaTuoAllenamento = () => {
    const dispatch = useDispatch();
    // const { listaEsercizi } = useSelector((store) => store.esercizi);
    // const ArrayAllenamento = useSelector((store) => store.allenamenti.allenamentoPersonalizzatoUtente);
    const { TuttiDettagliUtenteLoggato } = useSelector((store) => store.utenti);
    const [showCreateEsercizio, setShowCreateEsercizio] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    useEffect(() => {
        dispatch(setnomeAllenamentoCreato(""));
        dispatch(SvuotaArrayAllenamento());
    }, [dispatch]);

    return (
        <div className="Bg-sfondo altezza-sfondo">
            <Container fluid>
                {TuttiDettagliUtenteLoggato && (
                    <Row>
                        <RowSuperioreIcone setShowCreateEsercizio={setShowCreateEsercizio} />
                    </Row>
                )}

                <Row className="justify-content-center">
                    {/* sezione scelta esercizi */}
                    <Col xs="10" md="10" lg="6" xl="6" xxl="5">
                        <PannelloSceltaEsercizi />

                        <ElencoEsercizi handleClose={handleClose} />
                    </Col>{" "}
                    <EserciziSelezionati />
                </Row>

                <BottoniSvuotaConferma setShow={setShow} />
                <ModaleInserimentoNomeAllenamento show={show} handleClose={handleClose} />

                <ModaleCreazioneNuovoEsercizio
                    showCreateEsercizio={showCreateEsercizio}
                    setShowCreateEsercizio={setShowCreateEsercizio}
                />
            </Container>
        </div>
    );
};

export default CreaTuoAllenamento;
