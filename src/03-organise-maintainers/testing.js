const { default: axios } = require("axios");

function generateMaintainersTracker(packagesData) {
  const maintainersTracker = {};

  for (let i = 0; i < packagesData.length; i++) {
    const packageData = packagesData[i].package;

    const { name, maintainers } = packageData;

    console.log(maintainers);

    for (let j = 0; j < maintainers.length; j++) {
      const maintainer = maintainers[j];

      const { username } = maintainer;

      console.log('iteration j: ', j, maintainersTracker[username]);

      if (maintainersTracker[username]) {
        const existingPackages = maintainersTracker[username];

        maintainersTracker[username] = [...existingPackages, name];
      } else {
        maintainersTracker[username] = [name];
      }
    }
  }

  return maintainersTracker;
}

module.exports = async function organiseMaintainers() {
  const res = await axios.post(
    'http://ambush-api.inyourarea.co.uk/ambush/intercept',
    {
      url: 'https://api.npms.io/v2/search/suggestions?q=react',
      method: 'GET',
      return_payload: true,
    },
  );

  const packagesData = res.data.content;

  const maintainersTracker = generateMaintainersTracker(packagesData);

  console.log(Object.keys(maintainersTracker).sort());

  // VERSION ONE START

  const maintainersTemp = [];

  for (const maintainer in maintainersTracker) {
    maintainersTemp.push({
      username: maintainer,
      packageNames: maintainersTracker[maintainer],
    });
  }

  const sortedMaintainers = maintainersTemp.sort((a, b) => {
    if (a.username < b.username) return -1;

    return 1;
  });

  // const sortedMaintainers = maintainersTemp.sort((a, b) =>
  //   a.username.localeCompare(b.username),
  // );

  const sortedMaintainersAndSortedPackageNames = sortedMaintainers.map(
    maintainer => ({
      ...maintainer,
      packageNames: maintainer.packageNames.sort(),
    }),
  );

  console.log(sortedMaintainersAndSortedPackageNames);

  const maintainers = sortedMaintainersAndSortedPackageNames;

  // VERSION ONE END

  // VERSION TWO START

  // const sortedMaintainers = Object.keys(maintainersTracker).sort();

  // const maintainers = sortedMaintainers.map(maintainer => {
  //   const packageNames = maintainersTracker[maintainer].sort();

  //   return {
  //     username: maintainer,
  //     packageNames,
  //   };
  // });

  // VERSION TWO END

  return maintainers;
};