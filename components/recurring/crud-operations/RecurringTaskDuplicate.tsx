import React from 'react';

import useRecurringTaskQuery from '../../../hooks/recurring-item-hooks/useRecurringTaskQuery';
import { NoIdRecurringTask } from '../../../models/recurring-models/RecurringTask';
import { AbstractTask } from '../../../models/task-models/AbstractTask';
import WrapperModal from '../../ui/modal/wrapper/WrapperModal';
import RecurringTaskForm from './form/RecurringTaskForm';

interface Props {
    onClose: () => void;
    onDuplicate: () => void;
    initialTask: AbstractTask;
}

const RecurringTaskDuplicate: React.FC<Props> = (props) => {
    const { onClose, onDuplicate, initialTask } = props;
    const { addRecTask } = useRecurringTaskQuery({
        onInvalidate: () => {
            onDuplicate();
            onClose();
        },
    });

    const duplicateHandler = async (newRecurringTask: NoIdRecurringTask) => {
        addRecTask(newRecurringTask);
    };

    return (
        <WrapperModal onClose={onClose}>
            <RecurringTaskForm
                onSubmit={duplicateHandler}
                onClose={onClose}
                beginningPeriod={initialTask.dateTime}
                initialTask={initialTask}
                heading={'Duplicate Recurring Task'}
                isEdit={false}
            />
        </WrapperModal>
    );
};

export default RecurringTaskDuplicate;
