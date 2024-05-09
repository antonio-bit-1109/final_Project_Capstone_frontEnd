import { useSelector } from "react-redux";
import TestoBenvenuto from "./TestoBenvenuto";
import FormPerAccedere from "./FormPerAccedere";
import FormPerRegistrazioneNuovoUtente from "./FormPerRegistrazioneNuovoUtente";
import { Col } from "react-bootstrap";

const DivBenvenuto = () => {
    const { isFlipped, showDivAccesso, showDivRegistration } = useSelector((store) => store.ShowDivLogin);

    return (
        <>
            <Col
                //  className={`${addRotateAnimationUP ? "rotate-scale-up-diag-1 " : ""} ${
                //      addRotateAnimationDOWN ? "rotate-scale-down-diag-1" : ""
                //  }`}
                xs="11"
                sm="10"
                md="6"
                lg="5"
            >
                {" "}
                {!isFlipped && <TestoBenvenuto />}
                {isFlipped && showDivAccesso && <FormPerAccedere />}
                {isFlipped && showDivRegistration && <FormPerRegistrazioneNuovoUtente />}
            </Col>
        </>
    );
};

export default DivBenvenuto;
