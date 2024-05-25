import React, { useContext } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import Store from "../contexts/Store";


const SearchBox = ({ searchQuery, setSearchQuery }) => {
    const { setPage } = useContext(Store);

    const handleClearSearch = () => {
        setSearchQuery("");
        setPage(0);
    };

    return (
        <div className="flex justify-end flex-grow">
            <TextField
                label="Search Stocks"
                variant="filled"
                margin="normal"
                fullWidth
                sx={{ maxWidth: "660px" }}
                value={searchQuery}
                onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setPage(0);
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="clear search"
                                onClick={handleClearSearch}
                                edge="end"
                            >
                                {searchQuery.length>0 && <ClearIcon />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    );
};

export default SearchBox;
