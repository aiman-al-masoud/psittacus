import { getPropositionBuilder } from '../../proposition/builder/PropositionBuilder';
import { saveToComp } from "../../utilities/saveToComp";
import { LessonData } from '../../formats/LessonData';
import { Metadata } from '../../formats/Metadata';
import { LessonBuilder, MetadataTemplate, packageJson, MetadataIncompleteError } from './LessonBuilder';

export class BaseLessonBuilder implements LessonBuilder {

    constructor(
        readonly data: Partial<LessonData>,
        readonly propositions = data.propositions?.length ? data.propositions.map(p => getPropositionBuilder(p)) : [getPropositionBuilder({})],
        protected current = 0,
        protected metadata = { ...MetadataTemplate, ...data.metadata ?? {} },
        protected explanationHtmlString = data.explanation?.text ?? ''
    ) {
    }

    toJson(): LessonData {
        return {
            metadata: { ...this.metadata, last_modified: new Date().getTime(), psittacus_version: packageJson.version },
            propositions: this.propositions.filter((p) => !p.isEmpty()).map((p) => p.toJson()),
            explanation: { text: this.explanationHtmlString }
        };
    }

    /**
     * Get the proposition currenlty under audit.
     */
    getCurrent() {
        return this.propositions[this.current];
    }

    /**
     * Point to the next proposition, either existing or new.
     */
    next() {

        //no new proposition, if current one is incomplete
        if (!(this.propositions[this.current].sentenceOne && this.propositions[this.current].sentenceTwo)) {
            return;
        }

        this.current++;
        this.propositions[this.current] = this.propositions[this.current] ?? getPropositionBuilder({});
    }

    /**
      * Point to the previous proposition.
      */
    prev() {
        this.current = this.propositions[this.current - 1] == undefined ? this.current : this.current - 1;
    }

    /**
     * Set the explanation's html string of the lesson.
     */
    setExplanation = (explanationHtmlString: string) => {
        this.explanationHtmlString = explanationHtmlString;
        return this;
    };

    /**
     * Prompt the user to save their work as a lesson json text file.
     * @throws {LessonBuilder.MetadataIncompleteError}
     */
    save = () => {

        //every metadata value MUST BE NON-FALSY!
        if (!Object.values(this.metadata).every(val => !!val)) {
            throw MetadataIncompleteError;
        }

        saveToComp(JSON.stringify(this.toJson()), `${this.metadata.title}.txt`, "text/plain");
    };

    /**
     * Amount of p propositions the resulting Lesson will contain.
     * (May actually be p-1 if last proposition is empty).
     */
    size = () => {
        return this.propositions.length;
    };

    /**
     * Index (starting from 1) of the current proposition being edited.
     */
    currentIndex = () => {
        return this.current + 1;
    };

    setMetadata(metadata: Metadata): LessonBuilder {
        this.metadata = metadata;
        return this;
    }

    getMetadata(): Metadata {
        return this.metadata;
    }

    getExplanation(): string {
        return this.explanationHtmlString;
    }
}
