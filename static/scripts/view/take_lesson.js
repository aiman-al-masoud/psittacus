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
    document.getElementById("take_lesson_div_root").classList.add("displayed")
    window.lesson = lesson
    displayProposition(lesson.getCurrent())
}


function displayProposition(proposition){

    let sentenceTwo  = document.getElementById("p_sentence_two");
    sentenceTwo.innerHTML = proposition.sentenceTwo;
    

    let sentenceOneDiv = document.getElementById("div_sentence_one");
    sentenceOneDiv.innerHTML = ""
    for(let word of proposition.sentenceOne.split(/\s+/)){
        let wordSpan = createElementFromHTML(`<span class="word">${word}</span> <span class="tool_tip">${proposition.wordDict[word]??""} </span>`)
        sentenceOneDiv.appendChild(wordSpan)
    }

    if(proposition.targetToNative){
        //user needs to see (and hear) just the sentence in the target language.
        showElement(sentenceOneDiv)
        hideElement(sentenceTwo)
        proposition.play()
    }else{
        //... only the sentence in their native lang.
        showElement(sentenceTwo)
        hideElement(sentenceOneDiv)
    }

}


document.getElementById("take_lesson_button_play_audio").addEventListener("click", function(){
    window.lesson.getCurrent().play()
})


document.getElementById("take_lesson_button_next").addEventListener("click", new (function(){
    let seenSolution = false

    return function(){
        if(seenSolution){

            hideElement(document.getElementById("take_lesson_div_solution"))

            document.getElementById("take_lesson_input_sentence_two").value = ""
            document.getElementById("p_grading").innerHTML = ""
            window.lesson.next()
            displayProposition(window.lesson.getCurrent())
            document.getElementById("take_lesson_button_next").value = "See Solution"
        }else{

            showElement( document.getElementById("take_lesson_div_solution"))

            let grading = window.lesson.getCurrent().check(document.getElementById("take_lesson_input_sentence_two").value)
            document.getElementById("p_grading").innerHTML = `${grading}%`
            document.getElementById("take_lesson_button_next").value = "Next"


            if(!window.lesson.getCurrent().targetToNative){
                showElement(document.getElementById("div_sentence_one"))
                window.lesson.getCurrent().play()
            }else{
                showElement(document.getElementById("p_sentence_two"))
            }


        }
       
        seenSolution = !seenSolution
    }

}))


function createElementFromHTML(htmlString) {
    var div = document.createElement('span');
    div.innerHTML = htmlString.trim();
    return div
}

function hideElement(element){
    element.classList.add("hidden");
    element.classList.remove("displayed");
}

function showElement(element){
    element.classList.add("displayed");
    element.classList.remove("hidden");
}









