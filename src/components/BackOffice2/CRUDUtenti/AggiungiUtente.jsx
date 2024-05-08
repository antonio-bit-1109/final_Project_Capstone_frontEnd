import { Button } from "react-bootstrap";
import { PlusCircleFill } from "react-bootstrap-icons";

const AggiungiUtente = () => {
    // const dispatch = useDispatch();
    return (
        <>
            <div className={`d-flex flex-column align-items-center my-3`}>
                <Button variant="transparent">
                    <PlusCircleFill color="white" style={{ Height: "70px", Width: "70px" }} className="display-4" />{" "}
                    <p className="mt-2 text-light">Aggiungi Utente</p>
                </Button>
            </div>
        </>
    );
};

export default AggiungiUtente;