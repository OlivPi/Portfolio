import { ProjectSummary } from '@/lib/types/ProjectTypes';
import Image from 'next/image';
import Link from 'next/link';
import styles from './projectCard.module.scss';
import HotelOutal from '../../../public/projects/hotelouta-image.png';

interface ProjectsProps{
  projects: ProjectSummary[];
}

export default function ProjectCard({projects}: ProjectsProps) {
  return projects.map((project, key) => (
    <div key={project.id} className={styles.card}>
      <Link href={project.link as string} passHref={true} target={'_blank'} rel={'noopener noreferrer'}>
        <Image
          src={`/projects/${project.image}`}
          alt={project.name}
          sizes="100vw"
          style={{
            width: '100%',
            height: 'auto',
          }}
          width={500}
          height={300}
          placeholder="empty"
        />
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        <ul>
          {project.skills.map((skill, key) => (
            <li key={skill.id}>{skill.name}</li>
          ))}
        </ul>
        <h4>
          Structure : <span>{project.structure}</span>
        </h4>
      </Link>
    </div>
  ))
}
