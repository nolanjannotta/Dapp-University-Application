import React, { Component } from 'react';
import logo from '../logo.png';
import styled from "styled-components"
import './App.css';
import ChainData from "./header/ChainData"
import SupplyAPY from './SupplyAPY.js';
import ViaFrontEnd from "./ViaFrontEnd.js"

const App = () => {

  
  return (

    <div>

      <Navbar>
        <div>Dapp University Application </div>
        <ChainData></ChainData>
      </Navbar>
      

      <Container>  
        <SupplyAPY></SupplyAPY>
        <ViaFrontEnd></ViaFrontEnd>
        
      
      </Container>
      
      
    </div>    
    );
  
}

export default App;

const Container = styled.div`
  display: flex;
  /* pdding: 10px; */
  /* padding: 25px 50px; */
  margin: auto;
  justify-content: space-evenly;
`

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


