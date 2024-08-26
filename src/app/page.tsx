import Experience from '@/components/Experiences/Experiences'
import Skill from '@/components/Competences/Competences'
import Menu from '@/components/Menu/Menu'
/*
import { getExperiences, getSkills } from '@/lib/prisma'
*/

export default async function HomePage() {
  /*  const experiences = await getExperiences()
  const skills = await getSkills()*/

  return (
    <main className="container mx-auto p-6">
      <section className="text-center mb-8">
        <h1 className="text-4xl font-bold">Bienvenue sur mon Portfolio</h1>
        <Menu />
        <p className="text-xl mt-4">
          Je suis Olivier Pierre, Développeur Front-End & Chef de Projet Web
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Compétences</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/*       {skills.map((skill) => (
            <Skill key={skill.id} skills={skills} />
          ))}*/}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Expériences Récentes</h2>
        {/*
        <Experience experiences={experiences} />
*/}
      </section>
    </main>
  )
}
