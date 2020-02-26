class TourData {
  data = {
    destinations: [
      {
        id: 8375,
        name: "Bordeaux",
        country: "France",
        category: "wine"
      },
      {
        id: 34083,
        name: "Courchevel",
        country: "France",
        category: "ski"
      },
      {
        id: 110961,
        name: "Galapagos Islands",
        country: "Ecuador",
        category: "wonder"
      },
      {
        id: 25999,
        name: "Giza",
        country: "Egypt",
        category: "wonder"
      },
      {
        id: 45618,
        name: "Machu Picchu",
        country: "Peru",
        category: "wonder"
      },
      {
        id: 36284,
        name: "Sonoma",
        country: "United States",
        category: "wine"
      },
      {
        id: 79382,
        name: "Tuscany",
        country: "Italy",
        category: "wine"
      },
      {
        id: 40386,
        name: "Whistler",
        country: "Canada",
        category: "ski"
      },
      {
        id: 40374,
        name: "Zermatt",
        country: "Switzerland",
        category: "ski"
      }
    ],
    seasonCategories: {
      spring: ["wine", "wonder"],
      summer: ["wine", "wonder"],
      autumn: ["wine", "wonder"],
      winter: ["wonder", "ski"]
    }
  };

  getDestination = () => {
    let tourData = JSON.parse(JSON.stringify(this.data));
    return tourData.destinations;
  };

  getSeason = () => {
    let tourData = JSON.parse(JSON.stringify(this.data));
    return tourData.seasonCategories;
  };
}

// Helper methods to maniuplate seasons, categories, destinations//

const createSeason = (name, id) => {
  return {
    name: name,
    id: id
  };
};

const createCategory = (name, id, season) => {
  return {
    name: name,
    id: id,
    season: season
  };
};

const createDestination = (name, id, category) => {
  return {
    name: name,
    id: id,
    category: category
  };
};

const removeOptions = select => {
  while (select.options.length > 1) {
    select.remove(1);
  }

  select.value = "";
};

const addOptions = (select, options) => {
  options.forEach(option => {
    select.options.add(new Option(option.name, option.id));
  });
};

const updateCategories = () => {
  let selectedSeason = seasonsSelect.value;
  let options = categoriesArray.filter(category => {
    return category.season === selectedSeason;
  });

  removeOptions(categorySelect);
  removeOptions(destinationSelect);
  addOptions(categorySelect, options);
};

const updateDestinations = () => {
  document.getElementById("category-select");
  let selectedCategory = categorySelect.value;
  let options = allDestinations.filter(destination => {
    return destination.category === selectedCategory;
  });

  removeOptions(destinationSelect);
  addOptions(destinationSelect, options);
};

const mapArray = element => {
  let tempArray = [];
  for (let [key, value] of Object.entries(element)) {
    for (let i = 0; i < value.length; i++) {
      tempArray.push([value[i], key]);
    }
  }
  return tempArray;
};

const categoryName = arr => {
  tempArr = [];
  arr.forEach(el =>
    tempArr.push(el[0].charAt(0).toUpperCase() + el[0].slice(1))
  );
  return tempArr;
};

const extractCategories = (arr, arr1) => {
  let categories = [];
  for (let i = 0; i < arr.length; i++) {
    let j = 0;
    categories.push(createCategory(arr[i], arr1[i][j], arr1[i][j + 1]));

    j--;
  }
  return categories;
};

const destinationsArray = arr => {
  let destinations = [];
  for (let i = 0; i < arr.length; i++) {
    destinations.push(
      createDestination(arr[i].name, arr[i].id, arr[i].category)
    );
  }
  return destinations;
};

const getName = placeholderId => {
  dName = instanceVariable.getDestination();
  let id = dName.filter(el => el.id === placeholderId);
  return `${id[0].name.trim().toLowerCase()}-${id[0].id}`;
};

const getDetails = placeholderId => {
  details = instanceVariable.getDestination();
  let id = dName.filter(el => el.id === placeholderId);
  return `${id[0].name}, ${id[0].country} `;
};

const renderImg = () => {
  let selected = document.getElementById("destination-select").value;
  let dNamewithId = getName(parseInt(selected));
  let details = getDetails(parseInt(selected));
  console.log(details);
  if (dNamewithId.length > 9) {
    dNamewithId = dNamewithId.split(" ").join("-");
  }

  let textName = document.querySelector("#text-span");
  let select = document.querySelector("#img-span");
  let path = `../solution/assets/${dNamewithId}.jpg`;
  select.innerHTML = `<img src='${path}' id="img"/>`;
  textName.innerHTML = `<h1>${details} </h1>`;
};

let seasonsSelect = document.getElementById("seasons-select");
let categorySelect = document.getElementById("category-select");
let destinationSelect = document.getElementById("destination-select");

const instanceVariable = new TourData();
const destination = instanceVariable.getDestination();
console.log(destination);
instanceVariable.getSeason();
const seasonName = instanceVariable.getSeason();

const seasons = [
  createSeason("Spring", "spring"),
  createSeason("Summer", "summer"),
  createSeason("Autumn", "autumn"),
  createSeason("Winter", "winter")
];

addOptions(seasonsSelect, seasons);

const arrayName = mapArray(seasonName);
const allCategoryNames = categoryName(arrayName);
const categoriesArray = extractCategories(allCategoryNames, arrayName);
const allDestinations = destinationsArray(destination);
