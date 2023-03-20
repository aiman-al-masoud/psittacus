import { Base64 } from "../../../res/sounds/Sounds"

export function playBase64(base64String: Base64) {
    let audio = document.createElement("audio")
    audio.src = base64String
    audio.play()
}
