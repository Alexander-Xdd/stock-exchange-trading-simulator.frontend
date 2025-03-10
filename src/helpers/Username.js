import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';



function Username() {
  const [userData, setUserData] = useState(null); // Состояние для хранения данных пользователя
  const [error, setError] = useState(''); // Состояние для хранения ошибки
  const jwt = Cookies.get('jwt'); // Получаем JWT из куки

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/users/me', {
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${jwt}`, // Передаем JWT в заголовке
          },
        });
        setUserData(response.data); // Сохраняем данные пользователя
      } catch (error) {
        console.error('Failed to fetch user data', error);
        setError('Failed to fetch user data'); // Устанавливаем сообщение об ошибке
      }
    };

    fetchUserData(); // Вызываем функцию для получения данных
  }, [jwt]); // Зависимость от jwt, чтобы запрос выполнялся при изменении токена

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
    // Отображаем ошибку, если она есть
  }

  if (!userData) {
    return <p>Loading...</p>; // Отображаем загрузку, пока данные не получены
  }

  return userData
}

export default Username