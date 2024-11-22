import { auth, db } from "../config/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

const Dashboard = () => {
  const [movieList, setMovieList] = useState([]);
  const [movieTitle, setMovieTitle] = useState("");
  const [releaseYear, setReleaseYear] = useState(0);
  const [isHaveOscar, setIsHaveOscar] = useState(false);

  const moviesCollectionRef = collection(db, "movies");

  const navigate = useNavigate();
  const logout = async () => {
    try {
      await signOut(auth);
      console.log("Sign-out successful");
      navigate("/");
    } catch (error) {
      console.error(error.message);
      console.log("An error happened");
    }
  };

  useEffect(() => {
    try {
      // Setting up real-time listener using onSnapshot
      const unsubscribe = onSnapshot(moviesCollectionRef, (snapshot) => {
        const movieData = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setMovieList(movieData);
        console.log("Real-time data fetched:", movieData);
      });

      // Cleanup the listener when the component unmounts
      return () => unsubscribe();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: movieTitle,
        year: releaseYear,
        oscar: isHaveOscar,
      });
      console.log("movies data added successfully");
    } catch (error) {
      console.error(error);
      console.log("Error while adding movies data");
    }
  };

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
  };

  const updateMovie = async (id, updatedTitle) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await updateDoc(movieDoc, { title: updatedTitle });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="m-20 flex flex-col items-center space-y-6">
      {/* Form Container */}
      <div className="p-8 space-y-6 bg-white rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Add Movie
        </h2>
        <input
          type="text"
          placeholder="Enter movie name"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          onChange={(e) => setMovieTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter year"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          onChange={(e) => setReleaseYear(Number(e.target.value))}
        />
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="oscar"
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            checked={isHaveOscar}
            onChange={(e) => setIsHaveOscar(e.target.checked)}
          />
          <label htmlFor="oscar" className="text-gray-700 text-sm font-medium">
            Have Oscar?
          </label>
        </div>
        <button
          onClick={onSubmitMovie}
          className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white font-medium rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </div>

      {/* Logout Button */}
      <button
        onClick={logout}
        className="bg-red-600 hover:bg-red-700 px-4 py-2 text-white font-medium rounded-md shadow focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Logout
      </button>
      <div className="flex gap-5">
        {movieList.map((data) => (
          <MovieCard
            key={data.id}
            id={data.id}
            title={data.title}
            year={data.year}
            oscar={data.oscar}
            updateMovie={updateMovie}
            deleteMovie={deleteMovie}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
