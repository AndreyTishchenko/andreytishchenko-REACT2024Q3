import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { clearNewFlags } from '../store/slices/formSlice';

const Main: React.FC = () => {
  const submissions = useSelector((state: RootState) => state.form.submissions);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(clearNewFlags());
    }, 5000);
    return () => clearTimeout(timer);
  }, [dispatch, submissions]);

  return (
    <div>
      <h1>Main Page</h1>
      {submissions.map((submission, index) => (
        <div
          key={index}
          style={{
            border: submission.isNew ? '2px solid green' : '1px solid gray',
            padding: '10px',
            margin: '10px 0',
          }}
        >
          <p><strong>Name:</strong> {submission.name}</p>
          <p><strong>Age:</strong> {submission.age}</p>
          <p><strong>Email:</strong> {submission.email}</p>
          <p><strong>Gender:</strong> {submission.gender}</p>
          <p><strong>Country:</strong> {submission.country}</p>
          {submission.picture && (
            <img src={submission.picture} alt="Uploaded" style={{ maxWidth: '100px' }} />
          )}
        </div>
      ))}
    </div>
  );
};

export default Main;
