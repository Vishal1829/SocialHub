import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import BasicModal from "../../components/modal/BasicModal";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Profile() {
  const { user: currentUser } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const [imageSelected, setImageSelected] = useState("");
  const username = useParams().username;

  const [openModal, setOpenModal] = useState(false);
  // console.log(params);

  // console.log(username,user._id,currentUser._id);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  console.log(currentUser);

  const uploadImage = async () => {
    const data = new FormData();
    const fileName = Date.now() + imageSelected.name;
    data.append("name", fileName);
    data.append("file", imageSelected);
    const newPic = {};

    newPic.img = fileName;

    try {
      await axios.post("/upload", data);
    } catch (err) {}

    try {
      await axios
        .put(`http://localhost:8800/updatePic/${currentUser?._id}`, newPic)
        .then((response) => {
          console.log(response);
        });
      window.location.reload();
    } catch (err) {}
  };

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "person/noCover.png"
                }
                alt=""
              />
              <img
                className="profileUserImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
              {currentUser._id === user._id ? (
                <div className="proPic">
                  <label htmlFor="file">
                    <input
                      style={{ display: "none" }}
                      type="file"
                      id="file"
                      onChange={(e) => {
                        setImageSelected(e.target.files[0]);
                      }}
                      accept=".png,.jpeg,.jpg"
                    />
                    <span className="shareOptionText">Choose Profile Pic</span>
                  </label>

                  <button className="btnPic" onClick={uploadImage}>
                    Upload Image
                  </button>
                </div>
              ) : null}
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          {currentUser._id === user._id ? (
            <button
              className="openModalBtn"
              onClick={() => {
                setOpenModal(true);
              }}
            >
              Update Profile
            </button>
          ) : null}
          {openModal && (
            <BasicModal userId={currentUser._id} closeModal={setOpenModal} />
          )}
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
