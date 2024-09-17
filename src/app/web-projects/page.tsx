import ProjectCard from '@/components/ProjectCard/ProjectCard'
import { getExperiences, getProjects } from "@/lib/fetchData";
import styles from '@/app/ui/projects.module.scss'
import Experiences from "@/components/Experiences/Experiences";
export default async function WebProjectsPage() {
  const projects = await getProjects('Développement web');
  const exp = await getExperiences('Développement web');

  return (
    <section className={styles.container}>
      <h1>Projets Web</h1>
      <div className={styles.containerProjects}>
        <ProjectCard projects={projects}/>
      </div>
      <div className={styles.containerXp}>
        <h2>Expériences</h2>
        <Experiences experiences={exp} />
      </div>
    </section>
  )
}
