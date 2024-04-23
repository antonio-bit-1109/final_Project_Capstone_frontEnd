import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { AllenamentoFiltrato } from "../../../../redux/actions/fetchAllenamento";

const RowInputRicerca = () => {
    const dispatch = useDispatch();

    const [difficultIsClicked, setDifficultIsClicked] = useState([false, false, false]);
    const [Inputricerca, setInputRicerca] = useState(null);
    const [difficoltaAllenamento, setDifficoltaAllenamento] = useState(null);

    useEffect(() => {
        if (Inputricerca || difficoltaAllenamento || !difficoltaAllenamento) {
            dispatch(AllenamentoFiltrato(Inputricerca, difficoltaAllenamento));
        }
    }, [Inputricerca, dispatch, difficoltaAllenamento]);

    return (
        <div className=" customPosition-Row effettoVetro rounded-5 border mb-3 border-2 pb-sm-3 pb-lg-0">
            <Row className="justify-content-center">
                <Col xs="11" sm="10" md="8" lg="6" xl="5">
                    {" "}
                    <div className="my-4 d-flex align-items-center">
                        {/* input per ricerca allenamento */}
                        <div className="d-inline-block mx-3 text-light fs-3 fst-italic">Ricerca:</div>
                        <Form.Control
                            className="rounded-0 rounded-2"
                            type="text"
                            id="ricercaAllenamenti"
                            aria-describedby="ricercaAllenamenti"
                            value={Inputricerca}
                            onChange={(e) => {
                                setInputRicerca(e.target.value);
                            }}
                        />
                    </div>
                </Col>
                <Col xs="12" sm="10" lg="6" xl="4">
                    <div className="d-flex justify-content-center align-items-center h-100 flex-wrap pb-2 pb-lg-0">
                        <Button
                            onClick={() => {
                                setDifficoltaAllenamento(1);
                                setDifficultIsClicked(() => {
                                    let array = [false, false, false];
                                    array[0] = !array[0];
                                    return array;
                                });
                            }}
                            variant="transparent"
                            className={`bordino rounded-start-2 rounded-end-0 p-0 enlight_green ${
                                difficultIsClicked[0] ? "_green" : ""
                            }`}
                        >
                            <Card className="p-0" bg="transparent">
                                <Card.Body className="py-1 px-4 text-light">Facile</Card.Body>
                            </Card>
                        </Button>
                        <Button
                            onClick={() => {
                                setDifficoltaAllenamento(2);
                                setDifficultIsClicked(() => {
                                    let array = [false, false, false];
                                    array[1] = !array[1];
                                    return array;
                                });
                            }}
                            variant="transparent"
                            className={`bordino rounded-0 p-0 enlight_yellow ${difficultIsClicked[1] ? "_yellow" : ""}`}
                        >
                            <Card
                                // onClick={Selected}
                                className="p-0"
                                bg="transparent"
                            >
                                <Card.Body className="py-1 px-4 text-light">Media</Card.Body>
                            </Card>
                        </Button>
                        <Button
                            onClick={() => {
                                setDifficoltaAllenamento(3);
                                setDifficultIsClicked(() => {
                                    let array = [false, false, false];
                                    array[2] = !array[2];
                                    return array;
                                });
                            }}
                            variant="transparent"
                            className={`bordino rounded-0 p-0 enlight_red  ${difficultIsClicked[2] ? "_red" : ""}`}
                        >
                            <Card
                                // onClick={Selected}
                                className="p-0"
                                bg="transparent"
                            >
                                <Card.Body className="py-1 px-4 text-light">Difficile</Card.Body>
                            </Card>
                        </Button>
                        <Button
                            onClick={() => {
                                setDifficoltaAllenamento(null);
                                setDifficultIsClicked(() => {
                                    let array = [false, false, false];
                                    return array;
                                });
                            }}
                            variant="transparent"
                            className={`bordino rounded-0 rounded-end-2 p-0 enlight_white  ${
                                !difficultIsClicked[0] && !difficultIsClicked[1] && !difficultIsClicked[2]
                                    ? "_white"
                                    : ""
                            }`}
                        >
                            <Card
                                // onClick={Selected}
                                className="p-0"
                                bg="transparent"
                            >
                                <Card.Body className="py-1 rounded-end-2 px-4 text-light">Tutti</Card.Body>
                            </Card>
                        </Button>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default RowInputRicerca;
