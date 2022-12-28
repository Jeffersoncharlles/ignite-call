
interface GetWeekDaysParams{
  short: boolean
  linguagem?:string
}


export const getWeekDays = ({short = false ,linguagem = 'pt-BR' }:GetWeekDaysParams) => {
  const formatter = new Intl.DateTimeFormat(linguagem, { weekday: 'long' })

  //criando array 7 position
  return Array.from(Array(7).keys())
    .map(day =>
      formatter.format(new Date(Date.UTC(2022, 10, day))))
    .map(weekday => {
      if (short) {
        return weekday.substring(0,3).toUpperCase()
      }

      return weekday
        .substring(0, 1)
        .toLocaleUpperCase()
        .concat(weekday
          .substring(1))//colocar primeira letra caixa alta
  })

}
