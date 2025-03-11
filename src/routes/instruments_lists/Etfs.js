import React, { useState } from 'react';
import axios from 'axios';

import '../../forms/Instruments.css';
import Username from "../../helpers/Username";
import {Header_not_auth, Header_auth} from "../../components/Header";
import {Arrow, FilterHandler, PageIterator, SortHandler} from "../../components/Instruments"
import {numDisable, perc} from "../../helpers/Others";
import {Footer} from "../../components/Fotter";
import {Link} from "react-router-dom";


function Etfs(){
    const auth = Username().username;

    const [data, setData] = useState(null); // Состояние для хранения данных
    const [page, setPage] = useState(1);
    const [sort_type, setSort_type] = useState('prev_price_diff_decrease');

    const [filter_currency, setFilter_currency] = useState('');
    const [filter_country, setFilter_country] = useState('');

    React.useEffect(() => {
        const data = new URLSearchParams();
        data.append('page', page.toString());
        data.append('sort_type', sort_type);
        data.append('filter_currency', filter_currency);
        data.append('filter_country', filter_country);

        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/get_etfs`, {
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
    }, [page, sort_type, filter_currency, filter_country]); // Зависимость, чтобы запрос выполнялся при изменении



    return (
        <div>
            {auth === undefined ? <Header_not_auth/> : <Header_auth name={auth}/>}

            <div className="container">
                <div className="mt-5 mb-3 h3">Каталог акций</div>

                <FilterHandler setFilter_currency = {setFilter_currency} setFilter_country = {setFilter_country} />

                <SortHandler sort_type={sort_type} setSort_type={setSort_type}/>

                <div>
                    {data ?
                        data.map((item, index) => (
                        <Link className="text-decoration-none text-reset" to={item.figi}>
                            <div className="card mt-2 frame-inst" key={index}>
                                <div className="card-body">
                                    <div className="row">
                                        <span className="d-flex justify-content-between">
                                            <span className="col-5 d-flex align-items-center">{item.name}</span>
                                            <span
                                                className="col d-flex justify-content-center d-flex align-items-center">{item.price_units}.{numDisable(item.price_nano, 2)} {(item.currency).toLocaleUpperCase()}</span>
                                            <div className="col row d-flex justify-content-center">
                                                <span
                                                    className="d-flex justify-content-center ">{item.prev_price_diff} {(item.currency).toLocaleUpperCase()}</span>
                                                <span
                                                    className={`d-flex justify-content-center small ${perc(item.price_units, item.price_nano, item.prev_price_diff) > 0 ? 'text-success' : perc(item.price_units, item.price_nano, item.prev_price_diff) < 0 ? 'text-danger' : ' '}`}> {perc(item.price_units, item.price_nano, item.prev_price_diff)} %</span>
                                            </div>
                                            <div className="col row d-flex justify-content-center">
                                                <span
                                                    className="d-flex justify-content-center">{item.first_price_diff} {(item.currency).toLocaleUpperCase()}</span>
                                                <span
                                                    className={`d-flex justify-content-center small ${perc(item.price_units, item.price_nano, item.first_price_diff) > 0 ? 'text-success' : perc(item.price_units, item.price_nano, item.first_price_diff) < 0 ? 'text-danger' : ' '}`}> {perc(item.price_units, item.price_nano, item.first_price_diff)} %</span>
                                            </div>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                    :
                        <div className="card mt-2 frame-inst">
                            <div className="card-body">
                                Загрузка
                            </div>
                        </div>
                    }
                </div>

                <PageIterator page={page} setPage={setPage}/>

            </div>

            <Footer/>

        </div>
    )
}

export default Etfs