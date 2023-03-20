import { Metadata } from "../../formats/Metadata";

/**
 * Parses a Lesson id
 */


export function parseId(lessonId: string): Metadata {
    return Object.fromEntries(lessonId.split(";").filter(x => !!x).map(x => x.split("=")));
}
