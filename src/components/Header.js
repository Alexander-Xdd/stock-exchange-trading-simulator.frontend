import React, {useState} from 'react';
import '../forms/Header.css';
import {Link} from "react-router-dom"; // Стили для шапки
import {Navbar, Nav, Container, InputGroup, Form, FormControl, Button, DropdownButton, Dropdown} from 'react-bootstrap';
import axios from "axios";

export const Header_base = () => {

    const [dataSearch, setDataSearch] = useState(null)
    const [query, setQuery] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);


    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value); // Обновляем состояние
    };

    const handleInputFocus = () => {
        setIsDropdownOpen(true);
    };

    const handleInputBlur = () => {
        // Небольшая задержка перед закрытием, чтобы можно было выбрать элемент из списка
        setTimeout(() => {
          setIsDropdownOpen(false);
        }, 200);
    };

    React.useEffect(() => {
    const data = new URLSearchParams();
    data.append('keyword', query);

    const fetchData = async () => {
    try {
        const response = await axios.get(`http://localhost:8081/get_instruments_by_name`, {
            params: data,
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        setDataSearch(response.data); // Сохраняем данные пользователя
        } catch (error) {
            console.error('Failed to fetch user data', error);
        }
    };
    if (query !== '') {
        fetchData(); // Вызываем функцию для получения данных
    }
}, [query]); // Зависимость, чтобы запрос выполнялся при изменении


    return (
        <Nav className="">
            <ul className="navbar-nav ms-auto">
                <li className="nav-item pt-1">
                    <Link className="nav-link active" aria-current="page" to="/">SETS</Link>
                </li>
                <li className="nav-item pt-1">
                    <h2 className="nav-link active">|</h2>
                </li>
                <li className="nav-item pt-1">
                    <Link className="nav-link" to="/shares">Акции</Link>
                </li>
                <li className="nav-item pt-1">
                    <Link className="nav-link" to="/etfs">Фонды</Link>
                </li>
                <li className="nav-item pt-1">
                    <Link className="nav-link" to="/currencies">Валюты</Link>
                </li>
                <li className="nav-item pt-1">
                    <h2 className="nav-link active">|</h2>
                </li>
                <li className="nav-item pt-1 col-auto">
                    <Link className="nav-link" to="/open">Новый счет</Link>
                </li>
                <li className="nav-item ms-5 col-10">
                    <Form className="pt-1 ms-5">
                        <div style={{position: 'relative'}}>
                            <FormControl
                                type="text"
                                placeholder="Поиск по тысячам финансовых инструментов..."
                                value={query}
                                onChange={handleInputChange}
                                onFocus={handleInputFocus}
                                onBlur={handleInputBlur}
                            />
                            {isDropdownOpen && (
                                <Dropdown.Menu show style={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: 0,
                                    right: 0,
                                    overflow: 'hidden'
                                }}>
                                    {dataSearch && query !== '' ?
                                        dataSearch.map((key, val) => (
                                            <Dropdown.Item><span className="">{key.name}</span></Dropdown.Item>
                                        ))
                                        :
                                        <Dropdown className="pb-5"></Dropdown>
                                    }
                                </Dropdown.Menu>
                            )}
                        </div>
                    </Form>
                </li>
            </ul>
        </Nav>
    );
};

export const Header_not_auth = () => {
    return (
        <header>
            <Navbar className="bg-body-secondary bg-gradient" expand="lg">
                <Container fluid>
                    <Navbar.Toggle aria-controls="navbarNav"/>
                    <Navbar.Collapse className="justify-content-between" id="navbarNav">

                        <Header_base/>

                        <Nav className="">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <Link className="login-button text-black text-decoration-none" to="/login">Войти</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="signup-button" to="/register">Регистрация</Link>
                                </li>
                            </ul>
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export const Header_auth = (params) => {
    return (
        <header>
            <Navbar className="bg-body-secondary bg-gradient" expand="lg">
                <Container fluid>
                    <Navbar.Toggle aria-controls="navbarNav"/>
                    <Navbar.Collapse className="justify-content-between" id="navbarNav">

                        <Header_base/>

                        <Nav className="">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <Link className="h6 signup-button" to="/register">{params.name}</Link>
                                </li>
                            </ul>
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};


/*
<header className="bg-light">
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">
                Название сайта
            </a>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="#">Главная</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">О нас</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Услуги</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Контакты</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</header>

<header className="header">
    <Header_base/>
    <div className="user-actions">
        <Link className="login-button text-decoration-none text-reset" to="/login">Войти</Link>
        <Link className="signup-button" to="/register">Регистрация</Link>
    </div>
</header>

 */