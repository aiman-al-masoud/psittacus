/**
 * Lets user save a file to disk.
 * @param content 
 * @param fileName 
 * @param contentType 
 */
export function saveToComp(content: string, fileName: string, contentType: 'text/plain') {
    const a = document.createElement('a')
    const file = new Blob([content], { type: contentType })
    a.href = URL.createObjectURL(file)
    a.download = fileName
    a.click()
}
