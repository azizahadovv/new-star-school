import React from 'react'
import { Container, styleTopBarUI, styleTopBarUINoFlex } from '../constanta/style'
import { SELECTOPTIOS } from '../ui'
import { useTranslation } from 'react-i18next'

function GradeRating() {
  const { t } = useTranslation()



  return (
    <div className={`${Container}`}>
      <div className={`w-full h-16 px-4 ${styleTopBarUI}`}>
        <div className='tablet:w-1/5 mobil:w-1/2 minMobil:w-full'>
          <SELECTOPTIOS />
        </div>
      </div>
      <div className={`min-h-96 flex items-start justify-start ${styleTopBarUINoFlex} px-2`}>
        <table className="table table-hover cursor-pointer">
          <thead>
            <tr className='text-textGray'>
              <th>№</th>
              <th>{t("class_date")}</th>
              <th>{t("subject_name")}</th>
              <th>{t("teachers_name")}</th>
              <th>{t("grade")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>10-anba</td>
              <td>Mahallik dars</td>
              <td>100%</td>
              <td>100%</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* ********************** pagination ************************* */}
      <div className='w-full flex items-center justify-center'>
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default GradeRating