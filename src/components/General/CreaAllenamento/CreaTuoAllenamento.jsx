import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Col, Container, Form, Modal, Row } from "react-bootstrap";
import {
    PushInArrayAllenamento,
    RimuoviEsercizioDaArray,
    SvuotaArrayAllenamento,
    setnomeAllenamentoCreato,
} from "../../../redux/reducers/allenamentiReducer";
import { toast } from "react-toastify";
import { PlusCircleFill } from "react-bootstrap-icons";
import ModaleCreazioneNuovoEsercizio from "./ModaleCreazioneNuovoEsercizio";
import ModaleInserimentoNomeAllenamento from "./ModaleInserimentoNomeAllenamento";
import { GetEsercizi } from "../../../redux/actions/fetchEsercizi";
import { LocalHostPath } from "../../../functions/localHostPath";
import workout from "../../../assets/workout.svg";
import Dumbell from "../../../assets/dumbbell.svg";
import IconaPetto from "../../../assets/immagini-parte-corpo/petto-icon-removebg.png";
import IconaSpalle from "../../../assets/immagini-parte-corpo/icon-spalle1.png";
import IconaGambe from "../../../assets/immagini-parte-corpo/icon-gambe.png";
import IconaBicipiti from "../../../assets/immagini-parte-corpo/icon-bicipiti.png";
import IconaTricipiti from "../../../assets/immagini-parte-corpo/icon-tricipiti.png";
import IconaFullBody from "../../../assets/immagini-parte-corpo/fullbody1.png";

const CreaTuoAllenamento = () => {
    const { listaEsercizi } = useSelector((store) => store.esercizi);
    // const [ListaEserciziAutomatica, setListaEserciziAutomatica] = useState(null);
    // const ArrayAllenamento = useSelector((store) => store.allenamenti.allenamentoPersonalizzatoUtente);
    const [parteCorpo, setParteCorpo] = useState("");
    const [difficolta, setDifficolta] = useState("");
    const [checkStrenght, setCheckStrenght] = useState(true);
    const [checkCardio, setCheckCardio] = useState(false);
    const [showImage, setShowImage] = useState(false);
    const [immagineEsercizio, setImmagineEsercizio] = useState("");
    const ArrayIcone = [IconaPetto, IconaSpalle, IconaGambe, IconaBicipiti, IconaTricipiti, IconaFullBody];
    const ValoriArray = ["petto", "spalle", "gambe", "bicipiti", "tricipiti", "fullbody"];

    const handleCloseImage = () => setShowImage(false);
    const handleShowImage = () => setShowImage(true);

    const changeCheckForza = () => {
        setCheckStrenght(true);
        setCheckCardio(false);
    };

    const changeCheckCardio = () => {
        setCheckStrenght(false);
        setCheckCardio(true);
    };

    // AL CLICK CERCA ESERCIZI SUCCEDE QUESTO
    const cercaEsercizi = () => {
        dispatch(GetEsercizi(parteCorpo, difficolta, checkStrenght));
    };

    // const navigate = useNavigate();
    const dispatch = useDispatch();
    const ArrayAllenamento = useSelector((store) => store.allenamenti.allenamentoPersonalizzatoUtente);
    const { TuttiDettagliUtenteLoggato } = useSelector((store) => store.utenti);
    const [showCreateEsercizio, setShowCreateEsercizio] = useState(false);
    const [show, setShow] = useState(false);
    // const [GeneraAllenamentoRandomicoIsClicked, setGeneraAllenamentoRandomicoIsClicked] = useState(false);

    // const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    // const handleCloseImage = () => setShowImage(false);
    // const handleShowImage = () => setShowImage(true);
    const handleShowCreateEsercizio = () => setShowCreateEsercizio(true);

    // genera valori casuali per partecorpo, difficolta, isstrength (true , false) e prendi un esercizio casuale
    const TrovaEserciziocasuale = () => {
        const parteCorpo = ["petto", "gambe", "bicipiti", "spalle", "tricipiti", "fullbody"];
        let parteCorpoScelta = Math.floor(Math.random() * parteCorpo.length);
        console.log(parteCorpo[parteCorpoScelta]);

        const difficolta = ["1", "2", "3"];
        let difficoltaScelta = Math.floor(Math.random() * difficolta.length);
        console.log(difficolta[difficoltaScelta]);

        const IsStrenght = [true, false];
        let IsStrengthEx = Math.floor(Math.random() * IsStrenght.length);
        console.log(IsStrenght[IsStrengthEx]);

        dispatch(GetEsercizi(parteCorpo[parteCorpoScelta], difficolta[difficoltaScelta], IsStrenght[IsStrengthEx]));
    };

    //UN BOTTONE CHE GENERI IN AUTOMATICO UN ALLENAMENTO CASUALE CON 5 ESERCIZI

    const GeneraAllenamentoCasuale = () => {
        TrovaEserciziocasuale();

        if (listaEsercizi.length > 0) {
            dispatch(PushInArrayAllenamento(listaEsercizi[0]));
        }
    };

    useEffect(() => {
        dispatch(setnomeAllenamentoCreato(""));
        dispatch(SvuotaArrayAllenamento());
    }, [dispatch]);

    return (
        <div className="Bg-sfondo altezza-sfondo">
            <Container fluid>
                {TuttiDettagliUtenteLoggato && (
                    <Row>
                        <Col xs="12">
                            {" "}
                            <div className="d-flex justify-content-center mt-4">
                                {" "}
                                {TuttiDettagliUtenteLoggato.ruolo === "admin" ? (
                                    <Button
                                        onClick={handleShowCreateEsercizio}
                                        variant="transparent"
                                        className=" text-light d-flex flex-column align-items-center"
                                    >
                                        <PlusCircleFill
                                            style={{ Height: "56px", Width: "56px" }}
                                            className="display-4"
                                        />
                                        <p className="mt-1">Inserisci Nuovo Esercizio </p>
                                    </Button>
                                ) : null}
                                <Button
                                    onClick={TrovaEserciziocasuale}
                                    variant="transparent"
                                    className=" text-light d-flex flex-column align-items-center"
                                >
                                    {/* <PlusCircleFill className="display-4" /> */}
                                    <img src={Dumbell} alt="" />
                                    <p className="mt-1">Esercizio casuale</p>
                                </Button>
                                <Button
                                    onClick={GeneraAllenamentoCasuale}
                                    variant="transparent"
                                    className=" text-light d-flex flex-column align-items-center"
                                >
                                    {/* <PlusCircleFill className="display-4" /> */}
                                    <img src={workout} alt="" />
                                    <p className="mt-1">Genera Allenamento Randomico</p>
                                </Button>
                            </div>
                        </Col>
                    </Row>
                )}

                <Row className="justify-content-center">
                    {/* sezione scelta esercizi */}
                    <Col xs="10" md="10" lg="6" xl="6" xxl="5">
                        <p className="m-0 text-light">Filtra Esercizi per Parte Del corpo:</p>
                        <div className="d-flex flex-wrap justify-content-center">
                            {ArrayIcone.map((icon, i) => (
                                <Button
                                    onClick={() => setParteCorpo(ValoriArray[i])}
                                    variant="transparent"
                                    className="p-0 enlight border border-1"
                                    key={`card-icon${i}`}
                                >
                                    <Card className="p-0" bg="transparent" style={{ height: "100px", border: "none" }}>
                                        <Card.Body>
                                            <img src={icon} alt="icon-muscolo" />
                                        </Card.Body>
                                    </Card>
                                </Button>
                            ))}

                            {/* <Form.Select
                                value={parteCorpo}
                                onChange={(e) => setParteCorpo(e.target.value === "null" ? null : e.target.value)}
                                aria-label="Default select example"
                            >
                                <option> Scegli Parte Del Corpo: </option>
                                <option value="null">NON SPECIFICARE </option>
                                <option value="petto">Petto</option>
                                <option value="gambe">Gambe</option>
                                <option value="bicipiti">Bicipiti</option>
                                <option value="spalle">Spalle</option>
                                <option value="tricipiti">Tricipiti</option>
                                <option value="fullbody">Full Body</option>
                            </Form.Select> */}
                        </div>
                        <div className="my-2">
                            <p className="m-0 text-light">Filtra esercizi per difficoltà: </p>
                            <Form.Select
                                value={difficolta}
                                onChange={(e) => setDifficolta(e.target.value === "null" ? null : e.target.value)}
                                id="selectList"
                                aria-label="Default select example"
                            >
                                <option>Scegli Difficoltà: </option>
                                <option value="null"> NON SPECIFICARE </option>
                                <option value="1">Facile</option>
                                <option value="2">Medio</option>
                                <option value="3">Difficile</option>
                            </Form.Select>
                        </div>
                        <div className="my-2">
                            <p className="m-0 text-light">Filtra Esercizi per Tipologia: </p>
                            <Form.Check // prettier-ignore
                                className="text-light"
                                type="switch"
                                id="switch-forza-id"
                                label="Esercizi Forza"
                                onChange={changeCheckForza}
                                checked={checkStrenght}
                            />
                            <Form.Check // prettier-ignore
                                className="text-light"
                                type="switch"
                                label="Esercizi Cardio"
                                id="switch-cardio-id"
                                onChange={changeCheckCardio}
                                checked={checkCardio}
                            />
                        </div>
                        <div>
                            <Button variant="warning " className="rounded-4 text-light fw-bold" onClick={cercaEsercizi}>
                                {" "}
                                Cerca Esercizi{" "}
                            </Button>
                        </div>
                        <div className="w-100">
                            {listaEsercizi.length > 0 ? (
                                listaEsercizi.map((esercizio, index) => (
                                    <Col key={`col-${index}`}>
                                        <Card className="rounded rounded-5 my-4 shadow-lg">
                                            {/* MODALE PER MOSTRARE IMMAGINE ESERCIZIO */}
                                            <Modal
                                                show={showImage}
                                                onHide={handleCloseImage}
                                                backdrop="static"
                                                keyboard={false}
                                            >
                                                <Modal.Header closeButton></Modal.Header>
                                                <Modal.Body>
                                                    {/* immagine esercizio */}
                                                    <Button variant="secondary" onClick={handleClose}>
                                                        <Card.Img
                                                            style={{
                                                                maxHeight: "100%",
                                                                objectFit: "contains",
                                                                maxWidth: "100%",
                                                            }}
                                                            src={`${LocalHostPath}/img-esercizi/${immagineEsercizio}`}
                                                        />
                                                    </Button>
                                                </Modal.Body>
                                            </Modal>

                                            <Card.Body>
                                                <Card.Title className="d-flex justify-content-center fw-bold fs-3">
                                                    {esercizio.nomeEsercizio}
                                                </Card.Title>
                                                <Card.Text className="d-flex justify-content-center fs-5">
                                                    {esercizio.descrizioneEsercizio}
                                                </Card.Text>
                                                <div className="d-flex justify-content-around">
                                                    <Card.Text>
                                                        {" "}
                                                        <span className="fw-semibold fs-4">Serie:</span>
                                                        <span className="fw-semibold fs-3 ms-2">{esercizio.serie}</span>
                                                    </Card.Text>
                                                    <Card.Text>
                                                        {" "}
                                                        <span className="fw-semibold fs-4">Ripetizioni:</span>
                                                        <span className="fw-semibold fs-3 ms-2">
                                                            {esercizio.ripetizioni}
                                                        </span>
                                                    </Card.Text>
                                                </div>
                                                <div className="d-flex justify-content-around">
                                                    {" "}
                                                    <Card.Text>
                                                        {" "}
                                                        <span className="fw-semibold fs-4">Tempo Recupero:</span>
                                                        <span className="fw-semibold fs-3 ms-2">
                                                            {esercizio.tempoRecupero}&quot;
                                                        </span>
                                                    </Card.Text>
                                                    <Card.Text>
                                                        {" "}
                                                        <span className="fw-semibold fs-4">Difficoltà Esercizio:</span>
                                                        <span className="fw-semibold fs-3 ms-2">
                                                            {esercizio.difficolta} / 3;
                                                        </span>
                                                    </Card.Text>{" "}
                                                </div>

                                                <div className="d-flex gap-2 justify-content-center">
                                                    <Button
                                                        onClick={() => {
                                                            dispatch(PushInArrayAllenamento(esercizio));
                                                        }}
                                                        variant="warning "
                                                        className="rounded-4 text-light fw-bold"
                                                    >
                                                        Aggiungi al tuo Allenamento
                                                    </Button>
                                                    <Button
                                                        onClick={() => {
                                                            handleShowImage();
                                                            setImmagineEsercizio(esercizio.immagineEsercizio);
                                                        }}
                                                        variant="light"
                                                        className="rounded-4 text-warning border-warning fw-bold"
                                                    >
                                                        Guarda Esecuzione
                                                    </Button>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))
                            ) : (
                                <h2 className="fs-3 text-light d-flex justify-content-center my-3">
                                    nessun Esercizio Soddisfa i criteri di ricerca{" "}
                                </h2>
                            )}
                        </div>
                    </Col>{" "}
                    {/* sezione vista esercizi selezionati */}
                    <Col xs="12" md="12" lg="6" xl="6" xxl="6">
                        <div className="sticky-top">
                            {ArrayAllenamento.length > 0 && (
                                <div className="d-flex justify-content-center mt-4">
                                    <h4 className="display-3 text-light">Esercizi Selezionati</h4>
                                </div>
                            )}{" "}
                            {ArrayAllenamento &&
                                ArrayAllenamento.map((esercizio, index) => (
                                    <div
                                        key={`div-${index}`}
                                        className="border border-2 p-3 rounded-5 w-100 my-3 bg-light position-relative shadow-lg"
                                    >
                                        <div className="d-flex justify-content-center">
                                            <Card.Title className="d-flex justify-content-center fw-bold fs-3">
                                                {esercizio.nomeEsercizio}
                                            </Card.Title>
                                            <button
                                                onClick={() => dispatch(RimuoviEsercizioDaArray(esercizio.idEsercizio))}
                                                style={{ border: "none" }}
                                                className="positionX"
                                            >
                                                ❌
                                            </button>
                                        </div>

                                        <div className="d-flex gap-3 justify-content-center">
                                            <div className="d-flex justify-content-around">
                                                <Card.Text>
                                                    {" "}
                                                    <span className="fw-semibold fs-5">Serie:</span>
                                                    <span className="fw-semibold fs-3 ms-2">{esercizio.serie}</span>
                                                </Card.Text>
                                            </div>
                                            <div className="d-flex justify-content-around">
                                                <Card.Text>
                                                    {" "}
                                                    <span className="fw-semibold fs-4">Ripetizioni:</span>
                                                    <span className="fw-semibold fs-3 ms-2">
                                                        {esercizio.ripetizioni}
                                                    </span>
                                                </Card.Text>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <div className="d-flex justify-content-center my-3 ">
                            <Button
                                variant="warning text-light"
                                className="rounded-4 text-warning border-warning fw-bold fs-3"
                                onClick={() => {
                                    if (ArrayAllenamento.length === 0) {
                                        toast.info("il tuo Allenamento non contiene esercizi", {
                                            autoClose: 2000,
                                            position: "top-center",
                                        });
                                    }

                                    if (ArrayAllenamento.length > 0) {
                                        dispatch(SvuotaArrayAllenamento());
                                        dispatch(setnomeAllenamentoCreato(""));
                                        toast.success("Allenamento Svuotato", {
                                            position: "top-center",
                                            autoClose: 2000,
                                        });
                                    }
                                }}
                            >
                                Svuota Allenamento
                            </Button>
                        </div>
                    </Col>
                    <Col>
                        <div className="d-flex justify-content-center my-3">
                            <Button
                                variant="warning text-light"
                                className="rounded-4 text-warning border-warning fw-bold fs-3"
                                onClick={() => handleShow()}
                            >
                                {" "}
                                Conferma Allenamento{" "}
                            </Button>
                        </div>
                    </Col>
                </Row>

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
