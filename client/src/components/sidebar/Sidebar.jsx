import "./sidebar.css"
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@material-ui/icons";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
// import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";
import { useEffect } from "react";
import axios from "axios";

export default function Sidebar() {
  const [friendList, setfriendList] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getFriends = async () => {
        axios.get(`http://localhost:8800/getfriends/${user?._id}`).then((response) => {
           setfriendList(response.data);
          //  console.log(friendList);
          //  console.log(response.data);
        });
    }

    getFriends();
  },[user])

  

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <span className="textTitle">{friendList.length>0 ? "Your Friends" :"You Don't have any friends"}</span>
        {/* <ul className="sidebarList">
          <li className="sidebarListItem">
              <RssFeed className="sidebarIcon"/>
              <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <PlayCircleFilledOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <School className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button> */}
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {friendList.map(u=>(
            <CloseFriend key={u._id} friend={u} />
          ))}
          {/* {friendList.map(friend=>(
            <CloseFriend key={friend._id} user={friend} />
          ))} */}
        </ul>
      </div>
    </div>
  )
}
