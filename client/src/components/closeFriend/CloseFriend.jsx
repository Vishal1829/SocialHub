import "./closeFriend.css";

export default function CloseFriend({ friend }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <li className="sidebarFriend">
      <img
        className="sidebarFriendImg"
        src={
          friend.profilePicture
            ? PF + friend.profilePicture
            : "/assets/person/noAvatar.png"
        }
        alt=""
      />
      <span className="sidebarFriendName">{friend.username}</span>
      <span className="OnlineSymbol"></span>
    </li>
  );
}
