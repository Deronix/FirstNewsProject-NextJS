import Link from "next/link";
import styles from "./page.module.css";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <Link href="./iletisim">Bize Ulaş</Link>


      <div className={styles.navhaber}>
        <Link href="./">Haberler</Link>
      </div>


      <Link href="./hakkimda">Hakkımızda</Link>
    </div>
  );
};

export default Navbar;
