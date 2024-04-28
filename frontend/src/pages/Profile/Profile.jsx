import { useEffect, useRef, useState } from "react";
import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import Message from "../../components/Message/Message";
import {
  deletePhoto,
  getUserPhotos,
  publishPhoto,
  resetMessage,
} from "../../slices/photoSlice";
import { getUserDetails } from "../../slices/userSlice";
import { uploads } from "../../utils/config";
import "./Profile.css";

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const { user, loading } = useSelector((state) => state.user);
  const { user: userAuth } = useSelector((state) => state.auth);
  const {
    photos,
    loading: loadingPhoto,
    message: messagePhoto,
    error: errorPhoto,
  } = useSelector((state) => state.photo);
  const newPhotoForm = useRef();
  const editPhotoForm = useRef();

  const resetComponentMessage = () => {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const photoData = {
      title,
      image,
    };

    const formData = new FormData();
    const photoFormData = Object.keys(photoData).forEach((key) =>
      formData.append(key, photoData[key]),
    );

    formData.append("photo", photoFormData);

    dispatch(publishPhoto(formData));

    setTitle("");

    resetComponentMessage();
  };

  const handleFile = (e) => {
    const image = e.target.files[0];
    setImage(image);
  };

  const handleDelete = (id) => {
    dispatch(deletePhoto(id));
    resetComponentMessage();
  };

  useEffect(() => {
    dispatch(getUserDetails(id));
    dispatch(getUserPhotos(id));
  }, [dispatch, id]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="profile">
      <div className="profile-header">
        {user.profileImage && (
          <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
        )}
        <div className="profile-description">
          <h2>{user.name}</h2>
          <p>{user.bio}</p>
        </div>
      </div>
      {id === userAuth._id && (
        <>
          <div className="new-photo" ref={newPhotoForm}>
            <h3>Compartilhe algum momento seu:</h3>
            <form onSubmit={handleSubmit}>
              <label>
                <span>Título para a foro</span>
                <input
                  type="text"
                  placeholder="Insira um título"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title || ""}
                />
              </label>
              <label>
                <span>Imagem</span>
                <input type="file" onChange={handleFile} />
              </label>
              {!loadingPhoto && <input type="submit" value="Postar" />}
              {loadingPhoto && (
                <input type="submit" value="Aguarde..." disabled />
              )}
              {errorPhoto && <Message msg={errorPhoto} type="error" />}
              {messagePhoto && <Message msg={messagePhoto} type="success" />}
            </form>
          </div>
        </>
      )}
      <div className="user-photos">
        <h2>Fotos publicadas:</h2>
        <div className="photos-container">
          {photos &&
            photos.map((photo) => (
              <div className="photo" key={photo._id}>
                {photo.image && (
                  <img
                    src={`${uploads}/photos/${photo.image}`}
                    alt={photo.title}
                  />
                )}
                {id === userAuth._id ? (
                  <div className="actions">
                    <Link to={`photos/${photo._id}`}>
                      <BsFillEyeFill />
                    </Link>
                    <BsPencilFill />
                    <BsXLg onClick={() => handleDelete(photo._id)} />
                  </div>
                ) : (
                  <Link className="btn" to={`photos/${photo._id}`}>
                    Ver
                  </Link>
                )}
              </div>
            ))}
          {photos.length === 0 && <p>Não há fotos publicadas</p>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
