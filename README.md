# Psittacus


<p>Psittacus iratus linguas docet 🦜</p>
<p><em>The angry parrot teaches languages 🦜</em></p>


## What is it?

Psittacus is a lightweight, open-source tool, meant to facilitate language-learning and teaching, and with a vision to empower teachers and learners of any written+spoken language around the world. 

Psittacus is based on the gamification of the sentence-mining approach, having an interface vaguely inspired by that of Duolingo and other competing interactive language learning-tools. 

Psittacus aims at democratizing the process of language-learning and teaching, making it easy for teachers to prepare and collaborate on their own lessons, and share them in a standardized and easily accessible format. 

## Whom does it appeal to?

* Language lovers in general. 🌍
* Teachers of any language that need to share quick homeworks/lessons with their students. 📚
* Speakers of endangered languages that wish to preserve and spread their native tounge. 🌱
* Conlangers that want the world to learn their constructed language. 🤓
* And many more...

## What are some of its main features?
* Simple interface for lang-teachers to prepare lessons.
* Possibility to edit and extend existing lessons.
* Lessons are stored in an easily shareable format. 
* Lessons can be taken fully offline, once downloaded/sideloaded.
* Support for audio playback of sentences.
* Support for hover-over-the-word definitions.


## Demo

<a href="https://youtu.be/estAGLc3uoE">https://youtu.be/estAGLc3uoE</a>





# Details

<details>
   <summary><strong>Lesson File Format</strong></summary>
   
   # Lesson File Format
   
  A 'lesson' comprises: sentence-pairs, word-definitions and audio-data. Each single lesson is made up of multiple 'propositions'. 
  Each proposition expresses an idea in two different languages. The information of a lesson is stored in the widely-known json format, 
  and can be shared as a simple text file. 
   
   
  ## The structure of a lesson-json is the following:
  
  ```   
   {   
        "metadata" : {}
        "propositions" : [proposition1, proposition2, proposition3, ...]        
   }
  ```

  ## Metadata looks like this:

  ```
  {
    "target_language" : "target lang",
    "source_language" : "source lang",
    "author" : "author-or-authors",  
    "last_modified" : 1644144766547
  }
  ```

  (More metadata may get added to lessons in the future).
   
  
  ## Each proposition has the following structure:
  
  ```
  {
   "sentence_one" : "ciao mondo",
   "sentence_two" : "hello world",
   "word_dict" : {"ciao":"hello", "mondo":"world"},
   "reverse_dict" : {"hello":"ciao", "world":"mondo"},
   "audio_base64" : "data:audio/mpeg;base64GkXfo5...",
   "target_to_native" : true
  }
  
  ```
   
   * sentence_one: the sentence in the **target language** (ie: the language the student wishes to learn).
   * sentence_two: the same idea expressed in the **student's language**.
   * audio_base64: the audio of sentence_one (in the **target language**) recorded by a native or proficient speaker. Encoded
   as audio-data in base-64. 
   * target_to_native: true if the user should be asked to translate from the target language to his/her native one, false otherwise.
   * word_dict: a dictionary that provides a brief description of each word of the target lang.
   * reverse_dict: a dictionary that provides a brief description of each word of the source lang in terms of the target lang.
   
   #### Please note that: 
   
   * A 'word' here simply means: 'a string of unicode characters surrounded by spaces'. 
   
   * The definition can and should be made up of more words, and may eventually include a brief analysis of the grammar (tense, gender, case markings...) if that helps the student understand the context better. In more 'advanced' lessons, this brief definition may be provided in
   terms of the target language, for those who favor a full-immersion approach.
   
</details>

<details>
<summary><strong>Testing</strong></summary>

# To build this web-app:

(You have to have yarn or npm installed).

## 1. Clone this repo:

... and open up its directory.

## 2. Install the dependencies:

```
yarn install 
```
## 3. Build:

```
yarn run build
```


## 4. Run:

Copy and paste the full path of:

```
/dist/index.html
```
... to your browser's navigation bar.


</details>


<details>
   <summary><strong>Experimental</strong></summary>
   
   # Automatic Lesson Generator
   
   <a href="https://github.com/aiman-al-masoud/psittacus_automatic_lesson_generator">https://github.com/aiman-al-masoud/psittacus_automatic_lesson_generator</a>
</details>





