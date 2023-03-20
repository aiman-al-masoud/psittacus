

export interface Metadata {

    /**
     * the language the student wishes to learn.
     */
    target_language: string

    /**
     * the language that the sudent already knows.
     */
    source_language: string

    author: string
    title: string
    last_modified: number
    psittacus_version: string
}
