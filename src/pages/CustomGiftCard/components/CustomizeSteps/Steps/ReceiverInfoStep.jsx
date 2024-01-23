import {
	FormControl,
	FormLabel,
	InputAdornment,
	TextField,
	Typography,
} from "@mui/material";

export default function ReceiverInfoStep({
	t,
	name,
	phone,
	onNameChange,
	onPhoneChange,
}) {
	return (
		<div className="flex flex-col items-center gap-6">
			<Typography
				variant="h4"
				className="md:!text-4xl !text-3xl capitalize"
				textAlign="center"
			>
				{t("customCard.receiverInfo.title")}
			</Typography>

			<div className="flex flex-col gap-6 w-3/4 mx-auto">
				<FormControl fullWidth>
					<FormLabel className="capitalize" classes={{ root: "!text-lg" }}>
						{t("customCard.receiverInfo.name")}
					</FormLabel>
					<TextField
						variant="outlined"
						value={name}
						onChange={(e) => onNameChange(e.target.value)}
						fullWidth
					/>
				</FormControl>

				<FormControl fullWidth>
					<FormLabel className="capitalize" classes={{ root: "!text-lg" }}>
						{t("customCard.receiverInfo.phone")}
					</FormLabel>
					<TextField
						variant="outlined"
						value={phone}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start" className="*:!text-gray-800">
									+966
								</InputAdornment>
							),
						}}
						onChange={(e) => {
							const value = e.target.value;
							if (!isNaN(value)) return onPhoneChange(value);
						}}
						fullWidth
					/>
				</FormControl>
			</div>
		</div>
	);
}
