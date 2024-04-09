//import sia del css di bvootstrap che del css di react-toastify
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/General/Home";
import ToasterComponent from "./components/General/ToasterComponent";
import Login from "./components/General/Login";
import NavbarComponent from "./components/General/NavbarComponent";
import Prodotti from "./components/General/Prodotti";
import AllenamentiDisponibili from "./components/General/AllenamentiDisponibili";
import CreaTuoAllenamento from "./components/General/CreaAllenamento/CreaTuoAllenamento";
import Carrello from "./components/General/Carrello";
import PagamentoSuccesso from "./components/General/PagamentoSuccesso";
import PagamentoFallito from "./components/General/PagamentoFallito";
import SvolgiAllenamentoPresoDallaLista from "./components/General/SvolgiAllenamentoPresoDallaLista";
import ImpacchettaAllenamento from "./components/General/CreaAllenamento/ImpacchettaAllenamento";
import LIstaAllenamCompletati from "./components/General/Home/LIstaAllenamCompletati";
import Abbonamenti from "./components/General/Abbonamenti";
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
                        {/* <Route
                            path="ModificaDatiUtente"
                            element={
                                <>
                                    {" "}
                                    <NavbarComponent />
                                    <ModificaDatiUtente />
                                </>
                            }
                        /> */}
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
