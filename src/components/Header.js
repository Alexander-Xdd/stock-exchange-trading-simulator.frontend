import React from 'react';
import '../forms/Header.css';
import {Link} from "react-router-dom"; // Стили для шапки
import {Navbar, Nav, Container} from 'react-bootstrap';

export const Header_base = () => {
    return (
        <Nav className="">
            <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/">SETS</Link>
                </li>
                <li className="nav-item">
                    <h2 className="nav-link active">|</h2>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" href="#">Акции</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" href="#">Фонды</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/currencies">Валюты</Link>
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