import { Skill as SkillType } from '@/lib/types/SkillTypes'

interface SkillListProps {
  skills: SkillType[]
}

export default function Skill({ skills }: SkillListProps) {
  return (
    <div>
        <ul>
            <li>Compétence 1</li>
            <li>Compétence 2</li>
            <li>Compétence 3</li>
            <li>Compétence 4</li>
        </ul>
    </div>
  )
}
