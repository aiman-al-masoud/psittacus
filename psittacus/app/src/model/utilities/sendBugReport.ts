import { Context } from "../Context";

/**
 * Opens up email with bug info.
 * @param errorText 
 * @param context 
 */
export function sendBugReport(errorText: string, context: Context) {

    if (confirm(context.L.confirm_send_bug_report)) {
        window.open(`mailto:${context.L.support_email}?subject=${context.L.psittacus_bug_report}&body=${context.L.errors_text}: ${errorText}\n\n`)
    }

}
