import { Button } from "react-bootstrap";
import { PlusCircleFill } from "react-bootstrap-icons";
import { isModaleCreateUtenteVisible } from "../../../redux/reducers/backOffice2Reducer";
import { useDispatch } from "react-redux";

const AggiungiUtente = () => {
    const dispatch = useDispatch();
    return (
        <>
            <div className={`d-flex flex-column align-items-center my-3`}>
                <Button onClick={() => dispatch(isModaleCreateUtenteVisible(true))} variant="transparent">
                    <PlusCircleFill color="white" style={{ Height: "70px", Width: "70px" }} className="display-4" />{" "}
                    <p className="mt-2 text-light">Aggiungi Utente</p>
                </Button>
            </div>
        </>
    );
};

export default AggiungiUtente;
