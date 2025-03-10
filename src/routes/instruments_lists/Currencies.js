import React, { useState } from 'react';
import axios from 'axios';

import '../../forms/Instruments.css';
import Username from "../../helpers/Username";
import {Header_not_auth, Header_auth} from "../../components/Header";
import {Arrow, PageIterator} from "../../components/Instruments"
import {numDisable, perc} from "../../helpers/Others";
import {Footer} from "../../components/Fotter";
import {Link} from "react-router-dom";


function Currencies(){
    const is_auth = Username().username;

    const [data, setData] = useState(null); // Состояние для хранения данных
    const [page, setPage] = useState(1);
    const [sort_type, setSort_type] = useState('prev_price_diff_increase');

    const [sortName, setSortName] = useState(null)
    const [sortPrice, setSortPrice] = useState(null)
    const [sortDay, setSortDay] = useState(null)
    const [sortAllTime, setSortAllTime] = useState(null)

    function handleNameClick() {
        if (sortName === false) {
            setSortName(true);
            setSort_type('name_increase');
        }
        else {
            setSortName(false)
            setSort_type('name_decrease')
        }
        setSortPrice(null)
        setSortDay(null)
        setSortAllTime(null)
    }

    function handlePriceClick() {
        if (sortPrice === false) {
            setSortPrice(true);
            setSort_type('price_increase');
        }
        else {
            setSortPrice(false)
            setSort_type('price_decrease')
        }
        setSortName(null)
        setSortDay(null)
        setSortAllTime(null)
    }

    function handleDayClick() {
        if (sortDay === false) {
            setSortDay(true);
            setSort_type('prev_price_diff_increase');
        }
        else {
            setSortDay(false)
            setSort_type('prev_price_diff_decrease')
        }
        setSortName(null)
        setSortPrice(null)
        setSortAllTime(null)
    }

    function handleAllTimeClick() {
        if (sortAllTime === false) {
            setSortAllTime(true);
            setSort_type('first_price_diff_increase');
        }
        else {
            setSortAllTime(false)
            setSort_type('first_price_diff_decrease')
        }
        setSortName(null)
        setSortPrice(null)
        setSortDay(null)
    }

    function handlePagePlusClick() {
        let temp = page
        temp++
        setPage(temp)
    }

    function handlePageMinusClick() {
        let temp = page
        temp--
        setPage(temp)
    }

    React.useEffect(() => {

        const data = new URLSearchParams();
        data.append('page', page.toString());
        data.append('sort_type', sort_type);

        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/get_currencies`, {
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
    }, [page, sort_type]); // Зависимость, чтобы запрос выполнялся при изменении

    if (!data) {
        return <div>Загрузка данных...</div>; // Можно отобразить лоадер или сообщение
    }

    return (
        <div>
            {is_auth === undefined ? <Header_not_auth/> : <Header_auth name={is_auth}/>}

            <div className="container">
                <div className="mt-5 h3">Каталог валюты</div>

                <div className="card mt-4 frame-inst bg-body-secondary bg-gradient">
                    <div className="card-body">
                        <div className="row">
                            <button className="col-5 btn clear" onClick={handleNameClick}>
                                <span className="d-flex justify-content-between">Название<Arrow
                                    sort={sortName}/> </span>
                            </button>
                            <button className="col btn clear" onClick={handlePriceClick}>Цена<Arrow sort={sortPrice}/>
                            </button>
                            <button className="col btn clear" onClick={handleDayClick}>За день<Arrow sort={sortDay}/>
                            </button>
                            <button className="col btn clear" onClick={handleAllTimeClick}>За всё время<Arrow
                                sort={sortAllTime}/></button>
                        </div>
                    </div>
                </div>

                <div>
                    {data.map((item, index) => (
                        <Link className="text-decoration-none text-reset" to={item.figi}>
                            <div className="card mt-2 frame-inst" key={index}>
                                <div className="card-body">
                                    <div className="row">
                                        <span className="d-flex justify-content-between">
                                            <span className="col-5 d-flex align-items-center">{item.name}</span>
                                            <span
                                                className="col d-flex justify-content-center d-flex align-items-center">{item.price_units}.{numDisable(item.price_nano, 2)} ₽</span>
                                            <div className="col row d-flex justify-content-center">
                                                <span
                                                    className="d-flex justify-content-center ">{item.prev_price_diff} ₽</span>
                                                <span
                                                    className={`d-flex justify-content-center small ${perc(item.price_units, item.price_nano, item.prev_price_diff) > 0 ? 'text-success' : perc(item.price_units, item.price_nano, item.prev_price_diff) < 0 ? 'text-danger' : ' '}`}> {perc(item.price_units, item.price_nano, item.prev_price_diff)} %</span>
                                            </div>
                                            <div className="col row d-flex justify-content-center">
                                                <span
                                                    className="d-flex justify-content-center">{item.first_price_diff} ₽</span>
                                                <span className={`d-flex justify-content-center small ${perc(item.price_units, item.price_nano, item.first_price_diff) > 0 ? 'text-success' : perc(item.price_units, item.price_nano, item.first_price_diff) < 0 ? 'text-danger' : ' '}`}> {perc(item.price_units, item.price_nano, item.first_price_diff)} %</span>
                                            </div>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

            <PageIterator page = {page} handlePagePlusClick = {handlePagePlusClick} handlePageMinusClick = {handlePageMinusClick}/>

            </div>

            <Footer/>

        </div>
    )
}

export default Currencies