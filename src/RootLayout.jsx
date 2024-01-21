import { ThemeProvider, createTheme } from "@mui/material";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { blue } from "@mui/material/colors";

export default function RootLayout({ children }) {
	const theme = createTheme({
		palette: {
			primary: {
				main: blue[500],
			},
		},
	});

	return (
		<ThemeProvider theme={theme}>
			<Navbar />
			{children}
			<Footer />
		</ThemeProvider>
	);
}
