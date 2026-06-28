import React, { useEffect, useState } from 'react';
import { Container, styleTopBarUINoFlex } from '../constanta/style';
import { useParams } from 'react-router-dom';
import MarkClass from '../service/mark';
import { SELECTTERMS, TEACHERSUBJECT, TERM } from '../ui';
import { useTranslation } from 'react-i18next';

function MarkStudents() {
    const [selectedOption, setSelectedOption] = useState(localStorage.getItem('selectedOption') || '');
    const [datas, setDatas] = useState([]);
    const [valueSubj, setValueSubj] = useState('');
    const [error, setError] = useState(null); // Error state
    const teacherId = sessionStorage.getItem('my-users-ids');
    const { id } = useParams();
    const { t } = useTranslation();

    useEffect(() => {
        getMarkData(); 
    }, [selectedOption, id, valueSubj]);

    const getMarkData = async () => {
        try {
            const data = await MarkClass.getMarks(teacherId, valueSubj, id, selectedOption);
            setDatas(data);
            setError(null); // Reset error on success
        } catch (err) {
            setError(t("error_loading_data")); // Handle error
            console.error(err);
        }
    };

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
            <div className={`${styleTopBarUINoFlex} min-h-20 flex items-center tablet:justify-start minMobil:justify-center p-2 px-3 gap-3 minMobil:flex-col tablet:flex-row`}>
                <div>
                    <TERM selectedOption={selectedOption} setSelectedOption={handleOptionChange} />
                </div>
                <div className='w-[350px]'>
                    <TEACHERSUBJECT value={valueSubj} setValue={setValueSubj} />
                </div>
            </div>
            <div className={`${styleTopBarUINoFlex} min-h-96 p-3 overflow-scroll`}>
                {error ? (
                    <div className='w-full h-full flex items-center justify-center mt-5 text-3xl'>{error}</div>
                ) : datas?.length !== 0 ? (
                    <table className="teble w-100">
                        <thead className='table-hover'>
                            <tr>
                                <th className="py-2 px-4 border-b">№</th>
                                <th className="py-2 px-4 border-b"><p className='min-w-[250px]'>{t("table_pupils")}</p></th>
                                {dates?.map((date, index) => (
                                    <th key={index} className="py-2 px-4 border-b"><p className='min-w-[100px] text-center'>{date}</p></th>
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
    );
}

export default MarkStudents;
