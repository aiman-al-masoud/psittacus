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

* Aggregate propositions from different lessons to create a new custom lesson for the purpose of revision. ("ArlecchinoLessonScheduler").

* Hide some propositions (easy ones)?

* Store time taken by user to answer to each question? (May be useful in scheduling)

* I guess there's no point in leaving PropositionScheduler abstract now...

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


### Unzipping:

https://gildas-lormeau.github.io/zip.js/demos/demo-read-file.html


view-source:https://gildas-lormeau.github.io/zip.js/demos/demo-read-file.js


# Refactoring

* Replace React's "dangerouslySetInnerHTML" with an equivalent (but no-js) solution

https://github.com/aiman-al-masoud/psittacus/issues/2

https://github.com/aiman-al-masoud/psittacus/blob/ecb7318803b888beedb1ef8bb3caa858caeb1fef/app/src/view/take_lesson/take_lesson.jsx#L85

* Add type annotations to comments (where possible).

* See if in App you can use prototype.constructor.name instead of the Pages enum.

* FIX UP HORRIBLE Settings.js!!!! Make it a singleton!!! Better handling of keys!!!!! Improve representation in localStorage!!! "settings": {...}

* Better (dynamic) handling of settings keys in Settings.jsx

* clean up console log mess in proposchedbuilder

# Random Stuff

* Fix-up keyboard shorcuts.

* Auto-change html language tag when language changes from settings:
```
 document. documentElement. setAttribute("lang", 'your language code');
```

* Write some automated tests
- selenium
- cyprus
- xdotool

# Graphical Stuff

* Top navbar? Or centered menu?

* Better hover over words tooltip.

* Fix other React warnings.

* Shorter, more concise titles and slightly longer tips.

* Email in info 