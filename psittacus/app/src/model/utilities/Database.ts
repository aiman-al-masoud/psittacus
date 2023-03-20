import Dexie from "dexie"
import { Table } from "dexie"
import { LessonData } from "../formats/LessonData"

export function getDatabase(): Database {
    return new DexieDatabase()
}

type LessonDataRecord = { id: string, lesson: LessonData }
type SourceCodeRecord = { classname: string, category: string, sourceCode: string }
type Record = LessonDataRecord | SourceCodeRecord
type TableName = 'cachedLessons' | 'customSourceCode'

export interface Database {
    get(table: 'cachedLessons', id: string): Promise<LessonDataRecord>
    get(table: 'customSourceCode', classname: string): Promise<SourceCodeRecord>
    add(table: 'cachedLessons', record: LessonDataRecord): Promise<any>
    add(table: 'customSourceCode', record: SourceCodeRecord): Promise<any>
    delete(table: TableName, id: string): Promise<void>
}

/**
 * JUST keeps track of all of the Dexie tables used 
 * all over the app.
 */
class DexieDatabase implements Database {

    readonly db = new Dexie("psittacus")
    readonly dbAny = this.db as any

    constructor() {
        this.db.version(4).stores({
            cachedLessons: 'id, lesson',
            customSourceCode: 'classname, category, sourceCode'
        })
    }

    add(name: TableName, record: Record): Promise<any> {
        return this.getTable(name).add(record)
    }

    delete(table: TableName, id: string): Promise<void> {
        return this.getTable(table).delete(id)
    }

    get(table: any, id: any): Promise<any> {
        return this.getTable(table).get(id) as any
    }

    protected getTable(tableName: TableName) {
        return (this.db as any)[tableName] as Table
    }

}


