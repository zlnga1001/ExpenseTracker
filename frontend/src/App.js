import React, { useState, useMemo } from 'react';
import styled from "styled-components";
import bg from './img/bg.png';
import { MainLayout } from './styles/Layouts';
import Orb from './Components/Orb/Orb';
import Navigation from './Components/Navigation/Navigation';
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income';
import Expenses from './Components/Expenses/Expenses';
import Home from './Components/homepage/home';
import { useGlobalContext } from './context/globalContext';

function App() {
  const [active, setActive] = useState('dashboard'); // Default to dashboard

  const global = useGlobalContext();
  console.log(global);

  const displayComponent = () => {
    switch (active) {
      case 'dashboard':
        return <Dashboard />;
      case 'income':
        return <Income />;
      case 'expenses':
        return <Expenses />;
      case 'home':
      default:
        return <Home />;
    }
  };

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  const handleSignOut = () => {
    setActive('home');
  };

  return (
    <AppStyled bg={bg} className="App">
      {orbMemo}
      <MainLayout>
        <Navigation active={active} setActive={setActive} onSignOut={handleSignOut} />
        <main>
          {displayComponent()}
        </main>
      </MainLayout>
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default App;
