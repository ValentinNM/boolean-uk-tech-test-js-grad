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

const { default: axios } = require('axios');

module.exports = async function organiseMaintainers() {
  const res = await axios.post(
    `http://ambush-api.inyourarea.co.uk/ambush/intercept`,
    {
      url: 'https://api.npms.io/v2/search/suggestions?q=react',
      method: 'GET',
      return_payload: true,
    },
  );

  const data = res.data.content;
  // console.log({ data}) // why it comes as package: [Object] in the console
  // console.log(data)

  // 2.0 Declare a maintainers variable with an empty Array
  const maintainersTracker = [];

  // 3.0 Create a tracker object
  const tracker = {};

  // 3.1 Loop through data (list of packages)
  for (let i = 0; i < data.length; i++) {
    // -- Access the name of the package and the array of maintainers
    const packageContent = data[i].package;
    const { name, maintainers } = packageContent;

    // 3.2 Loop through the array of maintainers
    for (let j = 0; j < maintainers.length; j++) {
      const maintainer = maintainers[j];
      const { username } = maintainer;
      // -- Check the tracker object in step 3.0

      if (tracker[username]) {
        // -- IF the username EXISTS add the name of the package from step 3.1
        const exisitingPackages = tracker[username];
        tracker[username] = [...exisitingPackages, name];
      } else {
        // -- IF the username DOES NOT EXIST store the username with an array and the name of the package from step 3.1
        tracker[username] = [name];
      }
    }
  }

  // 4.0 Transform tracker object sort data
  for (const maintainer in tracker) { // push to maintainers array in step 2.0
    maintainersTracker.push({ // -- extract usernames from tracker object into an array
      username: maintainer,
      packageNames: tracker[maintainer],
    });
  }

  // -- loop through the usernames
  const sortedMaintainers = maintainersTracker.sort((a, b) => { // sort the usernames from extraction
    if (a.username < b.username) return -1;  // if swapping return values the sort will reverse from z->a
    // however if just changing the sign to >` instead, will have the same effect
    return 1;
  });

  //  ALTERNATIVE OF THE ABOVE
  // const sortedMaintainers = maintainersTracker.sort((a, b) =>
  //   a.username.localeCompare(b.username),
  // );

  // -- access the package names from the tracker object with the username and sort the packages
  const sortingAll = sortedMaintainers.map(maintainer => ({
    ...maintainer,
    packageNames: maintainer.packageNames.sort() // sorting the packages names asc
  })
  )

  const maintainers = sortingAll // storing value to maintainers

  return maintainers;
};
