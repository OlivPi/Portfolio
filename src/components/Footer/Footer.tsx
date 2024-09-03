import styles from './footer.module.scss';
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className={styles.container}>
      <div className="mt-2">
        <a href="https://www.linkedin.com/in/olivierpierre"><FaLinkedin size={35}/></a>
        <a href="https://github.com/olivierpierre"><FaGithub size={35}/></a>
      </div>
      <p>
        &copy; {new Date().getFullYear()} Olivier Pierre. Tous droits réservés.
      </p>
    </footer>
  )
}
