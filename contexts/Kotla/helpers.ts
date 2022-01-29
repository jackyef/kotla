export const getTodayDateString = () => {
  const today = new Date()

  return `${today.getFullYear()}${today.getMonth()}${today.getDate()}`
}
