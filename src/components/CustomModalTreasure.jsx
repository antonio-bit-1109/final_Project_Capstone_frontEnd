import { Button } from "react-bootstrap";

// eslint-disable-next-line react/prop-types
const CustomModalTreasure = ({ showCustomModalTreasure }) => {
    return (
        <>
            <div
                className={` ${
                    showCustomModalTreasure ? "d-flex flex-column" : "d-none"
                } profondita p-5 altezza-sfondo justify-content-center align-items-center position-absolute top-0 end-0 start-0 w-100 zindex customProp`}
            >
                <h2 className={`text-light fw-bold display-1 ${showCustomModalTreasure && "customModalAnimation"}`}>
                    hai trovato un tesoro! Hai vinto 5 giorni di abbonamento{" "}
                    <span className="size puff-in">gratis!</span>
                </h2>
                <div>
                    <Button variant="warning " className="rounded-4 text-light fw-bold">
                        Riscuoti il tuo bottino!
                    </Button>
                </div>
            </div>
        </>
    );
};

export default CustomModalTreasure;
