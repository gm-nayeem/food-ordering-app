export const dbTimeForHuman = (str) => {
    if (str.length) {
        return str.replace('T', ' ').substring(0, 16);
    }
}