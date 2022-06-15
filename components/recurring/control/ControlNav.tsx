import React, { useState } from 'react';

import { RecurringItemMode } from '../../../models/recurring-models';
import { useAppDispatch, useAppSelector } from '../../../store/redux';
import AddItemIcon from '../../ui/icons/AddItemIcon';
import RecurringEventAdd from '../crud-operations/RecurringEventAdd';
import RecurringTaskAdd from '../crud-operations/RecurringTaskAdd';
import RecurringEventSorter from './RecurringEventSorter';
import RecurringSearch from './RecurringSearch';
import { recurringActions } from '../../../store/redux/recurring-slice';
import CustomMUIButton from '../../ui/buttons/CustomMUIButton';

interface Props {
    onInvalidate(): void;
}

// sorting selects on the left, searchbar and add icon on the right
const ControlNav: React.FC<Props> = ({ onInvalidate }) => {
    const [showItemAdd, setShowItemAdd] = useState(false);
    const dispatch = useAppDispatch();
    const { mode, showDetail } = useAppSelector((state) => state.recurring);
    const isEvent = mode === RecurringItemMode.EVENT;

    // Trigger event add when this icon is clicked by the user.
    const addModalHandler = (show: boolean) => () => setShowItemAdd(show);

    const itmeDetailhandler = () => dispatch(recurringActions.toggleShowDetail());

    return (
        <nav className={'flex items-center gap-3 xl:mr-10'}>
            <RecurringEventSorter />
            <CustomMUIButton onClick={itmeDetailhandler}>
                <span>{showDetail ? 'Hide Detail' : 'Show Detail'}</span>
            </CustomMUIButton>
            <RecurringSearch />
            <div>
                <AddItemIcon text={`Add ${mode}`} onClick={addModalHandler(true)} />
            </div>
            {showItemAdd && isEvent && (
                <RecurringEventAdd onClose={addModalHandler(false)} onAdd={onInvalidate} />
            )}
            {showItemAdd && !isEvent && (
                <RecurringTaskAdd onClose={addModalHandler(false)} onAdd={onInvalidate} />
            )}
        </nav>
    );
};

export default ControlNav;
