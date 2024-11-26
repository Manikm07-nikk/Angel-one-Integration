import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Login = ({ setToken, setRefreshToken }) => {
  const [clientCode, setClientCode] = useState('');
  const [password, setPassword] = useState('');
  const [totp, setTotp] = useState('');
  const [message, setMessage] = useState('');
  const [macAddress, setMacAddress] = useState('');
  const [localIP, setLocalIP] = useState('');
  const [publicIP, setPublicIP] = useState('');

  useEffect(() => {
    // Fetch MAC address
    axios.get('http://localhost:5000/get-mac')
      .then(response => setMacAddress(response.data.mac))
      .catch(error => console.error('Error fetching MAC address:', error));

    // Fetch Local IP address
    axios.get('http://localhost:5000/get-local-ip')
      .then(response => setLocalIP(response.data.localIP))
      .catch(error => console.error('Error fetching Local IP:', error));

    // Fetch Public IP address
    axios.get('http://localhost:5000/get-public-ip')
      .then(response => setPublicIP(response.data.publicIP))
      .catch(error => console.error('Error fetching Public IP:', error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'https://apiconnect.angelone.in/rest/auth/angelbroking/user/v1/loginByPassword',
        {
          clientcode: clientCode,
          password: password,
          totp: totp,
        },
        {
          headers: {
            'X-SourceID': 'WEB',
            'X-UserType': 'USER',
            'X-ClientLocalIP': localIP,
            'X-ClientPublicIP': publicIP,
            'X-MACAddress': macAddress,
            'X-PrivateKey': 'lgqynC0b',
            'Content-Type': 'application/json',
          },
        }
      );

      console.log(response.data);
      
      if (response.data?.data?.jwtToken && response.data?.data?.refreshToken) {
        setToken(response.data.data.jwtToken);
        setRefreshToken(response.data.data.refreshToken);
        setMessage('Login successful!');
      } else {
        setMessage('Login failed. Invalid response data.');
      }
    } catch (error) {
      setMessage('Login failed. Please check your credentials or TOTP.');
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h2>Angel One Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Client Code"
          value={clientCode}
          onChange={(e) => setClientCode(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="TOTP"
          value={totp}
          onChange={(e) => setTotp(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Login;
