import React, {useState} from 'react';
import { Line } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Регистрируем необходимые компоненты Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const Chart = ({price_history, name}) => {
    const [priceHistory, setPriceHistory] = useState((price_history).slice(-null))
    const priceHistoryHandler = (h) => {
        setPriceHistory((price_history).slice(-h))
    }

    const chartData = {
        labels: priceHistory.map(item => new Date(item.date).toLocaleDateString()), // Преобразуем дату в читаемый формат
        datasets: [
            {
                label: 'Цена',
                data: priceHistory.map(item => parseFloat(item.price)), // Преобразуем цену в число
                borderColor: 'rgb(75,130,192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `График ${name}`,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,

                },
            },
            y: {
                title: {
                    display: true,

                },
            },
        },
    };

    return(
        <div>
            <div className="row d-flex justify-content-around mt-5">
                <div className="card w col-auto">
                    <div className="card-body d-flex justify-content-between">
                        <button className="btn btn-primary" onClick={() => priceHistoryHandler(null)}>
                            <span>За всё время</span>
                        </button>
                        <button className="btn btn-primary ms-3" onClick={() => priceHistoryHandler(24)}>
                            <span>За сутки</span>
                        </button>
                    </div>
                </div>
            </div>
            <Line className="" data={chartData} options={options}/>
        </div>
    )
}