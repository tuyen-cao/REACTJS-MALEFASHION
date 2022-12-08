import styled from 'styled-components'

type RatingProps = {
    rating: {
        rate: number,
        count: number
    }
} & typeof defaultProps;

const defaultProps = {
    rating: {
        rate: 0,
        count: 0
    }
};


const Rating = (props: RatingProps) => {
    const rate = props.rating.rate
    const renderRating = () => {
        let content = []
        for (let index = 0; index < 5; index++) {
            const className = index < rate ? 'fa fa-star' : 'fa fa-star-o'    
            content.push(<i className={'fa ' + className} key={"star" + index} />)
        }
        return content
    }
    return (
        <RatingStyled className="rating">
           {renderRating()}
        </RatingStyled>
    )
}
Rating.defaultProps = defaultProps;
export default Rating


const RatingStyled = styled.div`
    &.rating {
        i {
            margin: 0;
            &.fa-star {
                color: #f7941d
             }
        }
    }
    
`