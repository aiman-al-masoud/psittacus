from wiktionaryparser import WiktionaryParser
from .word_dict import WordDict

class WiktionaryDict(WordDict):
    """
    Looks up for a word on Wiktionary.
    """

    def __init__(self, lang_from):
        self.lang_from = lang_from

    def get_definition(self, word):

        parser = WiktionaryParser()
        res = parser.fetch(word, self.lang_from)
        try:
            return "".join(line+". " for line in res[0]["definitions"][0]["text"])
        except Exception as e:
            print("WiktionaryDict", e)

