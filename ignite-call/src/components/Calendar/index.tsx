import dayjs from "dayjs"
import { CaretLeft, CaretRight } from "phosphor-react"
import { useMemo, useState } from "react"
import { getWeekDays } from "../../utils/get-week-days"
import { CalendarActions, CalendarBody, CalendarContainer, CalendarDay, CalendarHeader, CalendarTitle } from "./styles"


interface CalendarWeek {
  week: number
  days: {
    date: dayjs.Dayjs
    disable:boolean
  }[]
}

type CalendarWeeks = CalendarWeek[]

export const Calendar = () => {
  const [currentDate,setCurrentDate] = useState(() => {
    return dayjs().set('date',1)//setando dia 1
  })

  const shortWeekDays = getWeekDays({short:true})

  const currentMoth = currentDate.format('MMMM')
  const currentYear = currentDate.format('YYYY')

  const handlePreviewsMonth = () => {
    const previousMonthDate = currentDate.subtract(1, 'month')
    setCurrentDate(previousMonthDate)
  }

  const handleNextMonth = () => {
    const nextMonthDate = currentDate.add(1, 'month')
    setCurrentDate(nextMonthDate)
  }

  const calendarWeeks = useMemo(() => {
    //=============================================================================================//
    const daysInMonthArray = Array.from({
      length: currentDate.daysInMonth(),//retornando quando dias tem no mes
    }).map((_, index) => {
      //retornar a data atual porem o dia
      return currentDate.set('date',index+ 1)
    })
    //=============================================================================================//
    //pegar o primeiro dia do mes na semana
    const firstWeekDay = currentDate.get('day')//
    const previousMonthFillArray = Array.from({ length: firstWeekDay })
      .map((_,index) => {
        return currentDate.subtract(index + 1, 'day')
        //pegando a data que da do dia e retornando o dia do mes anterior
      }).reverse()//revert do array

    //=============================================================================================//
    //pegar o dia da semana do ultimo dia do mes
    const lastWeekDay = currentDate.set('date', currentDate.daysInMonth()).get('day')
    const nextMonthFillArray = Array.from({ length: 7 - (lastWeekDay + 1) }).map((_, index) => {
      // length: 7 - (lastWeekDay +1)
      // 7 dias da semana
      //lastWeekDay + 1 = começa do 0 ai para começar do 1
      return currentDate.set('date', currentDate.daysInMonth()).add(index + 1, 'day')
      //retornar a data
    })
    //=============================================================================================//

    const calendarDays = [
      ...previousMonthFillArray.map((date) => { return { date, disable: true } }),
      ...daysInMonthArray.map((date) => { return { date, disable: false } }),
      ...nextMonthFillArray.map((date) => { return { date, disable: true } }),
    ] //retornar todas as datas do mes anterior e todas do atual
    //=============================================================================================//

    const calendarWeeks = calendarDays.reduce<CalendarWeeks>((weeks, dates, index, original) => {
      const isNewWeek = index % 7 === 0 //se ele dividir por 7 e for igual a 0 ele retorna
      if (isNewWeek) {
        weeks.push({
          week: index / 7 + 1,//+1 para começar com 1
          days:original.slice(index, index+ 7)
        })
      }

      return weeks

    },[])//dividir em dias da semana

    return calendarWeeks
    //memoriza para nao ficar fazendo calculando novamente
  }, [currentDate])



  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>
          {currentMoth} <span>{currentYear}</span>
        </CalendarTitle>

        <CalendarActions>
          <button onClick={handlePreviewsMonth} title="previous month">
            <CaretLeft />
          </button>
          <button onClick={handleNextMonth} title="next month">
            <CaretRight />
          </button>
        </CalendarActions>
      </CalendarHeader>

      <CalendarBody>
        <thead>
          <tr>
            {shortWeekDays.map(weekDay => <th key={weekDay}>{weekDay}</th>)}
          </tr>
        </thead>
        <tbody>
          {calendarWeeks.map(({ week, days }) => {
            return (
              <tr key={week}>
                {days.map(({date,disable}) => {
                  return (
                    <td key={date.toString()}>
                      <CalendarDay disabled={disable}>{date.get('date')}</CalendarDay>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </CalendarBody>
    </CalendarContainer>
  )
}
