# Add mechanism to post lessons to *a* server and retrieve them by metadata.

Server with the following apis:

* download-lesson
doesn't require auth

* query-lessons
doesn't require auth

#### FOR LATER:

* login
access an existing account, receive session id

* signup
create a new account on the server

* upload-lesson
requires auth

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

* Store time taken by user to answer each question? (May be useful in scheduling)

* PropositionScheduler implementation that hides best sentences for some time.

* importing/exporting/deleting single cached lessons?

* MixedWorseLesson and GUI: add same target-language constraint!!

# Anki

from: https://github.com/aiman-al-masoud/psittacus/issues/1

* look into Anki: https://apps.ankiweb.net/ and its formats

### Unzipping:

https://gildas-lormeau.github.io/zip.js/demos/demo-read-file.html

view-source:https://gildas-lormeau.github.io/zip.js/demos/demo-read-file.js


# Refactoring

* extract common superclass of SchedulerManager(s) ?

* **Turn jsons to class: LessonScores ? w/:**
[ lastTaken() ,propositionScores() ,overall() ,history() ]

* Add type annotations to comments (where possible).

# Random Stuff

* Alert user when saving broken lessons

* Fix-up keyboard shorcuts.

* Write some automated tests
[selenium, cyprus, xdotool]

# Graphical Stuff

* Top navbar? Or centered menu?

* Better hover over words tooltip.

* Fix other React warnings.

* Global linkable documentation mechanism 
    
    store current lesson and lessonBuilder and previous state in App, tbat go back to whatever the user was doing.

    pass goBack() callback to all components (children of App)

    method that allows to tell Documentation where to 
    jump to.

# Dynamic class loading

* centralize all dynamic class manipulating methods in ClassLoader as much as possible

* Checks on methods and duck-typing-related error handling 

# Security

* Replace React's "dangerouslySetInnerHTML" with an equivalent (but no-js) solution

https://github.com/aiman-al-masoud/psittacus/issues/2

https://github.com/aiman-al-masoud/psittacus/blob/ecb7318803b888beedb1ef8bb3caa858caeb1fef/app/src/view/take_lesson/take_lesson.jsx#L85

* Add CSP to server to prevent loading custom code, but allow it with locally downloaded page

# Mobile Friendliness (Responsiveness)
...
