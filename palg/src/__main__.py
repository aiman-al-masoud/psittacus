import argparse
import json
from time import time
from lesson_maker.lesson_maker import LessonMaker


parser = argparse.ArgumentParser()
parser.add_argument("--corpus", "-crp", help="Set the path to the corpus file.")
parser.add_argument("--target-lang", "-tl", help="Set the language of the corpus file.")
parser.add_argument("--native-lang", "-nl", help="Set the language you alredy know.")
parser.add_argument("--lesson-size", "-ls", help="Set the size of the lesson (number of propositions).")
parser.add_argument("--output", "-o", help="Set the path to which the lesson json text file will be saved.")


args = parser.parse_args()

lm = LessonMaker(corpuspath=args.corpus or "./res/corpus_fr.txt", corpuslang=args.target_lang or "french", nativelang=args.native_lang or "english")
lesson = lm.make_lesson(  num_sentences= int(args.lesson_size or 4)  )
lesson = json.dumps(lesson)
destpath = args.output or f"./lesson{time()}.txt"

with open(destpath, "w+") as f:
    f.write(lesson)


















