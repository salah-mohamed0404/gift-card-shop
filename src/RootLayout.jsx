import { ThemeProvider, createTheme } from "@mui/material";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { blue } from "@mui/material/colors";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CartProvider } from "./store/CartContext";

export default function RootLayout({ children }) {
	const {
		i18n: { language },
	} = useTranslation();
	const theme = createTheme({
		palette: {
			primary: {
				main: blue[500],
			},
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
