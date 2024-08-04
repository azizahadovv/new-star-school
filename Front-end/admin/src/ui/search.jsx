import { useTranslation } from "react-i18next"

function Search({ searchValue, setSearcheValue, placeholder } ){
    const {t}=useTranslation()
    placeholder= t("search_in_name")
    
    return (
        <label className='w-full min-h-10 rounded-lg bg-lightGray border border-brGray px-2 flex items-stretch justify-between gap-2'>
            <input value={searchValue} onChange={(e) => (setSearcheValue(e.target.value))} type="text" placeholder={placeholder} className='w-full bg-lightGray px-2 no-underline border-none outline-none' />
        </label>
    )
}

export default Search