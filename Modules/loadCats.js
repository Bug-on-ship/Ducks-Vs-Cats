import { getRandomInt } from "./getRandomInt.js";

export async function loadCats() {
  let cats = [];
  const res = await fetch("./Kitty_JSON.json");
  const jsonFile = await res.json();

  for (let i = 0; i < 3; i++) {

    const id = jsonFile[`${getRandomInt(1, 101)}`]; // this is how you make a function operable, hten turn result to string.
    cats.push(id);
    preloadImage("https://cataas.com/cat/" + id["Kitty"]);
  }
  return cats;
}

function preloadImage(url) {
  const img = new Image();
  img.src = url;
}




// before changing this from gettig only url then loading with that, to makin this just get a json chunk, then everywhere else parses that json.
// import { getRandomInt } from "./getRandomInt.js";

// export async function loadCats() {
//   let cats = [];
//   const res = await fetch("../Kitty_JSON.json");
//   const jsonFile = await res.json();

//   for (let i = 0; i < 3; i++) {

//     const id = jsonFile[getRandomInt(1, 101)]["Kitty"];
//     const url = "https://cataas.com/cat/" + id;
//     cats.push(url);
//     preloadImage(url);
//   }
//   return cats;
// }

// function preloadImage(url) {
//   const img = new Image();
//   img.src = url;
// }


