import React, { useState } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';


import Button from '../Button/Button';
import { plus } from '../../utils/Icons';
import { InnerLayout } from '../../styles/Layouts';

const Homepage = () => {
    return (
      <div className="homepage">
        <h1>Welcome to My Homepage</h1>
        <p>This is a simple homepage created with React.</p>
      </div>
    );
  };
  
  export default Homepage;