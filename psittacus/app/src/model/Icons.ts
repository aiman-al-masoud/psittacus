import * as Icon from 'react-feather'
//@ts-ignore
import PlayAudioIcon from '../../res/play-audio.png'


export interface Icons {
    Home: object
    ArrowRight: object
    Mic: object
    Play: object
    Tag: object
    Edit: object
    BookOpen: object
    Save: object
    Download: object
    Info: object
    RotateCcw: object
    FilePlus: object
    Settings: object
    PlayAudio: any
}

export function getIcons(): Icons {
    return new FeatherIcons()
}

class FeatherIcons implements Icons {

    constructor(
        readonly Home = Icon.Home,
        readonly ArrowRight = Icon.ArrowRight,
        readonly Mic = Icon.Mic,
        readonly Play = Icon.Play,
        readonly Tag = Icon.Tag,
        readonly Edit = Icon.Edit,
        readonly BookOpen = Icon.BookOpen,
        readonly Save = Icon.Save,
        readonly Download = Icon.Download,
        readonly Info = Icon.Info,
        readonly RotateCcw = Icon.RotateCcw,
        readonly FilePlus = Icon.FilePlus,
        readonly Settings = Icon.Settings,
        readonly PlayAudio = PlayAudioIcon
    ) {

    }


}

