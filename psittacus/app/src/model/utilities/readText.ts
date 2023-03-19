/**
 * Lets user pick file, returns its content as a string.
 * @returns
 */
export const readText = (): Promise<string> => {

    return new Promise(function (resolve, reject) {

        let span = document.createElement('span');
        span.innerHTML = "<input id='fileInput' name='fileInput' type='file' hidden />".trim();

        (window as any).fileInput = span.getElementsByTagName("input")[0];

        let fr = new FileReader();

        fr.onload = () => {
            resolve(fr.result as any);
        };

        (window as any).fileInput.addEventListener("change", () => {
            fr.readAsText((window as any).fileInput.files[0]);
        });

        (window as any).fileInput.click();

    });
};
