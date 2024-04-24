import { Col } from "react-bootstrap";
import { useSelector } from "react-redux";

const KcalBruciate = () => {
    const { TuttiDettagliUtenteLoggato } = useSelector((store) => store.utenti);
    console.log(TuttiDettagliUtenteLoggato);

    return (
        <>
            <Col xs="12" sm="12" md="7" lg="8" xl="7">
                <div className="d-flex flex-column py-3">
                    {/* timer kcal Bruciate */}
                    <div className="display-3 rounded rounded-5 my-4 p-3 shadow-lg bg-button">
                        <span className="text-light d-flex justify-content-center">
                            Kcal Bruciate : <span className="fw-bold ms-3 text-warning">0</span>
                        </span>
                    </div>
                </div>
            </Col>
        </>
    );
};

export default KcalBruciate;
