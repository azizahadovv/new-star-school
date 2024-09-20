import {
    ARCHIVEADMIN,
    ArchiveHome,
    ArchiveStudent,
    CARD1,
    CARD2,
    CARD3,
    CARD4,
    CARD5,
    CARD6,
    CARD7,
    DARSJADVALI,
    DARSJADVALIOUTLINE,
    LISTCLASS,
    LISTCLASSOUTLINE,
    RANK,
    STUDENT,
    STUDENTOUTLINE,
    SUBJECT,
    SUBJECTOUTLINE,
    TEACHER,
    TEACHEROUTLIN,
    TIMESCHEDULE,
    infoUser,
    infoUserOutline,
    settings1,
    settings2,
} from "../icons";
export const homeCard = [{
        id: 1,
        img: CARD1,
        title: "class_schedule_home",
        link: "/class-schedule",
    },
    {
        id: 2,
        img: CARD2,
        title: "list_of_classes_home",
        link: "/list-of-classes",
    },
    {
        id: 3,
        img: CARD3,
        title: "teacher_home",
        link: "/teachers",
    },
    {
        id: 4,
        img: CARD4,
        title: "student_home",
        link: "/students",
    },
    {
        id: 5,
        img: CARD5,
        title: "sciences",
        link: "/list-of-subjects",
    },
    {
        id: 6,
        img: CARD7,
        title: "settings",
        link: "/settings",
    },
    {
        id: 7,
        img: CARD6,
        title: "personal_information_home",
        link: "/profile",
    },
];

export const cardSidebar = [{
        id: 1,
        img1: DARSJADVALI,
        img2: DARSJADVALIOUTLINE,
        title: "class_schedule_home",
        link: "/class-schedule",
    },
    {
        id: 2,
        img1: LISTCLASS,
        img2: LISTCLASSOUTLINE,
        title: "list_of_classes_home",
        link: "/list-of-classes",
    },
    {
        id: 3,
        img1: TEACHER,
        img2: TEACHEROUTLIN,
        title: "teacher_home",
        link: "/teachers",
    },
    {
        id: 4,
        img1: STUDENT,
        img2: STUDENTOUTLINE,
        title: "student_home",
        link: "/students",
    },
    {
        id: 5,
        img1: SUBJECT,
        img2: SUBJECTOUTLINE,
        title: "sciences",
        link: "/list-of-subjects",
    },
    {
        id: 6,
        img1: settings1,
        img2: settings2,
        title: "settings",
        link: "/settings",
    },
    {
        id: 7,
        img1: infoUser,
        img2: infoUserOutline,
        title: "personal_information_home",
        link: "/profile",
    },
];

//
// arxiv admin
// arxiv student
// arxiv teacher

export const settings = [{
        id: 1,
        img: TIMESCHEDULE,
        title: "time_schedule",
        link: "archive-lesson-times",
    },
    {
        id: 2,
        img: RANK,
        title: "position",
        link: "position",
    },
    {
        id: 3,
        img: ARCHIVEADMIN,
        title: "archive_admin",
        link: "archive-admins",
    },
    {
        id: 4,
        img: ArchiveStudent,
        title: "archive_home",
        link: "archive-teachers",
    },
    {
        id: 5,
        img: ArchiveHome,
        title: "archive_student",
        link: "archive-students",
    },
];