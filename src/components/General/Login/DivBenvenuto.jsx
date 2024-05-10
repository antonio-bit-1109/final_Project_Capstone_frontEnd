import { useSelector } from "react-redux";
import TestoBenvenuto from "./TestoBenvenuto";
import FormPerAccedere from "./FormPerAccedere";
import FormPerRegistrazioneNuovoUtente from "./FormPerRegistrazioneNuovoUtente";
import { Col } from "react-bootstrap";

const DivBenvenuto = () => {
    const { isFlipped, showDivAccesso, showDivRegistration } = useSelector((store) => store.ShowDivLogin);

    return (
        <div
            id="container"
            className={`d-flex justify-content-center ${
                (isFlipped && showDivAccesso && "bounceIn") || (isFlipped && showDivRegistration && "bounceIn")
            }`}
        >
            <Col xs="11" sm="10" md="6" lg="5">
                {" "}
                {!isFlipped && <TestoBenvenuto />}
                {isFlipped && showDivAccesso && <FormPerAccedere />}
                {isFlipped && showDivRegistration && <FormPerRegistrazioneNuovoUtente />}
            </Col>
        </div>
    );
};

export default DivBenvenuto;
