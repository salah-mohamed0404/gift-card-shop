import { ShoppingBag } from "@mui/icons-material";
import DrawerWithIconBtn from "../DrawerWithIconBtn";

export default function Cart({ language }) {
	return (
		<DrawerWithIconBtn
			BtnIcon={ShoppingBag}
			language={language}
		></DrawerWithIconBtn>
	);
}
