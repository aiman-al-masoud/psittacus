import re
import json
from time import time
import random
from rambler.rambler import Rambler
from translator.translator import Translator
from voice_synthesizer.voice_synthesizer import VoiceSynthesizer
from word_dict.word_dict import WordDict


class LessonMaker:

    def __init__(self, **kwargs):

        params = {"corpuspath": "./res/corpus_fr.txt", "corpuslang": "french", "nativelang": "english"}
        params.update(kwargs)
        self.target_language = params["corpuslang"]
        self.source_language = params["nativelang"]

        self.rambler = Rambler(params["corpuspath"])
        self.translator = Translator.get(params["corpuslang"], params["nativelang"])
        self.reverse_translator = Translator.get( params["nativelang"] , params["corpuslang"])
        self.voice_synthesizer = VoiceSynthesizer.get(params["corpuslang"])


    def make_lesson(self, **kwargs):

        params = {"num_sentences": 2}
        params.update(kwargs)

        sentences = self.rambler.sample(params["num_sentences"])
        translated = self.translator.translate(sentences)
        spoken = self.voice_synthesizer.text_to_speech(sentences)


        dictionaries = []
       
        for sentence in sentences:
            trans_word_pairs = self.translator.translate(re.split("\s+", sentence))
            dictionaries.append( { word:trans for word, trans in trans_word_pairs  })


        reverse_dictionaries = []
    
        for sentence in [x[1] for x in translated]:
            trans_word_pairs = self.reverse_translator.translate(re.split("\s+", sentence))
            reverse_dictionaries.append( { word:trans for word, trans in trans_word_pairs  })


        propositions = list(zip(sentences, [x[1] for x in translated], [x[1] for x in spoken], dictionaries, reverse_dictionaries))


        propositions = [{
                        "sentence_one": propo[0],
                        "sentence_two":propo[1],
                        "audio_base64":propo[2],
                        "word_dict":propo[3], 
                        "reverse_dict":propo[4], 
                        "target_to_native": True if random.randint(0, 1)==1 else False} for propo in propositions]

        return {
            "metadata": {
                "target_language":  self.target_language,
                "source_language": self.source_language,
                "author": "PALG",
                "title": "",
                "last_modified": int(1000*time())
            },
            "propositions": propositions,
            "explanation": {"text": "<html><p>This lesson was generated  automatically via PALG (Psittacus Automatic Lesson Generator).</p> <a href='https://github.com/aiman-al-masoud/psittacus_automatic_lesson_generator'>https://github.com/aiman-al-masoud/psittacus_automatic_lesson_generator</a></html>"}
        }


def __main__():
    r = LessonMaker().make_lesson()
    stringified_json = json.dumps(r)

    with open("dump_result.txt", "w+") as f:
        f.write(stringified_json)


if __name__ == "__main__":
    __main__()
