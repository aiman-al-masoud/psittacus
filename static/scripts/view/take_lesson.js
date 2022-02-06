document.getElementById("input_lesson_file").addEventListener("change", function(){
    let fr = new FileReader()

    this.onclick = ()=> {this.value = null}

    fr.onload = function(){
        let lesson  = new Lesson(JSON.parse(fr.result) )
        console.log(lesson)        
        startLesson(lesson)
    } 
    fr.readAsText(this.files[0]) //'this' meaning the file input element
})


function startLesson(lesson){
    showElement(document.getElementById("take_lesson_div_root"))
    window.lesson = lesson
    displayProposition(lesson.getCurrent())
}


function displayProposition(proposition){

    let inNativeLang = createElementFromHTML(`<p> ${proposition.sentenceTwo} </p>`)
    
    let  inTargetLang = document.createElement("div");
    for(let word of proposition.sentenceOne.split(/\s+/)){
        let wordSpan = createElementFromHTML(`<span class="word">${word}</span> <span class="tool_tip">${proposition.wordDict[word]??""} </span>`)
        inTargetLang.appendChild(wordSpan)
    }

    document.getElementById("div_problem").innerHTML = ""
    document.getElementById("div_solution").innerHTML = ""

    if(proposition.targetToNative){
        //user needs to see (and hear) just the sentence in the target language.
        document.getElementById("div_problem").appendChild(inTargetLang)
        document.getElementById("div_solution").appendChild(inNativeLang)
        showElement(document.getElementById("take_lesson_button_play_audio"));
        proposition.play()
    }else{
        //... only the sentence in their native lang.
        document.getElementById("div_problem").appendChild(inNativeLang)
        document.getElementById("div_solution").appendChild(inTargetLang)
        hideElement(document.getElementById("take_lesson_button_play_audio"));
    }

}


document.getElementById("take_lesson_button_play_audio").addEventListener("click", function(){
    window.lesson.getCurrent().play()
})


document.getElementById("take_lesson_button_next").addEventListener("click", new (function(){
    let seenSolution = false //alt name: gimmeNextPropo

    return function(){
        if(seenSolution){
        
            hideElement(document.getElementById("div_solution"))
            document.getElementById("input_translation_answer").value = ""
            document.getElementById("p_grading").innerHTML = ""
            window.lesson.next()
            displayProposition(window.lesson.getCurrent())
            document.getElementById("take_lesson_button_next").value = "See Solution"
        }else{

            showElement( document.getElementById("div_solution"))

            let grading = window.lesson.getCurrent().check(document.getElementById("input_translation_answer").value)
            document.getElementById("p_grading").innerHTML = `${grading}%`
            document.getElementById("take_lesson_button_next").value = "Next"

            if(!window.lesson.getCurrent().targetToNative){
                showElement(document.getElementById("take_lesson_button_play_audio"))
                window.lesson.getCurrent().play()
            }

        }
       
        seenSolution = !seenSolution
    }

}))










