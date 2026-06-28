import React, { useEffect, useState } from 'react'
import user_register from '../service/user'

function TeacherSubjects({ value, setValue }) {
  const [sub, setSub] = useState([])

  useEffect(() => {
    getSubjects();
  }, []);

  useEffect(() => {
    if (sub.length > 0 && !value) {
      // Agar sub ma'lumotlari bor va value hali tanlanmagan bo'lsa, birinchi fan tanlanadi
      setValue(sub[0].id);
    }
  }, [sub, value, setValue]);

  const getSubjects = async () => {
    const subs = await user_register.getUserSubjects(sessionStorage.getItem('my-users-ids'))
    if (subs && subs.subjects) {
      setSub(subs.subjects);
    }
  }

 

  return (
    <select value={value || ''} onChange={(e) => setValue(e.target.value)} className="form-select" aria-label="Default select example">
      {sub.length > 0 ? (
        sub.map(i => <option key={i.id} value={i.id}>{i.name}</option>)
      ) : (
        <option value="">Fanlar mavjud emas</option> // Ma'lumot bo'lmasa default xabar
      )}
    </select>
  )
}

export default TeacherSubjects;
