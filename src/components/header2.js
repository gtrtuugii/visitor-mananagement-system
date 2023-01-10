import React from "react";
import "./style.css";

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light" id="navbar">
      <a className="navbar-brand" href="google.com">
        <div className="container">
          <div className="uwa-logo">
            <img
              className="uwa-image"
              src="https://anif.org.au/wp-content/uploads/2020/03/sq-uwa-01.png"
              alt="UWA logo"
            />
          </div>
          <div className="uwa-text-div">
            <strong className="uwa-text">UWA Farm Ridgefield Login</strong>
          </div>
        </div>
      </a>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a
              className="nav-link"
              href="https://www.uwa.edu.au/institutes/institute-of-agriculture/UWA-Farm-Ridgefield"
            >
              Home <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="google.com">
              Link
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
export default Header;
