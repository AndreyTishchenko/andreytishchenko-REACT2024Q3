import React, { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addData } from "../store/formSlice";
import { useNavigate } from "react-router-dom";
import { formSchema } from "../schemas/formSchema";

interface FormErrors {
  [key: string]: string;
}

const UncontrolledForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Get countries from Redux
  const countries = useAppSelector((state) => state.countries.countries);

  // Refs for inputs
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<FormErrors>({});

  // Helper: Convert File to Base64
  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const name = nameRef.current?.value || "";
    const age = ageRef.current?.value || "";
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    const confirmPassword = confirmPasswordRef.current?.value || "";
    const gender = genderRef.current?.value || "";
    const terms = termsRef.current?.checked || false;
    const country = countryRef.current?.value || "";

    let picture = "";
    if (pictureRef.current?.files && pictureRef.current.files[0]) {
      const file = pictureRef.current.files[0];
      const allowedTypes = ["image/png", "image/jpeg"];
      if (!allowedTypes.includes(file.type)) {
        setErrors((prev) => ({ ...prev, picture: "Only PNG and JPEG files are allowed" }));
        return;
      }
      const maxSize = 2 * 1024 * 1024;
      if (file.size > maxSize) {
        setErrors((prev) => ({ ...prev, picture: "File size must be under 2MB" }));
        return;
      }
      try {
        picture = await fileToBase64(file);
      } catch (error) {
        setErrors((prev) => ({ ...prev, picture: "Failed to process picture" }));
        return;
      }
    }

    const formData = {
      name,
      age,
      email,
      password,
      confirmPassword,
      gender,
      terms,
      picture,
      country,
    };

    const result = formSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.errors.forEach((err) => {
        if (err.path.length > 0) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    dispatch(addData({ ...result.data, timestamp: Date.now() }));
    navigate("/");
  };

  return (
    <div>
      <h1>Uncontrolled Form</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="name">Name:</label>
          <input id="name" type="text" ref={nameRef} />
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input id="age" type="number" ref={ageRef} />
          {errors.age && <p style={{ color: "red" }}>{errors.age}</p>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" ref={emailRef} />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input id="password" type="password" ref={passwordRef} />
          {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input id="confirmPassword" type="password" ref={confirmPasswordRef} />
          {errors.confirmPassword && <p style={{ color: "red" }}>{errors.confirmPassword}</p>}
        </div>
        <div>
          <label htmlFor="gender">Gender:</label>
          <select id="gender" ref={genderRef}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <p style={{ color: "red" }}>{errors.gender}</p>}
        </div>
        <div>
          <label htmlFor="terms">
            <input id="terms" type="checkbox" ref={termsRef} />
            Accept Terms and Conditions
          </label>
          {errors.terms && <p style={{ color: "red" }}>{errors.terms}</p>}
        </div>
        <div>
          <label htmlFor="picture">Upload Picture:</label>
          <input id="picture" type="file" accept="image/png, image/jpeg" ref={pictureRef} />
          {errors.picture && <p style={{ color: "red" }}>{errors.picture}</p>}
        </div>
        <div>
          <label htmlFor="country">Country:</label>
          <input id="country" type="text" ref={countryRef} list="countryList" />
          <datalist id="countryList">
            {countries.map((country) => (
              <option key={country} value={country} />
            ))}
          </datalist>
          {errors.country && <p style={{ color: "red" }}>{errors.country}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UncontrolledForm;
