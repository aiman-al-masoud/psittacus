from .translator import Translator
import googletrans as gt

class GoogleTranslator(Translator):

    """
    A wrapper for the googletrans Translator class.
    Requires-Internet connection. Google.
    """

    def __init__(self, dest_lang):
        self.t = gt.Translator()
        self.dest_lang = dest_lang

    def translate(self, sentences):
        res = [r.text for r in self.t.translate(sentences, self.dest_lang)]      
        return list(zip(sentences, res))
        

def __main__():
    r = Translator.get("english", "italian").translate(["hello world"])
    print(r)

if __name__ == "__main__":
    __main__()
    