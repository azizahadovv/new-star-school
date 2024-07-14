import { useDispatch, useSelector } from "react-redux"
import { Container, styleTopBarUINoFlex } from "../constanta/style"
import { ACTIVECLASSES, BUTTON, CARDCLASSES, SEARCH, SELECTCLASSGROUP, SELECTCLASSNUMBER } from "../ui"
import { showModal } from "../slice/addclass"
import Rodal from 'rodal';
import { ToastContainer, toast } from "react-toastify";

function ListOfClasses() {
  const visible = useSelector(sel => sel.addclass.visible)
  const open = useSelector(sel => sel.sidebarReduser.open)
  const dispatch = useDispatch()
  return (
    <div className={`${Container} py-2 overflow-scroll`}>
      <div className={`${styleTopBarUINoFlex} w-full min-h-20 flex items-center justify-between px-3 overflow-scroll`}>
        <div className="tablet:min-w-2/6 minMobil:min-w-[300px]">
          <SEARCH />
        </div>
        <div>
          <BUTTON buttonFunction={() => (dispatch(showModal()))} name={'Sinf yaratish'} active />
        </div>
      </div>
      <div className={`${open ? 'hidden' : 'flex'} flex-1 items-start justify-start gap-3 flex-wrap py-3`}>
        <ACTIVECLASSES />
        <ACTIVECLASSES />
        <ACTIVECLASSES />
        <ACTIVECLASSES />
        <ACTIVECLASSES />
        <ACTIVECLASSES />
      </div>
      <Rodal height={200} visible={visible} onClose={() => (dispatch(showModal()))}>
        <div className="w-full h-full">
          <p className="text-xl border-b border-brGray leading-10 font-bold text-textBlack">Sinf yaratish</p>
          <div className="flex flex-col items-start justify-between h-28">
            <div className="flex items-center justify-between w-full gap-3">
              <SELECTCLASSNUMBER />
              <SELECTCLASSGROUP />
            </div>
            <BUTTON name={"Saqlash"} active buttonFunction={
              () => {
                dispatch(showModal())
                toast.success('Sinf yaratildi!',)
              }
            } />
          </div>
        </div>
      </Rodal>
      <ToastContainer />
    </div>
  )
}

export default ListOfClasses