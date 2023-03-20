//@ts-ignore
import CorrectSound from './correct.mp3'
//@ts-ignore
import WrongSound from './wrong.mp3'
//@ts-ignore
import SelectSound from './select.mp3'

export interface Sounds {
    CorrectSound: Base64
    WrongSound: Base64
    SelectSound: Base64
}

export type Base64 = string

export function getSounds(): Sounds {
    return new BaseSounds()
}

class BaseSounds implements Sounds {

    /**
     * https://freesound.org/people/StavSounds/sounds/546081/
     */
    readonly CorrectSound = CorrectSound

    /**
     * https://freesound.org/people/Raclure/sounds/483598/
     */
    readonly WrongSound = WrongSound

    /**
     * https://freesound.org/s/413310/
     */
    readonly SelectSound = SelectSound

}