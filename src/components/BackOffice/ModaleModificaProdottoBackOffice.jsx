/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { modificaProdotto } from "../../redux/actions/prodottiFetch";
import { LocalHostPath } from "../../functions/localHostPath";

const ModaleModificaProdottoBackOffice = ({ idProdotto, showModalEditProdotto, handleCloseModalEditprodotto }) => {
    const dispatch = useDispatch();
    const [immagineProdottoModifica, setImmagineProdottoModifica] = useState(null);

    const {
        register: register2,
        handleSubmit: handleSubmit2,
        formState: { errors: errors2 },
        reset: reset2,
    } = useForm();

    const HandleSubmittingModificaProdotto = (data2) => {
        console.log(data2);
        handleCloseModalEditprodotto();

        const formData2 = new FormData();
        formData2.append("immagineProdottoModifica", immagineProdottoModifica);

        dispatch(modificaProdotto(idProdotto, LocalHostPath, data2, formData2));
        reset2();
    };

    return (
        <>
            {" "}
            {/* MODALE MODIFICA PRODOTTO */}
            <Modal show={showModalEditProdotto} onHide={handleCloseModalEditprodotto}>
                <Modal.Header closeButton>
                    <Modal.Title>Modifica Prodotto Selezionato</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit2(HandleSubmittingModificaProdotto)}>
                        <Form.Group className="mb-3" controlId="nomeprodotto">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                {...register2("ProdottoNome", {
                                    required: false,
                                })}
                                type="text"
                                placeholder="nuovo nome prodotto"
                            />
                            {errors2.ProdottoNomeModificato && (
                                <div className="text-danger">{errors2.ProdottoNomeModificato.message}</div>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="prezzoprodotto">
                            <Form.Label>Prezzo</Form.Label>
                            <Form.Control
                                {...register2("prodottoPrezzo", {
                                    required: false,
                                })}
                                type="number"
                                placeholder="nuovo prezzo Prodotto"
                            />
                            {errors2.prodottoPrezzoModificato && (
                                <div className="text-danger">{errors2.prodottoPrezzoModificato.message}</div>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="descrizioneprodotto">
                            <Form.Label>Descrizione</Form.Label>
                            <Form.Control
                                {...register2("ProdottoDescrizione", {
                                    required: false,
                                })}
                                type="text"
                                placeholder="nuova descrizione prodotto"
                            />
                            {errors2.ProdottoDescrizioneModificato && (
                                <div className="text-danger">{errors2.ProdottoDescrizioneModificato.message}</div>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="immagine">
                            <Form.Label>Immagine</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                placeholder="inserisci nuova immagine"
                                onChange={(e) => setImmagineProdottoModifica(e.target.files[0])}
                            />
                        </Form.Group>
                        <Modal.Footer>
                            <Button
                                variant="light"
                                className="rounded-4 text-warning border-warning fw-bold"
                                onClick={handleCloseModalEditprodotto}
                            >
                                Chiudi
                            </Button>
                            <Button type="submit" variant="warning " className="rounded-4 text-light fw-bold">
                                Salva Modifiche
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ModaleModificaProdottoBackOffice;
