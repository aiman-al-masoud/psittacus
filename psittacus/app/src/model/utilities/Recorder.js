export {Recorder, playBase64}

/**
 * The code in between slashes originally comes from here:
 * 
 * https://github.com/bryanjenningz/record-audio
 * 
 * And is licensed under MIT.
 * 
 */
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const recordAudio = () =>

    new Promise(async resolve => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: { channelCount: 1 } });
        const mediaRecorder = new MediaRecorder(stream);
        const audioChunks = [];

        mediaRecorder.addEventListener("dataavailable", event => {
            audioChunks.push(event.data);
        });

        const start = () => mediaRecorder.start();

        const stop = () =>
            new Promise(resolve => {
                mediaRecorder.addEventListener("stop", () => {
                    const audioBlob = new Blob(audioChunks, { type: "audio/mpeg" });
                    const audioUrl = URL.createObjectURL(audioBlob);
                    const audio = new Audio(audioUrl);
                    const play = () => audio.play();
                    resolve({ audioBlob, audioUrl, play });
                });

                mediaRecorder.stop();
            });

        resolve({ start, stop });
    });
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




async function audioToBase64(audioFile) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onerror = reject;
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(audioFile);
    });
}


class Recorder {

    constructor() {
        this.recording = null
        this.recorder = null
        this.base64 = null
    }

    record = async () => {
        this.recorder = await recordAudio();
        this.recorder.start();
    }

    stop = async () => {
        this.recording = await this.recorder.stop();
        this.base64 = await audioToBase64(this.recording.audioBlob);
    }

    play = async () => {
        this.recording.play();
    }

}


function playBase64(base64String){
    let audio = document.createElement("audio")
    audio.src = base64String
    audio.play()
}




