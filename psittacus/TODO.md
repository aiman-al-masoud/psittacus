# Refactoring

* extract Explanation from TakeLesson
* extract button component 
* extract read and play sentence component
* extract common superclass of SchedulerManager(s) ?
* extract "proposition wizard" from CraftLesson?

* **Turn jsons to class: LessonHistory?? ? w/:** 
[ lastTaken() ,propositionScores() ,overall() ,history() ]
(or just more type hints)

* Add type annotations to comments (where possible).


# Graphical Stuff

* bigger input text

* vertically center play button and make it a MenuButton in TakeLesson

* Improve craft lesson wizard: better positioning of back and forth arrows and sentence counter, Add keyboard shortcuts for navigation between propositions (back, forth) etc...

* Loading animation while downloading lesson indeces.

* number keys to select word in sentences 

* Fix other React warnings.

* Global linkable documentation mechanism 
    
    store current lesson and lessonBuilder and previous state in App, tbat go back to whatever the user was doing.

    pass goBack() callback to all components (children of App)

    method that allows to tell Documentation where to 
    jump to.


# Mobile Friendliness (Responsiveness)
...

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

* listen to audio and write what you hear questions 

* Multiple pages for a lesson's explanation, tbat link a specific explanation from a proposition.

* start downloading lesson indeces ASAP

* move lesson index filtering into Server's method

* auto-save while workiing

* import sentences from semi structured file

* List words and defs in a lesson.

* global lists of learned words (lessons in cache) for all languages.

* report problem or alternative/wrong solution on propostion during lesson

* Write some automated tests
[selenium, cypress, xdotool]


# PALG on Server?

* TTS may not work on server
* w/ Argostranslate NOT Google.
* js randomly samples uploaded text
* api on server to generate lesson and send it back as a response

# PR

* make new demo