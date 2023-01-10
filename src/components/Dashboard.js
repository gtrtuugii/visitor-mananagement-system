import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import Announcement from "react-announcement";
import Logo from "./images/uwa-sq";
import "./dashboard.css";
import { auth, db, logout } from "./firebase.js";
import {
  query,
  collection,
  getDocs,
  doc as fdoc,
  where,
  updateDoc
} from "firebase/firestore";
import "./messaging_init_in_sw";
import { getAuth } from "firebase/auth";

function Dashboard() {
  const [visits, setVisits] = useState([]);
  const [ann, setAnn] = useState([]);
  const [checked, setChecked] = useState(false);

  //const visitRef = collection(db, "visits");

  // TODO: Combine check in & check out into 1 func
  // Not working
  // Check In

  /*
  // Check Out
  const checkOut = async(id) => {
    const userDoc = docc(db, "users", id)
    const newFields = {checked_in: false}
    await updateDoc(userDoc, newFields)
    const newTimeFields = { check_time: getTime(new Date().getTime()) }
    await updateDoc(userDoc, newTimeFields)
  }
*/
  // declaring the default state

  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [studentID, setstudentID] = useState("");
  const [checkstat, setCheck] = useState("");
  const navigate = useNavigate();

  const fetchVisits = async () => {
    try {
      const q = query(collection(db, "visits"), where("uid", "==", user?.uid));
      const data = await getDocs(q);

      //obj.sort((a,b) => a.timeM - b.timeM);
      setVisits(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      //visits.sort((a,b) => b.time_stay - a.time_stay);
      //visits.sort((a, b) => (a.time_entry > b.time_entry) ? 1 : -1);
      //console.log(visits);

      //doc.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //setVisits(doc.id, " => ", doc.data());
    } catch (error) {
      //const data = doc.docs[0].data();
      //console.log(data);

      alert(error);
    }
  };

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));

      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setstudentID(data.student_id);
      setName(data.name);
      setCheck(data.checked_in);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  const checkOut = async (id) => {
    try {
      //const userDoc = fdoc(db, "users", id);
      //const docRef = db.collection('visits').doc(id);
      //const q = query(collection(db, "users"), where("uid", "==", id));
      //const doc = await getDocs(q);
      //const data = doc.docs[0].data();
      const newFields = { time_exit: getTime(new Date().getTime()) };
      //await updateDoc(userDoc, newFields);
      //await setDoc(userDoc, {time_exit: getTime(new Date().getTime()) });
      //await userDoc.updateDoc(newFields);
      //await docRef.update(newFields);

      const userDoc = fdoc(db, "visits", id);
      //const newFields = { checked_in: true };
      await updateDoc(userDoc, newFields);
    } catch (error) {
      alert(error.message);
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

  const getAnnouncements = async () => {
    const aRef = collection(db, "announcements");
    const data = await getDocs(aRef);
    setAnn(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
    fetchVisits();
    getAnnouncements();
  }, [user, loading]);

  return (
    <div className="container" id="dashboard1">
      <Announcement
        title="Please follow the guidelines by UWA"
        subtitle="All users and visitors must read and understand the information below before visiting UWA Farm Ridgefield."
        link="https://www.uwa.edu.au/institutes/institute-of-agriculture/UWA-Farm-Ridgefield"
        imageSource={Logo}
        daysToLive={3}
        secondsBeforeBannerShows={5}
        closeIconSize={20}
      />
      <div className="row justify-content-md-center">
        <div className="col mb-3">
          <div className="card">
            <div className="card-header">
              <h2> Welcome Back {name}</h2>
            </div>
            <div className="card-body">
              <div className="dashboard">
                <div className="dashboard__container">
                  <div>{user?.email}</div>
                  <div>user id: {String(user?.uid)}</div>
                  <div>student id {studentID}</div>
                  <div>check {String(checkstat)}</div>
                  <div>checkTime {String(user?.check_time)}</div>
                  <div>current Time {getTime(new Date().getTime())}</div>
                  <br></br>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col mb-3">
          <div className="card">
            <div className="card-header">
              <h2> Previous visits </h2>
            </div>
            <div className="card-body overflow-auto">
              <table className="table" id="visits_table">
                <tbody>
                  <tr>
                    <th> Locations </th>
                    <th> Check-In Time </th>
                    <th> Duration of Stay </th>
                    <th> Reason for visit </th>
                    <th> Check Out Time </th>
                  </tr>
                  {visits
                    .sort((a, b) => (a.time_entry < b.time_entry ? 1 : -1))
                    .map((visit) => {
                      return (
                        <tr key={visit}>
                          <td>{visit.locations_visited}</td>
                          <td>{visit.time_entry}</td>
                          <td>{visit.time_stay}</td>
                          <td>{visit.reason_for_visit}</td>
                          <td>
                            {visit.time_exit}
                            <button
                              type="button"
                              id="check_button"
                              class="btn btn-primary"
                              onClick={() => checkOut(visit.id)}
                            >
                              Check Out
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col mb-3">
          <div className="card">
            <div className="card-header">Announcements</div>
            <div className="card-body">
              <table id="a_table">
                <tbody>
                  {ann
                    .sort((a, b) => (a.time < b.time ? 1 : -1))
                    .map((post) => {
                      return (
                        <tr key={post}>
                          <td id="author">
                            <strong>{post.name}</strong> ({post.role}):{" "}
                          </td>
                          <td id="title">
                            <strong>{post.title}</strong>
                          </td>
                          <td>{post.text}</td>
                          <td>{post.time}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col mb-3">
          <div className="card">
            <div className="card-header">Contact Staff</div>
            <div className="card-body overflow-auto">
              <table className="table" id="contact_table">
                <tr>
                  <th>Name</th>
                  <th>Phone number</th>
                  <th>E-mail</th>
                </tr>
                <tr>
                  <td>Debra Mullan</td>
                  <td>+61 8 6488 3756</td>
                  <td>debra.mullan@uwa.edu.au</td>
                </tr>
                <tr>
                  <td>Tim Watts </td>
                  <td> +61 0427 871 321</td>
                  <td> tim.watts@uwa.edu.au </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
