from settings.settings import Settings as S

class VoiceSynthesizer:

    def text_to_speech(self, sentences) -> [(str, str)]:
        raise NotImplementedError()
    
    @staticmethod
    def get(speech_language):
        from .google import GoogleVoiceSynthetizer
        from .local import LocalSynthesizer

        classes = {
            "google" : GoogleVoiceSynthetizer,
            "local" : LocalSynthesizer
        }

        return classes[S.instance().getVal(S.VOICE_SYNTHESIZER)](speech_language)

