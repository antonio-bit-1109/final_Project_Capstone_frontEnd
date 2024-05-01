import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { GetProdotti } from "../../redux/actions/prodottiFetch";
import { PlusCircleFill } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import ModaleModificaProdottoBackOffice from "./ModaleModificaProdottoBackOffice";
import ModaleEliminaProdottoBackOffice from "./ModaleEliminaProdottoBackOffice";
import ModaleCreaNuovoProdottoBackOffice from "./ModaleCreaNuovoProdottoBackOffice";
import { GetAllEsercizi } from "../../redux/actions/fetchEsercizi";
import ModaleCreazioneNuovoEsercizio from "./ModaleCreazioneNuovoEsercizio";
import ModaleDeleteEsercizio from "./ModaleDeleteEsercizio";
import ModaleModificaEsercizio from "./ModaleModificaEsercizio";
import { getUtenti } from "../../redux/actions/fetchUtenti";
import ModaleCancellaUtente from "./ModaleCancellaUtente";
import {
    ShowDivEsercizi_false,
    ShowDivEsercizi_true,
    ShowDivProdotti_false,
    ShowDivProdotti_true,
    ShowDivUtenti_false,
    ShowDivUtenti_true,
} from "../../redux/reducers/backOfficeReducer";
import DivUtenti from "./DivUtenti";
import DivProdotti from "./DivProdotti";
import DivEsercizi from "./DivEsercizi";

// import ModaleCancellaUtente from "./ModaleCancellaUtente";

const BackOffice = () => {
    const dispatch = useDispatch();

    const { TuttiDettagliUtenteLoggato } = useSelector((store) => store.utenti);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [idProdotto, setIdProdotto] = useState(null);
    const [idUtente, setIdUtente] = useState(null);
    const [show, setShow] = useState(false);

    const { showDivUtenti, showDivEsercizi, showDivProdotti } = useSelector((store) => store.backOffice);

    const [showModalEditProdotto, setShowModalEditProdotto] = useState(false);
    const [showCreateEsercizio, setShowCreateEsercizio] = useState(false);
    const [showModaldeleteEsercizio, setShowModaldeleteEsercizio] = useState(false);
    const [idEsercizio, setIdEsercizio] = useState(null);
    const [DatiProdotto, setDatiprodotto] = useState({
        ProdottoNome: null,
        prodottoPrezzo: null,
        ProdottoDescrizione: null,
    });

    const [datiEsercizioMOdifica, setDatiEsercizioModifica] = useState({
        nomeEsercizio: null,
        descrizioneEsercizio: null,
        difficoltaEsercizio: null,
        IsStrenght: true,
        tempoRecupero: null,
        Serie: null,
        ripetizioni: null,
        met: null,
        parteDelCorpoAllenata: null,
    });

    const [showModaleEditEsercizio, SetshowModaleEditEsercizio] = useState(false);
    const [showModaleDeleteUtente, setShowModaleDeleteUtente] = useState(false);

    useEffect(() => {
        dispatch(GetProdotti());
        dispatch(getUtenti());
        dispatch(GetAllEsercizi());
    }, [dispatch]);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleCloseModalEditprodotto = () => setShowModalEditProdotto(false);
    const handleShowModalEditprodotto = () => setShowModalEditProdotto(true);

    const handleCloseModalDelete = () => setShowModalDelete(false);
    const handleShowModalDelete = () => setShowModalDelete(true);

    const handleShowCreateEsercizio = () => setShowCreateEsercizio(true);

    const handleCloseModalDeleteEsercizio = () => setShowModaldeleteEsercizio(false);
    const handleShowModalDeleteEsercizio = () => setShowModaldeleteEsercizio(true);

    const handleCloseMOdaleEditEsercizio = () => SetshowModaleEditEsercizio(false);
    const handleShowMOdaleEditEsercizi = () => SetshowModaleEditEsercizio(true);

    const handleCloseModaleDeleteUtente = () => setShowModaleDeleteUtente(false);
    const handleShowModaleDeleteUtente = () => setShowModaleDeleteUtente(true);
    return (
        <div className="Bg-sfondo-dark altezza-sfondo">
            <Container>
                <Row>
                    <Col xs="12">
                        {" "}
                        <div className="h-100 d-flex align-items-center justify-content-center">
                            <h1 className="text-light display-2 my-3 text-center"> BackOffice </h1>{" "}
                        </div>
                    </Col>
                    {TuttiDettagliUtenteLoggato && TuttiDettagliUtenteLoggato.ruolo === "admin" ? (
                        <>
                            {" "}
                            {showDivProdotti && (
                                <Col xs="6" sm="5" md="2">
                                    {" "}
                                    <div className="d-flex flex-column align-items-center my-3">
                                        <Button onClick={handleShow} variant="transparent">
                                            <PlusCircleFill
                                                color="white"
                                                style={{ Height: "70px", Width: "70px" }}
                                                className="display-4"
                                            />{" "}
                                            <p className="mt-2 text-light">Aggiungi Prodotto</p>
                                        </Button>
                                    </div>
                                </Col>
                            )}
                            {showDivEsercizi && (
                                <Col xs="6" sm="5" md="2">
                                    <div className="d-flex flex-column align-items-center my-3">
                                        <Button
                                            onClick={handleShowCreateEsercizio}
                                            variant="transparent"
                                            className=" text-light d-flex flex-column align-items-center"
                                        >
                                            <PlusCircleFill
                                                color="white"
                                                style={{ Height: "70px", Width: "70px" }}
                                                className="display-4"
                                            />{" "}
                                            <p className="mt-1">Inserisci Nuovo Esercizio </p>
                                        </Button>
                                    </div>
                                </Col>
                            )}{" "}
                            {showDivUtenti && (
                                <Col xs="6" sm="5" md="2">
                                    <div className="d-flex flex-column align-items-center my-3">
                                        <Button
                                            // onClick={handleShowCreateEsercizio}
                                            variant="transparent"
                                            className=" text-light d-flex flex-column align-items-center"
                                        >
                                            <PlusCircleFill
                                                color="white"
                                                style={{ Height: "70px", Width: "70px" }}
                                                className="display-4"
                                            />{" "}
                                            <p className="mt-1">Inserisci Nuovo Utente </p>
                                        </Button>
                                    </div>
                                </Col>
                            )}
                        </>
                    ) : null}
                </Row>
                <Row>
                    <Col>
                        <div className="d-flex gap-3 mb-3">
                            <Button
                                onClick={() => {
                                    dispatch(ShowDivProdotti_true());
                                    dispatch(ShowDivEsercizi_false());
                                    dispatch(ShowDivUtenti_false());
                                }}
                                variant="light"
                                className="rounded-4 text-warning border-warning fw-bold"
                            >
                                {" "}
                                Prodotti{" "}
                            </Button>
                            <Button
                                onClick={() => {
                                    dispatch(ShowDivProdotti_false());
                                    dispatch(ShowDivEsercizi_true());
                                    dispatch(ShowDivUtenti_false());
                                }}
                                variant="warning "
                                className="rounded-4 text-light fw-bold"
                            >
                                {" "}
                                Esercizi{" "}
                            </Button>
                            <Button
                                onClick={() => {
                                    dispatch(ShowDivProdotti_false());
                                    dispatch(ShowDivEsercizi_false());
                                    dispatch(ShowDivUtenti_true());
                                }}
                                variant="light"
                                className="rounded-4 text-warning border-warning fw-bold"
                            >
                                {" "}
                                Utenti
                            </Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <DivProdotti
                        handleShowModalDelete={handleShowModalDelete}
                        setIdProdotto={setIdProdotto}
                        handleShowModalEditprodotto={handleShowModalEditprodotto}
                        setDatiprodotto={setDatiprodotto}
                    />

                    <DivEsercizi
                        handleShowModalDeleteEsercizio={handleShowModalDeleteEsercizio}
                        setIdEsercizio={setIdEsercizio}
                        handleShowMOdaleEditEsercizi={handleShowMOdaleEditEsercizi}
                        setDatiEsercizioModifica={setDatiEsercizioModifica}
                    />

                    <DivUtenti handleShowModaleDeleteUtente={handleShowModaleDeleteUtente} setIdUtente={setIdUtente} />
                </Row>
            </Container>

            <ModaleEliminaProdottoBackOffice
                idProdotto={idProdotto}
                handleCloseModalDelete={handleCloseModalDelete}
                showModalDelete={showModalDelete}
            />

            <ModaleCreaNuovoProdottoBackOffice handleClose={handleClose} show={show} />

            <ModaleModificaProdottoBackOffice
                key={idProdotto}
                idProdotto={idProdotto}
                showModalEditProdotto={showModalEditProdotto}
                handleCloseModalEditprodotto={handleCloseModalEditprodotto}
                DatiProdotto={DatiProdotto}
                setDatiprodotto={setDatiprodotto}
            />

            <ModaleCreazioneNuovoEsercizio
                showCreateEsercizio={showCreateEsercizio}
                setShowCreateEsercizio={setShowCreateEsercizio}
            />

            <ModaleDeleteEsercizio
                idEsercizio={idEsercizio}
                showModaldeleteEsercizio={showModaldeleteEsercizio}
                handleCloseModalDeleteEsercizio={handleCloseModalDeleteEsercizio}
            />

            <ModaleModificaEsercizio
                key={idEsercizio}
                idEsercizio={idEsercizio}
                showModaleEditEsercizio={showModaleEditEsercizio}
                handleCloseMOdaleEditEsercizio={handleCloseMOdaleEditEsercizio}
                datiEsercizioMOdifica={datiEsercizioMOdifica}
                setDatiEsercizioModifica={setDatiEsercizioModifica}
            />

            <ModaleCancellaUtente
                showModaleDeleteUtente={showModaleDeleteUtente}
                handleCloseModaleDeleteUtente={handleCloseModaleDeleteUtente}
                idUtente={idUtente}
            />
        </div>
    );
};

export default BackOffice;
