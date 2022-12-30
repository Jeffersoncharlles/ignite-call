import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Calendar } from "../../../../../components/Calendar";
import { api } from "../../../../../lib/axios";
import { Container, TimePicker, TimePickerHeader, TimePickerList, TimerPickerItem } from "./styles";

interface Availability {
  possibleTimes: number[]
  availabilityTimes: number[]
}


export function CalendarStep() {
  const [selectedDate,setSelectedDate] = useState<Date | null>(null)
  const [availability, setAvailability] = useState<Availability | null>(null)
  const router = useRouter()

  const username = String(router.query?.username)

  const hasSelectedDate = !!selectedDate

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') :null
  const describedDate = selectedDate ? dayjs(selectedDate).format('DD[ de ]MMMM') : null

  const availabilityGetAll = async () => {
    const result = await api.get(`/users/${username}/availability`, {
      params: {
        date: dayjs(selectedDate).format('YYYY-MM-DD')
      }
    })
    if (result.data) {
      setAvailability(result.data)
    }
  }

  useEffect(() => {
    if (!selectedDate) {
      return;
    }
    availabilityGetAll()
  }, [selectedDate, username])

  return (
    <Container isTimePickerOpen={hasSelectedDate}>
      <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />

      {hasSelectedDate && (
        <TimePicker>
          <TimePickerHeader>
            {weekDay} <span>{describedDate}</span>
          </TimePickerHeader>
          <TimePickerList>
            {availability?.possibleTimes.map(hour => {
              return (
                <TimerPickerItem key={hour.toString()} disabled={!availability.availabilityTimes.includes(hour)}>
                  {String(hour).padStart(2,'0')}:00h
                </TimerPickerItem>
              )
            })}
          </TimePickerList>
        </TimePicker>
      )}
   </Container>
  )
}
