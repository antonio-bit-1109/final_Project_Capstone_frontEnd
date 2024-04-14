import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setnomeAllenamentoCreato } from "../../../redux/reducers/allenamentiReducer";
import { useForm } from "react-hook-form";

// eslint-disable-next-line react/prop-types
const ModaleInserimentoNomeAllenamento = ({ show, handleClose }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
        // watch,
        reset,
    } = useForm();

    const ArrayAllenamento = useSelector((store) => store.allenamenti.allenamentoPersonalizzatoUtente);
    const [nomeAllenamentoInput, setnomeAllenamentoInput] = useState("");

    const handleClickConferma = (data) => {
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

        if (data.nomeAllenamento.length <= 10) {
            dispatch(setnomeAllenamentoCreato(nomeAllenamentoInput));
            navigate("/CreaAllenamento/impacchettaAllenamento");
        }

        reset();
        return;
    };

    return (
        <>
            {" "}
            {/* MODALE PER INSERIMENTO NOME ALLENAMENTO */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Inserisci nome dell&apos;allenamento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(handleClickConferma)}>
                        {" "}
                        <Form.Control
                            {...register("nomeAllenamento", {
                                required: "Inserisci il nome dell'allenamento.",
                                maxLength: {
                                    value: 10,
                                    message: "Il nome non può contenere più di 10 caratteri",
                                },
                                pattern: {
                                    value: /^[A-Za-z0-9]+$/i,
                                    message: "Il nome dell'allenamento può contenere solo lettere e numeri.",
                                },
                            })}
                            type="text"
                            id="nomeAllenamento"
                            onChange={(e) => {
                                setnomeAllenamentoInput(e.target.value);
                            }}
                        />
                        {errors.nomeAllenamento && <div className="text-danger">{errors.nomeAllenamento.message}</div>}
                        <Modal.Footer>
                            <Button
                                variant="light"
                                className="rounded-4 text-warning border-warning fw-bold"
                                onClick={() => {
                                    handleClose();
                                    reset();
                                }}
                            >
                                Chiudi
                            </Button>
                            <Button variant="warning " className="rounded-4 text-light fw-bold" type="submit">
                                Conferma{" "}
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ModaleInserimentoNomeAllenamento;
