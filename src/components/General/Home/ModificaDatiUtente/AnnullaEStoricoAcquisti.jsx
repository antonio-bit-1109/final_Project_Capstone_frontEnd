import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { annullaAbbonamento } from "../../../../redux/actions/fetchAbbonamenti";
import { useDispatch } from "react-redux";

const AnnullaEStoricoAcquisti = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAnnullaAbbonamento = () => {
        dispatch(annullaAbbonamento());
    };

    return (
        <>
            <Row className="justify-content-center">
                <Col xs="12" sm="10" md="10" lg="6" xl="4">
                    <div className="d-flex gap-2 my-4 justify-content-center">
                        <Button
                            variant="light"
                            className="rounded-4 text-warning border-warning fw-bold"
                            onClick={handleAnnullaAbbonamento}
                        >
                            {" "}
                            Annulla Abbonamento{" "}
                        </Button>
                        <Button
                            variant="warning "
                            className="rounded-4 text-light fw-bold"
                            onClick={() => navigate("/StoricoAcquisti")}
                        >
                            {" "}
                            Storico acquisti{" "}
                        </Button>
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default AnnullaEStoricoAcquisti;
