import { PERSONALINFORMATIONSHOME, PERSONNELHOME, RATINGHOME, STUDENTHOME, TEACHERHOME } from "../icons";

export const homeList = [
    {
        id: 1,
        title: "Reyting",
        path: '/ratings',
        icon: RATINGHOME,
        // exact: true
    },
    {
        id: 2,
        title: "O‘qituvchilar",
        path: '/teachers',
        icon: TEACHERHOME,
        // exact: true
    }, {
        id: 3,
        title: "O‘quvchilar",
        path: '/students',
        icon: STUDENTHOME,
        // exact: true
    },
    {
        id: 4,
        title: "Xodimlar",
        path: '/personnel',
        icon: PERSONNELHOME,
        // exact: true
    },
    {
        id: 5,
        title: "Shaxsiy ma’lumotlar",
        path: '/personal-information',
        icon: PERSONALINFORMATIONSHOME,
        // exact: true
    },

]