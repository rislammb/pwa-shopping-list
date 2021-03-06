import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import SavedDay from '../pages/SavedDay';
import DayDetails from '../pages/DayDetails';
import Contact from '../pages/Contact';
import Blank from '../pages/Blank';

const Main = () => {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/day' component={SavedDay} />
      <Route path='/day/:dateId' component={DayDetails} />
      <Route exact path='/contact' component={Contact} />
      <Route path='/' component={Blank} />
    </Switch>
  );
};

export default Main;
