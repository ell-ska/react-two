import chalk from 'chalk'
import {exec} from 'child_process'
import fs from 'fs'
import util from 'util'
import { Command } from 'commander'

// print name with chalk colors
const name = 'ellska'
console.log(chalk.blue.bold(name))

// print git version
const asyncExec = util.promisify(exec);
const {stdout: gitVersion} = await asyncExec('git --version');
console.log('git version: ' + gitVersion)


// print npm and node version
    // this only works with 'npm run start' and not 'node index.js' because you need to use npm to see the version of it
console.log('npm & node version: ' + process.env.npm_config_user_agent)
const npmVersion = process.env.npm_config_user_agent

// create a new file with the data above
    // why is there an extra line between git and npm???
const content = `name: ${name}
git version: ${gitVersion}
npm & node version: ${npmVersion}`

await fs.promises.writeFile("index.md", content);

// // ADD DATE PACKAGE FOR THE ASSIGNMENT

// argument parser
// const program = new Command()
// program
//   .option('--date')

// program.parse();

// const options = program.opts();
// console.log(options)
// console.log(program.args)
// // const limit = options.first ? 1 : undefined;
// // console.log(program.args[0].split(options.separator, limit));



// Recreate the code/steps of the presentation (Node and npm).
//      Create an, index.js file that prints your name in the terminal.
//      Init npm. Explain package.json, lock files and npm run.
//      Install chalk (https://www.npmjs.com/package/chalk). Add some fancy coloring.
//      Create a function that can print out your version of Git, npm och Node.
//      Create a function that creates a index.md file with the above print outs.
//      Add an argument parser.
//      Do something with the argument parser.
// Add a date library of your choice from npm
//      Examples at https://2022.stateofjs.com/en-US/other-tools/#date_management
//      Note that Moment.js is deprecated. Still good and often used, but the newer libraries are often a better choice.
//      or use the temporal api polyfill, see video below
// Add a function that writes current date and time to your file when you run your script.
// Add a function that writes how long it was since you started this course.
// Allow for sending in a date as an argument
//      Write the argument-date to your file
//      Add a function that figures out if date sent in as a argument is before or after the date when you run the file.
// Make sure all the dates and times has a nice formatting that "everyone" can understand.
// Add a function that also creates a plain, runnable html-file (index.html) in addition to the index.md file. Include relevant markup and styling.
// Create a public GitHub repo (if you haven't already, or a private repo but by also inviting me as a contributor) and "upload" your code. For your own convenience, make sure to setup you GitHub account with an ssh-key if you haven't already done so.
// BONUS: Add a unit test for some part of the assignment (in addition to the example I showed during class).