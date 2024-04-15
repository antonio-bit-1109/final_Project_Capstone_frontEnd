import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { LocalHostPath } from "../../../functions/localHostPath";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { PostAllenamentoConcluso } from "../../../redux/actions/fetchAllenamento";
import { setAllenamentoSceltogiaCreato } from "../../../redux/reducers/allenamentiReducer";

// eslint-disable-next-line react/prop-types
const BottoniFinePagina = ({ AllenamentoSceltogiaCreato }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(
            PostAllenamentoConcluso(LocalHostPath + "/Allenamento/AllenamentoCompletato", AllenamentoSceltogiaCreato)
        );
        navigate("/");
        toast.success(" Complimenti, Hai terminato l'allenamento!", {
            autoClose: 2000,
        });
        dispatch(setAllenamentoSceltogiaCreato(null));
    };
    return (
        <Row>
            <Col>
                <div className="d-flex gap-2 my-4">
                    <Button variant="warning " className="rounded-4 text-light fw-bold" onClick={handleClick}>
                        {" "}
                        Termina e registra Allenamento completato{" "}
                    </Button>

                    <Button
                        variant="light"
                        className="rounded-4 text-warning border-warning fw-bold"
                        onClick={() => navigate("/allenamentiDisponibili")}
                    >
                        {" "}
                        Torna Indietro{" "}
                    </Button>
                </div>
            </Col>
        </Row>
    );
};

export default BottoniFinePagina;
