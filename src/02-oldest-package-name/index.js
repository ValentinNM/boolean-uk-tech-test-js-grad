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

 *  With the results from this request, inside "content", return
 *  the "name" of the package that has the oldest "date" value
 */

const fetch = require('node-fetch');

module.exports = async function oldestPackageName() {
  const res = await fetch(
    `http://ambush-api.inyourarea.co.uk/ambush/intercept`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: 'https://api.npms.io/v2/search/suggestions?q=react',
        method: 'GET',
        return_payload: true,
      }),
    },
  );

  const data = await res.json();

  const smth = data.content;

  const result = smth.reduce((a, b) =>
    b.package.date < a.package.date ? b : a,
  );

  const name = result.package.name;

  return name;
};
