export {createElementFromHTML, hideElement, showElement, saveToComp}

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

function saveToComp(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}
