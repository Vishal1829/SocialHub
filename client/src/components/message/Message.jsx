import "./message.css";
import { format } from "timeago.js";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

export default function Message({ message, own }) {
  
  const [userPic,setUserPic]=useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  // console.log(message);
  useEffect(() => {
    const handleClick = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/getUser/${message.sender}`
        );
        setUserPic(res.data.profilePicture);
        // console.log(userPic);
      } catch (err) {
        console.log(err);
      }
    };
    handleClick();
  }, [message.sender])
  
  

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={
            userPic
              ? PF + userPic
              : PF + "person/noAvatar.png"
          }
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
