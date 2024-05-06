import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LocalHostPath } from "../../functions/localHostPath";
import { SalvaDatiprodotto, SetImmagineProdotto } from "../../redux/reducers/backOffice2Reducer";
import { modificaProdotto } from "../../redux/actions/prodottiFetch";

const ModaleModificaProdotto = () => {
    const dispatch = useDispatch();

    const { idProdotto } = useSelector((store) => store.BackOffice2);
    const { immagineProdotto } = useSelector((store) => store.BackOffice2);
    const { datiprodotto } = useSelector((store) => store.BackOffice2);

    const HandleSubmittingModificaProdotto = (e) => {
        e.preventDefault();
        // handleCloseModalEditprodotto();

        const formData2 = new FormData();
        formData2.append("immagineProdotto", immagineProdotto);

        // console.log(DatiProdotto);
        dispatch(modificaProdotto(idProdotto, LocalHostPath, datiprodotto, formData2));
    };

    return (
        <>
            <div>
                {" "}
                <h3 className="text-light display-6">Modifica Prodotto Selezionato:</h3>
            </div>
            <div className="text-light">
                <Form onSubmit={HandleSubmittingModificaProdotto}>
                    <Form.Group className="mb-3" controlId="nomeprodotto">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="clicca sul tasto di modifica nella card"
                            onChange={
                                (e) =>
                                    dispatch(
                                        SalvaDatiprodotto({
                                            ...datiprodotto,
                                            nomeProdotto: e.target.value,
                                        })
                                    )
                                //   setDatiprodotto({
                                //       ...datiprodotto,
                                //       nomeProdotto: e.target.value,
                                //   })
                            }
                            value={datiprodotto.nomeProdotto}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="prezzoprodotto">
                        <Form.Label>Prezzo</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="clicca sul tasto di modifica nella card"
                            onChange={
                                (e) =>
                                    dispatch(
                                        SalvaDatiprodotto({
                                            ...datiprodotto,
                                            PrezzoProdotto: e.target.value,
                                        })
                                    )
                                //   setDatiprodotto({
                                //       ...datiprodotto,
                                //       nomeProdotto: e.target.value,
                                //   })
                            }
                            value={datiprodotto.PrezzoProdotto}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="descrizioneprodotto">
                        <Form.Label>Descrizione</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="clicca sul tasto di modifica nella card"
                            onChange={
                                (e) =>
                                    dispatch(
                                        SalvaDatiprodotto({
                                            ...datiprodotto,
                                            DescrizioneProdotto: e.target.value,
                                        })
                                    )
                                //   setDatiprodotto({
                                //       ...datiprodotto,
                                //       nomeProdotto: e.target.value,
                                //   })
                            }
                            value={datiprodotto.DescrizioneProdotto}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="immagine">
                        <Form.Label>Immagine</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            placeholder="clicca sul tasto di modifica nella card"
                            onChange={(e) => dispatch(SetImmagineProdotto(e.target.files[0]))}
                        />
                    </Form.Group>
                    <div>
                        <Button type="submit" variant="warning " className="rounded-4 text-light fw-bold">
                            Modifica Prodotto
                        </Button>
                    </div>
                </Form>
            </div>
        </>
    );
};

export default ModaleModificaProdotto;
