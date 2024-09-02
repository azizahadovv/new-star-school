import React from 'react'
import { useTranslation } from 'react-i18next'

function Loader() {
  const { t } = useTranslation()
  return (
    <h1>{t('no_date')}</h1>
  )
}

export default Loader