window.lessonBuilder = new LessonBuilder()


document.getElementById("button_next").addEventListener("click", function(){
    move(true)
})

document.getElementById("button_previous").addEventListener("click", function(){
    move(false)
})

document.getElementById("button_audio").addEventListener("click", new (function(){    
    let recording = false
    return function(){
        if(recording){
            window.lessonBuilder.getCurrent().stopRecording()
            recording =  false;
            document.getElementById("button_audio").value = "Record Audio"
            document.getElementById("button_play_audio").style = "visibility:visible; display:block;"
        }else{
            window.lessonBuilder.getCurrent().record();
            recording = true;
            document.getElementById("button_audio").value = "Stop Recording"
        }
    }    
})  )


document.getElementById("input_sentence_one").addEventListener("input", function(){
    window.lessonBuilder.getCurrent().wordDict = defintionTableToDict()
    clearDefintionsTable()
    for( let word of document.getElementById("input_sentence_one").value.split(/\s+/) ){
        newRowInDefinitionsTable(word,  window.lessonBuilder.getCurrent().wordDict[word]??""  )
    }
})

document.getElementById("button_play_audio").addEventListener("click", function(){
    window.lessonBuilder.getCurrent().playAudio()
})


document.getElementById("button_save_to_computer").addEventListener("click", function(){
    move(true)
    console.log(window.lessonBuilder.toJson())
    saveToComp( JSON.stringify(window.lessonBuilder.toJson()), "lesson", "text/plain")
})


function saveToComp(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}



function move(forward){
    let sentenceOne = document.getElementById("input_sentence_one").value
    let sentenceTwo = document.getElementById("input_sentence_two").value
    window.lessonBuilder.getCurrent().setSentenceOne(sentenceOne).setSentenceTwo(sentenceTwo)
    window.lessonBuilder.getCurrent().wordDict = defintionTableToDict()
    forward? window.lessonBuilder.next() : window.lessonBuilder.prev()
    document.getElementById("input_sentence_one").value = window.lessonBuilder.getCurrent().sentenceOne??""
    document.getElementById("input_sentence_two").value = window.lessonBuilder.getCurrent().sentenceTwo??""
    dictToDefinitionTable(window.lessonBuilder.getCurrent().wordDict)
}



function newRowInDefinitionsTable(word, translation) {
    var row = document.getElementById("table_definitions").insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = `<input  type='text' value='${word}'>`;
    cell2.innerHTML = `<input  type='text' value='${translation}'>`;
}

function clearDefintionsTable() {
    document.getElementById("table_definitions").innerHTML = ""
}

function defintionTableToDict() {
    var d = {}
    for (let row of document.getElementById("table_definitions").rows) {
        try {
            let word = row.cells[0].children[0].value
            let definition = row.cells[1].children[0].value
            d[word] = definition
        } catch { }
    }
    return d
}

function dictToDefinitionTable(dict){
    clearDefintionsTable()
    for(let entry of Object.entries(dict)){
        newRowInDefinitionsTable(entry[0], entry[1])
    }
}








