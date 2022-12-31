import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Calendar } from '../../../../../components/Calendar'
import { api } from '../../../../../lib/axios'
import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerList,
  TimerPickerItem,
} from './styles'

interface Availability {
  possibleTimes: number[]
  availabilityTimes: number[]
}
interface CalendarStepProps {
  onSelectDateTime: (date: Date) => void
}

export function CalendarStep({ onSelectDateTime }: CalendarStepProps) {
  const router = useRouter()
  const username = String(router.query?.username)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const hasSelectedDate = !!selectedDate
  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const describedDate = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : null

  const selectedDateWithoutTime = selectedDate
    ? dayjs(selectedDate).format('YYYY-MM-DD')
    : null
  const { data: availability } = useQuery<Availability>(
    ['availability', selectedDateWithoutTime],
    async () => {
      const response = await api.get(`/users/${username}/availability`, {
        params: {
          date: selectedDateWithoutTime,
        },
      })
      return response.data
    },
    {
      enabled: !!selectedDate, // validar so faz se existir selectedDate
    },
  ) // ele tem cache

  const handleSelectTime = (hour: number) => {
    const dateWithTime = dayjs(selectedDate)
      .set('hour', hour)
      .startOf('hour')
      .toDate()
    onSelectDateTime(dateWithTime)
  }

  // const [availability, setAvailability] = useState<Availability | null>(null)
  // const availabilityGetAll = async () => {
  //   const result = await api.get(`/users/${username}/availability`, {
  //     params: {
  //       date: dayjs(selectedDate).format('YYYY-MM-DD')
  //     }
  //   })
  //   if (result.data) {
  //     setAvailability(result.data)
  //   }
  // }

  // useEffect(() => {
  //   if (!selectedDate) {
  //     return;
  //   }
  //   availabilityGetAll()
  // }, [selectedDate, username])

  return (
    <Container isTimePickerOpen={hasSelectedDate}>
      <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />

      {hasSelectedDate && (
        <TimePicker>
          <TimePickerHeader>
            {weekDay} <span>{describedDate}</span>
          </TimePickerHeader>
          <TimePickerList>
            {availability?.possibleTimes.map((hour) => {
              return (
                <TimerPickerItem
                  key={hour.toString()}
                  disabled={!availability.availabilityTimes.includes(hour)}
                  onClick={() => handleSelectTime(hour)}
                >
                  {String(hour).padStart(2, '0')}:00h
                </TimerPickerItem>
              )
            })}
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  )
}
