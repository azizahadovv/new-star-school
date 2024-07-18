import React from 'react'
import { Container } from '../constanta/style'
import { CARDCLASSES } from '../ui'
import { useSelector } from 'react-redux'

function ClassSchedule() {
  const open = useSelector(sel => sel.sidebarReduser.open)
  return (
    <div className={`${Container} ${open ? 'hidden' : 'flex'} items-start minMobil:justify-center content-start tablet:justify-start flex-wrap gap-4 minMobil:px-2`}>
      <CARDCLASSES slug={'1'} />
      <CARDCLASSES slug={'2'} />
      <CARDCLASSES slug={'3'} />
      <CARDCLASSES slug={'3'} />
      <CARDCLASSES slug={'3'} />
      <CARDCLASSES slug={'3'} />
      <CARDCLASSES slug={'3'} />
      <CARDCLASSES slug={'3'} />
      <CARDCLASSES slug={'3'} />
      <CARDCLASSES slug={'3'} />
    </div>
  )
}

export default ClassSchedule