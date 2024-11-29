import React, { useState, useEffect } from "react";
import logo from "./assets/logo.jpg";
import image1 from "./assets/img1.jpg";
import image2 from "./assets/img2.jpg";


const images = [image1, image2];

function Profile() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="hometitle">
      <h1>
        <img src={logo} alt="logo" className="logo" />
        PAVENDAR BHARATHIDASAN COLLEGE OF ENGINEERING AND TECHNOLOGY
      </h1>
      <h2>(Affliated by Anna University)</h2>
      <h3>TIRUCHIRAPALLI</h3>
      <p>
        <b>Welcome to the College folks!!!</b>
      </p>
      <div className="slideshow">
        <button onClick={previousImage}>Previous</button>
        <img
          src={images[currentImageIndex]}
          alt={`Slide ${currentImageIndex + 1}`}
          className="slideshow-image"
        />
        <div className="scrolling-text">
          <span>
            {" "}
            ATTENTION FOR NEW STUDENTS: Please register your detials in the
            allocated space. &nbsp; | &nbsp; ATTENDANCE DETIALS: Students should
            follow the attendance record srictly.
          </span>
        </div>
      </div>
    </div>
  );
}

export default Profile;
