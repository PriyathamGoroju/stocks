import Home from "../pages/Home"
import StockDetails from "../pages/StockDetails"
import Wishlist from "../pages/Wishlist"

export const Links = [
    {
        name: "Home",
        path: "/",
        element: <Home />,
        showInNavigation: true,
    },
    {
        name: "StockDetails",
        path: "/stock/:symbol",
        element: <StockDetails />,
        showInNavigation: true,
    },
    {
        name: "Wishlist",
        path: "/wishlist",
        element: <Wishlist />,
        showInNavigation: true,
    },
]