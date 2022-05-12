import json

class Settings:
    
    """
    Global persistent settings.
    """

    # class attributes
    DEFAULT_PATH = __file__.replace("py", "json")
    aInstance = None

    # keys
    WORD_DICT = "word_dict"
    TRANSLATOR = "translator"
    VOICE_SYNTHESIZER  = "voice_synthesizer" 
    VOICE_RATE = "voice_rate"


    def __init__(self, pathname):
        self.pathname = pathname  or Settings.DEFAULT_PATH
        with open(self.pathname) as f:
            self.dictionary = json.loads(f.read())

    @staticmethod
    def instance() -> "Settings":
 
        """
        Get the current instance of the Settings singleton.
        """
        Settings.aInstance = Settings(Settings.DEFAULT_PATH)
        return Settings.aInstance
    
    def getVal(self, key:str):
        
        """
        Read the value of a key.
        """

        return self.dictionary[key]
    
    def setVal(self, key:str, val:str):
        
        """
        Set the value of a key.
        """

        self.dictionary[key] = val
        with open(self.pathname, "w+") as f:
            f.write(json.dumps(self.dictionary))

    
# s = Settings.instance()
# v = s.getVal("ciao")
# print(v)