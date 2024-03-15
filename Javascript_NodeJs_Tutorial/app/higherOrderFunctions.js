const numbers = [2,4,1,5,4];

function isBiggerThanTwo (num) {
    return num > 2;
}

const nBiggerTwo = numbers.filter(isBiggerThanTwo);
console.log(`Numbers bigger than 2: ${nBiggerTwo}\n`);

