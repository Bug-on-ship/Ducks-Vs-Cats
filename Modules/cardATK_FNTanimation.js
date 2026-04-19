
export const cardK = document.querySelector(".cardKitty");
export const cardD = document.querySelector(".cardDucky");

////////// KITTY ATTACK 
export function kittyCardAttack() {
  cardK.classList.add("slide-animateK");

  // remove it so it can be triggered again later
  setTimeout(() => {
    cardK.classList.remove("slide-animateK");
  }, 300);
}


////////// DUCKY ATTACK 
export function duckyCardAttack() {
  cardD.classList.add("slide-animateD");

  // remove it so it can be triggered again later
  setTimeout(() => {
    cardD.classList.remove("slide-animateD");
  }, 300);
}
//////////////////////////////////////////////////////////////// fainted and went grey under 0 but sttacked until cat diedand then round ended

/////////// FAINT DUCKY
export function duckyCardFaint() {
  cardD.classList.add("faint-animate");

  // remove it so it can be triggered again later
  setTimeout(() => {
    cardD.classList.remove("faint-animate");
  }, 400);
}

/////////// FAINT KITTY
export function kittyCardFaint() {
  cardK.classList.add("faint-animate");

  // remove it so it can be triggered again later
  setTimeout(() => {
    cardK.classList.remove("faint-animate");
  }, 400);

}

