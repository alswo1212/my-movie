export const getYesterday = () => {
    const today = new Date();
    const yesterday = new Date(today.setDate(today.getDate() - 1));
    return yesterday.toISOString().slice(0, 10).replaceAll('-', '')
}
export const getAWeekAgo = () => {
    const today = new Date();
    const yesterday = new Date(today.setDate(today.getDate() - 7));
    return yesterday.toISOString().slice(0, 10).replaceAll('-', '')
}