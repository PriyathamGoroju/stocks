import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Routers from "./common/Routers";
import Store from "./contexts/Store";

const App = () => {
    const [stocks, setStocks] = useState();
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(0);
    return (
        <Store.Provider value={{stocks, setStocks, searchQuery, setSearchQuery, page, setPage}}>
            <BrowserRouter>
                <Routers />
                <ToastContainer
                    position="top-right"
                    autoClose={4000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </BrowserRouter>
        </Store.Provider>
    );
};

export default App;
