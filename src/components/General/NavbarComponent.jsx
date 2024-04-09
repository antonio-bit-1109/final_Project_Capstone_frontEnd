import { Badge, Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setTokenUtente, setDatiutenteLoggato } from "../../redux/reducers/tokenReducer";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import logo from "../../assets/logo.svg";
import { rimuoviTuttoDalCArrello, setCarrelloOttimizzato } from "../../redux/reducers/prodottiReducer";
import { SvuotaArrayAllenamento, setnomeAllenamentoCreato } from "../../redux/reducers/allenamentiReducer";
import { CartFill } from "react-bootstrap-icons";
import { rimuoviTuttiAllenamentiCompletatiUtente } from "../../redux/reducers/allenamentiCompletatiReducer";

function NavbarComponent() {
    const { carrelloProdotti } = useSelector((store) => store.prodotti);
    const TokenRedux = useSelector((store) => store.token.TokenUtente);
    // const { DatiUtenteLoggato } = useSelector((store) => store.token);
    console.log("console log del token che sta nella navbar", TokenRedux);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (TokenRedux === null) {
            navigate("/login");
        }
    }, [TokenRedux, navigate]);

    return (
        <>
            {" "}
            <Navbar expand="lg" bg="dark" data-bs-theme="dark">
                <Container fluid>
                    <Navbar.Brand as={NavLink} to={"/"}>
                        <img style={{ width: "50px" }} src={logo} alt="logo-app" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="m-auto">
                            <div className="d-flex flex-column align-items-start flex-lg-row gap-1">
                                <Nav.Link as={NavLink} to={"/"}>
                                    Home
                                </Nav.Link>

                                <Nav.Link as={NavLink} to={"/allenamentiDisponibili"}>
                                    Allenamenti Disponibili{" "}
                                </Nav.Link>
                                <Nav.Link as={NavLink} to={"/CreaAllenamento"}>
                                    Crea il Tuo Allenamento{" "}
                                </Nav.Link>
                                <Nav.Link as={NavLink} to={"/prodotti"}>
                                    Sezione Prodotti{" "}
                                </Nav.Link>
                                <Nav.Link as={NavLink} to={"/Abbonamentotrainer"}>
                                    Abbonamento Trainer{" "}
                                </Nav.Link>
                            </div>
                            <div className="position-relative customWidth d-flex">
                                <Nav.Link as={NavLink} to={"/carrello"}>
                                    <Badge className="position-absolute top-0 end-0" bg="warning">
                                        {carrelloProdotti.length}
                                    </Badge>
                                    <CartFill fontSize={25} />
                                </Nav.Link>
                                <NavDropdown id="basic-nav-dropdown">
                                    {TokenRedux !== null ? (
                                        <NavDropdown.Item
                                            onClick={() => {
                                                dispatch(setTokenUtente(null));
                                                dispatch(setDatiutenteLoggato(null));
                                                dispatch(SvuotaArrayAllenamento());
                                                dispatch(setnomeAllenamentoCreato(""));
                                                dispatch(rimuoviTuttoDalCArrello());
                                                dispatch(setCarrelloOttimizzato([]));
                                                toast.success("Logout effettuato", { position: "top-center" });
                                                dispatch(rimuoviTuttoDalCArrello());
                                                dispatch(rimuoviTuttiAllenamentiCompletatiUtente());
                                            }}
                                        >
                                            Logout
                                        </NavDropdown.Item>
                                    ) : (
                                        <NavDropdown.Item>Login</NavDropdown.Item>
                                    )}
                                </NavDropdown>
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default NavbarComponent;
