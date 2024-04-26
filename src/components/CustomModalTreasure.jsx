import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AbbonamentoBonus } from "../redux/actions/fetchEsterEgg";

// eslint-disable-next-line react/prop-types
const CustomModalTreasure = () => {
    const dispatch = useDispatch();
    const { showModalTreasure } = useSelector((store) => store.bonus);

    const riscuotiBottino = () => {
        dispatch(AbbonamentoBonus());
    };

    return (
        <>
            <div
                className={` ${
                    showModalTreasure ? "d-flex flex-column" : "d-none"
                } profondita p-5 altezza-sfondo justify-content-center align-items-center position-absolute top-0 end-0 start-0 w-100 zindex customProp`}
            >
                <div>
                    <h2
                        className={`text-light text-center fw-bold display-1 ${
                            showModalTreasure && "customModalAnimation"
                        }`}
                    >
                        hai trovato un tesoro! <br /> Hai vinto 5 giorni di abbonamento{" "}
                        <span className="size puff-in">gratis!</span>
                    </h2>
                </div>

                <div>
                    <Button onClick={riscuotiBottino} variant="warning " className="rounded-4 text-light fw-bold p-3">
                        <span className=" fst-italic fs-3">Riscuoti il tuo bottino!</span>
                    </Button>
                </div>
            </div>
        </>
    );
};

export default CustomModalTreasure;
