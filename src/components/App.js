import React, { Component } from 'react';
import logo from '../logo.png';
import styled from "styled-components"
import './App.css';
import ChainData from "./header/ChainData"
import SupplyAPY from './hooks/SupplyAPY';

const App = () => {
  
  return (
      <div>
      
      
        <Navbar>
          <div>
           Dapp University Application 
          </div>
          <ChainData>

          </ChainData>
          
      </Navbar>
      
      <SupplyAPY>
        
      </SupplyAPY>
      </div> 
        
    );
  
}

export default App;

const Navbar = styled.div`
    background-color: pink;
    width: 100%;
    height: 60px;

    /* margin: auto; */
    padding: 12px 30px;
    display: flex;
    /* align-items: center; */
    /* position: relative; */
    justify-content: space-between;
    /* flex-wrap: nowrap; */
`


