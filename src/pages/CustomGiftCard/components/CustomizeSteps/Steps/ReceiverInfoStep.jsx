import { InputAdornment, TextField, Typography } from "@mui/material";

export default function ReceiverInfoStep({
	name,
	phone,
	onNameChange,
	onPhoneChange,
}) {
	return (
		<div className="flex flex-col items-center gap-6">
			<Typography variant="h4" className="capitalize">
				fill receiver info
			</Typography>

			<div className="flex flex-col gap-6 w-3/4 mx-auto">
				<TextField
					variant="outlined"
					label="Name"
					value={name}
					onChange={(e) => onNameChange(e.target.value)}
					fullWidth
				/>

				<TextField
					label="Phone"
					variant="outlined"
					value={phone}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start" className="*:!text-gray-800">
								+
							</InputAdornment>
						),
					}}
					onChange={(e) => {
						const value = e.target.value;
						if (!isNaN(value)) return onPhoneChange(value);
					}}
					fullWidth
				/>
			</div>
		</div>
	);
}
