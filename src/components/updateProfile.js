import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./updateinfo.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "./firebase.js";
import {
  query,
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc as fdoc,
  where,
  updateDoc,
  QuerySnapshot,
  documentId
} from "firebase/firestore";
function UpdateInfo() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [studentID, setstudentID] = useState("");
  const navigate = useNavigate();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));

      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setstudentID(data.student_id);
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);

  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col mb-3">
          <div className="card">
            <div className="card-header">
              <h2>Change user information</h2>
            </div>
            <div className="card-body" id="fullnameCHANGETHIS">
              <div classNameName="rego-container">
                <label class="col-sm-2 col-form-label">Name </label>
                <br></br>
                <input
                  className="form-control"
                  type="text"
                  placeholder={name}
                  readonly
                  disabled
                ></input>
                <br></br>
                <label>Special ID </label>
                <br></br>
                <input
                  className="form-control"
                  type="text"
                  placeholder={studentID}
                  readonly
                  disabled
                ></input>
                <br></br>
                <label>New Phone-number </label>
                <br></br>
                <input
                  className="form-control"
                  type="text"
                  name="phoneNumber"
                  required
                  placeholder="Enter phone number"
                />
                <button type="button" class="btn btn-outline-info">
                  Update
                </button>
                <br></br>
                <br></br>
                <label>New Email </label>
                <br></br>
                <input
                  className="form-control"
                  type="text"
                  name="email"
                  required
                  placeholder="Enter email"
                />
                <button type="button" class="btn btn-outline-info">
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col mb-3">
          <div className="card">
            <div className="card-header">
              <h2>Change Password</h2>
            </div>
            <div className="card-body">
              <div classNameName="rego-container">
                <label>Current password </label>
                <br></br>
                <input
                  className="form-control"
                  type="text"
                  name="oldpassword"
                  required
                  placeholder="Enter current password"
                />
                <label>New password </label>
                <br></br>
                <input
                  className="form-control"
                  type="text"
                  name="newpassword"
                  required
                  placeholder="Enter new password"
                />
                <label>Confirm new password </label>
                <br></br>
                <input
                  className="form-control"
                  type="text"
                  name="confirmnewpassword"
                  required
                  placeholder="Retype new password"
                />
              </div>
              <br></br>
              <button type="button" class="btn btn-outline-info">
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-md-center">
        <div className="col">
          <div className="card">
            <div className="card-header">
              <h2>Add Emergency Contact</h2>
            </div>
            <div className="card-body">
              <div className="rego-container">
                <label>Full Name </label>
                <br></br>
                <input type="text" name="fullEmergencyName" required />
                {/* {renderErrorMessage("uname")} */}
              </div>
              <div className="rego-container">
                <label>Phone-number </label>
                <br></br>
                <input type="text" name="PhoneNumberEmergency" required />
                {/* {renderErrorMessage("uname")} */}
              </div>
              <div className="rego-container">
                <label for="relationship">Relationship</label>
                <br></br>
                <select>
                  <option value="Parent">Parent</option>
                  <option value="Friend">Friend</option>
                  <option value="Child">Child</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <br></br>
              <div className="rego-container">
                {/* <input type="submit" name = "login"/> */}
                <button type="button" className="btn btn-success-outline">
                  <Link to="/">Submit</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateInfo;
