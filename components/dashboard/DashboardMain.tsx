import React from 'react';
import { IEvent } from '../../models/Event';
import { AbstractTask } from '../../models/task-models/AbstractTask';
import DataSummary from './data-summary/DataSummary';
import ProgressSummary from './progress/ProgressSummary';
import TrendComparison from './trend/TrendComparison';
import UpcomingTable from './upcoming-table/UpcomingTable';

interface Props {
    tasks: AbstractTask[];
    events: IEvent[];
}

const DashboardMain: React.FC<Props> = () => {
    return (
        <main className="flex flex-col gap-4 p-3 pb-7 text-slate-700">
            <DataSummary />
            <div className="flex flex-col lg:flex-row gap-3">
                <div className="w-full lg:w-[50%] shadow-md rounded-md border-2 border-slate-200">
                    <UpcomingTable />
                </div>
                <section
                    className={`w-full lg:w-[50%] shadow-md rounded-md border-2 border-slate-200 p-2`}
                >
                    <TrendComparison />
                </section>
            </div>
            <ProgressSummary />
        </main>
    );
};

export default DashboardMain;