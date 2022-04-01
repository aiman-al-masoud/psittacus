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



* Implement a better spaced repetition strategy by subclassing Leitner or Scheduler.

https://en.wikipedia.org/wiki/Spaced_repetition

https://en.wikipedia.org/wiki/Leitner_system


* Clean-up and refactor related code.

* Fix problem of missing title in lessons that would lead to duplicate ids and inexisting proposition hashes.

* Common "stored user progress" interface among different Schedulers:

```json

"user_progress" : {

    "lesson_scores":{

        "lesson_id_0" : {
            "last_taken" : 164866215242,
            "overall" : 79,
            "propositions" : [["propo_hash_0", 80], ["propo_hash_1", 78]]
        },

        "lesson_id_1" : {
            "last_taken" : 164866100000,
            "overall" : 90,
            "propositions" : [["propo_hash_0", 100], ["propo_hash_1", 80]]
        }

   }

}

```


* Add scheduling (suggestion) for repeating whole lessons.

Save whole lessonJsons in localStorage (within "lesson_scores") so as to 
to able to schedule lessons.

About storage space:
10 proposition-lesson taking up about 40 kB. Say 20 Propo 80 kB. localStorage == 5MB. 5000/80 = 62 lessons.

```json
"cached_lessons" : {

}
```

or 


```json
"cached_propositions" : {
    
}
```


* Let SchedulerBuilder import files from an implmeneted schedulers' directory at build time, to try and reduce moving parts (types array in SchedulerBuilder).

* Maybe rename Scheduler to AbstractScheduler and SchedulerBuilder to Schedulers ?




# Anki

from: https://github.com/aiman-al-masoud/psittacus/issues/1

* look into Anki: https://apps.ankiweb.net/ and its formats

# Refactoring

* Refactor folders.

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