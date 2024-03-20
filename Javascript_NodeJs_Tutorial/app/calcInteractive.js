const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });

rl.question('Enter the numbers to add, separated by spaces: ', input => {
    const numbers = input.split(' ').map(num => parseInt(num))
    console.log(`The result is: ${numbers.reduce((acc, curr) => acc + curr, 0)}`)
    rl.close()
});