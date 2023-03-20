import * as Icon from 'react-feather'
//@ts-ignore
import PlayAudioIcon from './play-audio.png'
//@ts-ignore
import FaviconIcon from './favicon.png'

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
    Favicon: any
}

export function getIcons(): Icons {
    return new FeatherIcons()
}

class FeatherIcons implements Icons {

    constructor(

        /**
         * Modified version of: https://pixabay.com/illustrations/parrot-bird-perched-drawing-art-6805595/
         */
        readonly Favicon = FaviconIcon,

        /**
         * https://www.iconfinder.com/icons/510856/audio_sound_speaker_volume_icon
         * Author: https://www.iconfinder.com/iconify
         */
        readonly PlayAudio = PlayAudioIcon,

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

    ) {

    }

}

