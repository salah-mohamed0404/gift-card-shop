import { Alert, Snackbar } from "@mui/material";

export default function SuccessHandler({
	children,
	successMsg,
	setSuccessMsg,
}) {
	const isSuccess = Boolean(successMsg);

	return (
		<>
			<Snackbar
				open={isSuccess}
				autoHideDuration={5000}
				onClose={() => setSuccessMsg("")}
			>
				<Alert sx={{ width: "100%" }} onClose={() => setSuccessMsg("")}>
					{successMsg}
				</Alert>
			</Snackbar>

			{children}
		</>
	);
}
