import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { FormTaskObject, Task } from '../../../../models/task-models/Task';
import {
	CategoryList,
	getSubCategory,
	Category,
	SubCategory
} from '../../../../models/task-models/Category';
import { getFormTaskObject, userHasInputs } from '../../../../utilities/form-utils/task-form-util';
import GeneralInputs from './form-sections/GeneralInputs';
import DurationInput from './form-sections/DurationInput';
import PlanTimeInput from './form-sections/plan-datetime/PlanDateTimeInput';
import DueDateInput from './form-sections/due-datetime/DueDateTimeInput';
import { getWeekEnding } from '../../../../utilities/time-utils/date-get';
import classes from './TaskForm.module.scss';
import FormButtons from './TaskFormButtons';

interface Props {
	onSubmit: (newTask: FormTaskObject) => void;
	beginningPeriod: Date;
	onHasEdit: (hasEdit: boolean) => void;
	userHasEdit?: boolean;
	isEdit?: boolean;
	initialTask?: Task;
	onDelete?: () => void;
}

export interface TemplateFormValues {
	name: string;
	description: string;
	importance: string;
	category: string;
	subCategory: string;

	day: string;
	time: string;
	dueDay: string;
	dueTime: string;

	durationHours: number;
	durationMinutes: number;
}

const TemplateTaskForm: React.FC<Props> = (props) => {
	const {
		onSubmit,
		beginningPeriod,
		initialTask,
		isEdit,
		onDelete,
		onHasEdit,
		userHasEdit
	} = props;
	const { register, watch, handleSubmit, formState: { errors } } = useForm<TemplateFormValues>();

	const defaultNoDueDate = initialTask && initialTask.dueDateString ? false : true;
	const [ isAnyDateTime, setIsAnyDateTime ] = useState(
		initialTask ? !!initialTask.isAnyDateTime : false
	);
	const [ isNoDueDate, setIsNoDueDate ] = useState(defaultNoDueDate);

	// For yearly task.
	const [ isMonthDateOnly, setIsMonthDateOnly ] = useState(false);

	const submitHandler = (data: TemplateFormValues) => {
		const newTask = getFormTaskObject(data as any, beginningPeriod, isMonthDateOnly);
		if (isAnyDateTime) {
			newTask.timeString = beginningPeriod.toString();
			newTask.isAnyDateTime = true;
		} else {
			newTask.isAnyDateTime = false;
		}
		if (isNoDueDate) {
			newTask.dueDateString = undefined;
		} else if (!newTask.dueDateString) {
			const weekEnding = getWeekEnding(beginningPeriod);
			newTask.dueDateString = weekEnding.toString();
		}
		console.log('newTask:', newTask);
		onSubmit(newTask);
	};

	const category = watch().category || (initialTask ? initialTask.category : CategoryList[0]);
	const subCategoryList: SubCategory[] = getSubCategory(category as Category);

	if (!userHasEdit && userHasInputs(watch)) {
		onHasEdit(true);
	}

	// Name, description, category, subcategory,
	// Importance, duration, planned datetime, due datetime
	return (
		<form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
			<section className={classes['form-content']}>
				<GeneralInputs
					initialTask={initialTask}
					register={register}
					errors={errors}
					subCategoryList={subCategoryList}
				/>

				<PlanTimeInput
					initialTask={initialTask}
					register={register}
					beginningPeriod={beginningPeriod}
					isAnyTime={isAnyDateTime}
					onAnyTime={setIsAnyDateTime}
					onMonthDateOnly={setIsMonthDateOnly}
					monthDateOnly={isMonthDateOnly}
				/>

				<DurationInput
					initialTask={initialTask}
					register={register}
					watch={watch}
					errors={errors}
				/>

				{/* Due Datetime */}
				<DueDateInput
					register={register}
					beginningPeriod={beginningPeriod}
					isNoDueDate={isNoDueDate}
					onDueDateExist={() => setIsNoDueDate((prev) => !prev)}
					watch={watch}
				/>
			</section>
			<FormButtons isEdit={isEdit} onDelete={onDelete} />
		</form>
	);
};

export default TemplateTaskForm;