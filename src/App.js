import React, { useState } from 'react';
import './style.css'; // Importing the global styles
import Login from './Components/Login';
import MarketData from './Components/MarketData';

function App() {
  const [token, setToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');  // State to store the refresh token

  return (
    <div className="App">
      <h1>Angle One Integration</h1>
      {/* Show Login if no token exists */}
      {!token ? (
        <Login setToken={setToken} setRefreshToken={setRefreshToken} />   /* Passing setRefreshToken to Login */
      ) : (
        <div>
          {/* Display Refresh Token and MarketData after login */}
          <h3>Refresh Token: {refreshToken}</h3>  {/* Display refresh token */}
          <MarketData token={token} refreshToken={refreshToken} />  {/* Pass refreshToken to MarketData */}
        </div>
      )}
    </div>
  );
}

export default App;

