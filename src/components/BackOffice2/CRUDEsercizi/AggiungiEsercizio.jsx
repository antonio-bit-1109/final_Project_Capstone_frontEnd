import { Button } from "react-bootstrap";
import { PlusCircleFill } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { isModaleCreaEsercizioVisible } from "../../../redux/reducers/backOffice2Reducer";

const AggiungiEsercizio = () => {
    const dispatch = useDispatch();
    return (
        <>
            <div className={`d-flex flex-column align-items-start my-3`}>
                <Button onClick={() => dispatch(isModaleCreaEsercizioVisible(true))} variant="transparent">
                    <PlusCircleFill color="white" style={{ Height: "70px", Width: "70px" }} className="display-4" />{" "}
                    <p className="mt-2 text-light">Aggiungi Esercizio</p>
                </Button>
            </div>
        </>
    );
};

export default AggiungiEsercizio;
