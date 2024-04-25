/* eslint-disable react/prop-types */
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { CreaNuovoProdotto } from "../../redux/actions/prodottiFetch";
import { LocalHostPath } from "../../functions/localHostPath";
import { useState } from "react";

const ModaleCreaNuovoProdottoBackOffice = ({ handleClose, show }) => {
    const dispatch = useDispatch();

    const [ImmagineProdotto, setImmagineProdotto] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        // watch,
        reset,
    } = useForm();

    // SUBMIT CREAZIONE PRODOTTO
    const HandleSubmittingCreazioneProdotto = (data) => {
        console.log(data);
        handleClose();

        const formData = new FormData();
        formData.append("immagineProdotto", ImmagineProdotto);

        dispatch(CreaNuovoProdotto(LocalHostPath, data, formData));
        reset();
    };

    return (
        <>
            {" "}
            {/* MODALE CREA NUOVO PRODOTTO */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Crea Nuovo Prodotto </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* form creazione prodotti  */}
                    <Form onSubmit={handleSubmit(HandleSubmittingCreazioneProdotto)}>
                        {/* nome */}
                        <div className="my-2">
                            <Form.Label htmlFor="nomeProdotto">Nome Prodotto</Form.Label>
                            <Form.Control
                                {...register("nomeProdotto", {
                                    required: "Inserisci un nome per il prodotto da aggiungere.",
                                })}
                                type="text"
                                id="nomeProdotto"
                                aria-describedby="nome del prodotto "
                            />
                            {errors.nomeProdotto && <div className="text-danger">{errors.nomeProdotto.message}</div>}
                        </div>
                        {/* prezzo */}
                        <div className="my-2">
                            <Form.Label htmlFor="prezzoProdotto">Prezzo Prodotto</Form.Label>
                            <Form.Control
                                {...register("PrezzoProdotto", {
                                    required: "inserisci un prezzo per il prodotto.",
                                })}
                                type="number"
                                id="prezzoProdotto"
                                aria-describedby="prezzoProdotto"
                            />
                            {errors.PrezzoProdotto && (
                                <div className="text-danger">{errors.PrezzoProdotto.message}</div>
                            )}
                        </div>
                        {/* immagine */}
                        <div className="my-2">
                            <Form.Label htmlFor="ImmagineProdotto">Immagine Prodotto</Form.Label>
                            <Form.Control
                                onChange={(e) => setImmagineProdotto(e.target.files[0])}
                                type="file"
                                accept="image/*"
                                id="ImmagineProdotto"
                                aria-describedby="ImmagineProdotto"
                            />
                        </div>
                        {/* descrizione */}
                        <div className="my-2">
                            <Form.Label htmlFor="descrizione">Descrizione</Form.Label>
                            <Form.Control
                                {...register("descrizione", {
                                    required: "inserisci una descrizione.",
                                })}
                                type="text"
                                id="descrizione"
                                aria-describedby="descrizione prodotto "
                            />
                            {errors.descrizione && <div className="text-danger">{errors.descrizione.message}</div>}
                        </div>
                        <Modal.Footer>
                            <Button
                                variant="light"
                                className="rounded-4 text-warning border-warning fw-bold"
                                onClick={handleClose}
                            >
                                Chiudi
                            </Button>
                            <Button type="submit" variant="warning " className="rounded-4 text-light fw-bold">
                                Crea Prodotto
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ModaleCreaNuovoProdottoBackOffice;
