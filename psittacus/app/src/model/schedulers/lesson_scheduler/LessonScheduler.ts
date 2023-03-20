import { Lesson } from "../../lesson/Lesson";
import { Context } from "../../Context";

/**
 * Decides what `Lesson` a user should revise.
 */
export interface LessonScheduler {
    next(): Promise<Lesson>
    getType(): string
    getDescription(context?: Context): string
}