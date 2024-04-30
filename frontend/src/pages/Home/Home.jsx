import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import LikeContainer from "../../components/LikeContainer/LikeContainer";
import PhotoItem from "../../components/PhotoItem/PhotoItem";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";
import { getPhotos, like } from "../../slices/photoSlice";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const resetMessage = useResetComponentMessage();
  const { user } = useSelector((state) => state.auth);
  const { photos, loading } = useSelector((state) => state.photo);

  const handleLike = (e, photo) => {
    e.preventDefault();
    dispatch(like(photo._id));
    resetMessage();
  };

  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return <div>Home</div>;
};

export default Home;
