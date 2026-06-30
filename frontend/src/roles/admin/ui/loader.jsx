import React from 'react'
import { useTranslation } from 'react-i18next'

// Bo'sh holat — nozik, markazlashgan, o'qsiz (avval ulkan qo'pol <h1> edi).
function Loader() {
  const { t } = useTranslation()
  return (
    <div className="w-full flex flex-col items-center justify-center py-16 gap-2">
      <span className="text-2xl opacity-40">🗂️</span>
      <p className="text-base font-medium text-textGray text-center max-w-md leading-relaxed">
        {t('no_date')}
      </p>
    </div>
  )
}

export default Loader
