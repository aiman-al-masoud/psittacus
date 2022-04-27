import Dexie from "dexie"
import { Table } from "dexie"

/**
 * Database ...
 */
export default class Database {

    static instance = null

    constructor() {

        this.db = new Dexie("psittacus")

        this.db.version(2).stores({
            cachedLessons: "id, lesson",
            customPropositionSchedulers : "classname, sourceCode"
        })
    }

    /**
     * @returns {Database}
     */
    static get(){
        return ( Database.instance = Database.instance ?? new Database() )
    }

    /**
     * 
     * @returns {Table}
     */
    cachedLessons() {
        return this.db.cachedLessons
    }

    /**
     * 
     * @returns {Table}
     */
    customPropositionSchedulers(){
        return this.db.customPropositionSchedulers
    }

}


