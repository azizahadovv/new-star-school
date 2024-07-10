
function ButtonFrameSection({ functionProps, nameBtn, active }) {
    return (
        <label className={`cursor-pointer max-w-max px-3 py-2 ${active ? "bg-blue text-white" : "bg-lightGray text-textBlack"} rounded-[10px] `}>
            <button onClick={functionProps}></button>
            <span className="text-center">{nameBtn}</span>
        </label>
    )
}

export default ButtonFrameSection