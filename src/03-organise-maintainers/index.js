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

 * With the results from this request, inside "content", 
 * list every maintainer and each package name that they maintain,
 * return an array with the following shape:
[
    ...
    {
        username: "a-username",
        packageNames: ["a-package-name", "another-package"]
    }
    ...
]
 * NOTE: the parent array and each "packageNames" array should 
 * be in alphabetical order.
 */
const fetch = require('node-fetch');

module.exports = async function organiseMaintainers() {

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

  const iNeedData = data.content;

  // get the maintainers & package names
  for (let i = 0; i < iNeedData.length; i++) {
    const maintainer = iNeedData[i].package.maintainers;
    const pkg = iNeedData[i].package.name;
    console.log({maintainer, pkg });
    const username = maintainer.username;
    const packages = maintainer.packageNames;
  }

  // remove maintainers username duplicates

  // search for the packages by maintainers username in the iNeedData array
  // and add each package name to the key "packageNames" of the object 

  // sort alphabetically the value of the packageNames key : value(array)


  return maintainers
};
