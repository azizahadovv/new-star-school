import { NAVBAR } from '.'
import { Outlet} from 'react-router-dom'

function Layout() {
    return (
        <>
            <NAVBAR />
            <Outlet />
        </>
    )
}

export default Layout