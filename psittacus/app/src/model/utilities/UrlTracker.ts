import { Context } from "../context/Context"
import { Page } from "../settings/Keys"


export interface UrlTracker {

    change(oldPage: string, newPage: string): void
    start(): void
    stop(): void
    shakeOff(): void

}

export function getUrlTracker(context: Context): UrlTracker {
    return new BaseUrlTracker(context)
}

class BaseUrlTracker implements UrlTracker {

    protected intervalId: any

    constructor(
        readonly context: Context,
        protected pagesHistoryStack: Page[] = [],
        protected baseHref: string = location.protocol + '//' + location.host + location.pathname,
        protected currentHref: string = baseHref
    ) {

    }

    change(oldPage: Page, newPage: Page): void {
        this.pagesHistoryStack.push(oldPage)
        location.href = this.baseHref + "#" + newPage
        this.currentHref = location.href
    }

    start(): void {

        this.intervalId = setInterval(() => {
            this.goBack()
            this.shakeOff()
        }, 100);

    }

    shakeOff(): void { //"shake off" any annoying query string parameters from other websites
        if (location.href.includes("?")) {
            location.href = this.baseHref
        }
    }

    goBack() {
        if (this.currentHref != location.href) { //detect browser's back button

            this.currentHref = location.href
            let p = this.pagesHistoryStack.pop()

            if (p) {
                this.context.setPage(p)
            }

        }
    }

    stop(): void {
        clearInterval(this.intervalId)
    }

}