import { getProjects, getExperiences } from "@/lib/fetchData";
import ProjectCard from "@/components/ProjectCard/ProjectCard";
import styles from "@/app/ui/projects.module.scss";
import Experiences from "@/components/Experiences/Experiences";

export default async function EventComPage() {
  const projects = await getProjects('Événement');
  const exp = await getExperiences('Événement');

  return (
    <section className={styles.container}>
      <h1>Événementiel & Communication</h1>
      <div className={styles.containerProjects}>
        <ProjectCard projects={projects} />
      </div>
      <div className={styles.containerXp}>
        <h2>Expériences</h2>
        <Experiences experiences={exp} />
    </div>
</section>
)
}
