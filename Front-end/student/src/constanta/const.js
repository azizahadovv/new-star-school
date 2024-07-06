import { Link } from "react-router-dom";
import { attendance, infoUser, rating, savatcha } from "../icons";

export const NavbarItems = [
    {
        key: 'Dars jadvali',
        icon: (<img src={savatcha} />),
        label: (
            <Link to={'/'} className="no-underline">
                Dars jadvali
            </Link>
        ),
    },
    {
        key: 'Baxolar reytingi',
        icon: (<img src={rating} />),
        label: (
            <Link to={'/'} className="no-underline">
                Baxolar reytingi
            </Link>
        ),
    },
    {
        key: 'link3',
        icon: (<img src={attendance} />),
        label: (
            <Link to={'/'} className="no-underline">
                Davomat
            </Link>
        ),
    },
    {
        key: 'link4',
        icon: (<img src={infoUser} />),
        label: (
            <Link to={'/profile'} className="no-underline">
                Shaxsiy malumotlar
            </Link>
        ),
    },
];