//@ts-ignore
import CorrectSound from '../../res/correct.mp3'
//@ts-ignore
import WrongSound from '../../res/wrong.mp3'
//@ts-ignore
import SelectSound from '../../res/select.mp3'

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
    readonly CorrectSound = CorrectSound
    readonly WrongSound = WrongSound
    readonly SelectSound = SelectSound
}