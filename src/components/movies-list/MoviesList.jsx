import { useEffect, useState } from "react";
import {
  getAllMovies,
  removeMovie,
  updateMovieDetails,
} from "../../api/movies";

const MoviesList = () => {
  // eslint-disable-next-line no-unused-vars
  const [moviesList, setMoviesList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [showMovieEditModal, setShowMovieEditModal] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = () => {
    getAllMovies()
      .then((res) => {
        // eslint-disable-next-line no-unused-vars
        const { status, data, message } = res;
        if (status === 200) {
          console.log({ movies: data });
          setMoviesList(data);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
    /**
     * 1. api call to fetch list of movies
     * 2. if successful show, list of movies
     *
     */
  };

  var formattedDate = selectedMovie?.releaseDate;
  console.log({ formattedDate });

  // eslint-disable-next-line no-unused-vars
  const editMovie = (rowData) => {
    setSelectedMovie({ ...rowData });
    setShowMovieEditModal(true);
  };

  // eslint-disable-next-line no-unused-vars
  const handleEditMovieSubmit = (e) => {
    updateMovieDetails(selectedMovie._id, selectedMovie)
      .then((res) => {
        // eslint-disable-next-line no-unused-vars
        const { data, status } = res;

        if (status === 200) {
          setErrorMessage("");
          setSelectedMovie({});
          fetchMovies();
          setShowMovieEditModal(false);
        }
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
    e.preventDefault();
  };

  // eslint-disable-next-line no-unused-vars
  const handleMovieEdit = (e) => {
    const tempMovie = { ...selectedMovie };

    if (e.target.name === "name") {
      tempMovie.name = e.target.value;
    } else if (e.target.name === "releaseDate") {
      tempMovie.releaseDate = e.target.value;
    } else if (e.target.name === "releaseStatus") {
      tempMovie.releaseStatus = e.target.value;
    } else if (e.target.name === "director") {
      tempMovie.director = e.target.value;
    } else if (e.target.name === "description") {
      tempMovie.description = e.target.value;
    }

    setSelectedMovie(tempMovie);
  };

  // eslint-disable-next-line no-unused-vars
  const deleteMovie = (rowData) => {
    console.log(rowData);
    const movieId = rowData._id;

    removeMovie(movieId)
      .then((res) => {
        console.log(res);

        if (res.status === 200) {
          fetchMovies();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return null;
};
export default MoviesList;
