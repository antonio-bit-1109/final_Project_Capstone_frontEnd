/* eslint-disable react/prop-types */
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { SvuotaArrayAllenamento, setnomeAllenamentoCreato } from "../../../redux/reducers/allenamentiReducer";

// eslint-disable-next-line react/prop-types
const BottoniSvuotaConferma = ({ ArrayAllenamento, setShow }) => {
    const dispatch = useDispatch();
    const handleShow = () => setShow(true);

    return (
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
    );
};

export default BottoniSvuotaConferma;
