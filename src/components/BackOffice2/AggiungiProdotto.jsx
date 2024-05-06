import { Button } from "react-bootstrap";
import { PlusCircleFill } from "react-bootstrap-icons";
import PropTypes from "prop-types";

const AggiungiProdotto = ({ handleShow }) => {
    return (
        <>
            <div className="d-flex flex-column align-items-center my-3">
                <Button onClick={handleShow} variant="transparent">
                    <PlusCircleFill color="white" style={{ Height: "70px", Width: "70px" }} className="display-4" />{" "}
                    <p className="mt-2 text-light">Aggiungi Prodotto</p>
                </Button>
            </div>
        </>
    );
};

export default AggiungiProdotto;

AggiungiProdotto.propTypes = {
    handleShow: PropTypes.func.isRequired,
};
