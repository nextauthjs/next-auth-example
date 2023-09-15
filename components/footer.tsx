import Link from "next/link"
import styles from "./footer.module.css"
import packageJSON from "../package.json"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <hr />
      <ul className={styles.navItems}>
        <li className={styles.navItem}>
          <a href="https://phnx.one/">phnx.one</a>
        </li>
        <li className={styles.navItem}>
          <a href="https://phnx.one/whitepaper/">Whitepaper</a>
        </li>
        <li className={styles.navItem}>
          <a href="https://github.com/PhoenixSolana">GitHub</a>
        </li>
        <li className={styles.navItem}>
          <em>Phoenix²</em>
        </li>
      </ul>
    </footer>
  )
}
