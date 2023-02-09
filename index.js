import chalk from 'chalk'
import {exec} from 'child_process'
import fs from 'fs'
import util from 'util'
import { format, formatDistanceToNow, parse, isToday, isBefore, isAfter } from 'date-fns'
import { Command } from 'commander'

// name
const name = 'ellska'

// git version
const asyncExec = util.promisify(exec)
const {stdout: gitVersion} = await asyncExec('git --version')

// npm and node version
  // this only works with 'npm run start' and not 'node index.js' because you need to use npm to see the version of it
const npmVersion = process.env.npm_config_user_agent

// current date
const currentDate = format(new Date(), 'yyyy-MM-dd kk:mm')

// days from course start to now
const startOfCourse = new Date(2023, 0, 31)
const daysFromCourseStart = formatDistanceToNow(startOfCourse)

// send a date as an argument parser
const program = new Command()
program.option('--date')
program.parse();

const dateComparison = (dateToCompare) => {

  if (isToday(dateToCompare)) {
    return 'today'
  } else if (isBefore(dateToCompare, new Date())) {
    return 'before today'
  } else if (isAfter(dateToCompare, new Date())) {
    return 'after today'
  }
  
}

const dateArgument = parse(program.args[0], 'yyyy-MM-dd', new Date())
let dateComparisonResult, mdContent, htmlContent

// decide content based on if an argument was passed in or not
if (program.args[0] === undefined || dateArgument == 'Invalid Date' ) {

  mdContent = `name: ${name}
git version: ${gitVersion.trim()}
npm & node version: ${npmVersion}

last run: ${currentDate}
days from course start to now: ${daysFromCourseStart}
you didn't pick a date. you can do that by running "npm run start --date '2002-01-01'"`

  console.log(`${chalk.blue.bold(`Welcome!`)}
${chalk.bgRed(`You didn't pick a date or the date you picked was invalid.`)}
If you want to try again please do so by running "npm run start --date '2002-01-01'"

Otherwise run ${chalk.blue(`open index.html`)} to see what you've created`)

  htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Assignment 2</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>Assignment 2 - Node, npm, Git, GitHub & DateTime</h1>
    </header>
    <main>
        <div class="versions">
            <p>Git version: ${gitVersion.trim()}</p>
            <p>Npm & node version: ${npmVersion}</p>
        </div>
        <div class="date">
            <p>Last run: ${currentDate}</p>
            <p>Days from course start to now: ${daysFromCourseStart}</p>
            <p class="warning">You didn't choose a date. You can do that by running "npm run start --date '2002-01-01'"</p>
        </div>
    </main>
    <footer>
        <p>Made by: ${name}</p>
    </footer>
</body>
</html>`

} else {

  dateComparisonResult = dateComparison(dateArgument)

  mdContent = `name: ${name}
git version: ${gitVersion.trim()}
npm & node version: ${npmVersion}

last run: ${currentDate}
days from course start to now: ${daysFromCourseStart}
your chosen date: ${format(dateArgument, 'yyyy-MM-dd')}
the date is: ${dateComparisonResult}`

htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Assignment 2</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>Assignment 2 - Node, npm, Git, GitHub & DateTime</h1>
    </header>
    <main>
        <div class="versions">
            <p>Git version: ${gitVersion.trim()}</p>
            <p>Npm & node version: ${npmVersion}</p>
        </div>
        <div class="date">
            <p>Last run: ${currentDate}</p>
            <p>Days from course start to now: ${daysFromCourseStart}</p>
            <p>Your chosen date is: ${format(dateArgument, 'yyyy-MM-dd')}. That is ${dateComparisonResult}</p>
        </div>
    </main>
    <footer>
        <p>Made by: ${name}</p>
    </footer>
</body>
</html>`

  console.log(`${chalk.blue.bold(`Welcome!`)}
Your chosen date is: ${format(dateArgument, 'yyyy-MM-dd')}
Please run ${chalk.blue(`open index.html`)} to see what you've created`)


}

await fs.promises.writeFile("index.md", mdContent);
await fs.promises.writeFile("index.html", htmlContent);