import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Redirect = () => {
  const { shortUrl } = useParams();
  console.log(shortUrl);
  useEffect(() => {
    window.location.href = `http://localhost:3000/${shortUrl}`;
  }, [shortUrl]);

  return <div>Redirecting...</div>;
};

export default Redirect;