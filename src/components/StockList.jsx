import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    Button,
    Tooltip,
    CircularProgress,
} from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import HomeIcon from "@mui/icons-material/Home";
import StarIcon from "@mui/icons-material/Star";
import SearchBox from "./SearchBox";
import Store from "../contexts/Store";

const StockList = ({ stocks, type }) => {
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const currentPage = useLocation();
    const [wishlist, setWishlist] = useState([]);
    const { searchQuery, setSearchQuery, page, setPage } = useContext(Store);
    const [pageLoading, setPageLoading] = useState(false);

    const handleChangePage = (event, newPage) => {
        setPageLoading(true);
        setPage(newPage);
        setTimeout(() => {
            setPageLoading(false);
        }, 400);
        // setPageLoading(false);
    };

    const handleChangeRowsPerPage = (event) => {
        setPageLoading(true);
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        setTimeout(() => {
            setPageLoading(false);
        }, 300);
        // setPageLoading(false);
    };

    const handleWishlist = (stock) => {
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

    const isWishlisted = (symbol) =>
        wishlist.some((wishItem) => wishItem.symbol === symbol);

    const filteredStocks = stocks?.filter(
        (stock) =>
            stock?.symbol?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            stock?.description
                ?.toLowerCase()
                .includes(searchQuery.toLowerCase())
    );

    const paginatedStocks = filteredStocks.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    useEffect(() => {
        const storedWishlist =
            JSON.parse(localStorage.getItem("wishlist")) || [];
        setWishlist(storedWishlist);
    }, []);

    return (
        <Paper
            className="p-1 m-2 sm:p-4 sm:m-4 h-4/5 overflow-auto"
            sx={{
                backgroundColor: "white",
                color: "blue",
                overflow: "hidden",
            }}
        >
            <div className="flex justify-between items-center flex-wrap">
                <div>
                    {currentPage.pathname == "/wishlist" ? (
                        <>
                            <Link
                                to={"/"}
                                className="text-black hover:text-blue-500 text-lg items-center px-1 sm:px-4 flex gap-2"
                                onClick={() => {
                                    setSearchQuery("");
                                }}
                            >
                                <HomeIcon
                                    fontSize="large"
                                    color="primary"
                                ></HomeIcon>
                                Home
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                to={"/wishlist"}
                                className="text-black hover:text-blue-500 text-lg items-center px-1 sm:px-4 flex gap-2"
                                onClick={() => {
                                    setSearchQuery("");
                                }}
                            >
                                <StarIcon
                                    fontSize="large"
                                    sx={{ color: "gold" }}
                                />
                                Wishlist
                            </Link>
                        </>
                    )}
                </div>
                <SearchBox
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />
            </div>
            <TableContainer sx={{ maxHeight: "72vh" }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell
                                sx={{ fontSize: "medium", fontWeight: "bold" }}
                            >
                                Symbol
                            </TableCell>
                            <TableCell
                                sx={{ fontSize: "medium", fontWeight: "bold" }}
                            >
                                Description
                            </TableCell>
                            {type && (
                                <TableCell
                                    sx={{
                                        fontSize: "medium",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Stock Type
                                </TableCell>
                            )}
                            <TableCell
                                sx={{ fontSize: "medium", fontWeight: "bold" }}
                            >
                                Currency
                            </TableCell>
                            <TableCell
                                sx={{ fontSize: "medium", fontWeight: "bold" }}
                            >
                                Wishlist
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredStocks.length < 1 && (
                          <TableCell colSpan={4}>
                            <p className="items-center justify-center flex">
                                No Stocks!
                            </p>
                            </TableCell>
                        )}

                        {pageLoading ? (
                          <TableCell colSpan={4}>
                            <div className="flex justify-center items-center">
                              
                                <CircularProgress />
                            </div>
                            </TableCell>
                        ) : (
                            <>
                                {paginatedStocks.map((stock) => (
                                    <>
                                        <TableRow
                                            key={stock.symbol}
                                            component={Link}
                                            to={`/stock/${stock.symbol}`}
                                            hover
                                        >
                                            <TableCell>
                                                {stock.symbol || "NA"}
                                            </TableCell>
                                            <TableCell>
                                                {stock.description || "NA"}
                                            </TableCell>
                                            {type && (
                                                <TableCell>
                                                    {stock.type || "NA"}
                                                </TableCell>
                                            )}
                                            <TableCell>
                                                {stock.currency || "NA"}
                                            </TableCell>
                                            <TableCell>
                                                <Tooltip
                                                    title={
                                                        isWishlisted(
                                                            stock.symbol
                                                        )
                                                            ? "Remove from wishlist"
                                                            : "Add to wishlist"
                                                    }
                                                >
                                                    <Button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleWishlist(
                                                                stock
                                                            );
                                                        }}
                                                    >
                                                        {isWishlisted(
                                                            stock.symbol
                                                        ) ? (
                                                            <StarIcon
                                                                sx={{
                                                                    color: "gold",
                                                                }}
                                                                fontSize="large"
                                                            />
                                                        ) : (
                                                            <StarBorderIcon
                                                                sx={{
                                                                    color: "black",
                                                                }}
                                                                fontSize="large"
                                                            />
                                                        )}
                                                    </Button>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    </>
                                ))}
                            </>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[25, 50, 100, 500, 1000]}
                component="div"
                count={filteredStocks.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default StockList;
