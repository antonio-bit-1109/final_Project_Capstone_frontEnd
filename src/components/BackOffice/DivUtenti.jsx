import { Button, Card, Col } from "react-bootstrap";
import { PenFill, X } from "react-bootstrap-icons";
import { LocalHostPath } from "../../functions/localHostPath";
import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
const DivUtenti = ({ handleShowModaleDeleteUtente, setIdUtente }) => {
    const { showDivUtenti } = useSelector((store) => store.backOffice);
    const { TuttiUtenti } = useSelector((store) => store.utenti);

    return (
        <>
            {" "}
            {/* DIV UTENTI */}
            <div className={`${showDivUtenti ? "d-flex flex-wrap" : "d-none"}`}>
                {TuttiUtenti &&
                    TuttiUtenti.map((utente, i) => (
                        <Col xs="11" sm="10" md="8" lg="6" xl="4" key={`mykey-${i}`}>
                            {" "}
                            <Card
                                style={{ height: "90%" }}
                                className="effettoVetro text-light my-3 border border-white rounded-5 mx-1 position-relative"
                            >
                                <div className="d-flex justify-content-end customposition3">
                                    <Button
                                        onClick={() => {
                                            handleShowModaleDeleteUtente();
                                            setIdUtente(utente.idUtente);
                                        }}
                                        className="me-2"
                                        variant="transparent"
                                    >
                                        <X className="fs-1 text-danger" />
                                    </Button>
                                    <Button variant="transparent">
                                        <PenFill className="fs-5 text-white" />
                                    </Button>
                                </div>

                                <div className="m-3 d-flex align-items-center justify-content-around">
                                    {" "}
                                    <img
                                        className="immagineProfilo"
                                        src={LocalHostPath + "/img-utenti/" + utente.immagineProfilo}
                                    />
                                    <Card.Title className="my-2"> Nome: {utente.nome}</Card.Title>
                                </div>

                                <Card.Body className="my-3">
                                    {" "}
                                    <div className="d-flex justify-content-around align-items-center border border-1">
                                        {" "}
                                        <Card.Text> Cognome: {utente.cognome}</Card.Text>
                                    </div>
                                    <div className="d-flex justify-content-around align-items-center border border-1">
                                        {" "}
                                        <Card.Text> password: {utente.password}</Card.Text>
                                        <Card.Text> ruolo: {utente.ruolo}</Card.Text>
                                    </div>
                                    <div className="d-flex justify-content-around align-items-center border border-1">
                                        <Card.Text>peso: {utente.peso}</Card.Text>
                                        <Card.Text> altezza: {utente.altezza}</Card.Text>
                                    </div>
                                    <div className="d-flex justify-content-around align-items-center border border-1">
                                        <Card.Text> email: {utente.email}</Card.Text>
                                        <Card.Text>Kcal Bruciate: {utente.totaleKcalConsumate}</Card.Text>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
            </div>
        </>
    );
};

export default DivUtenti;
