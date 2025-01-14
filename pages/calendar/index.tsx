import type { NextPage } from 'next';
import Head from 'next/head';

import CalendarMain from '../../components/calendar/CalendarMain';
import useEventQuery from '../../hooks/useEventQuery';
import useTaskQuery from '../../hooks/useTaskQuery';
import useTodoQuery from '../../hooks/useTodoQuery';
import { AppProperty } from '../../constants/global-constants';
import useAuthNavigate from '../../hooks/useAuth';
import { CalendarItemType } from '../../models/calendar-models/CalendarItemType';

interface Props {
    // tasks: Task[];
    // todos: Todo[];
    // events: IEvent[];
}

const Calendar: NextPage<Props> = (props) => {
    // const { tasks: initialTasks, todos: initialTodos, events: initialEvents } = props;
    useAuthNavigate();

    const { allTasks: tasks, invalidateAllTasks: invalidateTasks } = useTaskQuery();
    const { events, invalidateEvents } = useEventQuery();
    const { todos, invalidateTodos } = useTodoQuery(null, null);

    const invalidateQueries = (target?: CalendarItemType) => {
        if (!target || target === CalendarItemType.EVENT) invalidateEvents();
        if (!target || target === CalendarItemType.TASK) invalidateTasks();
        if (!target || target === CalendarItemType.TODO) invalidateTodos();
    };

    return (
        <div>
            <Head>
                <title>Calendar | {AppProperty.APP_NAME}</title>
                <meta
                    name="description"
                    content="Calendar page for summarizing all user specific tasks and todos for a month"
                />
            </Head>
            <CalendarMain
                tasks={tasks}
                todos={todos}
                events={events}
                onInvalidate={invalidateQueries}
            />
        </div>
    );
};

// use getStaticPaths and getStaticProps
// for data fetching.
// Retrieve user ids from User table.

// export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
//     async getServerSideProps(context) {
//         // const { req, res } = context;
//         // const session = getSession(req, res);

//         // if (!session) {
//         //     return {
//         //         redirect: {
//         //             destination: '/login',
//         //             permanent: false,
//         //         },
//         //     };
//         // }

//         // // Get all tasks and todos of the user
//         // const userId: string = session.user.sub;
//         // if (!userId) {
//         //     return {
//         //         notFound: true,
//         //         redirect: { destination: '/login', permanent: false },
//         //     };
//         // }

//         // const todosPromise = getTodosFromPage(userId);
//         // const tasksPromise = getTasksFromAllCollection(userId);
//         // const eventsPromise = getEventsFromPage(userId);

//         // const [userTodoDocs, [wTaskDocs, mTaskDocs, yTaskDocs], eventDocs] = await Promise.all(
//         //     [todosPromise, tasksPromise, eventsPromise],
//         // );

//         // const taskDocs = [...wTaskDocs, ...mTaskDocs, ...yTaskDocs];
//         // // make sure the converted objects are json-serializable
//         // // meaning there should be no Date object which is not json-serializable
//         // const tasks = convertToAppObjectList(taskDocs, true);
//         // const todos = convertToAppObjectList(userTodoDocs, true);
//         // const events: IEvent[] = convertToAppObjectList(eventDocs, true);

//         return {
//             props: {
//                 // todos,
//                 // tasks,
//                 // events,
//             },
//         };
//     },
// });

export default Calendar;
