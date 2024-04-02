// Date Translation

function date(string) {

    // Months List
    const months = ['', 'January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    // Split string into components
    const arr = [string.slice(0, 4), string.slice(5, 7), string.slice(8, 10)]

    // Convert componenents into strings
    const year = arr[0]
    const month = months[parseInt(arr[1], 10)]
    const date = parseInt(arr[2], 10) + ''

    // Pain
    let ordinal;
    if (date == 1 || (date.slice(-1) == 1 && date > 11)) {
        ordinal = "st"
    } else if (date == 2 || (date.slice(-1) == 2 && date > 12)) {
        ordinal = "nd"
    } else if (date == 3 || (date.slice(-1) == 3 && date > 13)) {
        ordinal = "rd"
    } else {
        ordinal = "th"
    }

    // Assemble string
    return month + " " + date + ordinal + ", " + year
}


export default date
