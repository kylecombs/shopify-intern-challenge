import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import axios from 'axios';
import '@reach/dialog/styles.css';
import useDate from './components/hooks/useDate';
import { Modal } from './components/Modal/Modal';
import Nav from './components/Nav/Nav';
import Gallery from './components/Gallery/Gallery';
import NoMatch from './components/NoMatch/NoMatch';

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
