import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../forms/Auth.css';
import { Header_not_auth } from "../../components/Header";
import { Auth_img_up } from "../../components/Auth_img"; // Подключите ваш CSS-файл

function Register() {
  const [isSignInActive] = useState(false);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [full_name, setFullName] = useState('');
  const navigate = useNavigate();

const handleSubmit = async (e) => {
    e.preventDefault();

    // Данные для отправки на сервер
    const data = {
      username,
      email,
      full_name, // Обратите внимание на ключ "full_name"
      password,
    };

    try {
      const response = await axios.post('http://localhost:8080/register', data, {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log('Registration successful');
        navigate('/login'); // Перенаправляем на страницу входа
      }
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
      <div>
          <Header_not_auth/>
          <div className="main-container">

              <Auth_img_up/>
              <div className="auth-frame">
                  <div className="auth-nav">

                      <ul className="links">
                          <li className={isSignInActive ? 'signin-active' : 'signup-inactive'}>
                              <a className="btn" href="/login">
                                  Вход
                              </a>
                          </li>
                          <li className={!isSignInActive ? 'signin-active' : 'signup-inactive'}>
                              <a className="btn" href="/register">
                                  Регистрация
                              </a>
                          </li>
                      </ul>

                      <form className="form-signin" onSubmit={handleSubmit}>
                          <label htmlFor="username">Имя пользователя</label>
                          <input
                              className="form-styling"
                              type="text"

                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              required
                          />
                          <label htmlFor="email">Email</label>
                          <input
                              className="form-styling"
                              type="email"

                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                          />
                          <label htmlFor="password">Пароль</label>
                          <input
                              className="form-styling"
                              type="password"

                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                          />
                          <label htmlFor="FullName">ФИО</label>
                          <input
                              className="form-styling"
                              type="text"

                              value={full_name}
                              onChange={(e) => setFullName(e.target.value)}
                              required
                          />

                          <div className="btn-animate">
                              <button type="submit" className="btn-signin">
                                  Зарегистрироваться
                              </button>
                          </div>
                      </form>

                  </div>
              </div>
          </div>
          </div>
          );
          }

          export default Register;