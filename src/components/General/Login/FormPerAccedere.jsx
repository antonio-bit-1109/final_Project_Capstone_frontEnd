import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import { TokenFetch } from "../../../redux/actions/TokenFetch";
import { LocalHostPath } from "../../../functions/localHostPath";
import { useState } from "react";
import { ArrowLeft } from "react-bootstrap-icons";
import { isDivAccessoVisible, isDivFlipped, isDivRegistrazioneVisible } from "../../../redux/reducers/showDivLogin";
const FormPerAccedere = () => {
    const dispatch = useDispatch();

    const [token, setToken] = useState({
        username: "",
        password: "",
    });

    const handleSubmitting = (e) => {
        e.preventDefault();
        // fetch per fare il login con autenticazione
        dispatch(TokenFetch(LocalHostPath + "/Auth/token", token));
    };

    return (
        <div className="loginDiv rounded rounded-5 p-5 border border-light">
            {" "}
            {/* FORM PER ACCEDERE */}
            <div className="text-light">
                <div className="d-flex align-items-center">
                    {" "}
                    <h2 className="text-light me-auto">Accedi</h2>
                    <Button
                        onClick={() => {
                            dispatch(isDivFlipped(false));
                            dispatch(isDivAccessoVisible(false));
                            dispatch(isDivRegistrazioneVisible(false));
                        }}
                        variant="transparent"
                    >
                        <ArrowLeft size={60} color="white" />
                    </Button>
                </div>
                <Form onSubmit={handleSubmitting}>
                    <Form.Group className="mb-3" controlId="IdNome">
                        <Form.Label>Nome Utente</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nome Utente"
                            value={token.username}
                            onChange={(e) => setToken({ ...token, username: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="IdPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={token.password}
                            onChange={(e) => setToken({ ...token, password: e.target.value })}
                        />
                    </Form.Group>
                    <Button variant="warning " className="rounded-4 text-light fw-bold" type="submit">
                        Entra nel Portale
                    </Button>{" "}
                </Form>
            </div>
        </div>
    );
};

export default FormPerAccedere;
