import { useState } from 'react';
import { Container, styleTopBarUINoFlex } from '../constanta/style'
import { CLASSSCHEDULE, TERM } from '../ui'

function ListOfClassesID() {
    const [selectedOption, setSelectedOption] = useState('')
    return (
        <div className={`${Container}`}>
            <div className={`${styleTopBarUINoFlex} h-20 flex items-center justify-start tablet:px-4 minMobil:px-2 overflow-scroll`}>
                <TERM selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
            </div>
            <div className={`${styleTopBarUINoFlex} min-h-96 p-3`}>
                <CLASSSCHEDULE />
            </div>
        </div>
    )
}

export default ListOfClassesID