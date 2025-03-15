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
import {Dropdown, DropdownButton, FormControl} from "react-bootstrap";
import axios from "axios";

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
        <div className="card mt-5">
            <div className="row mt-4">
                <div className="card col-auto bg-body-secondary bg-gradient ms-5">
                    <div className="card-body  ">
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


export const Buy = ({accs, figi, auth}) => {

    const [accid, setAccid] = useState(null)
    const [query, setQuery] = useState('');
    const [commit, setCommit] = useState(null);
    const handleInputChange = (e) => {
    const value = e.target.value;
            setQuery(value); // Обновляем состояние
    };

    const handleSelect = async (eventKey, event) => {
        // eventKey - это значение выбранного элемента
        // event - это событие, которое можно использовать для дополнительной информации
        setAccid(eventKey)
        // Здесь можно вызвать ваш обработчик с передачей параметров
        const bal = new URLSearchParams();
        bal.append('figi', figi);
        bal.append('username', auth);
        bal.append('account_id', eventKey);
        bal.append('quantity', query)

        try {
            const response = await axios.post('http://localhost:8082/add_on_balance', {}, {
            params: bal,
            headers: {
              'accept': 'application/json',
            },
            });
        window.location.reload()
        } catch (error) {
            alert(("Failed"));
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-center row align-items-center">
                <span className="mt-3">Количество</span>
                <FormControl
                    className="w-25"
                    type="text"
                    placeholder=""
                    value={query}
                    onChange={handleInputChange}
                />
            </div>

            <DropdownButton
                id="dropdown-basic-button"
                title="Купить"
                onSelect={handleSelect}
                className="btn-primary mt-3"
            >
                {accs.map((item) => (
                    <Dropdown.Item eventKey={item.id}>Счёт {item.name} - баланс: {item.balance}</Dropdown.Item>
                ))}
            </DropdownButton>
        </div>
    )
}