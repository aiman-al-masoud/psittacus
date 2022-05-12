from settings.settings import Settings as S

class Translator:

    def translate(self, sentences)-> [(str, str)]:
        raise NotImplementedError()
 
    def get(language_one, language_two):
        from .google import GoogleTranslator
        from .local import LocalTranslator

        classes = {
            "google" : GoogleTranslator, 
            "local" : LocalTranslator
        }

        # return  classes[S.instance().getVal(S.TRANSLATOR)](language_two) # TODO: make uniform
        return  classes[S.instance().getVal(S.TRANSLATOR)](language_one, language_two)


