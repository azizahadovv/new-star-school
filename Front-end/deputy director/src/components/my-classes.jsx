import React from 'react'
import { CARDCLASSES } from '../ui'
import { Container } from '../constanta/style'
import { useSelector } from 'react-redux'

function MyClasses() {
    const open = useSelector(sel => sel.sidebarReduser.open)

    return (
        <div className={`${Container} ${open ? 'hidden' : 'flex'} items-start minMobil:justify-center tablet:justify-start flex-wrap gap-2 minMobil:px-2`}>
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

export default MyClasses