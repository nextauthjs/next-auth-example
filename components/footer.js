import styles from './footer.module.css'

export default () => (
  <div className={styles.footer}>
    <hr/>
    <ul className={styles.navItems}>
      <li className={styles.navItem}><a href="https://next-auth.js.org">NextAuth.js</a></li>
      <li className={styles.navItem}><a href="https://github.com/iaincollins/next-auth-example">View Source</a></li>
      <li className={styles.navItem}><a href="https://next-auth.js.org/getting-started/introduction">About</a></li>
    </ul>
  </div>
)