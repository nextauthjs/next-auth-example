import styles from './footer.module.css'

export default () => (
  <footer className={styles.footer}>
    <hr/>
    <ul className={styles.navItems}>
      <li className={styles.navItem}><a href="https://next-auth.js.org">Documentation</a></li>
      <li className={styles.navItem}><a href="https://www.npmjs.com/package/next-auth">NPM</a></li>
      <li className={styles.navItem}><a href="https://github.com/iaincollins/next-auth-example">GitHub</a></li>
      <li className={styles.navItem}><em>next-auth@3.0.0-beta.16</em></li>
    </ul>
  </footer>
)