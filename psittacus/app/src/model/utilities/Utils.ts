import { Context } from "../Context";
export { saveToComp, readText, sendBugReport }

function saveToComp(content: string, fileName: string, contentType: string) {
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
const readText = (): Promise<string> => {

    return new Promise(function (resolve, reject) {

        let span = document.createElement('span');
        span.innerHTML = "<input id='fileInput' name='fileInput' type='file' hidden />".trim();

        (window as any).fileInput = span.getElementsByTagName("input")[0]

        let fr = new FileReader()

        fr.onload = () => {
            resolve(fr.result as any)
        }

        (window as any).fileInput.addEventListener("change", () => {
            fr.readAsText((window as any).fileInput.files[0])
        });

        (window as any).fileInput.click()

    })
}


function sendBugReport(errorText: string, context: Context) {
    let y = confirm(context.L.confirm_send_bug_report)
    y ? window.open(`mailto:${context.L.support_email}?subject=${context.L.psittacus_bug_report}&body=${context.L.errors_text}: ${errorText}\n\n`) : ""
}
