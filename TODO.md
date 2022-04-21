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

https://en.wikipedia.org/wiki/Spaced_repetition


#### Better PropositionScheduler 'extension api', Overrideable methods:

getType() : return identifier for subclass (NO side effects)

isOver(): run test on class attributes (NO side effects)

next(): default just increments counter on this.propositions (side effects)

initSequence(): re-shuffle this.propositions (side effects).

constructor(oldScores, propositions): initialize  specific class attributes  (side effects). 

##### 'Final' methods:

getCurrent(): returns current (NO side effects). If current is nullish, it returns Proposition.NULL


----------------------------------------------------

* Store custom js code for new Schedulers dynamically w/ Dexie

* Scores are modified in the bg even when memory-less Schedulers are used, is this ok?

* Add list of suggestions to GUI History section.

//gets list of suggestions for revision 
lessons = lessonScheduler.getSuggestions() 

* **Turn jsons to class: LessonScores ? w/:**

* lastTaken()
* propositionScores()
* overall()
* history()

# Anki

from: https://github.com/aiman-al-masoud/psittacus/issues/1

* look into Anki: https://apps.ankiweb.net/ and its formats

# Refactoring

* Replace React's "dangerouslySetInnerHTML" with an equivalent (but no-js) solution

https://github.com/aiman-al-masoud/psittacus/issues/2

https://github.com/aiman-al-masoud/psittacus/blob/ecb7318803b888beedb1ef8bb3caa858caeb1fef/app/src/view/take_lesson/take_lesson.jsx#L85

* Add type annotations to comments (where possible).

* See if in App you can use prototype.constructor.name instead of the Pages enum.

# Random Stuff

* Fix-up keyboard shorcuts.

* Auto-change html language tag when language changes from settings:
```
 document. documentElement. setAttribute("lang", 'your language code');
```

# Graphical Stuff

* Top navbar? Or centered menu?

* Better hover over words tooltip.

* Fix other React warnings.

* Shorter, more concise titles and slightly longer tips.