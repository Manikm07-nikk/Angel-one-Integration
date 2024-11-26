const express = require('express');
const getmac = require('getmac');
const cors = require('cors');
const axios = require('axios'); // To fetch public IP
const os = require('os'); // To fetch local IP

const app = express();
app.use(cors());

// Route to get MAC address
app.get('/get-mac', (req, res) => {
  try {
    const macAddress = getmac.default();
    res.json({ mac: macAddress });
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve MAC address' });
  }
});

// Route to get Public IP address
app.get('/get-public-ip', async (req, res) => {
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    res.json({ publicIP: response.data.ip });
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve Public IP address' });
  }
});

// Route to get Local IP address
app.get('/get-local-ip', (req, res) => {
  try {
    const interfaces = os.networkInterfaces();
    let localIP = 'Not Found';

    for (const iface of Object.values(interfaces)) {
      for (const details of iface) {
        if (details.family === 'IPv4' && !details.internal) {
          localIP = details.address;
          break;
        }
      }
    }

    res.json({ localIP });
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve Local IP address' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
