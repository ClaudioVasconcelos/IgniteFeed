import styles from "./Header.module.css";
import igniteLogo from "../assets/ignite-logo.svg";


export const Header = () => {
	return (
		<div>
			<header className={styles.header}>
				<img src={igniteLogo} alt="Logotipo do Ignite" />
				Ignite Feed
			</header>
		</div>
	);
};
