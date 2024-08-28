import Experience from '@/components/Experiences/Experiences'
import Skill from '@/components/Competences/Competences'
import Menu from '@/components/Menu/Menu'
import { getExperiences, getSkills } from '@/lib/fetchData'

export default async function HomePage () {
    const experiences = await getExperiences()
    const skills = await getSkills()
  return (
    <main className="container mx-auto p-6">
      <section className="text-center mb-8">
        <h1 className="text-4xl font-bold text-secondary">Bienvenue sur mon Portfolio</h1>
        <Menu />
        <p className="text-xl mt-4">
          Je suis Olivier Pierre, Développeur Front-End & Chef de Projet Web
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Compétences</h2>
        <div>
            <Skill skill={skills} />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Expériences Récentes</h2>
        <Experience experiences={experiences} />
      </section>
    </main>
  )
}
