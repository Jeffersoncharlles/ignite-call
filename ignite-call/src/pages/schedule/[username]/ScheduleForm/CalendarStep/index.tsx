import dayjs from "dayjs";
import { useState } from "react";
import { Calendar } from "../../../../../components/Calendar";
import { Container, TimePicker, TimePickerHeader, TimePickerList, TimerPickerItem } from "./styles";




export function CalendarStep() {
  const [selectedDate,setSelectedDate] = useState<Date | null>(null)

  const hasSelectedDate = !!selectedDate

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') :null
  const describedDate = selectedDate ? dayjs(selectedDate).format('DD[ de ]MMMM') :null


  return (
    <Container isTimePickerOpen={hasSelectedDate}>
      <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />

      {hasSelectedDate && (
        <TimePicker>
          <TimePickerHeader>
            {weekDay} <span>{describedDate}</span>
          </TimePickerHeader>
          <TimePickerList>
            <TimerPickerItem>08:00h</TimerPickerItem>
            <TimerPickerItem>09:00h</TimerPickerItem>
            <TimerPickerItem>10:00h</TimerPickerItem>
            <TimerPickerItem>11:00h</TimerPickerItem>
            <TimerPickerItem>12:00h</TimerPickerItem>
            <TimerPickerItem>13:00h</TimerPickerItem>
            <TimerPickerItem>14:00h</TimerPickerItem>
            <TimerPickerItem>15:00h</TimerPickerItem>
            <TimerPickerItem>16:00h</TimerPickerItem>
            <TimerPickerItem>17:00h</TimerPickerItem>
            <TimerPickerItem>18:00h</TimerPickerItem>
            <TimerPickerItem>19:00h</TimerPickerItem>
            <TimerPickerItem>20:00h</TimerPickerItem>
            <TimerPickerItem>21:00h</TimerPickerItem>
            <TimerPickerItem>22:00h</TimerPickerItem>
            <TimerPickerItem>23:00h</TimerPickerItem>
            <TimerPickerItem>24:00h</TimerPickerItem>
            <TimerPickerItem>01:00h</TimerPickerItem>
          </TimePickerList>
        </TimePicker>
      )}
   </Container>
  )
}
