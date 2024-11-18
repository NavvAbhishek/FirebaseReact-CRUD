import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const logout = async () => {
    try {
      await signOut(auth);
      console.log("Sign-out successful");
      navigate("/");
    } catch (error) {
      console.error(error.messa);
      console.log("An error happened");
    }
  };

  return (
    <div className="m-20">
      <button
        onClick={logout}
        className="bg-blue-600 px-2 py-2 rounded-md text-white"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
