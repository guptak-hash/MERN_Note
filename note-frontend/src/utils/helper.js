export const getInitials = (name) => {
    if (!name) return ''
    const words = name.split(" ");
    let initials = ''
    if (words.length == 1) {
        initials += words[0][0]
    } else {
        for (let i = 0; i < Math.min(words.length, 2); i++) {
            initials += words[i][0]
        }
    }
    return initials.toUpperCase()
}