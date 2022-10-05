import Proptypes from 'prop-types';

const Button = ({ text, color, onClick }) => {
    return (
        <button 
        className='btn'
        onClick={onClick}
        style={{backgroundColor: color}}>{ text }</button>
    )
}

Button.propsTypes = {
    text: Proptypes.Button,
    onclick: Proptypes.func,
    color: Proptypes.string
}

export default Button