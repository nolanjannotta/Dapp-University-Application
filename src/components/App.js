import React, { Component } from 'react';
import logo from '../logo.png';
import styled from "styled-components"
import './App.css';
import ChainData from "./header/ChainData"
import SupplyAPY from './SupplyAPY.js';

const App = () => {

  // if (window.ethereum !== null) {
  //   return
  // } else if {
  //   alert("no metamask")
  // }
  
  return (
    <div>

      <Navbar>
        <div>Dapp University Application </div>
        <ChainData></ChainData>
      </Navbar>
      

      <Container>  
        <SupplyAPY></SupplyAPY>
        
      
      </Container> 
    </div>    
    );
  
}

export default App;

const Container = styled.div`
  display: flex;
  margin: auto;
  justify-content: center;
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


