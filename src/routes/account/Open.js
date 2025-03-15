import React, {useState} from 'react';
import {Header_auth, Header_not_auth} from "../../components/Header";
import Username from "../../helpers/Username";
import axios from "axios";
import {useNavigate} from "react-router-dom";


const Open = () => {
    const navigate = useNavigate();
    if (Username().username === undefined){
        navigate('/login'); // Перенаправляем на страницу входа
    }

    const username = Username().username;
    const [name, setName] = useState('');
    const [balance, setBalance] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Данные для отправки на сервер
        const data = new URLSearchParams();
        data.append('username', username.toString());
        data.append('name', name.toString());
        data.append('balance', balance.toString());

        try {
            const response = await axios.post('http://localhost:8082/open_account', {}, {
            params: data,
            headers: {
              'accept': 'application/json',
            },
            });
            navigate('/'); // Перенаправляем на страницу входа

        } catch (error) {
            alert(("Failed"));
        }
    };
  return (
      <div>
          {<Header_auth name={username}/>}
        <div className="main-container container d-flex justify-content-center">

          <div className="auth-frame">
            <div className="auth-nav">

              <ul className="links">
                <li className='signin-active'>
                  <a className="btn" href="#">
                    Открыть демо-счет
                  </a>
                </li>
              </ul>

              <form className="form-signin" onSubmit={handleSubmit}>
                <label htmlFor="text">Название</label>
                <input
                    className="form-styling"
                    type="text"
                    value={name}
                    placeholder="Например - Долларовый счёт"
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <label htmlFor="text">Начальная сумма на балансе</label>
                <input
                    className="form-styling"
                    type="text"
                    placeholder="В формате 1999.90"
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                    required
                />
                <div className="btn-animate">
                  <button type="submit" className="btn-signin">
                    Открыть
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
        </div>
        );
        }

        export default Open;