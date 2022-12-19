import { ReactElement } from 'react';

import ReactDOM from 'react-dom';
import SearchForm from './SearchForm';

const SearchModelPlaceholder = document.getElementById('search-model')!


const SearchModel = (props: { children?: ReactElement }) => {
    return (
        <>
            {ReactDOM.createPortal(
                <OverlayModel />,
                SearchModelPlaceholder
            )}
        </>
    );
}

export default SearchModel


const OverlayModel: React.FC = () => {
    const handleClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        SearchModelPlaceholder.style.display = "none";
    }
    return (
        <>
            {/* Search Begin */}
            <div className="h-100 d-flex align-items-center justify-content-center">
                <button className="search-close-switch" onClick={handleClose}>+</button>
                <SearchForm
                    cssClass='search-model-form'
                    placeholder="Search here....."
                    handleSubmit={() => { console.log("submit") }} />
            </div>

            {/* Search End */}
        </>
    )
}