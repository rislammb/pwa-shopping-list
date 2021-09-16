import React from 'react';
import { Typography } from '@material-ui/core';

const TotalContainer = (props) => {
  return (
    <div {...props}>
      {props.children}
      <Typography component='span' style={{ fontWeight: 'bold' }}>
        {props.days ? `Gross Total: ${props.total}` : `Total: ${props.total}`}
      </Typography>
    </div>
  );
};

export default TotalContainer;
