// window.addEventListener("load", function(){
window.lessonBuilder = new LessonBuilder()
// })

document.getElementById("button_next").addEventListener("click", function(){
    let sentenceOne = document.getElementById("input_sentence_one").value
    let sentenceTwo = document.getElementById("input_sentence_two").value
    window.lessonBuilder.getCurrent().setSentenceOne(sentenceOne).setSentenceTwo(sentenceTwo)
    //TODO: set word dictionary words and definitions
    window.lessonBuilder.next()
    document.getElementById("input_sentence_one").value = window.lessonBuilder.getCurrent().sentenceOne??""
    document.getElementById("input_sentence_two").value = window.lessonBuilder.getCurrent().sentenceTwo??""
    //TODO: same for word dict

})

document.getElementById("button_previous").addEventListener("click", function(){
    let sentenceOne = document.getElementById("input_sentence_one").value
    let sentenceTwo = document.getElementById("input_sentence_two").value
    window.lessonBuilder.getCurrent().setSentenceOne(sentenceOne).setSentenceTwo(sentenceTwo)
    //TODO: set word dictionary words and definitions
    window.lessonBuilder.prev()
    document.getElementById("input_sentence_one").value = window.lessonBuilder.getCurrent().sentenceOne??""
    document.getElementById("input_sentence_two").value = window.lessonBuilder.getCurrent().sentenceTwo??""
    //TODO: same for word dict
})

document.getElementById("button_audio").addEventListener("click", new (function(){    
    let recording = false
    return function(){
        if(recording){
            window.lessonBuilder.getCurrent().stopRecording()
            recording =  false;
            document.getElementById("button_audio").value = "Record Audio"
        }else{
            window.lessonBuilder.getCurrent().record();
            recording = true;
            document.getElementById("button_audio").value = "Stop Recording"
        }
    }    
})  )



document.getElementById("button_done").addEventListener("click", function(){
    console.log(window.lessonBuilder.toJson())
})









