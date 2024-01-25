import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CartProvider } from "./store/CartContext";
import { ThemeProvider, createTheme } from "@mui/material";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function RootLayout({ children }) {
	const {
		i18n: { language },
	} = useTranslation();
	const theme = createTheme({
		palette: {
			primary: {
				main: "#41547b",
			},
		},
		typography: {
			fontFamily: "ARAHAMAH1982, sans-serif",
		},
	});

	useEffect(() => {
		document.documentElement.lang = language;
		document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
	}, [language]);

	return (
		<ThemeProvider theme={theme}>
			<CartProvider>
				<Navbar />
				{children}
				<Footer />
			</CartProvider>
		</ThemeProvider>
	);
}
