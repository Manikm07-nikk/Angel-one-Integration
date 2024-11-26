import React, { useState } from 'react';
import axios from 'axios';

const MarketData = ({ token, refreshToken }) => {
  const [message, setMessage] = useState('');
  const [newToken, setNewToken] = useState(null);
  const [inputRefreshToken, setInputRefreshToken] = useState(''); // For user input of refresh token

  const fetchToken = async () => {
    const tokenToUse = inputRefreshToken || refreshToken; // Use user input or passed refreshToken

    if (!tokenToUse) {
      setMessage('Refresh Token is required!');
      return;
    }

    try {
      console.log('Access Token:', token);
      console.log('Using Refresh Token:', tokenToUse); // Log the refresh token being used

      const response = await axios.post(
        'https://apiconnect.angelone.in/rest/auth/angelbroking/jwt/v1/generateTokens',
        {
          refreshToken: tokenToUse // Use the selected refresh token
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-UserType': 'USER',
            'X-SourceID': 'WEB',
            'X-ClientLocalIP': '192.168.0.196',
            'X-ClientPublicIP': '103.199.226.24',
            'X-MACAddress': 'c8:b2:9b:ff:98:d0',
            'X-PrivateKey': 'lgqynC0b' // Replace with your API key
          }
        }
      );

      console.log('API Response:', response.data);

      if (response.data?.data?.jwtToken) {
        const jwtToken = response.data.data.jwtToken;
        setNewToken(jwtToken);
        setMessage('Token generated successfully');
      } else {
        setMessage('Failed to fetch token: Invalid response data');
      }
    } catch (error) {
      setMessage('Failed to fetch token.');
      if (error.response) {
        console.error('Error response data:', error.response.data);  // Log the response error
        setMessage(`Error: ${error.response.data.message || error.message}`);
      } else {
        console.error('Error message:', error.message);
      }
    }
  };

  return (
    <div>
      <h2>Generate Token</h2>
      <input
        type="text"
        placeholder="Enter Refresh Token"
        value={inputRefreshToken}
        onChange={(e) => setInputRefreshToken(e.target.value)} // Input refresh token
      />
      <button onClick={fetchToken}>Generate Token</button>
      {message && <p>{message}</p>}

      {/* Display generated token */}
      {newToken && (
        <div>
          <h3>Generated Token:</h3>
          <pre>{JSON.stringify(newToken, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default MarketData;
