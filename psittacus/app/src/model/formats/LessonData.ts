import { PropositionData } from "./PropositionData";
import { Metadata } from "./Metadata";


export interface LessonData {

    propositions: PropositionData[]
    metadata: Metadata

    /** 
     * for theoretical introductions or insights related to the propositions. 
     */
    explanation: { text: string }
}