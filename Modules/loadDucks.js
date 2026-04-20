import { getRandomInt } from "./getRandomInt.js";

export async function loadDucks() {
  let ducks = [];
  const res = await fetch("./Ducky_JSON.json");
  const jsonFile = await res.json();

  for (let i = 0; i < 3; i++) {

    const id = jsonFile[`${getRandomInt(1, 101)}`]; // my json is a string, this gives a int, so we need to do let function run then turn to str
    ducks.push(id);
    preloadImage("https://random-d.uk/api/v2/" + id["Ducky"] + ".jpg");
  }
  return ducks;
}

function preloadImage(url) {
  const img = new Image();
  img.src = url;
}



// export async function loadDucks() {
//   let ducks = [];
//   const res = await fetch("../Ducky_JSON.json");
//   const jsonFile = await res.json();

//   for (let i = 0; i < 3; i++) {

//     const id = jsonFile[getRandomInt(1, 101)]["Ducky"];
//     const url = "https://random-d.uk/api/v2/" + id + ".jpg";
//     ducks.push(url);
//     preloadImage(url);
//   }
//   return ducks;
// }

// function preloadImage(url) {
//   const img = new Image();
//   img.src = url;
// }
