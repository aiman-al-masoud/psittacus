import random as rand

class Rambler():

    """
    Extracts sets of sentences from a corpus (a text file).
    """

    def __init__(self, pathname):
        self.file = open(pathname, "rt")
        self.text =  self.file.read().replace("\n", " ")
        self.corpus = self.text.split(".")

        # filter out long/short sentences
        max_char_len = 80
        min_char_len = 60
        self.corpus = [ s for s in self.corpus if (len(s) <= max_char_len and len(s) >= min_char_len)    ]

    def sample(self, size):
        return rand.sample(self.corpus, size)


def __main__():
    import sys
    [print(s) for s in Rambler(sys.argv[1]).sample(10)]


if __name__ == "__main__":
    __main__()