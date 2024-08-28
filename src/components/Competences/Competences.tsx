import { Skills as SkillType } from '@/lib/types/SkillTypes'
interface SkillListProps {
  skills: SkillType[]
}

export default function Skill({ skills }: SkillListProps) {
  return (
    <ul>
        {skills.map((skill, key)=>(
            <li key={skill.id}>
                <p>{skill.name}</p>
            </li>
        ))}
    </ul>
  )
}
