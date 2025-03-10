import React from "react";
import '../forms/Auth.css'; // Стили для шапки

export const Auth_img_in = () => {
    return(
        <div>
            <div className="txt-frame">
                <h2>С возвращением в SETS!</h2>
            </div>
            <div className="img-frame">
                <img src="/images/auth.png"/>
            </div>
        </div>
    );
}

//export default Auth_img_in;


export const Auth_img_up = () => {
    return(
        <div>
            <div className="txt-frame">
                <h2>Добро пожаловать в SETS - симулятор торговли на бирже</h2>
            </div>
            <div className="img-frame">
                <img src="/images/auth.png"/>
            </div>
        </div>
    );
}