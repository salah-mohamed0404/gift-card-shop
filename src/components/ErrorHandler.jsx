import { Alert, Snackbar } from "@mui/material";

export default function ErrorHandler({ children, errorMsg, setErrorMsg }) {
	const isError = Boolean(errorMsg);

	return (
		<>
			<Snackbar
				open={isError}
				autoHideDuration={5000}
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
