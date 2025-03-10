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