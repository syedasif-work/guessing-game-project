const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const randomInRange = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}


let secretNumber;
let numAttempts;

const checkGuess = (number) => {
    if (number > secretNumber) {
        console.log("Too high.")
        return false;
    } else if (number < secretNumber) {
        console.log("Too low.");
        return false;
    } else {
        console.log("Correct");
        return true;
    }
}


const askGuess = () => {
    if (numAttempts === 0) {
        console.log("You Lose.")
        rl.close();
        return;
    }
    numAttempts -= 1;
    rl.question("Enter a guess: ", answer => {
        if (checkGuess(Number(answer))){
            console.log("You win!")
            rl.close();
        } else {
            askGuess();
        }
    })
}

const askRange = () => {
    rl.question("Enter a max number: ", max => {
        rl.question("Enter a min number: ", min => {
            console.log(`I'm thinking of a number between ${min} and ${max}...`);
            max = Number(max);
            min = Number(min);
            secretNumber = randomInRange(min, max);
            askGuess();
        })
    })
}

const askLimit = () => {
    rl.question("Enter a Limit: ", limit => {
        numAttempts = Number(limit);
        askRange();
    })
}

askLimit();