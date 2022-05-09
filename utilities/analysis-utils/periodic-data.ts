import { FrequencyMap, getInitialFrequencyMap } from '.';
import { DayPeriod, DayPeriodList } from '../../models/date-models/DayPeriod';
import { getWeekDay, WeekDay, WeekDayListFromMonday } from '../../models/date-models/WeekDay';
import { AbstractTask } from '../../models/task-models/AbstractTask';

function getDayPeriod(date: Date): DayPeriod {
    if (date.getHours() < 12) {
        return DayPeriod.AM;
    }
    return DayPeriod.PM;
}

export function generateDayPeriodMap(tasks: AbstractTask[]): FrequencyMap {
    const dayPeriodMap: FrequencyMap = getInitialFrequencyMap(DayPeriodList);

    tasks.forEach((task) => {
        const dayPeriod = getDayPeriod(task.dateTime);
        dayPeriodMap[dayPeriod] += 1;
    });
    return dayPeriodMap;
}

const weekDayList: WeekDay[] = WeekDayListFromMonday.filter((wd) => wd !== WeekDay.ANY);

export function generateWeekDayMap(tasks: AbstractTask[]): FrequencyMap {
    const weekDayMap = getInitialFrequencyMap(weekDayList);

    tasks.forEach((task) => {
        const weekDay: WeekDay = getWeekDay(task.dateTime);
        if (weekDay in weekDayMap) weekDayMap[weekDay] += 1;
        else weekDayMap[weekDay] = 1;
    });
    return weekDayMap;
}
