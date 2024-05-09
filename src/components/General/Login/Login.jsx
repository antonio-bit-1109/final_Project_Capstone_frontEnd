import sfondo from "../../../assets/bg-login.webp";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
// import { TokenFetch } from "../../../redux/actions/TokenFetch";
// import { LocalHostPath } from "../../../functions/localHostPath";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setTokenUtente } from "../../../redux/reducers/tokenReducer";
// import { useForm } from "react-hook-form";
// import { PostUtenteRegistrato } from "../../../redux/actions/fetchUtenti";
// import FormPerAccedere from "./FormPerAccedere";
// import FormPerRegistrazioneNuovoUtente from "./FormPerRegistrazioneNuovoUtente";
import DivBenvenuto from "./DivBenvenuto";

function Login() {
    // const password = watch("password", "");
    // const { UtenteAppenaRegistrato } = useSelector((store) => store.utenti);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { TokenUtente } = useSelector((store) => store.token);
    const { DatiUtenteLoggato } = useSelector((store) => store.token);
    // const [show, setShow] = useState(false);
    // const [showReg, setShowReg] = useState(false);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    // const handleCloseReg = () => setShowReg(false);
    // const handleShowReg = () => setShowReg(true);

    // const submitHandlerRegistration = (data) => {
    //     console.log(data);
    //     //PER CHIUDERE IL MODALE DOPO LA REGISTRAZIONE
    //     dispatch(PostUtenteRegistrato(LocalHostPath + "/Auth/registrazione", data));
    //     // handleCloseReg();
    //     reset();
    // };

    useEffect(() => {
        if (TokenUtente) {
            if (DatiUtenteLoggato) {
                toast.success("Benvenuto " + DatiUtenteLoggato.nome, { autoClose: 1500 });
                dispatch(setTokenUtente(TokenUtente));
                navigate("/");
            }

            if (TokenUtente === "Unauthorized") {
                toast.error("Credenziali errate, riprova");
                navigate("/login");
                dispatch(setTokenUtente(null));
                // setShow(false);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [TokenUtente, dispatch, navigate]);

    // useEffect(() => {
    //     if (UtenteAppenaRegistrato !== null) {
    //         if (UtenteAppenaRegistrato && UtenteAppenaRegistrato.nome === watch("nome")) {
    //             toast.success("Registrazione avvenuta con successo! Effettua il login per continuare", {
    //                 position: "top-center",
    //                 autoClose: 3000,
    //             });
    //         }
    //     }
    // }, [UtenteAppenaRegistrato, watch]);

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{
                minHeight: "100vh",
                width: "100%",
                backgroundImage: `url(${sfondo})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <Container>
                <Row className="justify-content-center">
                    <DivBenvenuto />
                </Row>
            </Container>
        </div>
    );
}

export default Login;
