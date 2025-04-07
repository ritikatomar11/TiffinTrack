
import {useAuth} from "../AuthsContext"

function DeleteUser(){
    const {deleteUser , logout} = useAuth(); 

    const handleDelete = async()=>{
        try{
            await deleteUser(); 
            alert("Deleted User"); 
        }catch(error){
            console.error("User deletion failed", error);
        }
    }
    return (
        <button 
            onClick={handleDelete} 
            className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700">
            Delete My Account
        </button>
    )

}

export default DeleteUser