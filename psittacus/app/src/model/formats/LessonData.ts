import { PropositionData } from "./PropositionData";
import { Metadata } from "./Metadata";


export interface LessonData {
    propositions: PropositionData[];
    metadata: Metadata;
    explanation: { text: string; };
}