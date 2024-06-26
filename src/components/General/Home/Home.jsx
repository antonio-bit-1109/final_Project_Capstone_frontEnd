import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
    getAllenamentiCompletati,
    getDettagliAllenamentiCompletatiUtente,
} from "../../../redux/actions/fetchAllenamentoCompletato";
import { LocalHostPath } from "../../../functions/localHostPath";
import { PlusCircleFill, GearFill } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";
import { CambiaImmagine, GenderUtente, getDettagliUtente } from "../../../redux/actions/fetchUtenti";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GraficoComponent from "../grafico/GraficoComponent";
import ModaleCambiaImgprofilo from "./ModaleCambiaImgprofilo";
import ObscureGraphic from "../grafico/ObscureGraphic";
// import ModificaDatiUtenteOffCanvas from "./Utente/ModificaDatiUtenteOffCanvas";
import { motion } from "framer-motion";
import TreasureComp from "../../TreasureComp";
import CustomModalTreasure from "../../CustomModalTreasure";
import { setModalTreasure_True } from "../../../redux/reducers/bonusReducer";
import { isDivAccessoVisible, isDivFlipped, isDivRegistrazioneVisible } from "../../../redux/reducers/showDivLogin";

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { TuttiDettagliUtenteLoggato } = useSelector((store) => store.utenti);
    console.log("TuttiDettagliUtenteLoggato ", TuttiDettagliUtenteLoggato);

    const DatiGenderUtente = useSelector((store) => store.utenti.GenderUtente);
    console.log("DatiGenderUtente ", DatiGenderUtente);

    const { AllenamentiCompletatiUtente } = useSelector((store) => store.allenamentiCompletati);
    const { DettagliAllenamentiCompletatiUtente } = useSelector((store) => store.allenamentiCompletati);

    const [immagineProfilo, setImmagineProfilo] = useState(null);
    const [durataTotAllenamenti, setDurataTotAllenamenti] = useState(0);
    const [serieTotAllenamenti, setSerieTotAllenamenti] = useState(0);
    const [ripetizioniTotAllenamenti, setRipetizioniTotAllenamenti] = useState(0);
    const [allenamentiCompletati, setAllenamentiCompletati] = useState(0);
    // const [showCustomModalTreasure, setCustomModalTreasure] = useState(false);
    // const { showModalTreasure } = useSelector((store) => store.bonus);

    useEffect(() => {
        dispatch(getDettagliUtente());
        // per riportare default il div nella pagina iniziale di login
        dispatch(isDivFlipped(false));
        dispatch(isDivAccessoVisible(false));
        dispatch(isDivRegistrazioneVisible(false));
    }, [dispatch]);

    useEffect(() => {
        if (TuttiDettagliUtenteLoggato) {
            dispatch(
                getAllenamentiCompletati(
                    TuttiDettagliUtenteLoggato.idUtente,
                    "/AllenamentiCompletati/CompletedWorkoutsUtente/"
                )
            );

            dispatch(GenderUtente(TuttiDettagliUtenteLoggato.nome));
        }
    }, [dispatch, TuttiDettagliUtenteLoggato]);

    useEffect(() => {
        if (TuttiDettagliUtenteLoggato) {
            dispatch(
                getAllenamentiCompletati(
                    TuttiDettagliUtenteLoggato.idUtente,
                    "/AllenamentiCompletati/CompletedWorkoutsUtente/"
                )
            );
            dispatch(getDettagliAllenamentiCompletatiUtente(TuttiDettagliUtenteLoggato.idUtente));
        }
    }, [TuttiDettagliUtenteLoggato, dispatch]);

    useEffect(() => {
        if (AllenamentiCompletatiUtente) {
            let durataTotAllenamenti = 0;
            let serieTotAllenamenti = 0;
            let ripetizioniTotAllenamenti = 0;
            let allenamentiCompletati = 0;

            for (let i = 0; i < AllenamentiCompletatiUtente.length; i++) {
                durataTotAllenamenti += AllenamentiCompletatiUtente[i].allenamento.durataTotaleAllenamento;
                serieTotAllenamenti += AllenamentiCompletatiUtente[i].allenamento.totaleSerie;
                ripetizioniTotAllenamenti += AllenamentiCompletatiUtente[i].allenamento.totaleRipetizioni;
                allenamentiCompletati += 1;
            }

            setDurataTotAllenamenti(durataTotAllenamenti);
            setSerieTotAllenamenti(serieTotAllenamenti);
            setRipetizioniTotAllenamenti(ripetizioniTotAllenamenti);
            setAllenamentiCompletati(allenamentiCompletati);
        }
    }, [AllenamentiCompletatiUtente]);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const formData = new FormData();
    formData.append("immagineProfilo", immagineProfilo);

    const handleSubmit = (e) => {
        e.preventDefault();
        handleClose();
        dispatch(CambiaImmagine(TuttiDettagliUtenteLoggato.idUtente, formData));
    };

    const handleDrag = (event, info) => {
        const divEsterno = document.getElementById("outerDiv").getBoundingClientRect();
        const img = info.point;

        if (
            img.x <= divEsterno.left ||
            img.x >= divEsterno.right ||
            img.y <= divEsterno.top ||
            img.y >= divEsterno.bottom
        ) {
            // setCustomModalTreasure(true);
            dispatch(setModalTreasure_True());
        }
    };

    return (
        <>
            {" "}
            <CustomModalTreasure />
            {TuttiDettagliUtenteLoggato && (
                <div className="Bg-sfondo-dark altezza-sfondo">
                    <Container>
                        <Row>
                            <Col xs="12" sm="12" md="8">
                                <div className="mt-4">
                                    <h2 className="text-light display-2 d-flex justify-content-center">
                                        <span className="display-1 fw-semibold">
                                            {DatiGenderUtente && DatiGenderUtente.gender === "male"
                                                ? "Benvenuto"
                                                : "Benvenuta"}
                                            , {TuttiDettagliUtenteLoggato.nome}!
                                        </span>
                                    </h2>
                                </div>
                                <div>
                                    <div>
                                        <h3 className="text-light">
                                            Abbonamento :{" "}
                                            <span
                                                style={{
                                                    color: TuttiDettagliUtenteLoggato.idAbbonamento ? "#13D227" : "red",
                                                    fontSize: "2.2rem",
                                                }}
                                            >
                                                <span style={{ fontWeight: "bold" }}>
                                                    {TuttiDettagliUtenteLoggato.idAbbonamento ? "Attivo" : "Non attivo"}
                                                </span>
                                            </span>
                                        </h3>
                                    </div>
                                </div>
                            </Col>
                            <Col xs="12" sm="12" md="3">
                                {" "}
                                <div id="outerDiv" className="d-flex justify-content-center my-4 position-relative">
                                    {" "}
                                    <Button
                                        className="d-flex align-items-end"
                                        onClick={handleShow}
                                        variant="transparent"
                                    >
                                        <PlusCircleFill className="text-light fs-3" />
                                    </Button>
                                    <motion.img
                                        drag
                                        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                                        style={{
                                            objectFit: "cover",
                                            width: "150px",
                                            height: "150px",
                                            zIndex: "999",
                                            position: "relative",
                                        }}
                                        className="rounded-circle img-thumbnail"
                                        src={`${LocalHostPath}/img-utenti/${TuttiDettagliUtenteLoggato.immagineProfilo}`}
                                        alt="immagine profilo "
                                        onDrag={(event, info) => handleDrag(event, info)}
                                    />
                                    <div className=" text-center treasurePosition">
                                        <TreasureComp />
                                    </div>
                                    <Button
                                        className="d-flex align-items-end"
                                        onClick={() => navigate("/ModificaDatiUtente")}
                                        variant="transparent"
                                    >
                                        <GearFill className="text-light fs-3" />
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                        {/* SEZIONE GRAFICI */}
                        <Row>
                            <Col xs="12">
                                <div>
                                    <h2 className="text-light">Le tue Statistiche:</h2>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="position-relative" style={{ height: "50vh" }}>
                                    <ObscureGraphic TuttiDettagliUtenteLoggato={TuttiDettagliUtenteLoggato} />
                                    <GraficoComponent
                                        durataTotAllenamenti={durataTotAllenamenti}
                                        serieTotAllenamenti={serieTotAllenamenti}
                                        ripetizioniTotAllenamenti={ripetizioniTotAllenamenti}
                                        allenamentiCompletati={allenamentiCompletati}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" lg="9">
                                <div className="d-flex flex-column justify-content-center h-100">
                                    <div className="my-3">
                                        <h4>
                                            <span className="text-white">Esercizio Preferito: </span>
                                            <span
                                                style={{ color: "rgba(255, 193, 7, 0.8)" }}
                                                className="ms-2 fw-bold fs-1"
                                            >
                                                <br /> &quot;
                                                {DettagliAllenamentiCompletatiUtente &&
                                                DettagliAllenamentiCompletatiUtente.esercizioPreferitoDTO
                                                    ? DettagliAllenamentiCompletatiUtente.esercizioPreferitoDTO
                                                          .nomeEsercizioPreferito
                                                    : "N/A"}
                                                &quot;
                                            </span>
                                        </h4>
                                    </div>
                                    <div className="my-3">
                                        {" "}
                                        <h4>
                                            <span className="text-white"> Difficoltà Media Workouts: </span>
                                            <span
                                                style={{ color: "rgba(255, 193, 7, 0.8)" }}
                                                className="ms-2 fw-bold fs-1"
                                            >
                                                <br /> &quot;
                                                {DettagliAllenamentiCompletatiUtente &&
                                                DettagliAllenamentiCompletatiUtente.difficoltaMediaDTO
                                                    ? DettagliAllenamentiCompletatiUtente.difficoltaMediaDTO
                                                          .difficoltaMedia === 1
                                                        ? "Facile"
                                                        : DettagliAllenamentiCompletatiUtente.difficoltaMediaDTO
                                                              .difficoltaMedia === 2
                                                        ? "Medio"
                                                        : "Difficile"
                                                    : "N/A"}
                                                &quot;
                                            </span>
                                        </h4>
                                    </div>
                                    <div className="my-3">
                                        {" "}
                                        <h4>
                                            <span className="text-white"> Tipologia di esercizio Preferito: </span>

                                            <span
                                                style={{ color: "rgba(255, 193, 7, 0.8)" }}
                                                className="ms-2 fw-bold fs-1"
                                            >
                                                <br /> &quot;
                                                {DettagliAllenamentiCompletatiUtente &&
                                                DettagliAllenamentiCompletatiUtente.tipoEsPrefe
                                                    ? DettagliAllenamentiCompletatiUtente.tipoEsPrefe
                                                          .tipologiaEsercizioPreferita === true
                                                        ? "Esercizi di Forza"
                                                        : "Esercizio Cardio"
                                                    : "N/A"}
                                                &quot;
                                            </span>
                                        </h4>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="my-3">
                                    <Button
                                        onClick={() => {
                                            navigate("/ListaAllenamentiCompletati");
                                        }}
                                        variant="warning"
                                        className="rounded-4 text-light fw-bold"
                                    >
                                        {" "}
                                        Controlla Allenamenti completati{" "}
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    <ModaleCambiaImgprofilo
                        setImmagineProfilo={setImmagineProfilo}
                        show={show}
                        handleSubmit={handleSubmit}
                        handleClose={handleClose}
                    />
                </div>
            )}
            {/* <ModificaDatiUtenteOffCanvas showOffCanvas={showOffCanvas} handleCloseCanvas={handleCloseCanvas} /> */}
        </>
    );
};

export default Home;
