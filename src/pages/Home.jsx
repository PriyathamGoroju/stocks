import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import StockList from "../components/StockList";
import { toast } from "react-toastify";
import Store from "../contexts/Store";
import { CircularProgress } from "@mui/material";

const Home = () => {
    const { stocks, setStocks } = useContext(Store);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (!stocks || stocks.length == 0) {
            setLoading(true);
            axios
                .get(
                    `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${process.env.REACT_APP_API}`
                )
                .then((response) => {
                    setStocks(response.data);
                    toast(`✅ Stocks fetched successfully`);
                })
                .then(()=>{setLoading(false);})
                .catch((error) => {
                    toast.error(`Error fetching stocks, ${error}`);
                    console.error("Error fetching stocks:", error);
                });
        }
    }, [stocks]);
    return (
        <>
            {loading ? (
                <div className="h-screen w-screen justify-center items-center flex">
                    <CircularProgress />
                </div>
            ) : (
                <div>
                    {stocks && <StockList stocks={stocks} type />}
                </div>
            )}
        </>
    );
};

export default Home;
