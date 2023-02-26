import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Blank from '../pages/Blank';
import Contact from '../pages/Contact';
import DayDetails from '../pages/DayDetails';
import Home from '../pages/Home';
import NestedList from '../pages/NestedList';
import SavedDay from '../pages/SavedDay';

const Main = () => {
  return (
    <Routes>
      <Route exact path='/' element={<Home />} />
      <Route exact path='/days' element={<SavedDay />} />
      <Route exact path='/day' element={<NestedList />} />
      <Route path='/day/:dateId' element={<DayDetails />} />
      <Route exact path='/contact' element={<Contact />} />
      <Route path='/' element={<Blank />} />
    </Routes>
  );
};

export default Main;
