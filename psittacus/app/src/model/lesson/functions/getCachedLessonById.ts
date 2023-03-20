import { Context } from '../../Context';
import { getLesson } from '../Lesson';

/**
 * Load a previously cached Lesson on the DB back into memory.
 */

export async function getCachedLessonById(id: string, context: Context) {
    const record = await context.db.get('cachedLessons', id);
    return getLesson(record.lesson, context);
}
