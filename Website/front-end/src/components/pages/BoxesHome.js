import Navbar from '../Navbar';
import Selection from '../Selection';

function BoxesHome(props) {
  return (
    <>
      <Navbar isAuthenticated={props.isAuthenticated} isAdmin={props.isAdmin} Logout={props.Logout}/>
      <Selection> </Selection>
    </>
  )
}

export default BoxesHome;