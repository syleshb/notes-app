const fs = require("fs")
const chalk = require("chalk")

//this file contains a few utility functions for the app

const notesFile = "MyNotes.json"

//------------------------------------------UTIL CODE-------------------------------------------

//this function is to get all notes from the file
const getNotes = () => {
    try{
        return JSON.parse(fs.readFileSync(notesFile,'utf-8'));
    } catch(e) {
        return []
    }
}

//this function will write the notes object to the file
const saveNotes = (notes) => fs.writeFileSync(notesFile,JSON.stringify(notes))

//this function will check if a given title is in the given list of notes
const isAvailable = (notes,title) => {
    //const duplicateNotes =  notes.filter((note) => note.title === title)
    const duplicateNote = notes.find((note => note.title == title))

    //if (duplicateNotes.length == 0) return false
    if (!duplicateNote) return false

    return true
}

//function to get a list of titles to display
const displayTitles = (notes) => {
    // for (item of notes){
    //     console.log("Title is : " + item.title)
    // }
    notes.forEach((note) => console.log("Title is : " + note.title))
}

//function to get a list of titles to display
const displayTitleAndBody = (notes) => {
    notes.forEach((note) => {
        console.log("Title is : " + note.title)
        console.log("Body is : "+note.body)
    })
}

//------------------------------------------MAIN CODE-------------------------------------------

const addNote = (title, body) =>{

    const notes = getNotes()
    //console.log(notes)

    if(!isAvailable(notes,title)) {
        notes.push({
            title: title,
            body: body
        })

        saveNotes(notes)
        console.log(chalk.green.inverse("New note added!!"))

    }else{
        console.log(chalk.red.inverse("Note title is taken"))
    }
    
}


//this function will remove a note by a given title
const removeNote = (title) => {
    const notes = getNotes()

    if (!isAvailable(notes,title)){
        console.log(chalk.red.inverse("Title not in notes, the following are your options"))
        console.log(displayTitles(notes))
        return true
    }

    const removedNote = notes.filter((note) => title != note.title)

    if (notes.length > removedNote.length){
        console.log(chalk.green.inverse("Note Removed"))
    }

    saveNotes(removedNote)
}

const listNotes = () => displayTitleAndBody(getNotes())

const readNote = (title) => {
    const notes = getNotes() //notes is an array
    const note = notes.find((note) => note.title === title)

    if(note) {
        console.log("Body of Note Title(" + note.title + ") is : " + note.body)
    }else {
        console.log(chalk.red.inverse("Cannot find the title you are looking for, these are your options"))
        console.log(displayTitles(notes))
        return true
    }

    // if(!isAvailable(notes,title)){
    //     console.log(chalk.red.inverse("Cannot find the title you are looking for, these are your options"))
    //     console.log(displayTitles(notes))
    //     return true
    // }

    // for (item of notes){
    //     //console.log("In For loop "+item)
    //     if (item.title == title) {
    //         console.log("Body of Note Title(" + item.title + ") is : " + item.body)
    //     }
    // }
}

//------------------------------------------EXPORT SECTION-------------------------------------------

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}
