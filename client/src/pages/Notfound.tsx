import styled from 'styled-components'

const Notfound = () => {
  return <>    
     <Page404Styled className="text-center">Page not found</Page404Styled>
  </>
}
export default Notfound;

const Page404Styled = styled.h1`
  display: flex;
  height: 50vh;
  justify-content: center;
  align-items: center;
`;

   