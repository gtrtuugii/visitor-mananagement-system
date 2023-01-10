//import Header from "/src/components/header";
//import { db } from "/src/components/firebase";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "./firebase.js";

import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  where,
  query
} from "firebase/firestore";

import "./admin.css";

export default function Check() {
  const [user, loading, error] = useAuthState(auth);

  const [users, setUsers] = useState([]);
  const [newRole, setNewRole] = useState();
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [log, setLog] = useState([]);
  const userRef = collection(db, "users");
  const logRef = collection(db, "visits");
  const [currName, setCurrName] = useState("");
  const [currRole, setCurrRole] = useState("");
  const navigate = useNavigate();

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "new_role") {
      setNewRole(value);
    }
    if (id === "a_title") {
      setTitle(value);
    }
    if (id === "a_text") {
      setText(value);
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

  // Check In
  const checkIn = async (id) => {
    const userDoc = doc(db, "users", id);
    const newFields = { checked_in: true };
    await updateDoc(userDoc, newFields);
    const newTimeFields = { check_time: getTime(new Date().getTime()) };
    await updateDoc(userDoc, newTimeFields);
  };

  // Check Out
  const checkOut = async (id) => {
    const userDoc = doc(db, "users", id);
    const newFields = { checked_in: false };
    await updateDoc(userDoc, newFields);
    const newTimeFields = { check_time: getTime(new Date().getTime()) };
    await updateDoc(userDoc, newTimeFields);
  };

  const makeAdmin = async (id) => {
    const userDoc = doc(db, "users", id);
    const newFields = { role: "Admin" };
    await updateDoc(userDoc, newFields);
  };

  const fetchUserNameAndRole = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setCurrName(data.name);
      setCurrRole(data.role);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  // Get checked in Users
  // TO DO: store doc.data() in a table
  const getCheckedInUsers = async () => {
    const q = query(collection(db, "users"), where("checked_in", "==", true));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  };

  const newAnnouncement = async (name, title, role, text, time) => {
    try {
      await addDoc(collection(db, "announcements"), {
        uid: user.uid,
        name,
        title,
        role,
        text,
        time
      });
      alert("Announcement posted!");
    } catch (error) {
      alert(error.message);
    }
  };

  // Fetch from DB and map (Read)
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    const getLog = async () => {
      const data = await getDocs(logRef);
      setLog(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    if (loading) return;
    if (!user) return navigate("/");
    getLog();
    getUsers();
    fetchUserNameAndRole();
  }, [user, loading]);

  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col mb-3">
          <div className="card">
            <div className="card-header">
              <h2> User Database </h2>
            </div>
            <div className="card-body">
              <table id="CheckedInTable">
                <tbody>
                  <tr>
                    <th>Name</th>
                    <th>Student ID</th>
                    <th>E-mail</th>
                    <th>Phone Number</th>
                    <th> Role </th>
                    <th> Provider </th>
                    <th> Make Admin </th>
                    <th> Delete User </th>
                  </tr>
                  {users.map((user) => {
                    return (
                      <tr key={user}>
                        <td>{user.name}</td>
                        <td>{user.student_id}</td>
                        <td>{user.email}</td>
                        <td>{user.phone_number}</td>
                        <td contenteditable="true">{user.role}</td>
                        <td>{user.authProvider}</td>
                        <td>
                          <button
                            type="button"
                            class="btn btn-success"
                            onClick={() => {
                              makeAdmin(user.id);
                            }}
                          >
                            Grant
                          </button>
                        </td>
                        <td>
                          <button
                            type="button"
                            class="btn btn-danger"
                            onClick={() => {
                              deleteUser(user.id);
                            }}
                          >
                            Delete
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
        <div className="col mb-3">
          <div className="card">
            <div className="card-header">
              <h2> Visitor Log </h2>
            </div>
            <div className="card-body">
              <table id="log_table">
                <tbody>
                  <tr>
                    <th> Visitor name</th>
                    <th> Type of Visitor </th>
                    <th> Date of visit </th>
                    <th> Locations visited </th>
                    <th> Estimated stay </th>
                    <th> Reason of visit </th>
                    <th> Time of exit </th>
                  </tr>
                  {log
                    .sort((a, b) => (a.time_entry < b.time_entry ? 1 : -1))
                    .map((visit) => {
                      return (
                        <tr key={visit}>
                          <td>{visit.visitor_name}</td>
                          <td>{visit.visitor_role}</td>
                          <td>{visit.time_entry}</td>
                          <td>{visit.locations_visited}</td>
                          <td>{visit.time_stay} hours</td>
                          <td>{visit.reason_for_visit}</td>
                          <td> {visit.time_exit} </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-md-center">
        <div className="col mb-3">
          <div className="card">
            <div className="card-header">
              <h2> Create announcement </h2>
            </div>
            <div className="card-body" id="a_body">
              <input
                className="form-control"
                type="text"
                value={title}
                onChange={(e) => handleChange(e)}
                id="a_title"
                placeholder="Enter title..."
              />
              <br></br>
              <form>
                <textarea
                  id="a_text"
                  value={text}
                  placeholder="Enter context of announcement..."
                  onChange={(e) => handleChange(e)}
                />
              </form>
              <button
                type="button"
                id="a_button"
                class="btn btn-primary"
                onClick={() => {
                  newAnnouncement(
                    currName,
                    title,
                    currRole,
                    text,
                    getTime(new Date().getTime())
                  );
                }}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
