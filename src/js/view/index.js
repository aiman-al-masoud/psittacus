import {hideElement, showElement} from "../model/utils.js"

document.getElementById("button_craft_lesson").addEventListener("click", function(){
    hideEverything()
    showElement(document.getElementById("div_craft_lesson"))
})

document.getElementById("button_take_lesson").addEventListener("click", function(){
    hideEverything()
    showElement(document.getElementById("div_take_lesson"))

})

document.getElementById("button_welcome").addEventListener("click", function(){
    hideEverything()
    showElement(document.getElementById("div_welcome"))
})

function hideEverything(){ 
    hideElement(document.getElementById("div_take_lesson"))
    hideElement(document.getElementById("div_craft_lesson"))
    hideElement(document.getElementById("div_welcome"))
}