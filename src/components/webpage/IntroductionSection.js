import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import video from '../media/images/jec.mp4';
import axios from 'axios';

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  object-fit: cover;
  z-index: -1;
`;

const ContentWrapper = styled.div`
  position: relative;
  height: 80vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
`;

export const IntroductionSection = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isStaff, setIsStaff] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    console.log(token);
    if (token) {
      setIsLoggedIn(true);
      // Fetch user data
      axios.get('http://192.168.1.135:8000/api/accounts/user/', { headers: { Authorization: `Token ${token}` } })
        .then(response => {
          setIsStaff(response.data.is_staff);
          console.log(response.data);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, []);

  return (
    <>
      <header>
        <VideoBackground autoPlay loop muted>
          <source src={video} type="video/mp4" />
        </VideoBackground>
        <ContentWrapper>
          <div className="w-full md:w-3/4 lg:w-1/2 p-4 py-4 my-5">
            <h1 className="text-3xl md:text-4xl font-semibold" style={{ fontFamily: "'Merriweather', serif" }}>
              JANAKPUR ENGINEERING COLLEGE
            </h1>
            <p className="text-lg mt-4 mb-6">
              Janakpur Engineering is a leading research university pushing boundaries and frontiers to brighten the future of the students.
            </p>
            {isLoggedIn && !isStaff ? (
              <Link to='/onlineapply'>
                <button className="px-3 py-2 text-xl font-semibold hover:bg-blue-500 hover:text-white rounded-lg border border-black">
                  Apply Online
                </button>
              </Link>
            ) : !isLoggedIn ? (
              <Link to='/login'>
                <button className="px-3 py-2 text-xl font-semibold hover:bg-blue-500 hover:text-white rounded-lg border border-black">
                  Login
                </button>
              </Link>
            ) : null}
          </div>
        </ContentWrapper>
      </header>
    </>
  );
};
