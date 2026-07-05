import type { Metadata } from 'next'
import { getProjects, getExperiences } from '@/lib/fetchData'
import ProjectCard from '@/components/ProjectCard/ProjectCard'
import styles from '@/app/ui/projects.module.scss'
import Experiences from '@/components/Experiences/Experiences'
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal'

export const metadata: Metadata = {
  title: 'Projets événementiel et communication',
  description:
    "Projets événementiels et culturels d'Olivier Pierre : festivals, programmation artistique et communication pour des expériences engageantes.",
  alternates: { canonical: '/event-com' },
  openGraph: {
    url: 'https://opierre.fr/event-com',
    title: 'Olivier Pierre | Événementiel & Communication',
    description:
      'Festivals, programmation artistique et projets culturels coordonnés par Olivier Pierre.',
  },
}

export default async function EventComPage() {
  const projects = await getProjects('Événement')
  const experiences = await getExperiences('Événement')

  return (
    <section className={styles.container}>
      <h1>Événementiel & Communication</h1>
      <ScrollReveal>
        <div className={styles.containerProjects}>
          <ProjectCard projects={projects} />
        </div>
      </ScrollReveal>
      <ScrollReveal>
        <div className={styles.containerXp}>
          <h2>Expériences</h2>
          <Experiences experiences={experiences} />
        </div>
      </ScrollReveal>
    </section>
  )
}
