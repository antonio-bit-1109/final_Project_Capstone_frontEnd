/* eslint-disable react/prop-types */
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Legend, Tooltip } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Legend, Tooltip);

const GraficoComponent = ({
    durataTotAllenamenti,
    serieTotAllenamenti,
    ripetizioniTotAllenamenti,
    allenamentiCompletati,
}) => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                ticks: {
                    color: "white", // colore delle etichette sull'asse x
                },
                grid: {
                    color: "rgba(255, 255, 255, 0.3)", // colore della griglia sull'asse x
                },
            },
            y: {
                ticks: {
                    color: "white", // colore delle etichette sull'asse y
                },
                grid: {
                    color: "rgba(255, 255, 255, 0.3)", // colore della griglia sull'asse y
                },
            },
        },
    };
    const data = {
        labels: ["Totale Ripetizioni", "Totale Tempo di Lavoro (min)", " Totale Serie", "Allenamenti Completati"],
        datasets: [
            {
                label: "int",
                data: [ripetizioniTotAllenamenti, durataTotAllenamenti, serieTotAllenamenti, allenamentiCompletati],
                borderColor: "black",
                backgroundColor: "rgba(255, 193, 7, 0.8)",
            },
        ],
    };

    return (
        <>
            <Bar options={options} data={data} />
        </>
    );
};

export default GraficoComponent;
