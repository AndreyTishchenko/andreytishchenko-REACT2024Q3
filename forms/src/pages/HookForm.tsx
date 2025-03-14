import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addSubmission } from '../store/slices/formSlice';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { formSchema, FormSchemaType } from '../schemas/formSchema';

const HookForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countries = useSelector((state: RootState) => state.form.countries);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  // File to base64 conversion
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const onSubmit = async (data: FormSchemaType) => {
    let pictureBase64: string | null = null;
    if (data.picture && data.picture instanceof FileList && data.picture.length > 0) {
      pictureBase64 = await fileToBase64(data.picture[0]);
    }
    const submission = {
      name: data.name,
      age: data.age,
      email: data.email,
      password: data.password,
      gender: data.gender,
      terms: data.terms,
      picture: pictureBase64,
      country: data.country,
    };
  
    dispatch(addSubmission(submission));
    navigate('/');
  };
  

  return (
    <div>
      <h1>React Hook Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" {...register('name')} />
          {errors.name && <div style={{ color: 'red' }}>{errors.name.message}</div>}
        </div>

        <div>
          <label htmlFor="age">Age:</label>
          <input type="number" id="age" {...register('age')} />
          {errors.age && <div style={{ color: 'red' }}>{errors.age.message}</div>}
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" {...register('email')} />
          {errors.email && <div style={{ color: 'red' }}>{errors.email.message}</div>}
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" {...register('password')} />
          {errors.password && <div style={{ color: 'red' }}>{errors.password.message}</div>}
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword" {...register('confirmPassword')} />
          {errors.confirmPassword && <div style={{ color: 'red' }}>{errors.confirmPassword.message}</div>}
        </div>

        <div>
          <label htmlFor="gender">Gender:</label>
          <select id="gender" {...register('gender')}>
            <option value="">Select...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <div style={{ color: 'red' }}>{errors.gender.message}</div>}
        </div>

        <div>
          <label htmlFor="terms">
            <input type="checkbox" id="terms" {...register('terms')} /> Accept Terms and Conditions
          </label>
          {errors.terms && <div style={{ color: 'red' }}>{errors.terms.message}</div>}
        </div>

        <div>
          <label htmlFor="picture">Upload Picture:</label>
          <input type="file" id="picture" {...register('picture')} accept="image/jpeg,image/png" />
          {errors.picture?.message && ( <div style={{ color: 'red' }}>{String(errors.picture.message)}</div> )}
        </div>

        <div>
          <label htmlFor="country">Country:</label>
          <input list="countries" id="country" {...register('country')} />
          <datalist id="countries">
            {countries.map((country, index) => (
              <option key={index} value={country} />
            ))}
          </datalist>
          {errors.country && <div style={{ color: 'red' }}>{errors.country.message}</div>}
        </div>

        <button type="submit" disabled={!isValid}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default HookForm;
