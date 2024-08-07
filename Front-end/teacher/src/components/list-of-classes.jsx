import { Container } from "../constanta/style"
import { CARDCLASSES } from "../ui"


function ListOfClasses() {
  return (
    <div className={`${Container} py-5 flex items-start content-start minMobil:justify-center tablet:justify-start flex-wrap gap-4 minMobil:px-2`}>
      <CARDCLASSES slug={'azizlani-sinifi'} />
      <CARDCLASSES slug={'njasnm-csd-dc-s'} />
      <CARDCLASSES slug={'njasnm-csd-dc-s'} />
      <CARDCLASSES slug={'njasnm-csd-dc-s'} />
      <CARDCLASSES slug={'njasnm-csd-dc-s'} />
      <CARDCLASSES slug={'njasnm-csd-dc-s'} />
      <CARDCLASSES slug={'njasnm-csd-dc-s'} />
      <CARDCLASSES slug={'njasnm-csd-dc-s'} />
      <CARDCLASSES slug={'njasnm-csd-dc-s'} />
    </div>
  )
}

export default ListOfClasses