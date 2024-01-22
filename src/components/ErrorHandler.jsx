import { Alert, Snackbar } from "@mui/material";

const RESET_TIME = 5000;

export default function ErrorHandler({ children, errorMsg, setErrorMsg }) {
	const isError = Boolean(errorMsg);

	return (
		<>
			<Snackbar
				open={isError}
				autoHideDuration={RESET_TIME}
				onClose={() => setErrorMsg("")}
			>
				<Alert
					severity="error"
					sx={{ width: "100%" }}
					onClose={() => setErrorMsg("")}
				>
					{errorMsg}
				</Alert>
			</Snackbar>

			{children}
		</>
	);
}
