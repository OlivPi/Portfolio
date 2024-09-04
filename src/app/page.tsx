import Experience from '@/components/Experiences/Experiences';
import Skill from '@/components/Competences/Competences';
import {ProfileInfos} from "@/components/ProfileInfos/ProfileInfos";
import {getExperiences, getSkills} from '@/lib/fetchData';
import styles from './ui/home.module.scss';

export default async function HomePage () {
    const experiences = await getExperiences();
    const skills = await getSkills();

  return (
    <main className={styles.containerHome}>
        <ProfileInfos/>
      <section className={styles.skillsSection}>
        <h2>Compétences</h2>
            <Skill skill={skills} />
      </section>
      <section>
        <h2>Expériences</h2>
        <Experience experiences={experiences} />
      </section>
    </main>
  )
}
