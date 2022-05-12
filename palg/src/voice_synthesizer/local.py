from .voice_synthesizer import VoiceSynthesizer
import os
import sys
import shutil
import pyttsx3
from queue import Queue
from threading import Thread
from time import sleep
import base64
from io import BytesIO
from settings.settings import Settings as S

class LocalSynthesizer(VoiceSynthesizer):
    
    def __init__(self, speech_language):
        
        self.engine = pyttsx3.init()
        voices = self.engine.getProperty('voices')       #getting details of current voice
        # engine.setProperty('voice', voices[0].id)  #changing index, changes voices. o for male
        # engine.setProperty('voice', voices[1].id)   #changing index, changes voices. 1 for female
        # print([v.id for v in voices])
        self.engine.setProperty('voice', speech_language)

        # rate = engine.getProperty('rate')   # getting details of current speaking rate
        # print(rate)                        #printing current voice rate
        self.engine.setProperty('rate', S.instance().getVal(S.VOICE_RATE))     # setting up new voice rate

        # exit()


    def text_to_speech(self, sentences):
        # initialize queue
        self.q = Queue()
        
        # add jobs to queue
        for s in sentences:
            self.q.put(s)
        
        t = Thread(target=  self.run1  )
        t.daemon = True
        t.start()

        self.q.join() # ends the loop when queue is empty
        sleep(3)

        path="tmp"
        files = [ os.path.join(path, i) for i in os.listdir(path)]
        res = []

        for my_file in files:
            with open(my_file, "rb") as f:
                x = f.read()
                
                base64_audio = base64.b64encode(x)
                base64_audio = str(base64_audio)[1:].strip("'")
                base64_audio = f"data:audio/wav;base64,{base64_audio}"

                # get matching sentence
                sen = [s for s in sentences if str(abs(hash(s))) in my_file ] [0]
                # print(sen, my_file)

                res.append( ( sen , base64_audio) )
        
        shutil.rmtree("tmp", ignore_errors=True)

        res = sorted(res, key= lambda e : sentences.index(e[0])  )

        return res

        
    def run1(self):
        
        shutil.rmtree("tmp", ignore_errors=True)

        os.mkdir("tmp")
        
        while True:
            
            s = self.q.get()
            h = abs(hash(s))
            self.engine.save_to_file(s, f"./tmp/{ h }.wav")
            # print(s, h)
            self.engine.runAndWait()
            
            self.q.task_done()
  



