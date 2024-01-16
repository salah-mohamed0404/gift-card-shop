import { Outlet } from "react-router-dom";
import RootLayout from "./RootLayout";

function App() {
	return (
		<RootLayout>
			<Outlet />
		</RootLayout>
	);
}

export default App;
