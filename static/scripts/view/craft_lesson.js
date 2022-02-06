window.lessonBuilder = new LessonBuilder()
displayPropositionCraftLesson(window.lessonBuilder.getCurrent())


document.getElementById("craft_lesson_input_existing_lesson").addEventListener("change", function(){
    let fr = new FileReader()
    fr.onload = function(){
        window.lessonBuilder = LessonBuilder.fromExistingJson(JSON.parse(fr.result))
        displayPropositionCraftLesson(window.lessonBuilder.getCurrent())
        document.getElementById("button_play_audio").classList.add("displayed") 

        document.getElementById("input_metadata_target_lang").value = window.lessonBuilder.targetLanguage
        document.getElementById("input_metadata_source_lang").value = window.lessonBuilder.sourceLanguage
        document.getElementById("input_metadata_author").value = window.lessonBuilder.author        

    } 
    fr.readAsText(this.files[0]) //'this' meaning the file input element
})


document.getElementById("button_next").addEventListener("click", function(){
    move(true)
    console.log(window.lessonBuilder)
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
            document.getElementById("button_audio").value = "Record Audio🎙️"
            document.getElementById("button_play_audio").classList.add("displayed") 
        }else{
            window.lessonBuilder.getCurrent().record();
            recording = true;
            document.getElementById("button_audio").value = "Stop Recording 🔴"
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
    saveCurrentProposition()
    console.log(window.lessonBuilder.toJson())
    saveToComp( JSON.stringify(window.lessonBuilder.toJson()), "lesson", "text/plain")
})

document.getElementById("invert_translation_direction").addEventListener("change", function(){
    window.lessonBuilder.getCurrent().invertTranslationDirection();
})



document.getElementById("input_metadata_target_lang").addEventListener("input", function(){
    window.lessonBuilder.targetLanguage = document.getElementById("input_metadata_target_lang").value
})


document.getElementById("input_metadata_source_lang").addEventListener("input", function(){
    window.lessonBuilder.sourceLanguage = document.getElementById("input_metadata_source_lang").value
})


document.getElementById("input_metadata_author").addEventListener("input", function(){
    window.lessonBuilder.author = document.getElementById("input_metadata_author").value
})



function saveCurrentProposition(){
    let sentenceOne = document.getElementById("input_sentence_one").value
    let sentenceTwo = document.getElementById("input_sentence_two").value
    window.lessonBuilder.getCurrent().setSentenceOne(sentenceOne).setSentenceTwo(sentenceTwo)
    window.lessonBuilder.getCurrent().wordDict = defintionTableToDict()
}


function displayPropositionCraftLesson(proposition){
    document.getElementById("input_sentence_one").value = proposition.sentenceOne??""
    document.getElementById("input_sentence_two").value = proposition.sentenceTwo??""
    dictToDefinitionTable(proposition.wordDict)
    document.getElementById("invert_translation_direction").checked = proposition.targetToNative   
}


function move(forward){
    saveCurrentProposition()
    forward? window.lessonBuilder.next() : window.lessonBuilder.prev()
    displayPropositionCraftLesson(window.lessonBuilder.getCurrent())
}


function newRowInDefinitionsTable(word, translation) {
    var row = document.getElementById("table_definitions").insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    
    word = word.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
    translation = translation.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');

    cell1.innerHTML = `<input  type='text' value="${word}">`;
    cell2.innerHTML = `<input  type='text' value="${translation}">`;
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

