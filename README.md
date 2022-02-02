# Psittacus


<p>Psittacus iratus linguas docet 🦜</p>
<p><em>The angry parrot teaches languages 🦜</em></p>


## What is it?

Psittacus is an open-source tool meant to facilitate language-learning and teaching, with a vision to empower teachers and learners of any written+spoken language.

It is based on the gamification of the sentence-mining approach, having an interface inspired by that of Duolingo and other competing interactive 
language learning-tools. Psittacus aims at democratizing the process of lesson-preparation, making it easy for teachers to prepare and share their lessons in a standardized and easily accessible format. 

## Whom does it appeal to?

* Language lovers.
* Teachers of any language that need to share quick homeworks/lessons with their students.
* Speakers of endangered languages that wish to preserve and spread their native tounge.
* Conlangers that want the world to learn their language.
* And many more...

## What are some of its main features?
* Easy-to-use interface for teachers to prepare lessons.
* Lessons can be taken fully offline, once sideloaded/prepared.
* Support for audio playback of sentences.
* Support for hover-over-the-word definitions.



# Details

<details>
  <summary><strong>Setting up a Local Testing Environment</strong></summary>

## 1) Clone this repo
...and navigate to its root directory.

## 2) Create a python virtual environment 
...calling it '.my_env' 

(For gitignore-related reasons).

```
$ python3 -m venv .my_env
```

(You'll be prompted to install the 'venv' module if you don't have it yet).

## 3) Activate the virtual environment:

```
$ source .my_env/bin/activate
```

If this command doesn't work try with:

```
$ . .my_env/bin/activate
```

(You should notice that the console starts displaying the virtual environment's name before your username and the dollar-sign).


## 4) Install this app's dependencies 
... on the virtual environment you just created:

```
(.my_env)$ pip install -r requirements.txt
```
## 5) Run the app on localhost!

```
(.my_env)$ python3 -m flask run
```

#### Sample output:

```
 * Environment: production
   WARNING: This is a development server. Do not use it in a production deployment.
   Use a production WSGI server instead.
 * Debug mode: off
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
```

Click on the link, and the homepage will be launched on your default browser.

</details>

