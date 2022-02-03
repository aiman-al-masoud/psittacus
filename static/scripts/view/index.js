document.getElementById("button_craft_lesson").addEventListener("click", function(){
    hideEverything()
    document.getElementById("div_craft_lesson").classList.add("displayed")
})

document.getElementById("button_take_lesson").addEventListener("click", function(){
    hideEverything()
    document.getElementById("div_take_lesson").classList.add("displayed")
})


function hideEverything(){
    document.getElementById("div_take_lesson").classList.add("hidden")   
    document.getElementById("div_craft_lesson").classList.add("hidden")   
    document.getElementById("div_take_lesson").classList.remove("displayed")   
    document.getElementById("div_craft_lesson").classList.remove("displayed")   
}