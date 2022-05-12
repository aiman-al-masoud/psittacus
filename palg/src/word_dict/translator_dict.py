from .word_dict import WordDict
from translator.translator import Translator

class GoogleTranslateDict(WordDict):

    def __init__(self, lang_from, lang_to): #TODO: add third language_to argument to interface
        self.lang_from = lang_from
        self.lang_to = lang_to

    def get_definition(self, word):
        return Translator.get(self.lang_from, self.lang_to).translate([word])[0][1]
