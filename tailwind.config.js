/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{js,jsx}", "./index.html"],
	theme: {
		extend: {
			colors: {
				primary: blue,
			},
			backgroundImage: {
				"hero-background": 'url("/images/banner.webp")',
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
