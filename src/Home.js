import React from 'react';


import Username from "./helpers/Username";
import {useNavigate} from "react-router-dom";
import {Header_auth} from "./components/Header";

function Home() {
    const navigate = useNavigate();
    if (Username().username === undefined){
        navigate('/login'); // Перенаправляем на страницу входа
    }

  return (
      <div>
        <div>
            <Header_auth name = {Username().username}/>
        </div>
        <p>Username: {Username().username}</p>
        <p>Email: {Username().email}</p>
      </div>
    );
}

export default Home;