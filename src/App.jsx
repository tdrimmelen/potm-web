import { useState, useEffect, useCallback } from 'react'
import './App.css'

function App() {
  const [playersOfTheMatch, setPlayersOfTheMatch] = useState([]);

  async function fetchPotm () {
    const response = await fetch('https://fa-potm-67df3.azurewebsites.net/api/tallies');
    if (response.ok) {
      const data = await response.json();
      setPlayersOfTheMatch(data);
    } else {
      console.log('Failed to switch', response)
    }
  }

  useEffect(() => {
    fetchPotm();

    const intervalID = setInterval(fetchPotm, 10000);

    return function () {
      clearInterval(intervalID);
    }
  }, []);

  const eachPlayerItem = useCallback((player, index) => {
    return (
      <span>
        <span>{index + 1}. </span>
        <b>{player.id}</b> met {player.votes} stemmen
        <br />
      </span>
    );
  }, [playersOfTheMatch]);

  return (
    <>
      <h2>Player of the match</h2>
      {playersOfTheMatch.map(eachPlayerItem)}
    </>
  )
}

export default App
