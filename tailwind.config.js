/** @type {import('tailwindcss').Config} */
import { violet } from "tailwindcss/colors";

export default {
	purge: ["./src/**/*.{js,jsx}", "./index.html"],
	theme: {
		extend: {
			colors: {
				primary: violet,
			},
			transitionDuration: {
				DEFAULT: "300ms",
			},
			animation: {
				"slide-down": "slide-down 500ms ease-in-out",
			},
			keyframes: {
				"slide-down": {
					"0%": { transform: "translateY(-100%)" },
					"100%": { transform: "translateY(0)" },
				},
			},
		},
		plugins: [],
	},
};
