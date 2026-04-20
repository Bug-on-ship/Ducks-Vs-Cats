
import { loadCats } from "./Modules/loadCats.js"; 
import { loadDucks } from "./Modules/loadDucks.js";
import { cardD, cardK, duckyCardAttack, kittyCardAttack, duckyCardFaint, kittyCardFaint } from "./Modules/cardATK_FNTanimation.js";
import { getRandomInt } from "./Modules/getRandomInt.js";

//let ducks = []; // eventually just has jsons of 3 ducks/cats once loadcats/ducks runs but not globally, only locally in the asynch onclicks which is fine.
//let cats = [];  // This needs to be here because the modules are independent, therefore create their own version of "cats" var to update



let clickK = 0; //   // then they return it from their function and then we must create a global cats which we then call loadCats, using
let clickD = 0;   // 'then', and then we use the eventual result of loadCats to make OUR main sheet  
let battleState = {
  kitties: null,
  duckies: null,
  score: 0,
  round: 0
};
let kittyWin = null
let playerChoseKitty = null
const cats = await loadCats();
const ducks = await loadDucks();

const selectKittyCard = document.getElementById("cardKittyID");
const selectDuckyCard = document.getElementById("cardDuckyID");


const startScreen = document.getElementById("startScreen");     // Adds hidden CSS to #grey screen in html+CSS on click 

startScreen.addEventListener("click", () => { 
  startScreen.classList.add("slideUpStartScreen"); // Start screen STARTS down. This anim line slides it up, then later down the line, we remove the remove anim in "setupnextround FN" (even tho it's not there yet because next time when it loops, it will be there), and then we add the remove an
  
  selectKittyCard.classList.remove("greyscale");
  selectDuckyCard.classList.remove("greyscale");

  selectKittyCard.classList.remove("glow");
  selectDuckyCard.classList.remove("glow");
});

function gameOver() {
  const endScreen = document.getElementById("endScreen");
  const endMessage = document.getElementById("endMessage");
  const endMessageTitle = document.getElementById("endMessageTitle");

  if (battleState.score > 2) {
    endMessageTitle.textContent = "3/3"
    endMessage.textContent = "Duck yea! You're a cat dang genius!"
    } else if (battleState.score > 1) {
    endMessageTitle.textContent = "2/3"
    endMessage.textContent = "Well done! You've done this before..."
    } else if (battleState.score > 0) {
    endMessageTitle.textContent = "1/3"
    endMessage.textContent = "An attempt was made!" 
    } else {
    endMessageTitle.textContent = "0/3"
    endMessage.textContent = "Sometimes math is hard..."
    }

  endScreen.classList.add("slideUpEndScreen"); //
}
 
async function initFighters() {
  battleState.round++; // Rounds are every fight between a pair of cat vs duck 
  console.log("initfi ghters called")
  // if (battleState.round > 3){
  //   return gameOver();
  // }
  console.log(battleState.round + ": Round after turn" )

  battleState.kitties = { ...cats[clickK] }; // if you just did cats[0] batstate.kitty and cats point to the same object and changing battlestates would change cats[0] which it just pre-errors before we do that. ...cats[0] spreads it
  battleState.duckies = { ...ducks[clickD] };



//////////////////////////////// 
  let kittyDamage = await battleState.kitties.ATK - battleState.duckies.DEF; // K dam to D
  let duckDamage  = await battleState.duckies.ATK - battleState.kitties.DEF; // D dam to K

  let duckTurns = await Math.ceil(battleState.duckies.HP / kittyDamage); // Time to kill ducky (math.ceil round 1.4 to 2 because it will need 2 to kill)
  let kittyTurns = await Math.ceil(battleState.kitties.HP / duckDamage); // Time to kill kitty. 

  kittyWin = duckTurns < kittyTurns;// True if duck loses, false if duck wins. (not fool proof cuz 3 hitting 2 health and 5 hitting 2 health will say 5 wins.)
  if (duckTurns < kittyTurns) { kittyWin = true; } else if (duckTurns > kittyTurns) { kittyWin = false; } else { kittyWin = startingSide === 1;} // whoever goes first wins }
  console.log(kittyWin + " that kitties won.")
//////////////////////////////// ^^ Purely just a helper tool.
  SwitchFighter();

}

function SwitchFighter() {
  console.log("Switch Fighter Ran" + cats[clickK]["Kitty"] + " and this is the kitty from it")
  console.log("Switch Fighter Ran" + cats[clickD]["Ducky"] + " and this is the ducky from it")
  document.getElementById("catimg").src = "https://cataas.com/cat/" + cats[clickK]["Kitty"]
  document.getElementById("KNAME").textContent = cats[clickK]["Name"]; // since this function is called by init, then which calls loadcats and stores "cats", cats array is now available
  document.getElementById("KHP").textContent = cats[clickK]["HP"];
  document.getElementById("KATK").textContent = cats[clickK]["ATK"];
  document.getElementById("KDEF").textContent = cats[clickK]["DEF"];

  document.getElementById("duckimg").src = "https://random-d.uk/api/v2/" + ducks[clickD]["Ducky"] + ".jpg";
  document.getElementById("DNAME").textContent = ducks[clickD]["Name"]; // since this function is called by init, then which calls loadcats and stores "cats", cats array is now available
  document.getElementById("DHP").textContent = ducks[clickD]["HP"];
  document.getElementById("DATK").textContent = ducks[clickD]["ATK"];
  document.getElementById("DDEF").textContent = ducks[clickD]["DEF"]; // initial cat returned.

  clickK++
  clickD++

}
//////////////////////////////////////////////////////////////////////////

function startBattle() {
  console.log("start Battle happened and battlestate check here?")

  runTurn();

} // start battle calls run turn immediately, runturns calss end battle after 1 sec when battle is over (1< health), endb attle calls initf ighters after 2.1 secs, ini tfighter adds a clic,kl istener to the cards after 3seconds after beng called back to start batl again waiting to be click. 
function runTurn() {
  setTimeout(() => {
    selectDuckyCard.classList.remove("slide-animateD")
    selectKittyCard.classList.remove("slide-animateK")
    cardK.classList.remove("slide-animateK");
    cardD.classList.remove("slide-animateD");
    cardK.classList.remove("faint-animate");
    cardD.classList.remove("faint-animate");
    // 1. decide attacker
    console.log(startingSide + " /// starting before eithers ATK")
    if (startingSide === 1) {
      kittyCardAttack();    // onclick document.get element
      console.log(battleState.kitties.HP + "  ///Kitty battle state when attacking.")

    } else {
      duckyCardAttack();  
      console.log(battleState.duckies.HP + "  /// Ducky battle state when attacking.")

    }

    // 2. update DOM from battleState
    updateUI(); // lowers battle state and uses that to update UI (messy to update UI directly, + we need battlestates update for recursive function for the next if statement condition to lower.)

    // 3. check win condition
    if (battleState.kitties.HP <= 0 || battleState.duckies.HP <= 0) {

      return endBattle();
    }
// everything in here is harmless to run twice and to delay. Except updateUI and endB attle, nothing else would start multiple instances of runturn for no reason.
    // 5. loop again
    runTurn();

  }, 1000);  
}


initFighters(); // 1 Starts

/////////Distraction Button
// let flashDistraction = document.getElementById("distract_mode");
// let distraction_button = document.getElementById("distract_button")
// distraction_button.addEventListener("click", () => {
//   flashDistraction.classList.toggle("distract_mode_active");});
////////Distraction Button


/////////////////////////////////////////////////////////// Picks the Duckies or Kitties to start (returns 0 (ducky), or 1 (kitty)) function(() => coin toss()) vs function(coin toss())?
// Duckies = 0 
// Kitties = 1
function cointoss() {
  let index = getRandomInt(0,2);
  const COIN = ["Duckies", "Kitties"]
  let tossRes = COIN[index]
  document.getElementById("CoinFlip").textContent = tossRes;
  document.getElementById("CoinFlip2").textContent = tossRes;
  return index;
}
let startingSide = cointoss() 
////////////////////////////////////////////////////////// Clicking a card shrinks it to 90%, gives it a glow and makes other card unclickable which will be removed by the end of the round.


selectKittyCard.addEventListener("click", () => {
  selectDuckyCard.classList.add("unclickable")
  selectKittyCard.classList.add("unclickable")       // at the end of the next round, remove this from both 
  selectKittyCard.classList.add("shrink");
  setTimeout(() => {
    selectKittyCard.classList.remove("shrink");
    selectKittyCard.classList.add("glow");
  }, 100);
  playerChoseKitty = true;
  setTimeout(startBattle, 3000);
  console.log("player chose kitty is: " + playerChoseKitty)
});


selectDuckyCard.addEventListener("click", () => {
  selectKittyCard.classList.add("unclickable") 
  selectDuckyCard.classList.add("unclickable")      // at the end of the next round, remove this from both 
  selectDuckyCard.classList.add("shrink");
  setTimeout(() => {
    selectDuckyCard.classList.remove("shrink");
    selectDuckyCard.classList.add("glow");
  }, 100);
  playerChoseKitty = false;
  setTimeout(startBattle, 3000);
  console.log("player chose kitty is: " + playerChoseKitty)
});
///////////////////////////////////////////////////////// Battle Sequence Begins
const Dcells = document.querySelectorAll("#DTable td:nth-child(1)"); // get the table cells we want to highlight upon damage hit.
const Kcells = document.querySelectorAll("#KTable td:nth-child(1)");

function updateUI() {
//  console.trace("update UI main happens here")
  if (startingSide === 1) { // Kitty hits, ducky hurts
//  console.trace("update UI Kitty ATK turn happens here")
  startingSide = 0;
  battleState.duckies.HP -= (battleState.kitties.ATK - battleState.duckies.DEF);
  setTimeout(() => {document.getElementById("DHP").textContent = battleState.duckies.HP}, 150);

Dcells.forEach(cell => {
  setTimeout(() => {
    cell.classList.add("flash");
  }, 100);

  setTimeout(() => {
    cell.classList.remove("flash");
  }, 300);
}); } else {                  // Ducky hits, kitty hurts
//    console.trace("update UI Ducky ATK turn happens here")
  startingSide = 1;
  battleState.kitties.HP -= (battleState.duckies.ATK - battleState.kitties.DEF);
  setTimeout(() => {document.getElementById("KHP").textContent = battleState.kitties.HP}, 150);

Kcells.forEach(cell => {
  setTimeout(() => {
    cell.classList.add("flash");
  }, 100);

  setTimeout(() => {
    cell.classList.remove("flash");
  }, 300);
});
};
}


function endBattle() {
  if (playerChoseKitty === kittyWin) { battleState.score++ }


//    console.trace(" End battle main func ran here")
  if (battleState.kitties.HP < 1) {
//      console.trace(" End battle sub func kitty died ran here")
    setTimeout(() => { 
      selectKittyCard.classList.add("greyscale");
      kittyCardFaint()}, 200); 
                                               // card attack is 300, so away swing (at ~100ms) swing into opponent (at ~200ms) () 
      if (battleState.round > 2) {
        return setTimeout(() =>{gameOver()}, 2100);
      } else {
        setupNewRound();                                         // setup round slides down start and 
        setTimeout(() =>{initFighters()}, 2100);
      }

} else {
//   console.trace(" End battle sub func ducky died ran here")
      setTimeout(() => {selectDuckyCard.classList.add("greyscale");
      duckyCardFaint()}, 200);

      if (battleState.round > 2) {
        return setTimeout(() =>{gameOver()}, 2100);
      } else {
        setupNewRound();                                         // setup round slides down start and 
        setTimeout(() =>{initFighters()}, 2100);
      }
//     if (!player ChoseKitty) { 
  }
}



function setupNewRound() {
  startScreen.classList.remove("slideDownStartScreen"); //remove old slidedown (that is added in global) to add new slide down immediately after, but both after 1.9 secs.
  console.log(startScreen.classList)
  setTimeout(() => {startScreen.classList.add("slideDownStartScreen"),
  startingSide = cointoss()
  }, 1900); // 

 // removing let allows this to reassign globally. const and let are for local var assignment.  
  console.log(startScreen.classList)
  startScreen.addEventListener("click", () => { // I believe unnecessary if line 237 exists
  startScreen.classList.remove("slideDownStartScreen");});
 // while turn is running, you could start the battle immediately if you clicked again and break everything... add these removes after the screen slides down...
  setTimeout(() => {selectDuckyCard.classList.remove("unclickable"), 
    selectKittyCard.classList.remove("unclickable")}, 2320) // must be +400 to slide down since animation in CSS takes 400ms.
}


// Event listeners only need adding once otherwise they stack and will run multiple things at once while also 
// not allowing things to be removed if they are applied many times or covering up other applications.



