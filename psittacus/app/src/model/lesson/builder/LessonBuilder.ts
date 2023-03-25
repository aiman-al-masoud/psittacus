import { PropositionBuilder } from '../../proposition/builder/PropositionBuilder'
import { BaseLessonBuilder } from './BaseLessonBuilder'
import { LessonData } from '../../formats/LessonData'
import { Metadata } from '../../formats/Metadata'
import { Context } from '../../context/Context'

/**
 * Builds, edits and saves lessons.
 */
export interface LessonBuilder {
    toJson(): LessonData
    getCurrent(): PropositionBuilder
    next(): void
    prev(): void
    setExplanation(html: string): LessonBuilder
    setMetadata(metadata: Metadata): LessonBuilder
    save(): void
    size(): number
    currentIndex(): number
    getMetadata(): Metadata
    getExplanation(): string
}

export function getLessonBuilder(data: Partial<LessonData>, context: Context): LessonBuilder {
    return new BaseLessonBuilder(data, context)
}

export const MetadataTemplate: Metadata = {
    author: '',
    source_language: '',
    target_language: '',
    title: '',
    last_modified: 0,
    psittacus_version: ''
}

export const MetadataIncompleteError = 'MetadataIncompleteError'