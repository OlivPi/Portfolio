import { Experience as ExperienceType } from '@/lib/types/ExperiencesTypes'

interface ExperiencesProps {
  experiences: ExperienceType[]
}

export default function Experiences({ experiences }: ExperiencesProps) {
  return (
      <div>
        <ul>
          <li>Exp 1</li>
          <li>Exp 2</li>
          <li>Exp 3</li>
          <li>Exp 4</li>
        </ul>
      </div>
  )
}
