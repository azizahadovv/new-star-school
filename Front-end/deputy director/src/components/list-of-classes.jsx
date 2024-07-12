import { Container } from "../constanta/style"
import { CARDCLASSES } from "../ui"


function ListOfClasses() {
  return (
    <div className={`${Container} py-5 flex items-start justify-center flex-wrap gap-4`}>
        <CARDCLASSES slug={'njasnm-csd-dc-s'} />
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