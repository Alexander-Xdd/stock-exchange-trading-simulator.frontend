import React, {useState} from 'react';
import { useParams, useLocation } from 'react-router-dom';
import {Header_auth, Header_not_auth} from "../../components/Header";
import Username from "../../helpers/Username";
import {numDisable, perc} from "../../helpers/Others";
import axios from "axios";

import {Footer} from "../../components/Fotter";
import {Buy, Chart} from "../../components/InstrumentDetails";

const ShareDetails = () => {
    const auth = Username().username;

    const [data, setData] = useState(null)
    const [accs, setAccs] = useState(null)

    const { figi } = useParams();
    const location = useLocation();
    const { price_units, price_nano, prev_diff, first_diff  } = location.state;

    let currentDate = new Date();

    React.useEffect(() => {
        const data = new URLSearchParams();
        data.append('figi', figi);

        const data_accs = new URLSearchParams();
        data_accs.append('username', auth);

        const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8081/get_share_by_figi`, {
                params: data,
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            setData(response.data); // Сохраняем данные пользователя
            } catch (error) {
                console.error('Failed to fetch user data', error);
            }
        };
        fetchData(); // Вызываем функцию для получения данных

        const getAccs = async () => {
            try {
                const response = await axios.get(`http://localhost:8082/get_accounts`, {
                    params: data_accs,
                    headers: {
                        'accept': 'application/json',
                    },
                });
                setAccs(response.data); // Сохраняем данные пользователя
                } catch (error) {
                    console.error('Failed to fetch data', error);
                }
            };
        if (auth !== undefined) {
            getAccs()
        }

    }, [figi, auth]); // Зависимость, чтобы запрос выполнялся при изменении

    if (!data || !accs) {
        return <div></div>
    }
console.log(data)
    return (
    <div>
        {auth === undefined ? <Header_not_auth/> : <Header_auth name={auth}/>}


        <div className="container">
            <div className="row d-flex justify-content-around">
                <div className="card mt-5 w-50">
                    <div className="card-body d-flex flex-column">
                        <span className="h4">{data.name}</span>
                        <span className="mt-3">Доходность за час:</span>
                        <span
                            className={`${prev_diff > 0 ? 'text-success' : prev_diff < 0 ? 'text-danger' : ' '}`}>{prev_diff}%</span>
                        <span className="mt-2">Доходность за всё время:</span>
                        <span
                            className={`${first_diff > 0 ? 'text-success' : first_diff < 0 ? 'text-danger' : ' '}`}>{first_diff}%</span>
                    </div>

                </div>
                <div className="card mt-5 w-25 col-auto text-center">
                    <div className="card-body d-flex flex-column">
                        <span className="small text-muted">Цена на {currentDate.getDate()}.{currentDate.getMonth()+1}.{currentDate.getFullYear()}</span>
                        <span className="h4 fw-bold mt-4">{price_units}.{numDisable(price_nano, 2)} {data.currency.toLocaleUpperCase()}</span>
                        <span className="small text-muted">1 лот = {data.lot} (акция)</span>

                        <Buy accs={accs} auth={auth} figi={figi}/>
                    </div>

                </div>
            </div>

            <Chart price_history={data.price_history} name = {data.name}/>


            <div className="d-flex justify-content-around">
                <div className="card w-50 col-auto mt-5">
                    <div className="card-body d-flex flex-column">
                        <span className="h5 mb-4">Дополнительная информация</span>
                        <span className="h6">Страна: {data.country_of_risk_name}</span>
                        <span className="h6">Сектор: {(data.sector).toUpperCase()}</span>
                        <span className="h6">Дивиденды: {(data.div_yield_flag).toString().toUpperCase()}</span>
                        <span className="h6">FIGI: {data.figi}</span>
                    </div>

                </div>
            </div>

        </div>

    <Footer/>

    </div>
    );
};

export default ShareDetails;