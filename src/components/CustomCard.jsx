import { CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function CustomCard({ title, description, front, back }) {
	return (
		<div className="text-center !rounded-2xl">
			<div className="text-center">
				<Link to="/custom-gift-card">
					<div className="relative group flex justify-center" style={{ maxWidth: '480px', height: '290px' }}>
						<div style={{ position: 'relative', width: '100%', paddingBottom: '50%' }}> {/* Aspect ratio container */}
							<img
								className="rounded-2xl object-fill transition duration-500 group-hover:opacity-0 group-hover:scale-75 z-10"
								src={front}
								style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
								alt="card front face"
							/>
							<img
								className="rounded-2xl object-fill opacity-0 scale-x-75 transition group-hover:opacity-100 group-hover:scale-x-100"
								src={back}
								style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
								alt="card back face"
							/>
						</div>
					</div>
				</Link>

				<CardContent>
					<Link to="/gift-card">
						<Typography variant="h4" className="text-primary-700 !mb-1">
							{title}
						</Typography>
					</Link>
					<Typography>{description}</Typography>
				</CardContent>
			</div>
		</div>
	);
}
