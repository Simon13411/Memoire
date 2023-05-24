import Navbar from '../components/Navbar';
import Selection from '../components/SelectionBox';

function BoxesHome(props) {
    return (
        <>
            <Navbar isAuthenticated={props.isAuthenticated} isAdmin={props.isAdmin} Logout={props.Logout}/>
            <Selection> </Selection>
        </>
    )
}

export default BoxesHome;