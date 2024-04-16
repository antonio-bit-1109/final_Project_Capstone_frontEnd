// eslint-disable-next-line react/prop-types
const ObscureGraphic = ({ TuttiDettagliUtenteLoggato }) => {
    return (
        <div
            // eslint-disable-next-line react/prop-types
            style={{ display: TuttiDettagliUtenteLoggato.idAbbonamento === null ? "block" : "none" }}
            className="obscure position-absolute top-0 start-0"
        >
            <div className="d-flex justify-content-center h-100 align-items-center w-75 m-auto">
                {" "}
                <h3 className="text-light display-5 fw-semibold">
                    Per visualizzare dettagli Aggiuntivi, Sottoscrivi un abbonamento.
                </h3>{" "}
            </div>
        </div>
    );
};

export default ObscureGraphic;
