import "./register.css";
// Cannot find the path to src so I copied it here, change it on github
import { db } from "./firebase.js";
import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  setDoc,
  updateDoc
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle
} from "./firebase";

function RegistrationForm() {
  // For Visitor
  const [newFullName, SetNewFullName] = useState("");
  const [NewStudentId, SetNewStudentID] = useState("");
  const [NewEmail, SetNewEmail] = useState("");
  const [NewPhoneNumber, SetNewPhoneNumber] = useState("");
  const [NewPassword, SetNewPassword] = useState("");
  const [NewConfirmPassword, SetNewConfirmPassword] = useState("");
  const [NewRole, SetNewRole] = useState("");
  // For Emergency Contact
  const [newEmergencyFullName, SetNewEmergencyFullName] = useState("");
  const [newEmergencyPhoneNumber, SetNewEmergencyPhoneNumber] = useState("");
  const [newEmergencyRelationship, SetNewEmergencyRelationship] = useState("");
  const [newEmergencyRelation, SetNewEmergencyRelation] = useState("");

  const [users, setUsers] = useState([]);
  const userRef = collection(db, "users");
  const userInfoRef = collection(db, "usersinfo");
  const contactRef = collection(db, "emergency_contact");

  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  /*
  // Create a new user in database
  const createUser = async () => {
    const userDoc = doc(db, "usersinfo")
    await addDoc(userDoc, 
      {
      name: newFullName,
      student_id: NewStudentId,
      email: NewEmail,
      phone_number: NewPhoneNumber,
      checked_in: false,
      password: NewPassword,
      confirm_password: NewConfirmPassword,
      check_time: null,
      stay: 0,
      visited: []
    });
  };
*/
  // Register a new User
  const register = () => {
    try {
      if (!newFullName) alert("Please enter name");
      if (!NewEmail) alert("Please enter e-mail address");
      if (!NewPassword) alert("Please enter password");
      registerWithEmailAndPassword(
        newFullName,
        NewEmail,
        NewPassword,
        NewStudentId,
        NewPhoneNumber,
        NewRole
      );
    } catch (error) {
      alert(error.message);
    }
  };

  // Creates an emergency contact for the user created
  const createEmergencyContact = async () => {
    await addDoc(contactRef, {
      emergency_contact_name: newEmergencyFullName,
      emergency_contact_number: newEmergencyPhoneNumber,
      relationship: newEmergencyRelationship,
      visitor_name: newFullName
    });
  };

  // Fetch from DB and map (Read)
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  useEffect(() => {
    if (loading) return;
    if (user) navigate.replace("/dashboard");
  }, [user, loading]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "fullName") {
      SetNewFullName(value);
    }
    if (id === "studentID") {
      SetNewStudentID(value);
    }
    if (id === "email") {
      SetNewEmail(value);
    }
    if (id === "phoneNumber") {
      SetNewPhoneNumber(value);
    }
    if (id === "password") {
      SetNewPassword(value);
    }
    if (id === "confirmPassword") {
      SetNewConfirmPassword(value);
    }
    // add emergency contact
    // TO DO: Add relationship
    if (id === "emergencyFullName") {
      SetNewEmergencyFullName(value);
    }
    if (id === "emergencyPhoneNumber") {
      SetNewEmergencyPhoneNumber(value);
    }
  };

  return (
    <div className="form">
      <div className="form-body">
        <b>Visitor Details</b>
        <div className="fullName">
          <label className="form__label" htmlFor="fullName">
            Full Name{" "}
          </label>
          <input
            className="form__input"
            type="text"
            value={newFullName}
            onChange={(e) => handleInputChange(e)}
            id="fullName"
            placeholder="Full Name"
          />
        </div>
        <div className="studentID">
          <label className="form__label" htmlFor="studentID">
            Special ID{" "}
          </label>
          <input
            type="text"
            name=""
            id="studentID"
            value={NewStudentId}
            className="form__input"
            onChange={(e) => handleInputChange(e)}
            placeholder="Student or Staff ID"
          />
        </div>
        <div className="email">
          <label className="form__label" htmlFor="email">
            Email{" "}
          </label>
          <input
            type="email"
            id="email"
            className="form__input"
            value={NewEmail}
            onChange={(e) => handleInputChange(e)}
            placeholder="Email"
          />
        </div>
        <div className="phoneNumber">
          <label className="form__label" htmlFor="phoneNumber">
            Phone Number{" "}
          </label>
          <input
            type="phoneNumber"
            id="phoneNumber"
            className="form__input"
            value={NewPhoneNumber}
            onChange={(e) => handleInputChange(e)}
            placeholder="Phone Number"
          />
        </div>
        <select
          id="dropselect"
          className="form-select form-select-sm"
          aria-label=".form-select-sm example"
          onChange={(e) => SetNewRole(e.target.value)}
        >
          <option selected>Select Role</option>
          <option defaultValue="1">Student</option>
          <option defaultValue="2">Researcher</option>
          <option defaultValue="3">Contractor</option>
          <option defaultValue="4">Other</option>
        </select>
        <div className="password">
          <label className="form__label" htmlFor="password">
            Password{" "}
          </label>
          <input
            className="form__input"
            type="password"
            id="password"
            value={NewPassword}
            onChange={(e) => handleInputChange(e)}
            placeholder="Password"
          />
        </div>
        <div className="confirmPassword">
          <label className="form__label" htmlFor="confirmPassword">
            Confirm Password{" "}
          </label>
          <input
            className="form__input"
            type="password"
            id="confirmPassword"
            value={NewConfirmPassword}
            onChange={(e) => handleInputChange(e)}
            placeholder="Confirm Password"
          />
        </div>
        <b>
          Have you completed{" "}
          <a href="https://www.uwa.edu.au/institutes/institute-of-agriculture/-/media/UWA-Institute-of-Agriculture/Documents/FF2050-Project/Visitor-and-User-Induction_2022_as-at-10-May-2022.docx">
            farm induction
          </a>{" "}
        </b>{" "}
        ?
        <div className="form-check">
          <label
            className="form-check-label"
            htmlFor="flexCheckDefault"
          ></label>
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
          Yes
        </div>
        <b> Emergency Contact </b>
        <div className="emergencyFullName">
          <label className="form__label" htmlFor="emergencyFullName">
            Full Name{" "}
          </label>
          <input
            className="form__input"
            type="text"
            value={newEmergencyFullName}
            onChange={(e) => handleInputChange(e)}
            id="emergencyFullName"
            placeholder="Full Name"
          />
        </div>
        <div className="emergencyPhoneNumber">
          <label className="form__label" htmlFor="emergencyPhoneNumber">
            Phone Number{" "}
          </label>
          <input
            type="phoneNumber"
            id="emergencyPhoneNumber"
            className="form__input"
            value={newEmergencyPhoneNumber}
            onChange={(e) => handleInputChange(e)}
            placeholder="Phone Number"
          />
        </div>
        <select
          id="dropselect"
          className="form-select form-select-sm"
          aria-label=".form-select-sm example"
          onChange={(e) => SetNewEmergencyRelationship(e.target.value)}
        >
          <option selected>Relationship</option>
          <option defaultValue="1">Parent</option>
          <option defaultValue="2">Sibling</option>
          <option defaultValue="3">Other</option>
        </select>
        <div className="form-check">
          <label
            className="form-check-label"
            htmlFor="flexCheckDefault"
          ></label>
          <input
            className="form-check-input"
            type="checkbox"
            defaultValue=""
            id="flexCheckDefault"
          />
          I accept the <a href="url">terms and conditions</a>
        </div>
        <div className="form-check">
          <label
            className="form-check-label"
            htmlFor="flexCheckDefault"
          ></label>
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
          I accept the <a href="url">privacy terms</a>
        </div>
      </div>
      <div className="footer">
        <Link to="/">
          <button
            onClick={() => {
              register();
              createEmergencyContact();
            }}
            type="submit"
            className="btn btn-primary"
            href="/"
          >
            Register
          </button>
        </Link>
      </div>
    </div>
  );
}
export default RegistrationForm;
