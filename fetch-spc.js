const https = require('https');
const fs = require('fs');

const url = 'https://www.spc.noaa.gov/products/outlook/day1otlk.json';

https.get(url, (res) => {
  let data = '';

  res.on('data', chunk => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const outlook = JSON.parse(data);
      fs.writeFileSync('spc-day1-outlook.json', JSON.stringify(outlook, null, 2));
      console.log('SPC Day 1 outlook saved successfully!');
    } catch (e) {
      console.error('Error parsing JSON', e);
    }
  });
}).on('error', (err) => {
  console.error('Error fetching SPC data:', err);
});
