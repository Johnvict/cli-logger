## Parser

Setup on local Environment
> npm install

<br>

Build Command
 - The build command compiles the TypeScript files and copies them on the app's root directory.
 - The `bin` directory is preserved to enable installation of the CLI app
> npm run build

<br>

Usage
 - Make sure you run build before this (Now you get a reminder instruction to do so)
> node parser.js --input ./app.log --output ./errors.json

<br>

Run Test
> npm run test

<br>

Install
 - You can test the app as a regular CLI app by installing it on your local system 
 - If you get some permission error, uninstall the global package and reinstall - `npm uninstall -g mayd-logger`
> npm install -g .

<br>

## Usage as an installed package

Process log
> mayd-logger --input ./app.log --output ./errors.json

Check version
> mayd-logger --version


See Help
> mayd-logger --help

