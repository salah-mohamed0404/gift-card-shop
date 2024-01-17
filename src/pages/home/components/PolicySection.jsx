import { Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function PolicySection() {
	const { t } = useTranslation();

	return (
		<Container component="section" className="!flex justify-between flex-wrap">
			<div className="md:w-6/12 w-full">
				<img src="https://source.unsplash.com/random/1400x800" alt="policy" />
			</div>

			<div className="flex flex-col justify-center md:w-5/12 w-full">
				<Typography
					variant="h3"
					component="h2"
					className="text-primary-700 !mb-6"
				>
					-{" "}
					<span className="text-gray-700">{t("home.policy.titlePrefix")}</span>{" "}
					{t("home.policy.title")}
				</Typography>
				<Typography variant="h5" component="p">
					{t("home.policy.description")}
				</Typography>
			</div>
		</Container>
	);
}
