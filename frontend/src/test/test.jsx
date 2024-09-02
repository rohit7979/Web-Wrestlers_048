import React, { useState, useEffect } from 'react';

export const Test = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://backend-render-7zzl.onrender.com/projects')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {Array.isArray(data) && data.map((project) => (
        <div key={project._id}>
          <h2>{project.donation_title}</h2>
          <p>{project.donation_discription}</p>
          <h3>Updates:</h3>
          <ul>
            {Array.isArray(project.updates_on_donation) && project.updates_on_donation.map((update, index) => (
              <li key={index}>{update}</li>
            ))}
          </ul>
          <h3>Media Images:</h3>
          <ul>
            {Array.isArray(project.media_images) && project.media_images.map((image, index) => (
              <li key={index}>{image}</li>
            ))}
          </ul>
          <h3>Current Donators:</h3>
          <ul>
            {Array.isArray(project.current_donators) && project.current_donators.map((donator) => (
              <li key={donator._id}>
                {donator.name} - ${donator.amount}
              </li>
            ))}
          </ul>
          <h3>Comments:</h3>
          <ul>
            {Array.isArray(project.comments) && project.comments.map((comment) => (
              <li key={comment._id}>
                {comment.name}: {comment.messege}
              </li>
            ))}
          </ul>
          <h3>Payment Options:</h3>
          <ul>
            {Array.isArray(project.payment_recive_option) && project.payment_recive_option.map((option) => (
              <li key={option._id}>
                {option.paymnet_recive_name}: {option.payment_recive_details}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Test;
