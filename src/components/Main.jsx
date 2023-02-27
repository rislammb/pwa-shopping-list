import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Blank from '../pages/Blank';
import Contact from '../pages/Contact';
import DayDetails from '../pages/DayDetails';
import Home from '../pages/Home';
import SavedDays from '../pages/SavedDays';

const Main = () => {
  return (
    <Routes>
      <Route exact path='/' element={<Home />} />
      <Route exact path='/day' element={<SavedDays />} />
      <Route path='/day/:dateId' element={<DayDetails />} />
      <Route exact path='/contact' element={<Contact />} />
      <Route path='/' element={<Blank />} />
    </Routes>
  );
};

export default Main;
