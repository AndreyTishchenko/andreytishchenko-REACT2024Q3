import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

const Main: React.FC = () => {
  const formData = useAppSelector((state) => state.form.data);

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
          {formData.map((data, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #000",
                margin: "10px",
                padding: "10px",
                backgroundColor:
                  Date.now() - data.timestamp < 3000 ? "lightgreen" : "white",
              }}
            >
              <p>Name: {data.name}</p>
              <p>Age: {data.age}</p>
              <p>Email: {data.email}</p>
              <p>Gender: {data.gender}</p>
              <p>Country: {data.country}</p>
              <img
                src={data.picture}
                alt="Uploaded"
                style={{ maxWidth: "100px" }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Main;
