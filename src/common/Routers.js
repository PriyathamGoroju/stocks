import React from "react";
import { Route, Routes } from "react-router-dom";
import { Links } from "./Links";

export default function Routers() {
    return (
        <>
            <Routes>
                {Links.map((route, i) => {
                    return <Route key={i} exact element={route.element} path={route.path} />;
                })}
            </Routes>
        </>
    );
}
