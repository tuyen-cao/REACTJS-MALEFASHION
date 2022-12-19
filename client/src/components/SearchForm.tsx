import { SearchFormProps } from 'models/types'
import React from 'react'

const SearchForm: React.FC<SearchFormProps> = (props) => {
    const { cssClass = "",
        hasSubmitBtn = false,
        placeholder, handleSubmit } = props
   
    return (
        <>
            <form action="#" onSubmit={handleSubmit} className={cssClass}>
                <input type="text" placeholder={placeholder} />
                {hasSubmitBtn &&
                    <button type="submit">
                        <span className="icon_search" />
                    </button>
                }
            </form>
        </>
    )
}

export default SearchForm
