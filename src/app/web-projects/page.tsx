import type { Metadata } from 'next'
import ProjectCard from '@/components/ProjectCard/ProjectCard'
import { getExperiences, getProjects } from '@/lib/fetchData'
import styles from '@/app/ui/projects.module.scss'
import Experiences from '@/components/Experiences/Experiences'
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal'

export const metadata: Metadata = {
  title: 'Projets Web',
  description:
    "Découvrez les projets web d'Olivier Pierre : applications React, sites WordPress, intégrations API et expériences utilisateur sur-mesure.",
  alternates: { canonical: '/web-projects' },
  openGraph: {
    url: 'https://opierre.fr/web-projects',
    title: 'Olivier Pierre | Projets Web',
    description:
      'Applications React, sites WordPress et intégrations API réalisés par Olivier Pierre.',
  },
}

export default async function WebProjectsPage() {
  const projects = await getProjects('Développement web')
  const exp = await getExperiences('Développement web')

  return (
    <section className={styles.container}>
      <h1>Projets Web</h1>
      <ScrollReveal>
        <div className={styles.containerProjects}>
          <ProjectCard projects={projects} />
        </div>
      </ScrollReveal>
      <ScrollReveal>
        <div className={styles.containerXp}>
          <h2>Expériences</h2>
          <Experiences experiences={exp} />
        </div>
      </ScrollReveal>
    </section>
  )
}
