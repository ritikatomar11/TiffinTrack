import { useEffect , useState } from "react";
import { useSelector , useDispatch } from "react-redux"
import { toast } from "react-toastify"
import {
    selectTiffinAddStatus , 
    selectNewTiffinDetails , 
    addNewTiffinAsync , 
    selectTiffinErrors , 
    resetTiffinAddStatus
} from "../TiffinSlice"
import { useParams , useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";


function AddTiffin (){
    const navigate = useNavigate(); 
    const dispatch = useDispatch()
    const status = useSelector(selectTiffinAddStatus)
    const error = useSelector(selectTiffinErrors)
    const { id } = useParams()

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [newTiffin , setNewTiffin]  = useState({
            name: "",
            description: "",
            mealType: "",
            day: "",
        })
        const [tiffinImage , setTiffinImage] = useState(null); 
    
        useEffect(() => {
        if (error) toast.error(error);
        } , [error]);
    
        useEffect(()=>{
            if(status === 'fulfilled'){
                console.log("tiffins")
                toast.success("Plan added successfully"); 
                dispatch(resetTiffinAddStatus());
                navigate(`/tiffins`)
                setIsSubmitting(false);

            }
        } , [status , navigate , dispatch , id])
        
      const handleFileChange = (e) => {
        setTiffinImage(e.target.files[0]);
      };
    
        const handleChange = (e) => {
            const { name, value, type, checked } = e.target;
            setNewTiffin({
              ...newTiffin,
              [name]: type === "checkbox" ? checked : value,
            });
          };
    
           
        const handleAddTiffin = (e)=>{
            e.preventDefault(); 
            setIsSubmitting(true);
            if(!tiffinImage){
                toast.error("Please add tiffin image")
            }
            const data = new FormData();
            for (let key in newTiffin) {
              data.append(key, newTiffin[key]);
            }
            console.log(data)

            data.append("tiffinImage", tiffinImage);
            console.log("FormData before submit:");
            for (let pair of data.entries()) {
              console.log(`${pair[0]}: ${pair[1]}`);
            }
            
            dispatch(addNewTiffinAsync({ tiffinDetails: data,  id }) );

        }
    
        
        return (
          <Box
      component="form"
      onSubmit={handleAddTiffin}
      sx={{
        maxWidth: 600,
        mx: "auto",
        p: 4,
        mt: 4,
        boxShadow: 3,
        borderRadius: 3,
        bgcolor: "background.paper",
      }}
      encType="multipart/form-data"
    >
      <Typography variant="h5" gutterBottom>
        Add New Tiffin
      </Typography>

      <TextField
        label="Tiffin Name"
        name="name"
        value={newTiffin.name}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />

      <TextField
        label="Description"
        name="description"
        value={newTiffin.description}
        onChange={handleChange}
        multiline
        rows={3}
        fullWidth
        required
        margin="normal"
      />

      <FormControl fullWidth required margin="normal">
        <InputLabel>Meal Type</InputLabel>
        <Select
          name="mealType"
          value={newTiffin.mealType}
          onChange={handleChange}
          label="Meal Type"
        >
          <MenuItem value="LUNCH">LUNCH</MenuItem>
          <MenuItem value="DINNER">DINNER</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth required margin="normal">
        <InputLabel>Day</InputLabel>
        <Select
          name="day"
          value={newTiffin.day}
          onChange={handleChange}
          label="Day"
        >
          {[
            "MONDAY",
            "TUESDAY",
            "WEDNESDAY",
            "THURSDAY",
            "FRIDAY",
            "SATURDAY",
            "SUNDAY",
          ].map((day) => (
            <MenuItem key={day} value={day}>
              {day}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button variant="outlined" component="label" fullWidth sx={{ mt: 2 }}>
        Upload Tiffin Image
        <input
          type="file"
          name="tiffinImage"
          accept="image/*"
          hidden
          onChange={handleFileChange}
        />
      </Button>

      {tiffinImage && (
        <Typography variant="body2" sx={{ mt: 1, color: "gray" }}>
          Selected: {tiffinImage.name}
        </Typography>
      )}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
        disabled={isSubmitting}
      >
        {status === "pending" ?"Creating Tiffin": "Create Tiffin"}
      </Button>
    </Box>
        )

}

export default AddTiffin; 