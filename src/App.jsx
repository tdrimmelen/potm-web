import { useState, useEffect, useCallback } from 'react'
import './App.css'

function App() {
  const [playersOfTheMatch, setPlayersOfTheMatch] = useState([]);

  async function fetchPotm() {
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
      <tr>
        <td>{index + 1}. </td>
        <td>{player.id}</td>
        <td>{player.votes}</td>
      </tr>
    );
  }, [playersOfTheMatch]);

  return (
    <>
      <div class="background"></div>
      <div class="content">

        <h2>Player of the match</h2>

        <table align='center' border='thin'>
          <tr>
            <th>Plaats</th>
            <th>Naam</th>
            <th>Aantal stemmen</th>
          </tr>
          {playersOfTheMatch.map(eachPlayerItem)}
        </table>
      </div>
    </>
  )
}

export default App
