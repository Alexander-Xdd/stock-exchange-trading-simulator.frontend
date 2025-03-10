import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import '../../forms/Auth.css'; // Подключите ваш CSS-файл
import { Header_not_auth } from '../../components/Header';
import { Auth_img_in } from "../../components/Auth_img";

function Login() {
  const [isSignInActive] = useState(true);
  const [isChecked, setIsChecked] = useState(true);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Данные для отправки на сервер
    const data = new URLSearchParams();
    data.append('grant_type', 'password');
    data.append('username', username);
    data.append('password', password);
    data.append('scope', ''); // Если scope не требуется, оставьте пустым
    data.append('client_id', ''); // Если client_id не требуется, оставьте пустым
    data.append('client_secret', ''); // Если client_secret не требуется, оставьте пустым

    try {
      const response = await axios.post('http://localhost:8080/token', data, {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      console.log(response.data.access_token)
      if (response.data.access_token && isChecked === true) {
        Cookies.set('jwt', response.data.access_token, { expires: 1 }); // Сохраняем JWT в куки на 1 день
      }
      if (response.data.access_token && isChecked === false) {
        Cookies.set('jwt', response.data.access_token); // Сохраняем JWT в куки на сеанс
      }
      navigate('/');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
      <div>
        <Header_not_auth/>
        <div className="main-container">

          <Auth_img_in/>
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
                <label htmlFor="password">Пароль</label>
                <input
                    className="form-styling"
                    type="password"

                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="checkbox"
                    id="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
                <label htmlFor="checkbox">
                  Оставить меня в системе
                  <span className="ui"></span>

                </label>
                <div className="btn-animate">
                  <button type="submit" className="btn-signin">
                    Войти
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
        </div>
        );
        }

        export default Login;