
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { Link } from 'react-router-dom'
import { useEffect, useState } from "react";


const Breadcrumbs = () => {
    const breadcrumbs = useBreadcrumbs();
    const [pageName, setPageName] = useState<string|undefined>('')
   
    useEffect(() => {
        let pathname = breadcrumbs.pop()?.key
        pathname = pathname?.substring(pathname.lastIndexOf('/')+1, pathname.length)
        setPageName( pathname?.replaceAll("-", " "))
        
    },[breadcrumbs])
    return (
        <>
            <section className="breadcrumb-option">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb__text">
                                <h4>{pageName}</h4>
                                <div className="breadcrumb__links">
                                    {breadcrumbs.map(({ match, breadcrumb }, i) => {
                                        if (breadcrumbs.length - 1 === i) {
                                            return breadcrumb
                                        } else {
                                            return (
                                                <Link key={match.pathname} to={match.pathname}>
                                                    {breadcrumb}
                                                </Link>
                                            )
                                        }
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};
export default Breadcrumbs