import { parseId } from "./parseId";
import { Metadata } from "../../formats/Metadata";

/**
 * Check if the id of a Lesson matches a certain category of Lessons.
 */

export function isMetadataMatching(lessonId: string, metadataFilter: Metadata) {

    const metadata = parseId(lessonId);

    return (
        ((metadataFilter.author || metadata.author) == metadata.author) &&
        ((metadataFilter.source_language || metadata.source_language) == metadata.source_language) &&
        ((metadataFilter.target_language || metadata.target_language) == metadata.target_language) &&
        ((metadataFilter.title || metadata.title) == metadata.title)
    );

}
