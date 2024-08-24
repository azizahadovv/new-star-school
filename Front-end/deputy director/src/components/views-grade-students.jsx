import React, { useEffect, useState } from 'react'
import { Container, styleTopBarUINoFlex } from '../constanta/style'
import { useParams } from 'react-router-dom'
import MarkClass from '../service/mark'
import { SELECTTERMS, TERM } from '../ui'
import { useTranslation } from 'react-i18next'

function MarkStudents() {
    const [selectedOption, setSelectedOption] = useState(localStorage.getItem('selectedOption') || '');
    const [datas, setDatas] = useState([])
    const { id } = useParams()
    const { t } = useTranslation()

    useEffect(() => {
        getMarkData();
    }, [selectedOption, id]);

    const getMarkData = async () => {
        const data = await MarkClass.getMarks(1, 1, id, selectedOption)
        setDatas(data)
    }

    const handleOptionChange = (newOption) => {
        setSelectedOption(newOption);
        localStorage.setItem('selectedOption', newOption);
    };

    const dates = datas.map(item => item.date);

    const students = Array.from(
        new Set(datas.flatMap(item => item.grades.map(grade => grade.studentName)))
    );

    const getGrade = (studentName, date) => {
        const dateData = datas?.find(d => d.date === date);
        const studentGrade = dateData?.grades.find(g => g.studentName === studentName);
        return studentGrade ? studentGrade.gradeValue : '';
    };

    return (
        <div className={`${Container}`}>
            <div className={`${styleTopBarUINoFlex} min-h-20 flex items-center justify-start px-3`}>
                <TERM selectedOption={selectedOption} setSelectedOption={handleOptionChange} />
            </div>
            <div className={`${styleTopBarUINoFlex} min-h-96 p-3 overflow-scroll`}>
                {datas.length !== 0 ? (
                    <table className="teble w-100">
                        <thead className='table-hover'>
                            <tr>
                                <th className="py-2 px-4 border-b">№</th>
                                <th className="py-2 px-4 border-b"><p className='min-w-[250px]'>{t("table_pupils")}</p></th>
                                {dates?.map((date, index) => (
                                    <th key={index} className="py-2 px-4 border-b"><p className='min-w-[100px]'>{date}</p></th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {students?.map((student, index) => (
                                <tr key={index}>
                                    <td className="py-2 px-4 border-b">{index + 1}</td>
                                    <td className="py-2 px-4 border-b">{student}</td>
                                    {dates?.map((date, i) => (
                                        <td key={i} className="py-2 px-4 border-b text-center">
                                            {getGrade(student, date)}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className='w-full h-full flex items-center justify-center mt-5 text-3xl'>{t("no_dates")}</div>
                )}
            </div>
        </div>
    )
}

export default MarkStudents
