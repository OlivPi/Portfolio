import { getProjects } from "@/lib/fetchData";
import ProjectCard from "@/components/ProjectCard/ProjectCard";
import styles from "@/app/ui/projects.module.scss";

export default async function EventComPage() {
  const projects = await getProjects('Événement');

  return (
    <section className={styles.container}>
      <h1>Événementiel & Communication</h1>
      <div className={styles.containerProjects}>
        <ProjectCard projects={projects}/>
      </div>
    </section>
  )
}
