import Menu from '../Menu/Menu'
import { SiteTitle } from '@/components/Titles/SiteTitle'
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle'
import { PersonalInformationSummary } from '@/lib/types/PersonalInformation'
interface PersonalInformationProps {
  personalInformation: PersonalInformationSummary[]
}
export default function Header({
  personalInformation,
}: PersonalInformationProps) {
  return (
    <header className="pt-6 pb-24">
      <div className={'flex justify-between items-center pb-24'}>
        <SiteTitle />
        <div className="flex flex-row items-center gap-3">
          <Menu />
          <div className="md:hidden">
            <ThemeToggle />
          </div>
        </div>
      </div>
      <h2 className={'text-xl flex flex-col'}>
        {personalInformation[0]?.title}
      </h2>
    </header>
  )
}
