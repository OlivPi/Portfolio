export default function Footer() {
  return (
    <footer>
      <p>
        &copy; {new Date().getFullYear()} Olivier Pierre. Tous droits réservés.
      </p>
      <div className="mt-2">
        <a href="https://www.linkedin.com/in/olivierpierre">LinkedIn</a>
        <a href="https://github.com/olivierpierre">GitHub</a>
      </div>
    </footer>
  )
}
