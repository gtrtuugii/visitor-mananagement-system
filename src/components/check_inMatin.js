import "./check_in.css";
import React, { useState, useEffect, setValue } from "react";
import { Multiselect } from "multiselect-react-dropdown";
import { auth, db, logout } from "./firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  query,
  collection,
  getDocs,
  addDoc,
  doc as fdoc,
  where
} from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { Select } from "react-select";
import Announcement from "react-announcement";
import Logo from "./images/uwa-sq";

function CheckIn() {
  const [user, loading, error] = useAuthState(auth);
  const [checked, setChecked] = useState(false);
  const [name, setName] = useState("");
  const [studentID, setStudentID] = useState("");
  const [NewLocations, setNewLocations] = useState([]);
  const [phone_number, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [visitor_uid, setUID] = useState("");
  const [visitor_role, setRole] = useState("");
  const [visitor_sid, setSID] = useState("");
  const [time_entry, setTimeEntry] = useState("");
  const [NewStay, SetNewStay] = useState("");
  const [NewReason, SetNewReason] = useState("");
  const locations_select = [];
  const navigate = useNavigate();

  const displayReminder = () => {
    setChecked(!checked);
  };

  const fetchUserInfo = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));

      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setStudentID(data.student_id);
      setName(data.name);
      setChecked(data.checked_in);
      setRole(data.role);
      setPhoneNumber(data.phone_number);
      setEmail(data.email);
    } catch (error) {
      console.error(error);
      alert("An error occured while fetching user data");
    }
  };

  function getTime(n) {
    n = new Date(n);
    return (
      n.toLocaleDateString().replace(/\//g, "-") +
      " " +
      n.toTimeString().substr(0, 8)
    );
  }

  const checkIn = async () => {
    try {
      await addDoc(collection(db, "visits"), {
        uid: user?.uid,
        visitor_name: name,
        visitor_sid: studentID,
        visitor_role: visitor_role,
        visitor_phone_number: phone_number,
        visitor_email: email,
        time_entry: getTime(new Date().getTime()),
        time_stay: NewStay,
        locations_visited: NewLocations,
        reason_for_visit: NewReason
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "reason_visit") {
      SetNewReason(value);
    }
    if (id === "stay") {
      SetNewStay(value);
    }
    if (id === "selector") {
      setNewLocations(value);
    }
  };

  const data = [
    "Avery's Shearing Shed",
    "General Purpose Shed",
    "Farm Manager's House",
    "Old Farmhouse Accommodation",
    "Gravel Pit/Bush",
    "Mt Misery",
    "North Avery's",
    "Cunninghams",
    "Bottom Woods",
    "Top Woods",
    "East Averys",
    "South Averys",
    "Averys Hill",
    "Roundup",
    "Emu Hill Bush",
    "Emu Hill",
    "Garden",
    "Boyagin",
    "West Garden",
    "Fox Hill Bush",
    "Fox Hill",
    "Boundary Corner",
    "Park Land",
    "Triangle",
    "House Dam",
    "Contour",
    "North L",
    "Corner",
    "13 Island Dam",
    "L Shape",
    "Echinda",
    "Top Cow Dam",
    "Bottom Cow Dam",
    "Windmill",
    "Rams",
    "Shed",
    "Supershed",
    "Plot",
    "50 Acre",
    "Rocky",
    "Eco Restoration",
    "Dorper Reserve",
    "Marlborough North",
    "Long Creek",
    "3000 Dam",
    "Watts 1",
    "Roo Creek",
    "South 7 Creek",
    "T Creek",
    "Spring",
    "Wall 3",
    "Beecher",
    "2 Tank Creek",
    "Watts 2",
    "Wall 2",
    "Beecher West",
    "Wall Creek",
    "Watts 3",
    "Page Creek",
    "Wall Corner",
    "Hay Rake",
    "Watts Creek"
  ];

  const [options, setOptions] = useState(data);

  const handleChange = (e) => {
    setNewLocations(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserInfo();
  }, [user, loading]);

  return (
    <div className="CheckIn">
      <Announcement
        title="Please follow the guidelines by UWA"
        subtitle="Prior to visiting the farm, the relevant checks must have been completed by your supervisor/organisation to ensure you have sufficient information, instruction, training, and supervision while at Ridgefield. "
        link="https://www.uwa.edu.au/institutes/institute-of-agriculture/UWA-Farm-Ridgefield"
        imageSource={Logo}
        daysToLive={3}
        secondsBeforeBannerShows={5}
        closeIconSize={20}
      />
      <Announcement
        title="Please note mobile service can be intermittent and unreliable at the farm"
        subtitle="If you do not have service, move to another area to be in range. You must have access to a Telstra mobile while at Ridgefield"
        link="https://www.uwa.edu.au/institutes/institute-of-agriculture/UWA-Farm-Ridgefield"
        imageSource={Logo}
        daysToLive={3}
        secondsBeforeBannerShows={30}
        closeIconSize={20}
      />
      <div className="card-container" id="checkcontainer">
        <div className="card-content">
          <h3 className="header">Check-In </h3>
          <div>
            <span className="fields">Destination</span>
            <br />
            <div
              style={{
                width: "100%",
                justifyContent: "center",
                display: "flex"
              }}
            >
              <Multiselect
                id="selector"
                isObject={false}
                onRemove={(e) => {
                  console.log(e);
                }}
                onSelect={(e) => setNewLocations(e)}
                value={data.filter((obj) => NewLocations.includes(obj.value))}
                options={data}
              />
            </div>
            <span className="sub-text">Unsure</span>{" "}
            <input type="checkbox" className="checkbox" /> <br /> <br />
            <span className="fields">Reason for visit</span> <br />
            <input
              type="text"
              placeholder="Reason for visit"
              className="form__input"
              id="reason_visit"
              value={NewReason}
              onChange={(e) => handleInputChange(e)}
            />
            <br /> <br />
            <span className="fields">Estimated duration of visit</span> <br />
            <input
              type="text"
              placeholder="Put your number in hours"
              className="form__input"
              id="stay"
              value={NewStay}
              onChange={(e) => handleInputChange(e)}
            />
            <br /> <br />
            <span className="sub-text">Overnight Stay</span>{" "}
            <input
              type="checkbox"
              className="checkbox"
              onChange={displayReminder}
            />
            <br />
            <span className="sub-text">
              {checked ? "Make sure to book your stay" : ""}
            </span>
            <br />
            <Link to="/dashboard">
              <button
                className="button"
                onClick={() => {
                  checkIn();
                }}
                href="/dashboard"
              >
                Check in
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckIn;
