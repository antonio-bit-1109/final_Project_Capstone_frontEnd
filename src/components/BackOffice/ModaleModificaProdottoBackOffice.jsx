/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
// import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { modificaProdotto } from "../../redux/actions/prodottiFetch";
import { LocalHostPath } from "../../functions/localHostPath";

const ModaleModificaProdottoBackOffice = ({
    idProdotto,
    showModalEditProdotto,
    handleCloseModalEditprodotto,
    DatiProdotto,
    setDatiprodotto,
}) => {
    const dispatch = useDispatch();
    const [immagineProdottoModifica, setImmagineProdottoModifica] = useState(null);

    // const {
    //     register: register2,
    //     handleSubmit: handleSubmit2,
    //     formState: { errors: errors2 },
    //     reset: reset2,
    // } = useForm();

    const HandleSubmittingModificaProdotto = (e) => {
        // console.log(data2);
        e.preventDefault();
        handleCloseModalEditprodotto();

        const formData2 = new FormData();
        formData2.append("immagineProdottoModifica", immagineProdottoModifica);

        console.log(DatiProdotto);
        dispatch(modificaProdotto(idProdotto, LocalHostPath, DatiProdotto, formData2));
        // reset2();
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
                    <Form onSubmit={HandleSubmittingModificaProdotto}>
                        <Form.Group className="mb-3" controlId="nomeprodotto">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="nuovo nome prodotto"
                                value={DatiProdotto.ProdottoNome}
                                onChange={(e) => setDatiprodotto({ ...DatiProdotto, ProdottoNome: e.target.value })}
                            />
                            {/* {errors2.ProdottoNomeModificato && (
                                <div className="text-danger">{errors2.ProdottoNomeModificato.message}</div>
                            )} */}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="prezzoprodotto">
                            <Form.Label>Prezzo</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="nuovo prezzo Prodotto"
                                value={DatiProdotto.prodottoPrezzo}
                                onChange={(e) => setDatiprodotto({ ...DatiProdotto, prodottoPrezzo: e.target.value })}
                            />
                            {/* {errors2.prodottoPrezzoModificato && (
                                <div className="text-danger">{errors2.prodottoPrezzoModificato.message}</div>
                            )} */}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="descrizioneprodotto">
                            <Form.Label>Descrizione</Form.Label>
                            <Form.Control
                                // {...register2("ProdottoDescrizione", {
                                //     required: false,
                                // })}
                                type="text"
                                placeholder="nuova descrizione prodotto"
                                value={DatiProdotto.ProdottoDescrizione}
                                onChange={(e) =>
                                    setDatiprodotto({ ...DatiProdotto, ProdottoDescrizione: e.target.value })
                                }
                            />
                            {/* {errors2.ProdottoDescrizioneModificato && (
                                <div className="text-danger">{errors2.ProdottoDescrizioneModificato.message}</div>
                            )} */}
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
