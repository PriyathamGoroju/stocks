import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Tooltip,
    CircularProgress,
    IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

export default function StockDetails() {
    const { symbol } = useParams();
    const [stock, setStock] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const fetchStockDetails = async () => {
            try {
                const response = await axios.get(
                    `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${process.env.REACT_APP_API}`
                );
                setStock({ ...response.data, symbol: symbol });
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchStockDetails();
    }, [symbol]);
    useEffect(() => {
        const storedWishlist =
            JSON.parse(localStorage.getItem("wishlist")) || [];
        setWishlist(storedWishlist);
    }, []);

    const handleWishlist = () => {
        let updatedWishlist;
        if (wishlist.some((wishItem) => wishItem.symbol === stock.symbol)) {
            updatedWishlist = wishlist.filter(
                (wishItem) => wishItem.symbol !== stock.symbol
            );
        } else {
            updatedWishlist = [...wishlist, stock];
        }
        setWishlist(updatedWishlist);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    };

    const isWishlisted = wishlist.some(
        (wishItem) => wishItem.symbol === stock.symbol
    );

    if (loading)
        return (
            <div className="h-screen w-screen flex items-center justify-center">
                <CircularProgress />
            </div>
        );
    if (error)
        return (
            <div className="h-screen w-screen flex items-center justify-center">
                Error: {error.message}
            </div>
        );

    return (
        <div className="stock-details p-1 sm:p-4">
            <Link to="/" className="text-gray-700 hover:text-blue-400">
                <ArrowBackIcon fontSize="large" />
            </Link>
            <div className="p-2 sm:p-4 border border-gray-50 rounded shadow">
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    align="center"
                                    colSpan={2}
                                    style={{ justifyContent: "center" }}
                                >
                                    {stock.logo && (
                                        <div className="w-full flex justify-center">
                                            <img
                                                className="w-24 h-24"
                                                src={stock.logo}
                                                alt="stock"
                                            />
                                        </div>
                                    )}
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell
                                    component="th"
                                    scope="row"
                                    align="right"
                                >
                                    Name
                                </TableCell>
                                <TableCell align="left">
                                    <a
                                        href={stock.weburl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-blue-400"
                                    >
                                        {stock.name || 'NA'}
                                    </a>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    component="th"
                                    scope="row"
                                    align="right"
                                >
                                    Ticker
                                </TableCell>
                                <TableCell align="left">
                                    {stock.ticker || 'NA'}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    component="th"
                                    scope="row"
                                    align="right"
                                >
                                    Currency
                                </TableCell>
                                <TableCell align="left">
                                    {stock.currency || 'NA'}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    component="th"
                                    scope="row"
                                    align="right"
                                >
                                    Market Capitalization
                                </TableCell>
                                <TableCell align="left">
                                    {stock.marketCapitalization || 'NA'}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    component="th"
                                    scope="row"
                                    align="right"
                                >
                                    Exchange
                                </TableCell>
                                <TableCell align="left">
                                    {stock.exchange || 'NA'}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    component="th"
                                    scope="row"
                                    align="right"
                                >
                                    Industry
                                </TableCell>
                                <TableCell align="left">
                                    {stock.finnhubIndustry || 'NA'}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    component="th"
                                    scope="row"
                                    align="right"
                                >
                                    IPO Date
                                </TableCell>
                                <TableCell align="left">{stock.ipo}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    component="th"
                                    scope="row"
                                    align="right"
                                >
                                    Shares Outstanding
                                </TableCell>
                                <TableCell align="left">
                                    {stock.shareOutstanding || 'NA'}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    component="th"
                                    scope="row"
                                    align="right"
                                >
                                    Wishlist
                                </TableCell>
                                <TableCell align="left">
                                    <Tooltip
                                        title={
                                            isWishlisted
                                                ? "Remove from wishlist"
                                                : "Add to wishlist"
                                        }
                                    >
                                        <IconButton onClick={handleWishlist}>
                                            {isWishlisted ? (
                                                <StarIcon fontSize="large" sx={{color:"gold"}} />
                                            ) : (
                                                <StarBorderIcon fontSize="large" />
                                            )}
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}
