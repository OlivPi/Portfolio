import Menu from '../Menu/Menu'
import {SiteTitle} from "@/components/Titles/SiteTitle";
import {PersonalInformationSummary} from "@/lib/types/PersonalInformation";
interface PersonalInformationProps {
    personalInformation: PersonalInformationSummary[];
}
export default function Header({personalInformation}: PersonalInformationProps) {
  return (
    <header className="py-24">
        <SiteTitle/>
        <Menu />
        <div>
            <h2 className={'text-xl'}>{personalInformation[0].title}</h2>
        </div>
    </header>
  )
}
