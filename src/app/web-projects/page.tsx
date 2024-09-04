import ProjectCard from '@/components/ProjectCard/ProjectCard'
import { getProjects } from '@/lib/fetchData';
import styles from '@/app/ui/projects.module.scss'
export default async function WebProjectsPage() {
  const projects = await getProjects('Développement web');

  return (
    <section className={styles.container}>
      <h1>Projets Web</h1>
      <div className={styles.containerProjects}>
        <ProjectCard projects={projects}/>
      </div>
   </section>
  )
}
