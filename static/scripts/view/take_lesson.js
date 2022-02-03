document.getElementById("input_lesson_file").addEventListener("change", function(){
    let fr = new FileReader()
    fr.onload = function(){
        let lesson  = new Lesson(JSON.parse(fr.result) )
        console.log(lesson)        
        startLesson(lesson)
    } 
    fr.readAsText(this.files[0]) //'this' meaning the file input element
})


function startLesson(lesson){
    window.lesson = lesson
    displayProposition(lesson.getCurrent())
}


function displayProposition(proposition){

    document.getElementById("p_sentence_two").innerHTML = proposition.sentenceTwo;
    
    let sentenceOneDiv = document.getElementById("div_sentence_one");
    sentenceOneDiv.innerHTML = ""
    for(let word of proposition.sentenceOne.split(/\s+/)){
        let wordSpan = createElementFromHTML(`<span class="word">${word}</span> <span class="tool_tip">${proposition.wordDict[word]??""} </span>`)
        sentenceOneDiv.appendChild(wordSpan)
    }

    proposition.play()

}

document.getElementById("take_lesson_button_play_audio").addEventListener("click", function(){
    window.lesson.getCurrent().play()
})


document.getElementById("take_lesson_button_next").addEventListener("click", new (function(){
    let seenSolution = false

    return function(){
        if(seenSolution){
            document.getElementById("p_sentence_two").style = "display: none; visibility: hidden;"
            document.getElementById("take_lesson_input_sentence_two").value = ""
            document.getElementById("p_grading").innerHTML = ""
            window.lesson.next()
            displayProposition(window.lesson.getCurrent())
            document.getElementById("take_lesson_button_next").value = "See Solution"
        }else{
            document.getElementById("p_sentence_two").style = "display: block; visibility: visible;"
            let grading = window.lesson.getCurrent().check(document.getElementById("take_lesson_input_sentence_two").value)
            document.getElementById("p_grading").innerHTML = `${grading}%`
            document.getElementById("take_lesson_button_next").value = "Next"
        }

        seenSolution = !seenSolution
    }

}))




function createElementFromHTML(htmlString) {
    var div = document.createElement('span');
    div.innerHTML = htmlString.trim();
    return div
}










