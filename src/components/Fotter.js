import React from "react";


export function Footer() {
    return (
        <footer className="bg-secondary bg-gradient mt-5">
            <div className="container">
                <div className="row text-white pt-5 pb-5 justify-content-around">

                    <div className="col-auto mb-4 pb-5">
                        <h5 className="h5 mb-5">О SEST</h5>
                        <h6 className="h6 text-black-50"><a className="text-decoration-none text-reset" href="#">О
                            симуляторе SEST</a></h6>
                        <h6 className="h6 text-black-50 mt-3"><a className="text-decoration-none text-reset"
                                                                 href="#">Связаться с нами</a></h6>
                        <h6 className="h6 text-black-50 mt-3"><a className="text-decoration-none text-reset"
                                                                 href="#">Пользовательское соглашение</a></h6>
                        <h6 className="h6 text-black-50 mt-3"><a className="text-decoration-none text-reset"
                                                                 href="#">Политика конфиденциальности</a></h6>
                    </div>

                    <div className="col-auto mb-4  mb-5">
                        <h5 className="h5 mb-5">Поддержка</h5>
                        <h6 className="h6 text-black-50"><a className="text-decoration-none text-reset" href="#">Служба
                            поддержки</a></h6>
                        <h6 className="h6 text-black-50 mt-3"><a className="text-decoration-none text-reset"
                                                                 href="#">Предложения по улучшению</a></h6>
                    </div>

                </div>
            </div>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </footer>
    )
}