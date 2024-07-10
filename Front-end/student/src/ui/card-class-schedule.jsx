import React from 'react'
import { teacherIcon } from '../icons'

function CardClassSchedule({ obj }) {
    return (
        <div className='w-[450px] min-h-96 border-card rounded-xl px-3 bg-white'>
            <div className='flex items-start justify-start py-2 border-b border-brGray'>
                <p className='uppercase text-center leading-6 text-blue text-lg font-semibold m-0 p-0'>DUSHANBA</p>
            </div>
            <div className='flex flex-col items-start justify-start py-2 gap-1 border-b border-brGray'>
                <div className='w-full flex items-start justify-between'>
                    <span className='text-textBlack font-bold font-sans'>Chet tili</span>
                    <span className='text-textGray'>08:00</span>
                </div>
                <span className='flex items-start justify-center gap-2 text-textGray'>
                    <img className='w-4 h-5' src={teacherIcon} alt="teacherIcon" />
                    Nuriddin Abdumalikov
                </span>
            </div>
        </div>
    )
}

export default CardClassSchedule