/**
 * Make the following POST request with either axios or node-fetch:

POST url: http://ambush-api.inyourarea.co.uk/ambush/intercept
BODY: {
    "url": "https://api.npms.io/v2/search/suggestions?q=react",
    "method": "GET",
    "return_payload": true
}

 *******

The results should have this structure:
{
    "status": 200.0,
    "location": [
      ...
    ],
    "from": "CACHE",
    "content": [
      ...
    ]
}

 ******

 *  With the results from this request, inside "content", count
 *  the number of packages that have a MAJOR semver version 
 *  greater than 10.x.x
 */
const fetch = require('node-fetch');

let data = [];

fetch(`http://ambush-api.inyourarea.co.uk/ambush/intercept`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    url: "https://api.npms.io/v2/search/suggestions?q=react",
    method: "GET",
    return_payload: true
  })
})
  .then(res => res.json())
  .then(res => {
    data = res.content;
    console.log(data);
  });
  

module.exports = async function countMajorVersionsAbove10(data) {

  let count = 0;

  for (let i = 0; i < data.length; i++) {
    if (data[i].version.split('.')[0] > 10) {
      count++;
    }
  }
  
  return count
};
