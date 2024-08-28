import { Experience as ExperienceType } from '@/lib/types/ExperiencesTypes'
interface ExperiencesProps {
  experiences: ExperienceType[]
}
export default function Experiences({ experiences }: ExperiencesProps) {

  return (
      <div>
          {
              experiences.map((exp, key) => (
                  <div key={exp.id}>
                      <div className='flex items-end' >
                          <h4 className='text-xl pr-2'>{exp.role}</h4>
                          <p className='font-bold'>{exp.company} - {exp.city}</p>
                      </div>
                      <p className='font-light'>{exp.description}</p>
                      <ul className='flex'>
                          {exp.tasks.map((task, key) =>(
                              <li className='font-light pl-1'>/ {task} </li>
                              ))
                          }
                      </ul>
                  </div>

              ))
          }

      </div>
  )
}
