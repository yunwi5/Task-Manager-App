import { AbstractTask } from './AbstractTask';
import { SubTask } from './SubTask';
import { PlannerMode } from '../planner-models/PlannerMode';
import {
	getDateMonthFormat,
	getDateTimeFormat,
	getISOTimeFormat,
} from '../../utilities/time-utils/date-format';
import { addMinutes } from '../../utilities/time-utils/date-control';

export interface NoIdTask {
	id?: string;
	name: string;
	timeString: string;
	description: string;
	duration: number;
	category: string;
	subCategory: string;
	status: string;
	userId: string;
	importance: string;
	plannerType: PlannerMode;

	dueDateString?: string;
	isAnyDateTime?: boolean;
	comment?: string;
	subTasks?: SubTask[];
	templateId?: string;
}

export interface Task extends NoIdTask {
	id: string;
}

export class PlannerTask extends AbstractTask {
	constructor (taskObj: Task) {
		super(taskObj);
	}

	get durationFormat (): string {
		if (!this.duration) return '';

		if (this.plannerType === PlannerMode.WEEKLY) {
			let endTime: null | Date = null;
			if (this.duration) endTime = addMinutes(this.dateTime, this.duration);

			const startTimeFormat = getISOTimeFormat(this.dateTime);
			const endTimeFormat = endTime && getISOTimeFormat(endTime);
			const planDateFormat = endTimeFormat
				? `${startTimeFormat} ~ ${endTimeFormat}`
				: startTimeFormat;
			return planDateFormat;
		}
		return 'Not yet implemented';
	}

	get planDateFormat (): string {
		if (this.isAnyDateTime) return 'Any Time';
		else if (this.plannerType === PlannerMode.WEEKLY) {
			return getDateTimeFormat(this.dateTime);
		}
		return getDateMonthFormat(this.dateTime);
	}

	get dueDateFormat (): string {
		if (!this.dueDate) return '';
		return getDateMonthFormat(this.dueDate);
	}
}

export type FormTaskObject = {
	name: string;
	timeString: string;
	description: string;
	category: string;
	subCategory: string;
	status: string;
	importance: string;
	duration: number;
	plannerType?: PlannerMode;

	dueDateString?: string;
	isAnyDateTime?: boolean;
	templateId?: string;
};
