# add mechanism to post lessons to *a* server and retrieve them by metadata.

Server with the following apis:

login
access an existing account, receive session id

signup
create a new account on the server

upload-lesson
requires auth

download-lesson
doesn't require auth


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

* Use the Strategy Pattern on Lesson to implement **persistent**  spaced repetition (Leitner) alongside other kinds of (spaced-)repetitition.

https://en.wikipedia.org/wiki/Leitner_system


## SpacedRepetition "interface" will have:

* next() method, that gets called within Lesson's next() method. 

* getCurrent() ...

* isOver()  ...

* getScore() ...

* "constructor(lessonJson)"

The user will be able to select from the available SpacedRepetition algorithms from the settings menu. Settings.js will help with persistence.

## Persistence used for:

* remembering what kind of repetition mode the user selected.

* storing information on past "boxes" for each lesson:

```
{
lesson_id0 : {
    boxes: [ [propo_id0, propo_id3], [propo_id2, propo_id5]  ]
}  
}
```

Boxes subdivide Propositions into categories based on the user's proficiency in them. Propositions that the user gets wrong are moved to the first box, and they get shown to the user more often during the next "playback" of the lesson. 


Lesson id: a combination of author, target lang, source lang and title.
Proposition id: just its index within the Lesson's list


# Anki

from: https://github.com/aiman-al-masoud/psittacus/issues/1

* look into Anki: https://apps.ankiweb.net/ and its formats

# Refactoring

* Replace React's "dangerouslySetInnerHTML" with an equivalent (but no-js) solution

https://github.com/aiman-al-masoud/psittacus/issues/2

https://github.com/aiman-al-masoud/psittacus/blob/ecb7318803b888beedb1ef8bb3caa858caeb1fef/app/src/view/take_lesson/take_lesson.jsx#L85
