from gtts import gTTS
import base64
from io import BytesIO
from .voice_synthesizer import VoiceSynthesizer

class GoogleVoiceSynthetizer(VoiceSynthesizer):

    """
    Online implementation that relies on Google's tts.
    This is a wrapper around gtts's library implementation.
    """

    lang_to_code = {'afrikaans': 'af', 'albanian': 'sq', 'arabic': 'ar', 'armenian': 'hy', 'azerbaijani': 'az', 'basque': 'eu', 'belarusian': 'be', 'bulgarian': 'bg', 'catalan': 'ca', 'chinese (simplified)': 'zh-cn', 'chinese (traditional)': 'zh-tw', 'croatian': 'hr', 'czech': 'cs', 'danish': 'da', 'dutch': 'nl', 'english': 'en', 'estonian': 'et', 'filipino': 'tl', 'finnish': 'fi', 'french': 'fr', 'galician': 'gl', 'georgian': 'ka', 'german': 'de', 'greek': 'el', 'haitian creole': 'ht', 'hebrew': 'iw', 'hindi': 'hi', 'hungarian': 'hu', 'icelandic': 'is', 'indonesian': 'id', 'irish': 'ga', 'italian': 'it', 'japanese': 'ja', 'korean': 'ko', 'latvian': 'lv', 'lithuanian': 'lt', 'macedonian': 'mk', 'malay': 'ms', 'maltese': 'mt', 'norwegian': 'no', 'persian': 'fa', 'polish': 'pl', 'portuguese': 'pt', 'romanian': 'ro', 'russian': 'ru', 'serbian': 'sr', 'slovak': 'sk', 'slovenian': 'sl', 'spanish': 'es', 'swahili': 'sw', 'swedish': 'sv', 'thai': 'th', 'turkish': 'tr', 'ukrainian': 'uk', 'urdu': 'ur', 'vietnamese': 'vi', 'welsh': 'cy', 'yiddish': 'yi'}

    
    def __init__(self, speech_language):

        # gTTs uses a language code in place of the name 
        self.language =  GoogleVoiceSynthetizer.lang_to_code[speech_language.lower()]


    def text_to_speech(self, sentences):

        results = []
        for sentence in sentences:
            
            audio = gTTS(text=sentence,lang=self.language)#,slow=True)
            fp = BytesIO()
            audio.write_to_fp(fp)
            fp.seek(0)
            data = fp.read()
            base64_audio = base64.b64encode(data)
            base64_audio = str(base64_audio)[1:].strip("'")
            results.append((sentence, f"data:audio/mpeg;base64,{base64_audio}" ))
              
        return results
            

def __main__():
    r = VoiceSynthesizer.get("english").text_to_speech(["hello world"])
    print(r)



if __name__ == "__main__":
    __main__()


