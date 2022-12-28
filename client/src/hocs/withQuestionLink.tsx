//withdLoading.js
import React, { useCallback, useState } from 'react';

function WithQuestionLink(Component: any) {
    return function WithQuestionLinkComponent({ ...props }) {
        const [isShowPromoCode, setShowPromoCode] = useState(false)

        const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
            e.preventDefault();
            setShowPromoCode(true)
        }, [])

        return <>
            {!isShowPromoCode ? <><h6 className="coupon__code" >
                <span className="icon_tag_alt" /> Have a coupon?{" "}
                <a href="#" onClick={handleClick}>Click here</a> to enter your code
            </h6></> : <Component hasRef />}
        </>
    };
}
export default WithQuestionLink;