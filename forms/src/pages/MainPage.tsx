import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

const Main: React.FC = () => {
  // Retrieve submitted form data from Redux
  const formData = useAppSelector((state) => state.form.data);
  // State to trigger re-renders based on current time
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000); // update every second
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>Main Page</h1>
      <nav>
        <Link to="/uncontrolled-form">Uncontrolled Form</Link> |{" "}
        <Link to="/hook-form">React Hook Form</Link>
      </nav>

      <h2>Submitted Data</h2>
      {formData.length === 0 ? (
        <p>No data submitted yet.</p>
      ) : (
        <div>
          {formData.map((data, index) => {
            // Check if the entry was submitted within the last 3 seconds
            const isNew = currentTime - data.timestamp < 3000;
            return (
              <div
                key={index}
                style={{
                  border: isNew ? "2px solid orange" : "1px solid #000",
                  backgroundColor: isNew ? "#fffae6" : "white",
                  margin: "10px",
                  padding: "10px",
                  transition: "all 0.5s ease",
                }}
              >
                <p>
                  <strong>Name:</strong> {data.name}
                </p>
                <p>
                  <strong>Age:</strong> {data.age}
                </p>
                <p>
                  <strong>Email:</strong> {data.email}
                </p>
                <p>
                  <strong>Gender:</strong> {data.gender}
                </p>
                <p>
                  <strong>Country:</strong> {data.country}
                </p>
                <div>
                  <strong>Picture:</strong>
                  <br />
                  <img src={data.picture} alt="Uploaded" style={{ maxWidth: "100px" }} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Main;
