import styles from './footer.module.scss';
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className={styles.container}>
      <div className="mt-2">
        <Link href="https://www.linkedin.com/in/olivierpierre" target={'_blank'} rel={'noopener noreferrer'}><FaLinkedin size={35}/></Link>
        <Link href="https://github.com/OlivPi" target={'_blank'} rel={'noopener noreferrer'}><FaGithub size={35}/></Link>
      </div>
      <p>
        &copy; {new Date().getFullYear()} Olivier Pierre. Tous droits réservés.
      </p>
    </footer>
  )
}
