import Experience from '@/components/Experiences/Experiences'
import Skill from '@/components/Competences/Competences'
import { ProfileInfos } from '@/components/ProfileInfos/ProfileInfos'
import { getEducations, getExperiences, getSkills } from '@/lib/fetchData'
import { SkillsSummary } from '@/lib/types/SkillsTypes'
import styles from './ui/home.module.scss'
import Education from '@/components/Educations/Educations'
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal'

export default async function HomePage() {
  const experiences = await getExperiences()
  const skills = await getSkills()
  const educations = await getEducations()

  const skillCategories = {
    Web: ['frontEnd', 'backEnd', 'databases', 'workflow', 'api'],
    Projet: ['projectManage', 'event', 'tools', 'communication'],
  }

  const categorizedSkills = {
    Web: skills.filter((s: SkillsSummary) =>
      skillCategories.Web.includes(s.type)
    ),
    Projet: skills.filter((s: SkillsSummary) =>
      skillCategories.Projet.includes(s.type)
    ),
  }

  return (
    <div className={styles.containerHome}>
      <ProfileInfos />
      <ScrollReveal>
        <section className={styles.skillsSection}>
          <h2>COMPÉTENCES</h2>
          <h3>WEB</h3>
          <div className={styles.skillsContainer}>
            <Skill title="Web" skill={categorizedSkills.Web} />
          </div>
          <h3>PROJETS</h3>
          <div className={styles.skillsContainer}>
            <Skill title="Projet" skill={categorizedSkills.Projet} />
          </div>
        </section>
      </ScrollReveal>
      <ScrollReveal>
        <section className={styles.experienceContainer}>
          <h2>EXPÉRIENCES</h2>
          <Experience experiences={experiences} />
        </section>
      </ScrollReveal>
      <ScrollReveal>
        <section className={styles.educationContainer}>
          <h2>FORMATIONS</h2>
          <Education educations={educations} />
        </section>
      </ScrollReveal>
    </div>
  )
}
