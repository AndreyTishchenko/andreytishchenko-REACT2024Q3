import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSubmission } from '../store/slices/formSlice';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { formSchema, FormSchemaType } from '../schemas/formSchema';
import { ZodError } from 'zod';

const UncontrolledForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countries = useSelector((state: RootState) => state.form.countries);

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<Partial<Record<keyof FormSchemaType, string>>>({});

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      name: nameRef.current?.value,
      age: ageRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      confirmPassword: confirmPasswordRef.current?.value,
      gender: genderRef.current?.value,
      terms: termsRef.current?.checked,
      picture: pictureRef.current?.files && pictureRef.current.files[0],
      country: countryRef.current?.value,
    };

    try {
      const validatedData = formSchema.parse(formData);
      setErrors({});

      let pictureBase64: string | null = null;
      if (validatedData.picture) {
        pictureBase64 = await fileToBase64(validatedData.picture);
      }

      const submission = {
        name: validatedData.name,
        age: validatedData.age,
        email: validatedData.email,
        password: validatedData.password,
        gender: validatedData.gender,
        terms: validatedData.terms,
        picture: pictureBase64,
        country: validatedData.country,
      };

      dispatch(addSubmission(submission));
      navigate('/');
    } catch (err: unknown) {
      if (err instanceof ZodError) {
        const errorMap: Partial<Record<keyof FormSchemaType, string>> = {};
        err.errors.forEach((error) => {
          errorMap[error.path[0] as keyof FormSchemaType] = error.message;
        });
        setErrors(errorMap);
      }
    }
  };

  return (
    <div>
      <h1>Uncontrolled Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" ref={nameRef} />
          {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
        </div>
  
        <div>
          <label htmlFor="age">Age:</label>
          <input type="number" id="age" ref={ageRef} />
          {errors.age && <div style={{ color: 'red' }}>{errors.age}</div>}
        </div>
  
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" ref={emailRef} />
          {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
        </div>
  
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" ref={passwordRef} />
          {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
        </div>
  
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword" ref={confirmPasswordRef} />
          {errors.confirmPassword && <div style={{ color: 'red' }}>{errors.confirmPassword}</div>}
        </div>
  
        <div>
          <label htmlFor="gender">Gender:</label>
          <select id="gender" ref={genderRef}>
            <option value="">Select...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <div style={{ color: 'red' }}>{errors.gender}</div>}
        </div>
  
        <div>
          <label htmlFor="terms">
            <input type="checkbox" id="terms" ref={termsRef} /> Accept Terms and Conditions
          </label>
          {errors.terms && <div style={{ color: 'red' }}>{errors.terms}</div>}
        </div>
  
        <div>
          <label htmlFor="picture">Upload Picture:</label>
          <input type="file" id="picture" ref={pictureRef} accept="image/jpeg,image/png" />
          {errors.picture && <div style={{ color: 'red' }}>{errors.picture}</div>}
        </div>
  
        <div>
          <label htmlFor="country">Country:</label>
          <input list="countries" id="country" ref={countryRef} />
          <datalist id="countries">
            {countries.map((country, index) => (
              <option key={index} value={country} />
            ))}
          </datalist>
          {errors.country && <div style={{ color: 'red' }}>{errors.country}</div>}
        </div>
  
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UncontrolledForm;
