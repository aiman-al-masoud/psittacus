# Refactoring

* extract Explanation from TakeLesson

* extract button component 
* extract read and play sentence component
* extract common superclass of SchedulerManager(s) ?

* **Turn jsons to class: LessonHistory?? ? w/:** 
[ lastTaken() ,propositionScores() ,overall() ,history() ]
(or just more type hints)

* Add type annotations to comments (where possible).


# Add these to server?

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

# Random Stuff

* Write some automated tests
[selenium, cyprus, xdotool]

# Graphical Stuff

* Improve craft lesson wizard: sentence counter to know where you are, icons for buttons etc... Add keyboard shortcuts for navigation between propositions (back, forth) etc...

* Fix other React warnings.

* Global linkable documentation mechanism 
    
    store current lesson and lessonBuilder and previous state in App, tbat go back to whatever the user was doing.

    pass goBack() callback to all components (children of App)

    method that allows to tell Documentation where to 
    jump to.

* number keys to select word in sentences 

# Dynamic class loading

* Checks on methods and duck-typing-related error handling ?

# Mobile Friendliness (Responsiveness)
...

# Argostranslate running on python server to autogenerate lessons?


# Perf
* compress favicon (keep both, but only use compressed on webapp)