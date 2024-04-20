// /* eslint-disable react/prop-types */
// import { useEffect, useRef, useState } from "react";
// import { Button, Col } from "react-bootstrap";
// import { toast } from "react-toastify";

// // eslint-disable-next-line react/prop-types
// const TimerComponent = ({ AllenamentoSceltogiaCreato, setIscoCustomModalVisible, setCount }) => {
//     const timerRef = useRef();
//     const [minuti, setMinuti] = useState(null);
//     const [secondi, setSecondi] = useState(0);
//     const [Arrayrecuperi, setArrayRecuperi] = useState([]);
//     const [timerIsRunning, setTimerIsRunning] = useState(false);

//     useEffect(() => {
//         if (AllenamentoSceltogiaCreato) {
//             setMinuti(AllenamentoSceltogiaCreato.durataTotaleAllenamento);
//             timerRef.current = AllenamentoSceltogiaCreato.durataTotaleAllenamento;
//             let array = [];
//             AllenamentoSceltogiaCreato.esercizi.map((es) => {
//                 array.push(es.recupero);
//             });
//             setArrayRecuperi(array);
//         }
//     }, [AllenamentoSceltogiaCreato]);

//     useEffect(() => {
//         if (timerIsRunning) {
//             if (timerRef.current !== minuti) {
//                 setMinuti(minuti);
//                 setSecondi((prev) => prev);
//             } else {
//                 setMinuti((prev) => prev - 1);
//                 setSecondi(59);
//             }

//             const interval = setInterval(() => {
//                 setSecondi((prevSecondi) => {
//                     if (prevSecondi === 1) {
//                         setMinuti((prevMinuti) => prevMinuti - 1);
//                         return 60;
//                     } else {
//                         return prevSecondi - 1;
//                     }
//                 });

//                 if (minuti === 0 && secondi === 0) {
//                     clearInterval(interval);
//                     toast.success(" Complimenti, Hai terminato l'allenamento!", { autoClose: 3000 });
//                 }
//             }, 1000);

//             return () => {
//                 clearInterval(interval);
//             };
//         }
//     }, [Arrayrecuperi, timerIsRunning, minuti, secondi]);

//     return (
//         <Col xs="6" sm="5" md="5" lg="4" xl="3">
//             <div className="d-flex flex-column py-3">
//                 {/* TIMER */}
//                 <div className="display-1 rounded rounded-5 my-4 p-3 shadow-lg bg-button">
//                     <span className="text-light d-flex justify-content-center">
//                         {minuti} : {secondi < 10 ? "0" + secondi : secondi}
//                     </span>
//                 </div>
//                 <div>
//                     <Button
//                         variant="warning"
//                         className="rounded-4 text-light fw-bold fs-3"
//                         onClick={() => {
//                             setTimerIsRunning(!timerIsRunning);
//                             setIscoCustomModalVisible(true);
//                             setCount((prev) => prev + 1);
//                         }}
//                     >
//                         {" "}
//                         {timerIsRunning ? "STOP" : "Sei Pronto?"}
//                     </Button>
//                 </div>
//             </div>
//         </Col>
//     );
// };

// export default TimerComponent;
