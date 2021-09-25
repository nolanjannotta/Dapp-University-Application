import React from 'react';
import styled from "styled-components"
import Address from './header/Address'
import Deposit from './Deposit.js';
import Dashboard from './Dashboard.js'

const App = () => {

  
  return (

    <div>

      <Navbar>
        <div>Dapp University Application </div>
        <Address></Address>
      </Navbar>
      

      <Container>  
        <Deposit></Deposit>
        <Dashboard></Dashboard>
        
      
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


