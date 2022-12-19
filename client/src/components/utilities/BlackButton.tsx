import { BlackButtonProps } from "models/types";


const BlackButton: React.FC<BlackButtonProps> = (props) => {
    const { children, handleClick, type, cssClass = 'bg-black border-0' } = props
    return (
        <button type= {type} className={cssClass} onClick={handleClick} >
            {children}
        </button >
    )
}
export default BlackButton
