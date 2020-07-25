import Link from 'next/link'
import styles from './footer.module.css'

export default function Footer () {
  return (
    <footer className={styles.footer}>
      <hr/>
      <ul className={styles.navItems}>
        <li className={styles.navItem}><a href="https://next-auth.js.org">Documentation</a></li>
        <li className={styles.navItem}><a href="https://www.npmjs.com/package/next-auth">NPM</a></li>
        <li className={styles.navItem}><a href="https://github.com/iaincollins/next-auth-example">GitHub</a></li>
        <li className={styles.navItem}><Link href="/policy"><a>Policy</a></Link></li>
        <li className={styles.navItem}><em>next-auth@3.0.0-beta.19</em></li>
      </ul>
    </footer>
  )
}