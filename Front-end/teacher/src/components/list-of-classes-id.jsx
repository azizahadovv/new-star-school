import { Container, styleTopBarUINoFlex } from '../constanta/style'
import { BUTTON, CLASSSCHEDULE } from '../ui'
function ListOfClassesID({ arr }) {
  return (
    <div className={`${Container}`}>
      <div className={`${styleTopBarUINoFlex} h-20 flex items-center justify-start tablet:px-4 minMobil:px-2 overflow-scroll`}>
          <BUTTON name={'1-chorak'} active={true} />
          <BUTTON name={'2-chorak'} />
          <BUTTON name={'3-chorak'} />
          <BUTTON name={'4-chorak'} />
      </div>
      <div className={`${styleTopBarUINoFlex} min-h-96 p-3`}>
        <CLASSSCHEDULE />
      </div>
    </div>
  )
}

export default ListOfClassesID