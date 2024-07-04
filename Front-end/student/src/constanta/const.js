import { Link } from "react-router-dom";
import {
    AppstoreOutlined,
    CalendarOutlined,
    LinkOutlined,
    MailOutlined,
    SettingOutlined,
} from '@ant-design/icons';

export const NavbarItems = [
    {
        key: 'link1',
        icon: <LinkOutlined />,
        label: (
            <Link to={'/profile'}>
                Ant Design
            </Link>
        ),
    },
    {
        key: 'link2',
        icon: <LinkOutlined />,
        label: (
            <Link to={'/profile'}>
                Ant Design
            </Link>
        ),
    },
    {
        key: 'link3',
        icon: <LinkOutlined />,
        label: (
            <Link to={'/profile'}>
                Ant Design
            </Link>
        ),
    },
    {
        key: 'link4',
        icon: <LinkOutlined />,
        label: (
            <Link to={'/profile'}>
                Ant Design
            </Link>
        ),
    },
];