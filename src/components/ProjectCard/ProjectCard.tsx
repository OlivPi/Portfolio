import { Project } from '@/lib/types/ProjectTypes'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="card">
        <ul>
            <li>Projet 1</li>
            <li>Projet 2</li>
            <li>Projet 3</li>
            <li>Projet 4</li>
            <li>Projet 5</li>
        </ul>
    </div>
  )
}
