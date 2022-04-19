import L from "./Language";
export {  saveToComp, readText, sendBugReport }

function saveToComp(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

/**
 * Lets user pick file, returns its content as a string.
 * @returns 
 */
const readText = ()=> {
    
    return new Promise(function (resolve, reject) {

    let span = document.createElement('span');
    span.innerHTML = "<input id='fileInput' name='fileInput' type='file' hidden />".trim();
    window.fileInput = span.getElementsByTagName("input")[0]

    let fr = new FileReader()

    fr.onload = () => {
        resolve(fr.result)
    }

    fileInput.addEventListener("change", () => {
        fr.readAsText(fileInput.files[0])
    })

    fileInput.click()

})}


function sendBugReport(errorText){
    let y = confirm(L.confirm_send_bug_report)
    y? window.open(`mailto:${L.support_email}?subject=${L.psittacus_bug_report}&body=${L.errors_text}: ${errorText}\n\n`) : ""
}








