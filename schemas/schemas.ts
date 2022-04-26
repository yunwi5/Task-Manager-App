import Joi from "joi";

export const taskSchema: Joi.ObjectSchema<any> = Joi.object({
    name: Joi.string().required(),
    timeString: Joi.string().required(),
    description: Joi.string().required(),
    duration: Joi.number().required(),
    category: Joi.string().required(),
    subCategory: Joi.string().required(),
    status: Joi.string().required(),
    userId: Joi.string().required(),
    importance: Joi.string().required(),
    plannerType: Joi.string().required(),

    // Optional attributes
    id: Joi.string(),
    dueDateString: Joi.string(),
    isAnyDateTime: Joi.boolean(),
    comment: Joi.string(),
    templateId: Joi.string(),
    subTasks: Joi.array(),
});

export const subTaskSchema: Joi.ObjectSchema<any> = Joi.object({
    name: Joi.string().required(),
    isImportant: Joi.boolean().required(),
    isCompleted: Joi.boolean().required(),
    order: Joi.number().required(),
    parentTaskId: Joi.string().required(),
    isTemplated: Joi.boolean(), // optional attribute to indicate if the subtask is a child of template task.
});

export const templateSchema: Joi.ObjectSchema<any> = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    importance: Joi.number().required(),
    userId: Joi.string().required(),
});

export const eventSchema = Joi.object({
    id: Joi.string(),
    name: Joi.string().required(),
    dateTime: Joi.alternatives().try(Joi.string(), Joi.date()).required(),
    status: Joi.string().required(),
    description: Joi.string().required(),
    duration: Joi.number().required(),
    meetingLink: Joi.string(),
    location: Joi.string(),
    importance: Joi.string(),
    participants: Joi.alternatives(Joi.array(), Joi.object()),
    userId: Joi.string(),
});

// Validate subTasks properties object. This is not an entire SubTask object, so there is no required().
// It contain all subTasks props that can be updated.
export const subTaskPropsSchema: Joi.ObjectSchema<any> = Joi.object({
    name: Joi.string(),
    isImportant: Joi.boolean(),
    isCompleted: Joi.boolean(),
    order: Joi.number(),
    parentTaskId: Joi.string(),
    isTemplated: Joi.boolean(), // optional attribute to indicate if the subtask is a child of template task.
});

export const templatePropsSchema: Joi.ObjectSchema<any> = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    importance: Joi.number(),
    userId: Joi.string(),
});

export const taskPropsSchema: Joi.ObjectSchema<any> = Joi.object({
    name: Joi.string(),
    timeString: Joi.string(),
    description: Joi.string(),
    duration: Joi.number(),
    category: Joi.string(),
    subCategory: Joi.string(),
    status: Joi.string(),
    userId: Joi.string(),
    importance: Joi.string(),
    plannerType: Joi.string(),

    dueDateString: Joi.string(),
    isAnyDateTime: Joi.boolean(),
    comment: Joi.string(),
    templateId: Joi.string(),
    subTasks: Joi.array(),
});
