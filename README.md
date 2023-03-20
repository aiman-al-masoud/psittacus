# Psittacus

<p>Psittacus iratus linguas docet 🦜</p>
<p><em>The angry parrot teaches languages 🦜</em></p>

<img src='./psittacus/app/res/icons/favicon.png' />

## What is it?

Psittacus is a lightweight, open-source tool, meant to facilitate
language-learning and teaching, and with a vision to empower teachers and
learners of any written+spoken language around the world.

Psittacus is based on the gamification of the sentence-mining approach, having
an interface vaguely inspired by that of Duolingo and other competing
interactive language learning-tools.

Psittacus aims at democratizing the process of language-learning and teaching,
making it easy for teachers to prepare and collaborate on their own lessons, and
share them in a standardized and easily accessible format.

## Whom does it appeal to?

- Language lovers in general. 🌍
- Teachers of any language that need to share quick homeworks/lessons with their
  students. 📚
- Speakers of endangered languages that wish to preserve and spread their native
  tongue. 🌱 📼
- Conlangers that want the world to learn their constructed language. 🤓
- And many more...

## What are some of its main features?

- Simple interface for lang-teachers to prepare lessons.
- Possibility to edit and extend existing lessons.
- Lessons are stored in an easily shareable format.
- Lessons can be taken fully offline, once downloaded/sideloaded.
- Support for audio playback of sentences.
- Support for hover-over-the-word definitions.
- Support for spaced repetition strategies and automatic lesson scheduling.

## Link to Web-App

<a href="https://psittacus.eu.pythonanywhere.com/">https://psittacus.eu.pythonanywhere.com/</a>

## Demo

<a href="https://youtu.be/estAGLc3uoE">https://youtu.be/estAGLc3uoE</a>

## Take Test Lesson

<p>
<a href="https://drive.google.com/uc?export=download&id=1XjN370GYhlCX7BPPCr6gNDsXfteMDeLN" title="download lesson file" alt="download lesson file">Download</a>
this test lesson-file and try it out on Psittacus (open it with "Take Lesson" on the main-menu of the web-app). Watch the Demo for more help.
</p>

# Details

<details>
   <summary><strong>Lesson File Format</strong></summary>

# Lesson File Format

A 'lesson' comprises: sentence-pairs, word-definitions and audio-data. Each
single lesson is made up of multiple 'propositions'. Each proposition expresses
an idea in two different languages. The information of a lesson is stored in the
widely-known json format, and can be shared as a simple text file.

## The structure of a lesson-json is the following:

[Lesson](./psittacus/app/src/model/formats/LessonData.ts)

## Metadata looks like this:

[Metadata](./psittacus/app/src/model/formats/Metadata.ts)

## Each proposition has the following structure:

[Proposition](./psittacus/app/src/model/formats/PropositionData.ts)

</details>

<details>
<summary><strong>Testing</strong></summary>

# To build this web-app:

(You have to have yarn or npm installed).

## 1. Clone this repo:

... and open up its directory.

## 2. Install the dependencies:

### yarn:

```
yarn install
```

### npm:

```
npm ci
```

Use **ci** (clean install) instead of `npm i`, to make sure you're building the
project with the exact tested dependencies from `package-lock.json`, and not
overwriting them.

## 3. Build:

```
yarn run build
```

## 4. Run:

Copy and paste the full path of:

```
/psittacus/dist/index.html
```

... to your browser's navigation bar.

## Debugging:

- Use:

```
yarn run dev-build
```

to generate an un-minified developer build (easier to debug).

## Contributing

### Adding a Language

- [Translate the App](./psittacus/app/res/lang_packs/)
- [Have a look at the TODOs](./psittacus/TODO.md)

To propose your change feel free to post a pull request.

</details>

<details>
   <summary><strong>Experimental</strong></summary>

# Automatic Lesson Generator

For more info:

<a href="./palg/README.md"> `./palg/README.md` </a>

</details>

<details>
   <summary><strong>Credits</strong></summary>

# Images/Sounds

- [Icons](./psittacus/app/res/icons/Icons.ts)
- [Sounds](./psittacus/app/res/sounds/Sounds.ts)

</details>
