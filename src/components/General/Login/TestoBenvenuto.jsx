import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { isDivAccessoVisible, isDivFlipped, isDivRegistrazioneVisible } from "../../../redux/reducers/showDivLogin";

const TestoBenvenuto = () => {
    const dispatch = useDispatch();
    return (
        <div className="loginDiv rounded rounded-5 p-4 border border-light">
            <div className="d-flex flex-column align-items-center justify-content-center">
                {" "}
                <h1 className="text-light display-3 fw-bold mx-auto text-center">Benvenuto in EpicWorkout</h1>
                <h5 className="text-light mb-3 text-center">Accedi o Registrati per continuare </h5>
                <div className="d-flex gap-3">
                    {" "}
                    <Button
                        onClick={() => {
                            dispatch(isDivFlipped(true));
                            dispatch(isDivAccessoVisible(true));
                            dispatch(isDivRegistrazioneVisible(false));
                            //  dispatch(IsRotateAnimationUPAdded(false));
                        }}
                        variant="warning text-light"
                        className="rounded-4 text-warning border-warning fw-bold color"
                    >
                        {" "}
                        Accedi{" "}
                    </Button>{" "}
                    <Button
                        onClick={() => {
                            dispatch(isDivFlipped(true));
                            dispatch(isDivAccessoVisible(false));
                            dispatch(isDivRegistrazioneVisible(true));
                        }}
                        variant="light"
                        className="rounded-4 text-warning border-warning fw-bold"
                    >
                        {" "}
                        Registrati{" "}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default TestoBenvenuto;
