import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import About from "./pages/About";
import GiftCard from "./pages/GiftCard";
import CustomGiftCard from "./pages/CustomGiftCard";
import Checkout from "./pages/Checkout";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{ index: true, element: <Home /> },
			{ path: "/about", element: <About /> },
			{
				path: "/gift-card",
				element: <GiftCard />,
			},
			{
				path: "/custom-gift-card",
				element: <CustomGiftCard />,
			},
			{
				path: "/checkout",
				element: <Checkout />,
			},
		],
	},
]);
