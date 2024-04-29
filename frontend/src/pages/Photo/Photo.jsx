import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import LikeContainer from "../../components/LikeContainer/LikeContainer";
import Message from "../../components/Message/Message";
import PhotoItem from "../../components/PhotoItem/PhotoItem";
import { getPhoto, like } from "../../slices/photoSlice";
import { uploads } from "../../utils/config";
import "./Photo.css";

const Photo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { photo, loading, error, message } = useSelector(
    (state) => state.photo,
  );

  const handleLike = () => {
    dispatch(like(photo._id));
  };

  useEffect(() => {
    dispatch(getPhoto(id));
  }, [dispatch, id]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="photo">
      <PhotoItem photo={photo} />
      <LikeContainer photo={photo} user={user} handleLike={handleLike} />
    </div>
  );
};

export default Photo;
