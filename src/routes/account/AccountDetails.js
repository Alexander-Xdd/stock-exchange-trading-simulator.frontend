import React, {use, useState} from 'react';
import {Header_auth, Header_not_auth} from "../../components/Header";
import Username from "../../helpers/Username";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Footer} from "../../components/Fotter";

const AccountDetails = () => {
    const navigate = useNavigate();
    if (Username().username === undefined){
        navigate('/login'); // Перенаправляем на страницу входа
    }

    const username = Username().username
    const [data, setData] = useState(null)
    const [update, setUpdate] = useState('')

    const acc_delete = (id) => {
        const data_del = new URLSearchParams();
        data_del.append('username', username);
        data_del.append('account_id', id);

        const fetchData = async () => {
        try {
            const response = await axios.post(`http://localhost:8082/close_account`, {}, {
                params: data_del,
                headers: {
                    'accept': 'application/json',
                },
            });
            setData(response.data); // Сохраняем данные пользователя

            } catch (error) {
                console.error('Failed to fetch data', error);
            }
        };
        fetchData(); // Вызываем функцию для получения данных
        window.location.reload()
    }

    React.useEffect(() => {
        const data = new URLSearchParams();
        data.append('username', username);

        const fetchData = async () => {
        try {
            if (username !== undefined) {
                const response = await axios.get(`http://localhost:8082/get_accounts`, {
                    params: data,
                    headers: {
                        'accept': 'application/json',
                    },
                });
                setData(response.data); // Сохраняем данные пользователя
            }
            } catch (error) {
                console.error('Failed to fetch data', error);
            }
        };
        fetchData(); // Вызываем функцию для получения данных
    }, [username]); // Зависимость, чтобы запрос выполнялся при изменении

    if (!data) {
        return <div></div>
    }
    else {
        console.log(data)
    }


return (
    <div>
        <Header_auth name = {username}/>
        <div className="container mt-5">
          {data.map((item) => (
            <div key={item.id} className="card mb-4">
              <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between">
                    <span className="card-title h5">
                    Счёт: "{item.name}"
                    </span>
                    <button className="btn clear" onClick={() => acc_delete(item.id)}>
                    Удалить
                    </button>
                  </div>
                <span className="card-text mt-1">
                  Начальный баланс: {item.init_balance}, Текущий баланс: {item.balance}
                </span>
                <span className={"card-text mt-1"}>
                  Суммарный P/L: <span className={`${item.sing_sum === '-' ? 'text-danger' : 'text-success'}`}>{item.sing_sum}{item.pl_sum_str} ({item.sing_sum}{item.pl_perc_sum}%)</span>
                </span>
                <span className="card-subtitle mb-2 text-muted mt-1">
                    Сумма активов: {(item.init_balance - item.balance).toFixed(2)}
                </span>
                <ul className="list-group">
                  {item.details.map((detail) => (
                      <li key={detail.id} className="list-group-item d-flex flex-column">
                      <span className="card-text mb-2">
                        {detail.name}
                      </span>
                          <span className="card-text h6">
                        Цена покупки: {detail.purchase_price}, Текущая цена: {detail.current_price}
                      </span>
                          <span className="card-text h6">
                         Количество: {detail.quantity}
                      </span>
                          <span className="card-text h6">
                         Сумма: {detail.sum_price}
                      </span>
                          <span className="card-text h6">
                        P/L: <span className={`${detail.sing === '-' ? 'text-danger' : 'text-success'}`}>{detail.sing}{detail.pl_str} ({detail.sing}{detail.pl_perc}%)</span>
                      </span>
                      </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <Footer/>
    </div>
);
}

export default AccountDetails