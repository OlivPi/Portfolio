import Experience from '@/components/Experiences/Experiences'
import Skill from '@/components/Competences/Competences'
import {ProfileInfos} from "@/components/ProfileInfos/ProfileInfos";
import {getExperiences, getSkills} from '@/lib/fetchData'

export default async function HomePage () {
    const experiences = await getExperiences()
    const skills = await getSkills()

  return (
    <main className="container mx-auto p-6">
        <ProfileInfos/>
      <section className="flex flex-col items-end mb-8">
        <h2 className="text-2xl font-semibold mb-4">Compétences</h2>
            <Skill skill={skills} />
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Expériences</h2>
        <Experience experiences={experiences} />
      </section>
    </main>
  )
}
