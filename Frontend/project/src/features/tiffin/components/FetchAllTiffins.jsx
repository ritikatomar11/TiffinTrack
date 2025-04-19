import { useEffect } from "react";
import { selectTiffinErrors , selectTiffinStatus , selectTiffins } from "../TiffinSlice";
import { fetchAllTiffinsAsync } from "../TiffinSlice";
import { useSelector , useDispatch } from 'react-redux'
import { useParams } from "react-router-dom";
function FetchAllTiffins(){
    const {id} = useParams(); 
    const status = useSelector(selectTiffinStatus); 
    const errors = useSelector(selectTiffinErrors); 
    const tiffins = useSelector(selectTiffins); 
    const dispatch = useDispatch()

    useEffect(()=>{
        console.log(id)
        console.log("tiffins" ,tiffins )
        dispatch(fetchAllTiffinsAsync(id)); 
        console.log("successful")
    }, [id , dispatch])

    useEffect(()=>{
        if(status === 'fulfilled'){

        }
    },[status])

    
    return(
        <div>
        {tiffins.length > 0 ? (
            tiffins.map((tiffin) => (
                <div key={tiffin._id}>
                    <p>{tiffin._id}</p>
                    <h3>{tiffin.name}</h3>
                    <p>{tiffin.description}</p>
                </div>
            ))
        ) : (
            <p>No tiffins found.</p>
        )}
    </div>
    )
}

export default FetchAllTiffins