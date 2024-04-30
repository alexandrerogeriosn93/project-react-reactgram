import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import LikeContainer from "../../components/LikeContainer/LikeContainer";
import PhotoItem from "../../components/PhotoItem/PhotoItem";
import { useQuery } from "../../hooks/useQuery";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";
import { like, searchPhotos } from "../../slices/photoSlice";
import "./Search.css";

const Search = () => {
  const query = useQuery();
  const search = query.get("q");
  const dispatch = useDispatch();
  const resetMessage = useResetComponentMessage(dispatch);
  const { user } = useSelector((state) => state.auth);
  const { photos, loading } = useSelector((state) => state.photo);

  const handleLike = (photo) => {
    dispatch(like(photo._id));
    resetMessage();
  };

  useEffect(() => {
    dispatch(searchPhotos(search));
  }, [dispatch, search]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="search">
      <h2>Você está buscando por: {search}</h2>
      {photos &&
        photos.map((photo) => (
          <div key={photo._id}>
            <PhotoItem photo={photo} />
            <LikeContainer photo={photo} user={user} handleLike={handleLike} />
            <Link className="btn" to={`/photos/${photo._id}`}>
              Ver mais
            </Link>
          </div>
        ))}
      {photos && photos.length === 0 && (
        <h2 className="no-photos">
          Não foram encontrados resultados para sua busca...
        </h2>
      )}
    </div>
  );
};

export default Search;
