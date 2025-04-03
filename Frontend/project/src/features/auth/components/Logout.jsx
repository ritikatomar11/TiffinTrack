import { useAuth } from "../AuthsContext"

const Logout = () => {
    const { logout } = useAuth();
    

    const handleLogout = async () => {
        try {
            await logout();
        } catch (err) {
            console.error("Logout failed", err);
        }
    };

    return (
        <button 
            onClick={handleLogout} 
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600">
            Logout
        </button>
    );
};

export default Logout;
