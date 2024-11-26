
// const os = require('os');

// // Get all network interfaces
// const networkInterfaces = os.networkInterfaces();

// Object.keys(networkInterfaces).forEach((interfaceName) => {
//   networkInterfaces[interfaceName].forEach((interface) => {
//     if (!interface.internal) { // Skip internal (e.g., loopback) interfaces
//       console.log(`Interface: ${interfaceName}`);
//       console.log(`  MAC Address: ${interface.mac}`);
      
//       if (interface.family === 'IPv4') {
//         console.log(`  IPv4 Address: ${interface.address}`);
//       } else if (interface.family === 'IPv6') {
//         console.log(`  IPv6 Address: ${interface.address}`);
//       }

//       console.log('----------------------');
//     }
//   });
// });

const https = require('https');

https.get('https://api64.ipify.org?format=json', (resp) => {
  let data = '';
  resp.on('data', (chunk) => data += chunk);
  resp.on('end', () => console.log(`Public IP: ${JSON.parse(data).ip}`));
});
