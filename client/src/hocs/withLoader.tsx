import React from 'react';
import { LoadingSpinner } from '../components/LoadingSpinner';

export default function withLoader(Element:any, url:string) {
  return (props:any) => {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
      fetch(url)
        .then((res) => res.json())
        .then((res) => setData(res));
    }, []);

    

    return <> <LoadingSpinner /><Element {...props} data={data} /></>;
  };
}
