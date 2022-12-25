export const converteTimeInMinutes = (timeString:string) => {
  const [hours, minutes] = timeString.split(':').map(Number)

  return (hours * 60) + minutes
}
