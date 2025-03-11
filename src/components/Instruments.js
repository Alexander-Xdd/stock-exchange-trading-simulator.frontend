import React, {useState} from "react";
import {Dropdown, Tooltip} from 'react-bootstrap';

export const Arrow = (params) => {
    if (params.sort === true) {
        return (<>🠗</>)
    }
    else if (params.sort === false) {
        return (<>🠕</>)
    } else {
        return (<>⬍</>)
    }
}

export const PageIterator = ({page, setPage}) => {

    function handlePagePlusClick() {
        let temp = page
        temp++
        setPage(temp)
    }

    function handlePageMinusClick() {
        let temp = page
        if (page !== 1) {
            temp--
        }
        setPage(temp)
    }

    return (
        <div className="row justify-content-center pt-5 pb-4">
            <div className="col-auto">
                <span className={""}><button className="btn clear btn-lg text-primary"
                                             onClick={handlePageMinusClick}>❮</button></span>
            </div>
            <div className="col-auto d-flex justify-content-center align-items-center">
                <span className="">{page}</span>
            </div>
            <div className="col-auto">
                <span className={""}><button className="btn clear btn-lg text-primary"
                                             onClick={handlePagePlusClick}>❯</button></span>
            </div>
        </div>
    )
}

export const SortHandler = ({setSort_type}) => {

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

    return (
        <div className="card mt-2 frame-inst bg-body-secondary bg-gradient">
            <div className="card-body">
                <div className="row">
                    <button className="col-5 btn clear" onClick={handleNameClick}>
                        <span className="d-flex justify-content-between">Название<Arrow sort={sortName}/></span>
                    </button>
                    <button className="col btn clear" onClick={handlePriceClick}>Цена<Arrow sort={sortPrice}/></button>
                    <button className="col btn clear" onClick={handleDayClick}>За час<Arrow sort={sortDay}/></button>
                    <button className="col btn clear" onClick={handleAllTimeClick}>За всё время<Arrow sort={sortAllTime}/></button>
                </div>
            </div>
        </div>
    )
}

export const FilterHandler = ({setFilter_currency, setFilter_country, setFilter_div}) => {

    const [currency_now, setCurrency_now] = useState('Валюта')
    const currencyHandler = (str, str2) => {
        setFilter_currency(str)
        setCurrency_now(str2)
    }

    const [country_now, setCountry_now] = useState('Страна')
    const countryHandler = (str, str2) => {
        setFilter_country(str)
        setCountry_now(str2)
    }

    const [div_now, setDiv_now] = useState('Дивиденды')
    const divHandler = (str, str2) => {
        setFilter_div(str)
        setDiv_now(str2)
    }

    return (
        <div className="card mt-2  frame-inst bg-body-secondary bg-gradient overflow-visible">
            <div className="card-body">
                <div className="row">
                    <Dropdown className="col-auto">
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                            {currency_now}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => currencyHandler('RUB', 'Рубль')}>Рубль</Dropdown.Item>
                            <Dropdown.Item onClick={() => currencyHandler('USD', 'Доллар')}>Доллар</Dropdown.Item>
                            <Dropdown.Item onClick={() => currencyHandler('HKD', 'Гонконгский доллар')}>Гонконгский доллар</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={() => currencyHandler('', 'Валюта')}>Сброс</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown className="col-auto">
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                            {country_now}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => countryHandler('RU', 'Россия')}>Россия</Dropdown.Item>
                            <Dropdown.Item onClick={() => countryHandler('USA', 'США')}>США</Dropdown.Item>
                            <Dropdown.Item onClick={() => countryHandler('CN', 'Китай')}>Китай</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={() => countryHandler('', 'Страна')}>Сброс</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    {setFilter_div !== undefined ?
                        <Dropdown className="col-auto">
                            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                {div_now} <span className="small align-top" title="Будет ли компания выплачитвать дивиденды держателям акции">❔</span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => divHandler('1', 'Да')}>Да</Dropdown.Item>
                                <Dropdown.Item onClick={() => divHandler('0', 'Нет')}>Нет</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={() => divHandler('', 'Дивиденды')}>Сброс</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    :
                        <div></div>
                    }
                </div>

            </div>
        </div>
    )
}