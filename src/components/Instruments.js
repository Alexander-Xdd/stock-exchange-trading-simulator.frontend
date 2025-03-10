import React from "react";

export const Arrow = (params) => {
    if (params.sort === true) {
        return (<>🠗</>)
    }
    else if (params.sort === false) {
        return (<>🠕</>)
    } else {
        return (<>⬍</>)
    }
}

export const PageIterator = (params) => {
    return (
        <div className="row justify-content-center pt-5 pb-4">
            <div className="col-auto">
                <span className={""}><button className="btn clear btn-lg text-primary"
                                             onClick={params.handlePageMinusClick}>❮</button></span>
            </div>
            <div className="col-auto d-flex justify-content-center align-items-center">
                <span className="">{params.page}</span>
            </div>
            <div className="col-auto">
                <span className={""}><button className="btn clear btn-lg text-primary"
                                             onClick={params.handlePagePlusClick}>❯</button></span>
            </div>
        </div>
    )
}

export const PageHandler = (params) => {
    return (
        <div className="card mt-4 frame-inst bg-body-secondary bg-gradient">
            <div className="card-body">
                <div className="row">
                    <button className="col-5 btn clear" onClick={params.handleNameClick}>
                                <span className="d-flex justify-content-between">Название<Arrow
                                    sort={params.sortName}/> </span>
                    </button>
                    <button className="col btn clear" onClick={params.handlePriceClick}>Цена<Arrow sort={params.sortPrice}/>
                    </button>
                    <button className="col btn clear" onClick={params.handleDayClick}>За день<Arrow sort={params.sortDay}/>
                    </button>
                    <button className="col btn clear" onClick={params.handleAllTimeClick}>За всё время<Arrow
                        sort={params.sortAllTime}/></button>
                </div>
            </div>
        </div>
    )
}