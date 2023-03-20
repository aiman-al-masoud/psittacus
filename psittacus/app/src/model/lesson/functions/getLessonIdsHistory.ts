import { isMetadataMatching } from "./isMetadataMatching";
import { Metadata } from "../../formats/Metadata";
import { Context } from "../../Context";

/**
* Retrieve the ids of the lessons in history, with optional filtering on their metadata.
*/

export function getLessonIdsHistory(context: Context, metadataFilter?: Metadata) {

    let ids = context.UP.lessonScores().map(l => l.lessonId);

    if (metadataFilter) {
        return ids.filter(id => isMetadataMatching(id, metadataFilter));
    }

    return ids;
}
