import { Context } from "../../context/Context";
import { Lesson } from "../../lesson/Lesson";
import UntilAllCorrect from "./classes/UntilAllCorrect";
import WorstFirst from "./classes/WorstFirst";
import { PropositionScheduler } from "./PropositionScheduler";

//@ts-ignore
import ClassLoader from "../../utilities/ClassLoader"

export function getPropoSchedulerFactory(context: Context): PropoSchedulerFactory {
    return new BasePropoSchedulerFactory(context)
}

export interface PropoSchedulerFactory {
    get(lesson: Lesson): PropositionScheduler
    add(sourceCode: string): void
    getTypes(): string[]
    describeCurrent(): string
    getTemplate(): string
}

const CATEGORY_CUSTOM_CODE = "PropositionScheduler"

class BasePropoSchedulerFactory implements PropoSchedulerFactory {

    readonly schedulersList = [WorstFirst, UntilAllCorrect]
    readonly schedulers = this.schedulersList.map(x => ({ [x.getType()]: x })).reduce((a, b) => ({ ...a, ...b }))

    constructor(
        readonly context: Context,
    ) {
        // this.reload() //TODO!
    }

    get(lesson: Lesson): PropositionScheduler {

        const choice = this.context.get('PROPOSITION_SCHEDULER') ?? 'UntilAllCorrect'
        const cons = this.schedulers[choice]
        const scores = this.context.UP.scoresForLesson(lesson.getId())
        const propositions = lesson.getPropositions()

        return new cons(this.context, scores, propositions)
    }

    add(sourceCode: string): void {
        ClassLoader.storeCustomCode(CATEGORY_CUSTOM_CODE, sourceCode)
    }

    getTypes(): string[] {
        return Object.keys(this.schedulers)
    }

    async reload() {

        let manySourceCodes = await ClassLoader.sourceCodesByCategory(CATEGORY_CUSTOM_CODE)

        for (const s of manySourceCodes) {
            const clazz = await new ClassLoader().fromSourceCode(s.sourceCode)
            this.schedulers[`${clazz.getType()} (CUSTOM)`] = clazz
        }
    }

    describeCurrent(): string {
        const choice = this.context.get('PROPOSITION_SCHEDULER') ?? 'UntilAllCorrect'
        return (this.schedulers[choice] as any).getDescription(this.context)
    }

    getTemplate(): string {
        return "class MyPropoScheduler{\n\nconstructor(oldScores, propositions){\n\n}\n\nnext(){\n\n}\n\nisOver(){\n\n}\n\nstatic getType(){\n\n}\n\nstatic getDescription(){\n\n}  \n\n}"
    }

}