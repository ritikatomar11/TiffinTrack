import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  selectTiffinErrors,
  selectTiffinStatus,
  selectTiffins,
  fetchAllTiffinsAsync,
  resetStatus,
  cleanUpErrors,
} from "../TiffinSlice";

function FetchAllTiffins() {
  const { id } = useParams();
  const status = useSelector(selectTiffinStatus);
  const error = useSelector(selectTiffinErrors);
  const tiffins = useSelector(selectTiffins);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllTiffinsAsync(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (status === "fulfilled") {
      toast.success("Fetched all tiffins under this subscription plan");
    } else if (status === "rejected") {
      toast.error(error?.message || "Something went wrong");
    }
  }, [status, error]);

  useEffect(() => {
    return () => {
      dispatch(resetStatus());
      dispatch(cleanUpErrors());
    };
  }, [dispatch]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Tiffin Plans</h2>
        <div className="space-x-4">
          <button
            onClick={() => navigate(`/${id}/addNewTiffin`)}
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-xl transition"
          >
            Add New Tiffin
          </button>
          <button
            onClick={() => navigate(`/${id}/addOrder`)}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-xl transition"
          >
            Place Order
          </button>
        </div>
      </div>

      {status === "loading" ? (
        <div className="text-center text-lg text-gray-500 animate-pulse">Loading tiffins...</div>
      ) : tiffins.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tiffins.map((tiffin) => (
            <div
              key={tiffin._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={tiffin.tiffinImage}
                alt={tiffin.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {tiffin.name}
                </h3>
                <p className="text-gray-600 mt-2">{tiffin.description}</p>
                <p className="text-gray-600 mt-2">{tiffin.day}</p>
                <p className="text-sm text-gray-400 mt-4"> {tiffin.mealType}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-lg text-gray-500 mt-10">
          No tiffins found for this plan.
        </div>
      )}
    </div>
  );
}

export default FetchAllTiffins;
