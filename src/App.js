import React, { useState, useEffect, useRef } from 'react';
import {
  Routes,
  Route,
  Outlet,
  Link,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import axios from 'axios';
import { Dialog } from '@reach/dialog';
import '@reach/dialog/styles.css';
import { ImageLink, PhotoGrid } from './components/styled';
import useDate from './components/hooks/useDate';
import { Modal } from './components/Modal/Modal';
// import { Gallery } from './components/Gallery/Gallery';

export default function App() {
  let location = useLocation();
  const [startDate, endDate] = useDate();

  // The `backgroundLocation` state is the location that we were at when one of
  // the gallery links was clicked. If it's there, use it as the location for
  // the <Routes> so we show the gallery in the background, behind the modal.
  let state = location.state;

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
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<Gallery posts={posts} />}>
          {/* <Route path="/img/:id" element={<Modal posts={posts} />} /> */}
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
      <h2>Spacestagram</h2>
      <PhotoGrid>
        {posts.map(
          (image, index) =>
            image.media_type === 'image' && (
              <ImageLink
                key={index}
                to={`/img/${index}`}
                url={image.url}
                state={{ backgroundLocation: location }}
              >
                <p>{image.date}</p>
                <p>{image.title}</p>
              </ImageLink>
            )
        )}
      </PhotoGrid>
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
