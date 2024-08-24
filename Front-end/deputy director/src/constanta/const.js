import { CARD1, CARD2, CARD3, CARD4, CARD6, DARSJADVALI, DARSJADVALIOUTLINE, HOME1, HOME2, LISTCLASS, LISTCLASSOUTLINE, STUDENT, STUDENTOUTLINE, TEACHER, TEACHEROUTLIN, infoUser, infoUserOutline, myclassesss, myschedule, studentMark } from '../icons'
export const homeCard = [
    {
        id: 1,
        img: myclassesss,
        title: "My_classes_mark",
        link: "/my-classes"
    },
    {
        id: 2,
        img: CARD1,
        title: "class_schedule_home",
        link: "/class-schedule"
    },
    {
        id: 3,
        img: CARD2,
        title: "list_of_classes_home",
        link: "/list-of-classes"
    },
    {
        id: 4,
        img: CARD3,
        title: "teacher_home",
        link: "/teachers"
    }, {
        id: 5,
        img: CARD4,
        title: "student_home",
        link: "/students"
    }, {
        id: 6,
        img: CARD6,
        title: "personal_information_home",
        link: "/profile"
    },

]


export const homeCard2 = [
    {
        id: 1,
        img1: HOME2,
        img2: HOME1,
        title: "My_classes_mark",
        link: "/my-classes"
    },
    {
        id: 2,
        img1: DARSJADVALI,
        img2: DARSJADVALIOUTLINE,
        title: "class_schedule_home",
        link: "/class-schedule"
    },
    {
        id: 3,
        img1: LISTCLASS,
        img2: LISTCLASSOUTLINE,
        title: "list_of_classes_home",
        link: "/list-of-classes"
    },
    {
        id: 4,
        img1: TEACHER,
        img2: TEACHEROUTLIN,
        title: "teacher_home",
        link: "/teachers"
    }, {
        id: 5,
        img1: STUDENT,
        img2: STUDENTOUTLINE,
        title: "student_home",
        link: "/students"
    }, {
        id: 6,
        img1: infoUser,
        img2: infoUserOutline,
        title: "personal_information_home",
        link: "/profile"
    },

]

export const my_class_info = [
    {
        id: 1,
        img: myschedule,
        title: "my_schedule",
        link: "my-schedule"
    },
    {
        id: 2,
        img: studentMark,
        title: "my_grade",
        link: "mark-students"
    },

]