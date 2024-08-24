import { useNavigate, useParams } from "react-router-dom"
import { bgLightGray } from "../constanta/style"
import classInId from "../service/class-in-id"
import { useEffect, useState } from "react"
import { Formik, Form, Field } from "formik"
import gradeStudents from "../service/grade"
import { LOADER } from "."
import { useTranslation } from "react-i18next"

function ClassSchedule() {
    const { id } = useParams()
    const nav = useNavigate()
    const { t } = useTranslation()
    const [studentsData, setStudentsData] = useState([])
    const dateFront = `${new Date().getFullYear()}.${("0" + (new Date().getMonth() + 1)).slice(-2)}.${("0" + new Date().getDate()).slice(-2) + " " + new Date().getHours() + ":" + new Date().getMinutes()}`
    const teacherId = 1;

    useEffect(() => {
        students()
    }, [])

    const students = async () => {
        const datas = await classInId.myClasses(id)
        setStudentsData(datas.students);
    }
    const handleSubmit = async (values) => {
        console.log(values);
        const dataToSend = Object.keys(values.marks).map(studentId => ({
            studentId: Number(studentId),
            teacherId: teacherId,
            subjectId: teacherId,
            termId: Number(localStorage.getItem('term')) !== 0 && Number(localStorage.getItem('term')) !== '' ? Number(localStorage.getItem('term')) : 1,
            schoolClassId: Number(id),
            gradeValue: values.marks[studentId],
            dateAssigned: new Date().toISOString()
        }));

        console.log(dataToSend);
        await gradeStudents.postGarde(dataToSend).then(() => {
            values.marks = ""
            nav(-1)
        });
    }

    return (
        <div className="w-full overflow-scroll">
            <Formik
                initialValues={{
                    marks: studentsData.reduce((acc, student) => {
                        acc[student.id] = '';
                        return acc;
                    }, {})
                }}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                {({ values }) => (
                    <Form>
                        {
                            studentsData.length === 0 ? <div className="w-fill min-h-52 flex items-center justify-center"> <LOADER /></div> : <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>№</th>
                                        <th>{t("table_pupils")}</th>
                                        <th>
                                            <div className={`${bgLightGray} border-t-blue no-underline outline-none flex items-center justify-center`}>{dateFront}</div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {studentsData.map((student, id) => (
                                        <tr key={student.id}>
                                            <td>{id + 1}</td>
                                            <td className="w-25">
                                                <div className="min-w-[250px] flex gap-2 items-center">
                                                    <img className="rounded-full w-[40px] h-[40px] border border-brGray" hidden={student.image !== null ? false : true} src={student.image} alt="student.image" />
                                                    <span>{student.lastName + " " + student.firstName + " " + student.patronymic}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <Field as="select" name={`marks.${student.id}`} style={{ width: "150px" }} className="form-select">
                                                    <option value='' hidden>{t("assessment")}</option>
                                                    <option value='present'>{t("in_class")}</option>
                                                    <option value='sababli'>{t("not_in_class")}</option>
                                                    <option value='5'>5</option>
                                                    <option value='4'>4</option>
                                                    <option value='3'>3</option>
                                                    <option value='2'>2</option>
                                                </Field>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        }
                        <button type="submit" className="btn btn-primary mt-4">{t("save_grades")}</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default ClassSchedule
