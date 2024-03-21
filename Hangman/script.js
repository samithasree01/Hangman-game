const hangmanimage = document.querySelector(".hangma-box img");
const wordDisplay=document.querySelector(".word-display");
const keyboarddiv=document.querySelector(".keyboard");
const guesstext=document.querySelector(".guesses-text");
const gameModal=document.querySelector(".game-model");
const playAgain=document.querySelector(".play-again");

let currentword,wrongguess=0,correctletters=[];
const maxguess=6;

const resetgame = ()=>{
    wrongguess=0;
    correctletters=[];
    hangmanimage.src=`images/hangman-${wrongguess}.svg`; 
    guesstext.innerText = `${wrongguess} / ${maxguess}`;
    keyboarddiv.querySelectorAll("button").forEach(btn => btn.disabled=false);
    wordDisplay.innerHTML=currentword.split("").map(()=>'<li class="letter"></li>').join("");
    gameModal.classList.remove("show");
}
const getRandomWord = () => {
    // Selecting a random word and hint from the wordList
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    console.log(word);
    currentword=word;
    document.querySelector(".hint-text b").innerText = hint;
    resetgame();
    wordDisplay.innerHTML=word.split("").map(()=>'<li class="letter"></li>').join("");
}

const gameOver = (isVictory)=>{
    setTimeout(()=>{
    const modalText=isVictory ? `You found the word:` : `The correct word was:` ;
    gameModal.querySelector("img").src = `images/${isVictory? 'victory' : 'lost'}.gif`;
    gameModal.querySelector("h4").innerText = `${isVictory? 'Congrats!' : 'Game Over!'}`;
    gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentword}</b>`;
    gameModal.classList.add("show");
    },300);
}
const initgame=(button,clickedLetter)=>{
    if(currentword.includes(clickedLetter))
    {
    [...currentword].forEach((letters,index) => {
     if(letters===clickedLetter){
     correctletters.push(letters);
     wordDisplay.querySelectorAll("li")[index].innerText=letters;
     wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
     }
    });
    }
    else{
        wrongguess++;
        hangmanimage.src=`images/hangman-${wrongguess}.svg`;
    }
    button.disabled=true;
    guesstext.innerText = `${wrongguess} / ${maxguess}`;


    if(wrongguess===maxguess) return gameOver(false);
    if(correctletters.length===currentword.length) return gameOver(true);
}
for(let i=97;i<=122;i++)
{
    const button=document.createElement("button");
    button.innerText=String.fromCharCode(i);
    keyboarddiv.appendChild(button);
    button.addEventListener("click" , e=>initgame(e.target,String.fromCharCode(i)));
}
getRandomWord();
playAgain.addEventListener("click",getRandomWord);