import { A1, A2, B1, B2, C1, C2, infoUser, infoUserOutline, PERSONALINFORMATIONSHOME, PERSONNELHOME, RATINGHOME, STUDENTHOME, TEACHERHOME } from "../icons";



export const homeList = [
    {
        id: 1,
        title: "rating_home",
        path: '/ratings',
        icon: RATINGHOME,
        // exact: true
    },
    {
        id: 2,
        title: "teacher_home",
        path: '/teachers',
        icon: TEACHERHOME,
        // exact: true
    }, {
        id: 3,
        title: "student_home",
        path: '/students',
        icon: STUDENTHOME,
        // exact: true
    },
    {
        id: 4,
        title: "personnel_home",
        path: '/personnel',
        icon: PERSONNELHOME,
        // exact: true
    },
    {
        id: 5,
        title: "personal_information_home",
        path: '/personal-information',
        icon: PERSONALINFORMATIONSHOME,
        // exact: true
    },

]

export const homeList2 = [
    {
        id: 1,
        title: "rating_home",
        path: '/ratings',
        underline: RATINGHOME,
        nounderline: RATINGHOME,
        // exact: true
    },
    {
        id: 2,
        title: "teacher_home",
        path: '/teachers',
        underline:A2  ,
        nounderline: A1,

        // exact: true
    }, {
        id: 3,
        title: "student_home",
        path: '/students',
        underline: B2,
        nounderline: B1,

        // exact: true
    },
    {
        id: 4,
        title: "personnel_home",
        path: '/personnel',
        underline:C2 ,
        nounderline: C1,

        // exact: true
    },
    {
        id: 5,
        title: "personal_information_home",
        path: '/personal-information',
        underline:infoUser ,
        nounderline:infoUserOutline ,

        // exact: true
    },

]