// window.addEventListener("load", function () {

// })

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
    document.getElementById("p_sentence_one").innerHTML = proposition.sentenceOne;
    document.getElementById("p_sentence_two").innerHTML = proposition.sentenceTwo;
}

document.getElementById("button_play_audio").addEventListener("click", function(){
    window.lesson.getCurrent().play()
})


document.getElementById("button_next").addEventListener("click", new (function(){
    let seenSolution = false

    return function(){
        if(seenSolution){
            document.getElementById("p_sentence_two").style = "display: none; visibility: hidden;"
            document.getElementById("input_sentence_two").value = ""
            document.getElementById("p_grading").innerHTML = ""
            window.lesson.next()
            displayProposition(window.lesson.getCurrent())
            document.getElementById("button_next").value = "See Solution"
        }else{
            document.getElementById("p_sentence_two").style = "display: block; visibility: visible;"
            let grading = window.lesson.getCurrent().check(document.getElementById("input_sentence_two").value)
            document.getElementById("p_grading").innerHTML = `${grading}%`
            document.getElementById("button_next").value = "Next"
        }

        seenSolution = !seenSolution
    }

}))









