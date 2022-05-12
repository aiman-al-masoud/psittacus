from settings.settings import Settings as S

class WordDict:

    def get_definition(self, word):
        raise NotImplementedError()

    @staticmethod
    def get(lang_from, lang_to):

        from .wiktionary_dict import WiktionaryDict
        from .translator_dict import GoogleTranslateDict
        
        classes = {
            "translator_dict"  : GoogleTranslateDict,
            "wiktionary_dict" : WiktionaryDict
        }
    
        return classes[S.instance().getVal(S.WORD_DICT)](lang_from, lang_to)


def __main__():
    r = WordDict.get("arabic", "english").get_definition("بط")
    print(r)

if __name__ == "__main__":
    __main__()
