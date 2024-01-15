import { RouterProvider } from "react-router-dom";
import "./i18n";
import { router } from "./router";

function App() {
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
