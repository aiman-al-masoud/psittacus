# Add mechanism to post lessons to *a* server and retrieve them by metadata.

Server with the following apis:

login
access an existing account, receive session id

signup
create a new account on the server

upload-lesson
requires auth

download-lesson
doesn't require auth


* Server address to/from which lessons are posted/downloaded needs to be editable by the user, so as to make the app experience more "native-like". (Server may need to have CORS enabled).

# Add New Attributes to Proposition:

alt_sentence_two [ ]
ignored_chars []
case_insensitive bool
audio_dict {}

* alt_sentence_two
To be able to correct user attempts in a more accurate manner.

* ignored_chars:
characters to be ignored when tokenizing words based on whitespace. (eg : comma, fullstop, semicolon)
provide a default ignore list.

* case_insensitive: to ignore case differences in a sentence (default, but in some languages it may be important).

* audio_dict
A recording of each separate word in the target language.


# Spaced Repetition

from: https://github.com/aiman-al-masoud/psittacus/issues/1

* Implement a better spaced repetition strategy by subclassing Scheduler.

https://en.wikipedia.org/wiki/Spaced_repetition

https://en.wikipedia.org/wiki/Leitner_system


* Fix problem of missing title in lessons that would lead to duplicate ids and inexisting proposition hashes.

* See if Lesson can generate its own id and pass it to Scheduler's constructor.

* Scores are modified in the bg even when memory-less Schedulers are used, is this ok?

* extract common part of next() and pull it up

## Add scheduling (suggestion) for repeating whole lessons.

Save whole lessonJsons in localStorage so as to be able to retrieve them without asking the user to "upload" them again from filesystem.

Or maybe just add cached lessons in the user_progress data structure, since it's already organized Lesson-wise? (Easier solution for fetching and exporting/importing the data).

"LessonScheduler" will have to sift through the scores data, from UserProgress, determining what lesson the student needs review the most at any time, and retrieve the lesson's json data from the cached lessons.

Different LessonSchedulers for extendibility. Each (possibly) suggesting differently based on the same data from UserProgress (which includes per-lesson scores, per-proposition scores, and time the lesson was last taken).

Review Lessons option in the GUI, that takes the user to a menu where they see the review suggestions, and can launch TakeLesson on any of the suggestions.

LessonScheduler will also have to delete cached lessonJsons (to save space on localStorage), for example (if low on space) deleting the lesson that the user performed the best on, when it needs to save one in which the user performed badly for later. 

LessonScheduler.getSuggestions() : [Lesson]

LessonScheduler.cacheLesson(lesson)

Better structure and names! Scheduler-> PropositionScheduler? (To avoid confusion with proposed LessonScheduler). Since it's really only used by Lesson, how about making it clear from the folder structure?

Actually, study and try using a wrapper around IndexedDB like Dexie for lesson-caching.


* Look into replacing localStorage with IndexedDB also for user_scores

table for lessons, with index = lessonId, each lesson record will contain ( the cached lesson maybe?) as well as all of the info related to scores.

 * UserProgress.scoresForLesson(lessonId) to absract away Dexie.


Maybe make CachedLessons class and keep cached lessons stored separately from scores?

CachedLessons.getById(lessonId) : Lesson



* Store ALLL scores? Not just last time you took a lesson?


//get cached lessons by id
CachedLessons.getById(lessonId) : Lesson

//gets currently set scheduler
lessonScheduler = LessonSchedulerBuilder.get() 

//gets list of suggestions for revision 
suggestions = lessonScheduler.getSuggestions() 


* Store code for new Schedulers dynamically w/ Dexie


# Anki

from: https://github.com/aiman-al-masoud/psittacus/issues/1

* look into Anki: https://apps.ankiweb.net/ and its formats

# Refactoring

* Refactor folders!!!!!!!!!!!! Maybe make a folder just for Lesson and all of its dependencies, for the prospect of having a Lesson scheduler that will depend on Lesson. 

* Replace React's "dangerouslySetInnerHTML" with an equivalent (but no-js) solution

https://github.com/aiman-al-masoud/psittacus/issues/2

https://github.com/aiman-al-masoud/psittacus/blob/ecb7318803b888beedb1ef8bb3caa858caeb1fef/app/src/view/take_lesson/take_lesson.jsx#L85

* Add type annotations to comments (where possible).

# Random Stuff

* Auto-change html language tag when language changes from settings:
```
 document. documentElement. setAttribute("lang", 'your language code');
```

# Graphical Stuff

* Top navbar? Or centered menu?

* Better hover over words tooltip.

* Get rid of "non-unique id" React warning