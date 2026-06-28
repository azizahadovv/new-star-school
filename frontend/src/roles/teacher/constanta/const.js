import { HOMECLASS, HOMEPERSONINFO, infoUser, infoUserOutline, LISTCLASS, LISTCLASSOUTLINE, TEACHERTABLE } from "../icons";

export const homeCard = [
    {
        id: 1,
        img: TEACHERTABLE,
        title: "time_table",
        link: "/time-table"
    },{
        id: 2,
        img: HOMECLASS,
        title: "list_of_classes_home",
        link: "/list-of-classes"
    },
    {
        id: 3,
        img: HOMEPERSONINFO,
        title: "personal_information",
        link: "/profile"
    },
]
export const homeCard2 = [
    {
        id: 1,
        img1: TEACHERTABLE,
        img2: TEACHERTABLE,
        title: "time_table",
        link: "/time-table"
    },{
        id: 2,
        img1: LISTCLASS,
        img2: LISTCLASSOUTLINE,
        title: "list_of_classes_home",
        link: "/list-of-classes"
    },
    {
        id: 3,
        img1: infoUser,
        img2: infoUserOutline,
        title: "personal_information",
        link: "/profile"
    },
]