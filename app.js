const yargs = require("yargs")
const chalk = require("chalk")
const noteUtil = require("./notes")

//notes app will allow for the following commands
//add, remove, list, read

//create add command
yargs.command({
        command: 'add',
        describe: 'This function can be used with a file name to add a new note, the command syntax is add -t=<name of the note> -c=<content of the note>',
        builder:{
            title : {
                describe: 'Enter note title in double quotes',
                demandOption: true,
                type: 'string'
            },
            body : {
                describe: 'Enter the body of the note that you want to add',
                demandOption: true,
                type: 'string'
            }
        },
        handler(argv) {noteUtil.addNote(argv.title,argv.body)}
    })

//create remove command
yargs.command({
        command: 'remove',
        describe: 'This function will remove a note by title, the syntax is remove -t=<name of the note>',
        builder: {
            title: {
                describe: 'Enter the title of the note that you want to remove',
                demandOption: true,
                type: 'string'
            }
        },
        handler(argv) { noteUtil.removeNote(argv.title) }
    })

//create list command
yargs.command({
        command: 'list',
        describe: 'This function list all the notes created, the command is list',
        handler(argv) { noteUtil.listNotes() }
    })

//create read command
yargs.command({
        command: 'read',
        describe: 'This function is used to see the details of a note, the command is read -t=<title of note>',
        builder: {
            title: {
                describe: 'Enter the title of the note you want to access',
                demandOption: true,
                type: 'string'
            }
        },
        handler(argv) { noteUtil.readNote(argv.title) }
    })


//log(chalk.blue.bold,"Success!!")
//console.log(process.argv)
//console.log(yargs.argv)
yargs.parse()

//console.log(process.argv.length)

if (process.argv.length < 3 ) {
    console.log(yargs.parse("help"))
}
