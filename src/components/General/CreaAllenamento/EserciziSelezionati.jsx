/* eslint-disable react/prop-types */
import { Card, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RimuoviEsercizioDaArray } from "../../../redux/reducers/allenamentiReducer";

const EserciziSelezionati = () => {
    const dispatch = useDispatch();
    const ArrayAllenamento = useSelector((store) => store.allenamenti.allenamentoPersonalizzatoUtente);

    return (
        <>
            {/* sezione vista esercizi selezionati */}
            <Col xs="12" md="12" lg="6" xl="6" xxl="6">
                <div className="sticky-top d-flex flex-column align-items-center">
                    {ArrayAllenamento && ArrayAllenamento.length > 0 && (
                        <div className="d-flex justify-content-center mt-4">
                            <h4 className="display-3 text-light">Esercizi Selezionati</h4>
                        </div>
                    )}{" "}
                    {ArrayAllenamento &&
                        ArrayAllenamento.map((esercizio, index) => (
                            <div
                                key={`div-${index}`}
                                className="border border-2 p-3 rounded-5 w-75 my-1 position-relative shadow-lg effettoVetro text-light"
                            >
                                <div className="d-flex justify-content-center">
                                    <Card.Title className="d-flex justify-content-center fw-bold fs-3">
                                        {esercizio.nomeEsercizio}
                                    </Card.Title>
                                    <button
                                        onClick={() => dispatch(RimuoviEsercizioDaArray(esercizio.idEsercizio))}
                                        style={{ border: "none" }}
                                        className="positionX effettoVetro "
                                    >
                                        ❌
                                    </button>
                                </div>

                                <div className="d-flex gap-3 justify-content-center">
                                    <div className="d-flex justify-content-around">
                                        <Card.Text>
                                            {" "}
                                            <span className="fw-semibold fs-5">Serie:</span>
                                            <span className="fw-semibold fs-3 ms-2">{esercizio.serie}</span>
                                        </Card.Text>
                                    </div>
                                    <div className="d-flex justify-content-around">
                                        <Card.Text>
                                            {" "}
                                            <span className="fw-semibold fs-4">Ripetizioni:</span>
                                            <span className="fw-semibold fs-3 ms-2">{esercizio.ripetizioni}</span>
                                        </Card.Text>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </Col>
        </>
    );
};

export default EserciziSelezionati;
