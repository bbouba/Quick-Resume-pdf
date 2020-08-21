export function displayDate(dateConv) {
    let date = new Date(dateConv)
    const month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)
    const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
    date = day + "/" + month + "/" + date.getFullYear()
    return date
}

export const editDate = (dateConv) => {
    let date = new Date(dateConv)
    const month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)
    const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
    date = date.getFullYear() + "-" + month + "-" + day
    return date
}