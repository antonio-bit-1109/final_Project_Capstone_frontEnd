import { Button, Col } from "react-bootstrap";
import { PlusCircleFill } from "react-bootstrap-icons";
import workout from "../../../assets/workout.svg";
import Dumbell from "../../../assets/dumbbell.svg";
import { useDispatch, useSelector } from "react-redux";
import { PushInArrayAllenamento } from "../../../redux/reducers/allenamentiReducer";
import { GetEsercizi } from "../../../redux/actions/fetchEsercizi";

// eslint-disable-next-line react/prop-types
const RowSuperioreIcone = ({ setShowCreateEsercizio }) => {
    const dispatch = useDispatch();

    const { TuttiDettagliUtenteLoggato } = useSelector((store) => store.utenti);
    const { listaEsercizi } = useSelector((store) => store.esercizi);

    const handleShowCreateEsercizio = () => setShowCreateEsercizio(true);

    const GeneraAllenamentoCasuale = () => {
        TrovaEserciziocasuale();

        if (listaEsercizi.length > 0) {
            dispatch(PushInArrayAllenamento(listaEsercizi[0]));
        }
    };

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

    return (
        <>
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
                            <PlusCircleFill style={{ Height: "56px", Width: "56px" }} className="display-4" />
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
        </>
    );
};

export default RowSuperioreIcone;
