import React from 'react'
import subjectFunction from '../service/subjects'

function SubjectTeacher({ subjectTeacherId, setSubjectTeacherId, style = { height: "55px", maxWidth: "350px" } }) {
    const [subjectList, setSubjectList] = React.useState([])
    React.useEffect(() => {
        getSubjectFunction()
    }, [])

    const getSubjectFunction = async () => {
        const response = await subjectFunction.getSubjects()
        setSubjectList(response)
    }
    return (
        <select
            value={subjectTeacherId}
            onChange={(e) => setSubjectTeacherId(e.target.value)}
            required
            className="form-select"
            style={style}
            aria-label="Default select example"
        >
            <option hidden>
                Qaysi fandan dars beradi *
            </option>
            {
                subjectList.map((subject) => {
                    return (
                        <option key={subject.id} value={subject.id}>{subject.name}</option>
                    )
                })
            }
        </select>
    )
}

export default SubjectTeacher