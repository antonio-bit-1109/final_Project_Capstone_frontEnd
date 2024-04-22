import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import IconaPetto from "../../../assets/immagini-parte-corpo/petto-icon-removebg.png";
import IconaSpalle from "../../../assets/immagini-parte-corpo/icon-spalle1.png";
import IconaGambe from "../../../assets/immagini-parte-corpo/icon-gambe.png";
import IconaBicipiti from "../../../assets/immagini-parte-corpo/icon-bicipiti.png";
import IconaTricipiti from "../../../assets/immagini-parte-corpo/icon-tricipiti.png";
import IconaFullBody from "../../../assets/immagini-parte-corpo/fullbody1.png";
import { useDispatch } from "react-redux";
import { GetEsercizi } from "../../../redux/actions/fetchEsercizi";

const PannelloSceltaEsercizi = () => {
    const dispatch = useDispatch();
    const [parteCorpo, setParteCorpo] = useState("");
    const [difficolta, setDifficolta] = useState("");
    const [checkStrenght, setCheckStrenght] = useState(true);
    const [checkCardio, setCheckCardio] = useState(false);
    const [ArrayPartiCorpo, setArrayPartiCorpo] = useState([false, false, false, false, false, false]);
    const [ArrayDifficolta, setArrayDifficolta] = useState([false, false, false]);
    const ArrayIcone = [IconaPetto, IconaSpalle, IconaGambe, IconaBicipiti, IconaTricipiti, IconaFullBody];
    const ValoriArray = ["petto", "spalle", "gambe", "bicipiti", "tricipiti", "fullbody"];

    const DifficoltaMatrix = [
        ["facile", "1"],
        ["medio", "2"],
        ["difficile", "3"],
    ];

    // const handleCloseImage = () => setShowImage(false);
    // const handleShowImage = () => setShowImage(true);

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

    return (
        <>
            {" "}
            <p className="m-0 text-light mt-3">Filtra Esercizi per Parte Del corpo:</p>
            <h3 className="text-warning fw-bold fs-1">
                {parteCorpo.charAt(0).toLocaleUpperCase() + parteCorpo.slice(1)}
            </h3>
            <div className="d-flex flex-wrap justify-content-start">
                {ArrayIcone.map((icon, i) => (
                    <Button
                        onClick={() => {
                            setParteCorpo(ValoriArray[i]);
                            setArrayPartiCorpo(() => {
                                let newArray = [false, false, false, false, false, false];
                                newArray[i] = !newArray[i];
                                return newArray;
                            });
                        }}
                        variant="transparent"
                        className="p-0 enlight bg-button"
                        key={`card-icon${i}`}
                        style={{
                            backgroundColor: ArrayPartiCorpo[i] ? "#fea800" : "transparent",
                            border: ArrayPartiCorpo[i] ? "rgb(244, 164, 96) 4px solid" : "",
                        }}
                    >
                        <Card
                            // onClick={Selected}
                            className="p-0"
                            bg="transparent"
                            style={{ height: "100px", border: "none" }}
                        >
                            <Card.Body className="p-3">
                                <img src={icon} alt="icon-muscolo" />
                            </Card.Body>
                        </Card>
                    </Button>
                ))}
            </div>
            <div className="my-4">
                <p className="m-0 text-light">Filtra esercizi per difficoltà: </p>
                <h3 className="text-warning fw-bold fs-1">
                    {difficolta === "1" ? "Facile" : difficolta === "2" ? "Medio" : "Difficile"}
                </h3>

                {DifficoltaMatrix.map((diff, i) => (
                    <Button
                        onClick={() => {
                            setDifficolta(diff[1]);
                            setArrayDifficolta(() => {
                                let newArray = [false, false, false];
                                newArray[i] = !newArray[i];
                                return newArray;
                            });
                        }}
                        variant="transparent"
                        className="p-0 enlight bg-button"
                        style={{
                            backgroundColor: ArrayDifficolta[i] ? "#fea800" : "transparent",
                            border: ArrayDifficolta[i] ? "rgb(244, 164, 96) 4px solid" : "",
                        }}
                        key={`card-icon${i}`}
                    >
                        <Card className="p-0" bg="transparent">
                            <Card.Body className="p-3 text-light "> {diff[0]}</Card.Body>
                        </Card>
                    </Button>
                ))}
            </div>
            <div hidden className="my-2">
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
        </>
    );
};

export default PannelloSceltaEsercizi;
