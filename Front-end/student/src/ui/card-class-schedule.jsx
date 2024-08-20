import { teacherIcon } from '../icons'

function CardClassSchedule({ weekDay, data }) {
    return (
        <div className='w-[430px] min-h-96 border-card rounded-xl px-3 bg-white'>

            <div className='flex items-start justify-start py-2 border-b border-brGray'>
                <p className='capitalize text-center leading-6 text-blue text-lg font-semibold m-0 p-0'>{weekDay}</p>
            </div>
            {
                data.map(item => (
                    <div key={item.id} className='flex flex-col items-start justify-start py-2 gap-1 border-b border-brGray'>
                        <div className='w-full flex items-start justify-between'>
                            <span className='text-textBlack font-bold font-sans'>{item.subjectName}</span>
                            <span className='text-textGray'>{item.startTime.slice(0,5)}-{item.endTime.slice(0,5)}</span>
                        </div>
                        <span className='flex items-start justify-center gap-2 text-textGray capitalize'>
                            <img className='w-4 h-5' src={teacherIcon} alt="teacherIcon" />
                            {item.teacherName}
                        </span>
                    </div>
                ))
            }

        </div>
    )
}

export default CardClassSchedule