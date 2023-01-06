import "./topbar.css";
import { Search, Person, Chat } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useEffect } from "react";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const searchRef = useRef(null);
  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
    // history.go("/login");
    // history.push("/login");
  };

  const handleSearch = async () => {
    const name = searchRef.current.value;
    axios.post(`http://localhost:8800/search/${name}`).then((response) => {
      window.location.href = response.data.url;
    });
  };

  const handleChat = () => {
    window.location.href = "/messenger";
  };

  console.log(user.profilePicture);

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">NITK SOCIAL HUB</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" onClick={handleSearch} />
          <input
            onKeyPress={(e)=>{
              if(e.key==='Enter')handleSearch()
            }}
            placeholder="Search for friends"
            className="searchInput"
            ref={searchRef}
          />
        </div>
      </div>
      <div className="topbarRight">
        {/* <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div> */}
        <div className="topbarIcons">
          {/* <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div> */}
          <div className="topbarIconItem">
            <Chat onClick={handleChat} />
            {/* <span className="topbarIconBadge">2</span> */}
          </div>
          <div className="topbarIconItem">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="white"
              viewBox="0 0 16 16"
              onClick={logout}
            >
              <path d="M7.5 1v7h1V1h-1z" />
              <path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z" />
            </svg>
            {/* <span className="topbarIconBadge">1</span> */}
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}
