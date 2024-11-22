import { useState } from "react";
import PropTypes from "prop-types";

const MovieCard = ({ id, title, year, oscar, updateMovie, deleteMovie }) => {
  const [updatedTitle, setUpdatedTitle] = useState("");

  return (
    <div
      key={id}
      className="min-w-[10rem] p-4 bg-white rounded-lg shadow-md border border-gray-200 flex flex-col items-start gap-4"
    >
      <div className="text-gray-700">
        <span className="text-sm font-medium text-gray-500">Name: </span>
        <span className="font-semibold">{title}</span>
      </div>
      <div className="text-gray-700">
        <span className="text-sm font-medium text-gray-500">Year: </span>
        <span className="font-semibold">{year}</span>
      </div>
      <div className="text-gray-700">
        <span className="text-sm font-medium text-gray-500">Oscar? </span>
        <span className="font-semibold">{oscar ? "Yes" : "No"}</span>
      </div>
      <div className="w-full">
        <input
          type="text"
          onChange={(e) => setUpdatedTitle(e.target.value)}
          value={updatedTitle}
          placeholder="Update title"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <div className="flex flex-row mt-3 gap-2">
          <button
            onClick={() => updateMovie(id, updatedTitle)}
            className="flex-grow bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update
          </button>
          <button
            onClick={() => deleteMovie(id)}
            className="flex-grow bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  oscar: PropTypes.bool.isRequired,
  updateMovie: PropTypes.func.isRequired,
  deleteMovie: PropTypes.func.isRequired,
};

export default MovieCard;
