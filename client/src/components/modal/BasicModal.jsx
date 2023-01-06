import { useState } from "react";
import "./basicmodal.css";
import Axios from "axios";

export default function BasicModal({ userId , closeModal }) {

  const [city,setCity] = useState("");
  const [from,setFrom] = useState("");
  const [desc,setDesc] = useState("");
  const [birthday,setBirthday] = useState("");
  const [relationship,setRelationship] = useState("");

  const updateProfile = async (id) => {
    await Axios.put(`http://localhost:8800/api/users/${id}`, {
      desc: desc,
      birthday: birthday,
      userId: id,
      relationship: relationship,
      city: city,
      from: from
    }).then((response) => {
        console.log(response);
    });
    closeModal(false);
  };


  return (
    <div className="modalBackground">
      <div className="form  scale-up-center">
        <h1 className="form__title">Update Your Details</h1>

        <div className="form__div">
          <input type="text" className="form__input" 
          onChange={(e) => setCity(e.target.value)}
          placeholder=" " />
          <label htmlFor="" className="form__label">
            City
          </label>
        </div>

        <div className="form__div">
          <input type="text" className="form__input" 
          onChange={(e) => setFrom(e.target.value)}
          placeholder=" " />
          <label htmlFor="" className="form__label">
            From
          </label>
        </div>

        <div className="form__div">
          <input type="text" className="form__input"
          onChange={(e) => setDesc(e.target.value)}
           placeholder=" " />
          <label htmlFor="" className="form__label">
            Desc
          </label>
        </div>

        <div className="form__div">
          <input type="date" className="form__input"
          onChange={(e) => setBirthday(e.target.value)}
          placeholder=" " />
          <label htmlFor="" className="form__label">
            Birthday
          </label>
        </div>

        <div className="form__div">
          <input type="text" className="form__input" 
          onChange={(e) => setRelationship(e.target.value)}
          placeholder=" " />
          <label htmlFor="" className="form__label">
            Relationship
          </label>
        </div>

        <input
          type="button"
          className="form__button"
          onClick={() => {
            updateProfile(userId)
          }}
          value="Submit"
        />
      </div>
    </div>
  );
}
