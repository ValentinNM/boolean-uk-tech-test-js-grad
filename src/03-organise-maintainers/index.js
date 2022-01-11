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
  
  // 1.0 Fetch data with axios
// -- url: http://ambush-api.inyourarea.co.uk/ambush/intercept
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

  const result = await res.json();

  const data = result.content;

// 2.0 Declare a maintainers variable with an empty Array

const maintainers = [];

// 3.0 Create a tracker object
const tracker = { 
  username : "",
  pkgs: []
}

// 3.1 Loop through data (list of packages)
// -- Access the name of the package and the array of maintainers
// for (let i = 0; i < data.length; i++) {
//   const packageName = data[i].name;
//   const maintainers = data[i].maintainers;
//   console.log({packageName, maintainers});
  // 3.2 Loop through the array of maintainers
  // -- Check the tracker object in step 3.0
  // -- IF the username EXISTS add the name of the package from step 3.1
  // -- IF the username DOES NOT EXIST store the username with an array and the name of the package from step 3.1

  // Output: {
  //   gaearon: ["react", ...packageNames],
  //   acdlite: ["react", ...packageNames],
  // }

  // for(let j = 0; j < maintainers.length; j++){ 

  //   const username = maintainers[i].username
  //   console.log({username})

    // tracker[username]= { 
    //   username : username,
    //   pkgs: pkg
    // }
    

  // }
// }

console.log({data, result, tracker})

// 4.0 Transform tracker object and sort data
// -- extract usernames from tracker object into an array and sort
// -- loop through the usernames
// -- access the package names from the tracker object with the username and sort
// -- create an object (see below) and push to maintainers array in step 2.0
//
// Output: [
//  {
//    username: "gaearon",
//    packageName: ["react", ...packageNames]
//  },
//  ...
// ]

  // get the maintainers & package names

  // remove maintainers username duplicates

  // search for the packages by maintainers username in the data array
  // and add each package name to the key "packageNames" of the object 

  // sort alphabetically the value of the packageNames key : value(array)


  return maintainers
};