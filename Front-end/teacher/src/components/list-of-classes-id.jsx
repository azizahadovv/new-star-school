import { Container, styleTopBarUINoFlex } from '../constanta/style'
import { BUTTON, CLASSSCHEDULE } from '../ui'
function ListOfClassesID({ arr }) {
  return (
    <div className={`${Container}`}>
      <div className={`${styleTopBarUINoFlex} h-20 flex items-center justify-between tablet:px-4 minMobil:px-2 overflow-scroll`}>
        <div className='flex items-center justify-center gap-3'>
          <BUTTON name={'1-chorak'} active={true} />
          <BUTTON name={'2-chorak'} />
          <BUTTON name={'3-chorak'} />
          <BUTTON name={'4-chorak'} />
        </div>
        <BUTTON name={'Baholash'} active={true} />
      </div>
      <div className={`${styleTopBarUINoFlex} min-h-96 p-3`}>
        <CLASSSCHEDULE />
      </div>
    </div>
  )
}

export default ListOfClassesID