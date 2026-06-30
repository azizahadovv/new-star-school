package com.nss.utility;

import com.nss.entity.Timetable;
import com.nss.model.response.TimetableScheduleResponse;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.util.Comparator;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;

@Service
public class Utility {

    public static final String IMAGE_URL ="https://newstarschool.uz/api/v1/files/";

    public Map<DayOfWeek, List<TimetableScheduleResponse>> convertToScheduleResponses(List<Timetable> actualTimetables) {
        Map<DayOfWeek, List<TimetableScheduleResponse>> scheduleResponses = new EnumMap<>(DayOfWeek.class);

        for (DayOfWeek day : DayOfWeek.values()) {
            if (day == DayOfWeek.SUNDAY) {
                continue;
            }
            List<TimetableScheduleResponse> dayTimetables = actualTimetables.stream()
                    .filter(t -> t.getDayOfWeek().equals(day))
                    .map(this::toResponse)
                    .sorted(Comparator.comparingInt(TimetableScheduleResponse::lessonNumber))
                    .toList();
            scheduleResponses.put(day, dayTimetables);
        }

        return scheduleResponses;
    }

    private TimetableScheduleResponse toResponse(Timetable timetable) {
        return new TimetableScheduleResponse(
                timetable.getId(),
                timetable.getTerm().getId(),
                timetable.getSchoolClass().getId(),
                timetable.getSchoolClass().getName(),
                timetable.getTeacher().getId(),
                timetable.getTeacher().getFirstName() + " " + timetable.getTeacher().getLastName(),
                timetable.getSubject().getName(),
                timetable.getDayOfWeek().toString(),
                timetable.getSchoolTime().getStartTime(),
                timetable.getSchoolTime().getEndTime(),
                timetable.getSchoolTime().getNumber()
        );
    }
}
