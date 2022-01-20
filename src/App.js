import React, { useState, useEffect } from 'react';
import { Routes, Route, Outlet, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import '@reach/dialog/styles.css';
import { ImageLink, PhotoGrid, LoadingContainer } from './components/styled';
import useDate from './components/hooks/useDate';
import { Modal } from './components/Modal/Modal';
import Nav from './components/Nav';
import Heart from './components/Heart/Heart';
import Lottie from 'react-lottie';
import animationData from './lotties/29238-rocket-in-space-transparent-background.json';

export default function App() {
  let location = useLocation();
  let state = location.state;

  const [startDate, endDate] = useDate();
  const [posts, setPosts] = useState([]);
  const key = 'DgpckBSuToPA2GkP8yi0ZkYEYkuNGcPD3AHpVYzK';

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `https://api.nasa.gov/planetary/apod?api_key=${key}&start_date=${startDate}&end_date=${endDate}
        `
      );
      setPosts(data);
    };
    fetchData();
  }, [endDate, startDate]);
  return (
    <div>
      <Nav posts={posts} setPosts={setPosts} />
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<Gallery posts={posts} />}>
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/img/:id" element={<Modal posts={posts} />} />
        </Routes>
      )}
    </div>
  );
}

function Gallery({ posts }) {
  let location = useLocation();
  return (
    <div style={{ padding: '0 24px' }}>
      {posts.length ? (
        <PhotoGrid>
          {posts.map(
            (image, index) =>
              image.media_type === 'image' && (
                <ImageLink
                  duration={Math.random() * 1.5 + 0.6}
                  delay={Math.random() * 1.5}
                  key={index}
                  to={`/img/${index}`}
                  url={image.url}
                  state={{ backgroundLocation: location }}
                >
                  <div>
                    <p>{image.date}</p>
                    <p>{image.title}</p>
                  </div>
                  <Heart />
                </ImageLink>
              )
          )}
        </PhotoGrid>
      ) : (
        <LoadingContainer>
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: animationData,
              rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice',
              },
            }}
            height={400}
            width={400}
          />
          <h1>LOADING . . .</h1>
        </LoadingContainer>
      )}
      <Outlet />
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
