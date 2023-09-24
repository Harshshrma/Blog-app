import React from 'react'
import { Container,Row,Col} from 'react-bootstrap'
import './settings.css'
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Settings() {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/"

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.put("/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };
  return (
    <Container>

    <div className='settings'>
      <div className="settingsWrapper">
        
          <Row>

          <Col md={6} sm={12}>
          <div className="settingsUpdateTitle">Update Your Account</div>
          </Col>
          <Col md={6} sm={12}>
          <div className="settingsDeleteTitle">Delete Account</div>
          </Col>
          </Row>
      

        <form action="" className='settingsForm' onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : PF+user.profilePic}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>UserName</label>
          <input type="text" className='settingsInput' placeholder={user.username} onChange={(e)=>setUsername(e.target.value)} />
          <label>Email</label>
          <input type="email" className='settingsInput' placeholder={user.email} onChange={(e)=>setEmail(e.target.value)} />
          <label>Password</label>
          <input type="password" className='settingsInput' onChange={(e)=>setPassword(e.target.value)} />
          <button className="settingsSubmit" type="submit">Update</button>
          {
            success && (
              <span style={{color:"green", textAlign:"center", marginTop:"1.25rem"}}>
                Profile has been updated successfully
              </span>
            )
          }
        </form>
      </div>
    

    </div>
    </Container>
  )
}
