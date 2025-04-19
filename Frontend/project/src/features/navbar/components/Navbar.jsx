import { Link } from "react-router-dom";
import { selectLoggedInUser } from "../../auth/AuthSlice";
import { useSelector, useDispatch } from "react-redux";

const Navbar = () => {
  const dispatch  = useDispatch(); 
  const loggedInUser = useSelector(selectLoggedInUser); 

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-textDark">
        TiffinTrack 
      </Link>


     {loggedInUser ? <div className="flex space-x-4">
        <Link
          to="/profile"
          className="px-4 py-2 border rounded-xl border-textDark text-green-600 rounded- hover:bg-green-50 transition"
        >
          User Details
        </Link>
        <Link
          to="/logout"
          className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
        >
          Logout
        </Link>
      </div> :  
      <div className="flex space-x-4">
        <Link
          to="/login"
          className="px-4 py-2 border rounded-xl border-textDark text-green-600 rounded- hover:bg-green-50 transition"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
        >
          Sign Up
        </Link>
      </div>}
    </nav>
  );
};

export default Navbar;
