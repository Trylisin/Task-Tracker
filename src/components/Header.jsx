import Proptypes from 'prop-types';
import Button from './Button';
import { useLocation } from 'react-router-dom'


const Header = ({ title, onAdd, showAddTask }) => {

    const location = useLocation()

    return (
        <header className='header'>
            <h1> { title } </h1>
            {location.pathname === '/' && (
                <Button 
                text={showAddTask ? 'Cancel': 'Add'} 
                color={showAddTask ? 'red': 'green'} 
                onClick={onAdd}/>
            )}
        </header>
    )
}


Header.defaultProps = {
    title: 'Task Tracker'
}

Header.propsTypes = {
    title: Proptypes.string.isRequired,
}

// Test Css in Js
// const cssStyle = {
//     color: 'red',
//     backgroundColor: 'yellow'
// }
export default Header