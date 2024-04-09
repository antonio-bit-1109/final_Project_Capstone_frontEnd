import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setnomeAllenamentoCreato } from "../../../redux/reducers/allenamentiReducer";

// eslint-disable-next-line react/prop-types
const ModaleInserimentoNomeAllenamento = ({ show, handleClose }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const ArrayAllenamento = useSelector((store) => store.allenamenti.allenamentoPersonalizzatoUtente);
    const [nomeAllenamentoInput, setnomeAllenamentoInput] = useState("");

    return (
        <>
            {" "}
            {/* MODALE PER INSERIMENTO NOME ALLENAMENTO */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Inserisci nome dell&apos;allenamento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {" "}
                    <Form.Control
                        type="text"
                        id="nomeAllenamento"
                        onChange={(e) => {
                            setnomeAllenamentoInput(e.target.value);
                        }}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="light"
                        className="rounded-4 text-warning border-warning fw-bold"
                        onClick={handleClose}
                    >
                        Chiudi
                    </Button>
                    <Button
                        variant="warning "
                        className="rounded-4 text-light fw-bold"
                        onClick={() => {
                            if (ArrayAllenamento.length === 0) {
                                setnomeAllenamentoCreato("");
                                handleClose();
                                toast.info("il tuo Allenamento non contiene esercizi", {
                                    autoClose: 2000,
                                    position: "top-center",
                                });
                                return;
                            }

                            if (ArrayAllenamento.length <= 2) {
                                setnomeAllenamentoCreato("");
                                handleClose();
                                toast.info("il tuo Allenamento deve contenere almeno 3 esercizi, DAIE MPO!", {
                                    autoClose: 2000,
                                    position: "top-center",
                                });
                                return;
                            }

                            dispatch(setnomeAllenamentoCreato(nomeAllenamentoInput));
                            navigate("/CreaAllenamento/impacchettaAllenamento");
                        }}
                    >
                        Conferma{" "}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModaleInserimentoNomeAllenamento;
