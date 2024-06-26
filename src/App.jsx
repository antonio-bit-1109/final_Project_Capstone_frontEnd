//import sia del css di bvootstrap che del css di react-toastify
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/General/Home/Home";
import ToasterComponent from "./components/General/ToasterComponent";
import Login from "./components/General/Login/Login";
import NavbarComponent from "./components/General/NavbarComponent";
import Prodotti from "./components/General/Prodotti";
import AllenamentiDisponibili from "./components/General/AllenamentiDisponibili/AllenamentiDisponibili";
import CreaTuoAllenamento from "./components/General/CreaAllenamento/CreaTuoAllenamento";
import Carrello from "./components/General/Carrello";
import PagamentoSuccesso from "./components/General/PagamentoSuccesso";
import PagamentoFallito from "./components/General/PagamentoFallito";
import SvolgiAllenamentoPresoDallaLista from "./components/General/SvolgiAllenamento/SvolgiAllenamentoPresoDallaLista";
import ImpacchettaAllenamento from "./components/General/CreaAllenamento/ImpacchettaAllenamento";
import LIstaAllenamCompletati from "./components/General/Home/LIstaAllenamCompletati";
import Abbonamenti from "./components/General/Utente/Abbonamenti";
import ModificaDatiUtente from "./components/General/Home/ModificaDatiUtente";
import StoricoAcquisti from "./components/General/Utente/StoricoAcquisti";
import SocialMain from "./components/General/SocialMedia/SocialMain";
import BackOffice2 from "./components/BackOffice2/CRUDProdotti/BackOffice2";
import BackOffice2Esercizio from "./components/BackOffice2/CRUDEsercizi/BackOffice2Esercizio";
import BackOffice2Utenti from "./components/BackOffice2/CRUDUtenti/BackOffice2Utenti";
// import BackOffice from "./components/BackOffice/BackOffice";
// import ModificaDatiUtente from "./components/General/Utente/ModificaDatiUtente";

function App() {
    return (
        <>
            {" "}
            <BrowserRouter>
                <ToasterComponent />

                <Routes>
                    {" "}
                    <Route path="/login" element={<Login />} />
                    <Route path="/">
                        <Route
                            index
                            element={
                                <>
                                    <NavbarComponent />
                                    <Home />
                                </>
                            }
                        />
                        <Route
                            path="ListaAllenamentiCompletati"
                            element={
                                <>
                                    {" "}
                                    <NavbarComponent />
                                    <LIstaAllenamCompletati />
                                </>
                            }
                        />
                        <Route
                            path="ModificaDatiUtente"
                            element={
                                <>
                                    {" "}
                                    <NavbarComponent />
                                    {/* <ModificaDatiUtente /> */}
                                    <ModificaDatiUtente />
                                </>
                            }
                        />
                        <Route
                            path="StoricoAcquisti"
                            element={
                                <>
                                    {" "}
                                    <NavbarComponent />
                                    <StoricoAcquisti />
                                </>
                            }
                        />
                    </Route>
                    <Route
                        path="/prodotti"
                        element={
                            <>
                                {" "}
                                <NavbarComponent />
                                <Prodotti />
                            </>
                        }
                    />
                    <Route
                        path="/AllenamentiDisponibili"
                        element={
                            <>
                                {" "}
                                <NavbarComponent />
                                <AllenamentiDisponibili />
                            </>
                        }
                    />
                    <Route
                        path="/Abbonamenti"
                        element={
                            <>
                                {" "}
                                <NavbarComponent />
                                <Abbonamenti />
                            </>
                        }
                    />
                    <Route path="/CreaAllenamento">
                        <Route
                            index
                            element={
                                <>
                                    <NavbarComponent />
                                    <CreaTuoAllenamento />
                                </>
                            }
                        />
                        <Route
                            path="impacchettaAllenamento"
                            element={
                                <>
                                    <ImpacchettaAllenamento />
                                </>
                            }
                        ></Route>
                    </Route>
                    <Route
                        path="/svolgiAllenamentoPresoDallaLista"
                        element={
                            <>
                                <SvolgiAllenamentoPresoDallaLista />
                            </>
                        }
                    ></Route>
                    <Route
                        path="/carrello"
                        element={
                            <>
                                {" "}
                                <NavbarComponent />
                                <Carrello />
                            </>
                        }
                    />
                    <Route
                        path="/pagamentoSuccess"
                        element={
                            <>
                                {" "}
                                <NavbarComponent />
                                <PagamentoSuccesso />
                            </>
                        }
                    />
                    <Route
                        path="/pagamentoFailed"
                        element={
                            <>
                                {" "}
                                <NavbarComponent />
                                <PagamentoFallito />
                            </>
                        }
                    />
                    <Route
                        path="/MainSocialMedia"
                        element={
                            <>
                                {" "}
                                <NavbarComponent />
                                <SocialMain />
                            </>
                        }
                    />{" "}
                    <Route path="/BackOffice">
                        <Route
                            index
                            element={
                                <>
                                    {" "}
                                    <NavbarComponent />
                                    {/* <BackOffice /> */}
                                    <BackOffice2 />
                                </>
                            }
                        />
                        <Route
                            path="Esercizio"
                            element={
                                <>
                                    {" "}
                                    <NavbarComponent />
                                    <BackOffice2Esercizio />
                                </>
                            }
                        />
                        <Route
                            path="Utenti"
                            element={
                                <>
                                    {" "}
                                    <NavbarComponent />
                                    <BackOffice2Utenti />
                                </>
                            }
                        />
                    </Route>
                </Routes>

                {/* <NavBar />
                <Routes>
                    <Route
                        path="/Login"
                        element={
                            <>
                                <Login />
                            </>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <>
                                <Home />
                            </>
                        }
                    />
                    <Route path="/utente">
                        <Route index element={<FormCreateutente />} />
                        <Route path="getUtente" element={<GetUtente />} />
                        <Route path="edit" element={<EditUtente />} />
                        <Route path="delete" element={<DeleteUtente />} />
                    </Route>

                    <Route path="/carrello" element={<CarrelloProva />} />

                    <Route path="/prodotto" element={<></>} />
                    <Route path="/prodottiVenduti" element={<></>} />
                    <Route path="/dettagliprodotto" element={<></>} />
                </Routes> */}
            </BrowserRouter>
        </>
    );
}

export default App;
