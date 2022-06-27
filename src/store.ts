import storage from 'store2';
import {nanoid} from 'nanoid';
import {InjectionKey} from 'vue';
import {Router} from 'vue-router';
import {createStore, Store} from 'vuex';
import {Board, Column, Task} from '@interfaces';
import {filterById, findById, getRandomColor, last} from '@helpers/common';

export interface State {
  boards: Board[];
  isDarkTheme: boolean;
  isSidebarVisible: boolean;
  currentBoard: Board | null;
}

const initialState: State = {
  boards: [
    {
      id: nanoid(),
      path: '/platform-launch',
      name: 'Platform Launch',
      columns: [
        {
          id: nanoid(),
          color: getRandomColor(),
          name: 'Todo',
          tasks: [
            {
              id: nanoid(),
              title: 'Build UI for onboarding flow',
              description: '',
              status: 'Todo',
              subtasks: [
                {
                  id: nanoid(),
                  title: 'Sign up page',
                  isCompleted: true,
                },
                {
                  id: nanoid(),
                  title: 'Sign in page',
                  isCompleted: false,
                },
                {
                  id: nanoid(),
                  title: 'Welcome page',
                  isCompleted: false,
                },
              ],
            },
            {
              id: nanoid(),
              title: 'Build UI for search',
              description: '',
              status: 'Todo',
              subtasks: [
                {
                  id: nanoid(),
                  title: 'Search page',
                  isCompleted: false,
                },
              ],
            },
            {
              id: nanoid(),
              title: 'Build settings UI',
              description: '',
              status: 'Todo',
              subtasks: [
                {
                  id: nanoid(),
                  title: 'Account page',
                  isCompleted: false,
                },
                {
                  id: nanoid(),
                  title: 'Billing page',
                  isCompleted: false,
                },
              ],
            },
            {
              id: nanoid(),
              title: 'QA and test all major user journeys',
              description:
                'Once we feel version one is ready, we need to rigorously test it both internally and externally to identify any major gaps.',
              status: 'Todo',
              subtasks: [
                {
                  id: nanoid(),
                  title: 'Internal testing',
                  isCompleted: false,
                },
                {
                  id: nanoid(),
                  title: 'External testing',
                  isCompleted: false,
                },
              ],
            },
          ],
        },
        {
          id: nanoid(),
          color: getRandomColor(),
          name: 'Doing',
          tasks: [
            {
              id: nanoid(),
              title: 'Design settings and search pages',
              description: '',
              status: 'Doing',
              subtasks: [
                {
                  id: nanoid(),
                  title: 'Settings - Account page',
                  isCompleted: true,
                },
                {
                  id: nanoid(),
                  title: 'Settings - Billing page',
                  isCompleted: true,
                },
                {
                  id: nanoid(),
                  title: 'Search page',
                  isCompleted: false,
                },
              ],
            },
            {
              id: nanoid(),
              title: 'Add account management endpoints',
              description: '',
              status: 'Doing',
              subtasks: [
                {
                  id: nanoid(),
                  title: 'Upgrade plan',
                  isCompleted: true,
                },
                {
                  id: nanoid(),
                  title: 'Cancel plan',
                  isCompleted: true,
                },
                {
                  id: nanoid(),
                  title: 'Update payment method',
                  isCompleted: false,
                },
              ],
            },
            {
              id: nanoid(),
              title: 'Design onboarding flow',
              description: '',
              status: 'Doing',
              subtasks: [
                {
                  id: nanoid(),
                  title: 'Sign up page',
                  isCompleted: true,
                },
                {
                  id: nanoid(),
                  title: 'Sign in page',
                  isCompleted: false,
                },
                {
                  id: nanoid(),
                  title: 'Welcome page',
                  isCompleted: false,
                },
              ],
            },
            {
              id: nanoid(),
              title: 'Add search enpoints',
              description: '',
              status: 'Doing',
              subtasks: [
                {
                  id: nanoid(),
                  title: 'Add search endpoint',
                  isCompleted: true,
                },
                {
                  id: nanoid(),
                  title: 'Define search filters',
                  isCompleted: false,
                },
              ],
            },
            {
              id: nanoid(),
              title: 'Add authentication endpoints',
              description: '',
              status: 'Doing',
              subtasks: [
                {
                  id: nanoid(),
                  title: 'Define user model',
                  isCompleted: true,
                },
                {
                  id: nanoid(),
                  title: 'Add auth endpoints',
                  isCompleted: false,
                },
              ],
            },
            {
              id: nanoid(),
              title:
                'Research pricing points of various competitors and trial different business models',
              description:
                "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
              status: 'Doing',
              subtasks: [
                {
                  id: nanoid(),
                  title: 'Research competitor pricing and business models',
                  isCompleted: true,
                },
                {
                  id: nanoid(),
                  title: 'Outline a business model that works for our solution',
                  isCompleted: false,
                },
                {
                  id: nanoid(),
                  title:
                    'Talk to potential customers about our proposed solution and ask for fair price expectancy',
                  isCompleted: false,
                },
              ],
            },
          ],
        },
        {
          id: nanoid(),
          color: getRandomColor(),
          name: 'Done',
          tasks: [
            {
              id: nanoid(),
              title: 'Conduct 5 wireframe tests',
              description:
                'Ensure the layout continues to make sense and we have strong buy-in from potential users.',
              status: 'Done',
              subtasks: [
                {
                  id: nanoid(),
                  title: 'Complete 5 wireframe prototype tests',
                  isCompleted: true,
                },
              ],
            },
            {
              id: nanoid(),
              title: 'Create wireframe prototype',
              description:
                'Create a greyscale clickable wireframe prototype to test our asssumptions so far.',
              status: 'Done',
              subtasks: [
                {
                  id: nanoid(),
                  title: 'Create clickable wireframe prototype in Balsamiq',
                  isCompleted: true,
                },
              ],
            },
            {
              id: nanoid(),
              title: 'Review results of usability tests and iterate',
              description:
                "Keep iterating through the subtasks until we're clear on the core concepts for the app.",
              status: 'Done',
              subtasks: [
                {
                  id: nanoid(),
                  title:
                    'Meet to review notes from previous tests and plan changes',
                  isCompleted: true,
                },
                {
                  id: nanoid(),
                  title: 'Make changes to paper prototypes',
                  isCompleted: true,
                },
                {
                  id: nanoid(),
                  title: 'Conduct 5 usability tests',
                  isCompleted: true,
                },
              ],
            },
            {
              id: nanoid(),
              title:
                'Create paper prototypes and conduct 10 usability tests with potential customers',
              description: '',
              status: 'Done',
              subtasks: [
                {
                  id: nanoid(),
                  title: 'Create paper prototypes for version one',
                  isCompleted: true,
                },
                {
                  id: nanoid(),
                  title: 'Complete 10 usability tests',
                  isCompleted: true,
                },
              ],
            },
            {
              id: nanoid(),
              title: 'Market discovery',
              description:
                'We need to define and refine our core product. Interviews will help us learn common pain points and help us define the strongest MVP.',
              status: 'Done',
              subtasks: [
                {
                  id: nanoid(),
                  title: 'Interview 10 prospective customers',
                  isCompleted: true,
                },
              ],
            },
            {
              id: nanoid(),
              title: 'Competitor analysis',
              description: '',
              status: 'Done',
              subtasks: [
                {
                  id: nanoid(),
                  title: 'Find direct and indirect competitors',
                  isCompleted: true,
                },
                {
                  id: nanoid(),
                  title: 'SWOT analysis for each competitor',
                  isCompleted: true,
                },
              ],
            },
            {
              id: nanoid(),
              title: 'Research the market',
              description:
                'We need to get a solid overview of the market to ensure we have up-to-date estimates of market size and demand.',
              status: 'Done',
              subtasks: [
                {
                  id: nanoid(),
                  title: 'Write up research analysis',
                  isCompleted: true,
                },
                {
                  id: nanoid(),
                  title: 'Calculate TAM',
                  isCompleted: true,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: nanoid(),
      path: '/marketing-plan',
      name: 'Marketing Plan',
      columns: [
        {
          id: nanoid(),
          color: getRandomColor(),
          name: 'Todo',
          tasks: [
            {
              id: nanoid(),
              title: 'Plan Product Hunt launch',
              description: '',
              status: 'Todo',
              subtasks: [
                {
                  id: nanoid(),
                  title: 'Find hunter',
                  isCompleted: false,
                },
                {
                  id: nanoid(),
                  title: 'Gather assets',
                  isCompleted: false,
                },
                {
                  id: nanoid(),
                  title: 'Draft product page',
                  isCompleted: false,
                },
                {
                  id: nanoid(),
                  title: 'Notify customers',
                  isCompleted: false,
                },
                {
                  id: nanoid(),
                  title: 'Notify network',
                  isCompleted: false,
                },
                {
                  id: nanoid(),
                  title: 'Launch!',
                  isCompleted: false,
                },
              ],
            },
            {
              id: nanoid(),
              title: 'Share on Show HN',
              description: '',
              status: 'Todo',
              subtasks: [
                {
                  id: nanoid(),
                  title: 'Draft out HN post',
                  isCompleted: false,
                },
                {
                  id: nanoid(),
                  title: 'Get feedback and refine',
                  isCompleted: false,
                },
                {
                  id: nanoid(),
                  title: 'Publish post',
                  isCompleted: false,
                },
              ],
            },
            {
              id: nanoid(),
              title: 'Write launch article to publish on multiple channels',
              description: '',
              status: 'Todo',
              subtasks: [
                {
                  id: nanoid(),
                  title: 'Write article',
                  isCompleted: false,
                },
                {
                  id: nanoid(),
                  title: 'Publish on LinkedIn',
                  isCompleted: false,
                },
                {
                  id: nanoid(),
                  title: 'Publish on Inndie Hackers',
                  isCompleted: false,
                },
                {
                  id: nanoid(),
                  title: 'Publish on Medium',
                  isCompleted: false,
                },
              ],
            },
          ],
        },
        {
          id: nanoid(),
          color: getRandomColor(),
          name: 'Doing',
          tasks: [],
        },
        {
          id: nanoid(),
          color: getRandomColor(),
          name: 'Done',
          tasks: [],
        },
      ],
    },
    {
      id: nanoid(),
      path: '/roadmap',
      name: 'Roadmap',
      columns: [
        {
          id: nanoid(),
          color: getRandomColor(),
          name: 'Now',
          tasks: [
            {
              id: nanoid(),
              title: 'Launch version one',
              description: '',
              status: 'Now',
              subtasks: [
                {
                  id: nanoid(),
                  title: 'Launch privately to our waitlist',
                  isCompleted: false,
                },
                {
                  id: nanoid(),
                  title: 'Launch publicly on PH, HN, etc.',
                  isCompleted: false,
                },
              ],
            },
            {
              id: nanoid(),
              title: 'Review early feedback and plan next steps for roadmap',
              description:
                "Beyond the initial launch, we're keeping the initial roadmap completely empty. This meeting will help us plan out our next steps based on actual customer feedback.",
              status: 'Now',
              subtasks: [
                {
                  id: nanoid(),
                  title: 'Interview 10 customers',
                  isCompleted: false,
                },
                {
                  id: nanoid(),
                  title: 'Review common customer pain points and suggestions',
                  isCompleted: false,
                },
                {
                  id: nanoid(),
                  title: 'Outline next steps for our roadmap',
                  isCompleted: false,
                },
              ],
            },
          ],
        },
        {
          id: nanoid(),
          color: getRandomColor(),
          name: 'Next',
          tasks: [],
        },
        {
          id: nanoid(),
          color: getRandomColor(),
          name: 'Later',
          tasks: [],
        },
      ],
    },
  ],
  isDarkTheme: false,
  isSidebarVisible: true,
  currentBoard: null,
};

if (!storage.has('state')) {
  storage.set('state', initialState);
}

export const key: InjectionKey<Store<State>> = Symbol();
export const store = createStore<State>({
  strict: false,

  state: storage.get('state') || initialState,

  getters: {
    currentStatuses(state) {
      if (!state.currentBoard) return [];

      const statuses: string[] = [];

      for (const column of state.currentBoard.columns) {
        statuses.push(column.name);
      }

      return statuses;
    },
  },

  mutations: {
    setSidebarVisibility(state, isSidebarVisible: boolean) {
      state.isSidebarVisible = isSidebarVisible;
    },

    changeTheme(state, isDarkTheme: boolean) {
      state.isDarkTheme = isDarkTheme;
      document.documentElement.dataset.theme = isDarkTheme ? 'dark' : 'light';
    },

    setCurrentBoardByPath(state, path) {
      state.currentBoard =
        state.boards.find((board) => {
          return board.path === path;
        }) || null;
    },

    createBoard(
      state,
      {
        board,
        router,
      }: {
        board: Board;
        router: Router;
      }
    ) {
      state.boards.push(board);
      router.push(board.path);
    },

    editBoard(
      state,
      {
        board,
        router,
      }: {
        board: Board;
        router: Router;
      }
    ) {
      const boardIdx = state.boards.findIndex(findById(board));

      if (boardIdx === -1) return;

      state.boards.splice(boardIdx, 1, {
        ...board,
        id: nanoid(),
      });

      router.replace(board.path);
    },

    deleteBoard(
      state,
      {
        board,
        router,
      }: {
        board: Board;
        router: Router;
      }
    ) {
      state.boards = state.boards.filter(filterById(board));
      const lastBoard = last(state.boards);
      state.currentBoard = lastBoard;
      router.replace(lastBoard.path);
    },

    createColumn(state, column: Column) {
      if (!state.currentBoard) return;

      state.currentBoard.columns.push(column);
    },

    deleteColumn(state, column: Column) {
      if (!state.currentBoard) return;

      const columnIdx = state.currentBoard.columns.findIndex(findById(column));

      state.currentBoard.columns.splice(columnIdx, 1);
    },

    editColumn(state, column: Column) {
      if (!state.currentBoard) return;

      const columnIdx = state.currentBoard.columns.findIndex(findById(column));

      state.currentBoard.columns.splice(columnIdx, 1, {
        ...column,
        id: nanoid(),
      });
    },

    createTask(state, task: Task) {
      if (!state.currentBoard) return;

      const currentColumn = state.currentBoard.columns.find((column) => {
        return column.name === task.status;
      });

      currentColumn?.tasks.push(task);
    },

    editTask(
      state,
      {
        oldTask,
        newTask,
      }: {
        oldTask: Task;
        newTask: Task;
      }
    ) {
      if (!state.currentBoard) return;

      const oldColumn = state.currentBoard.columns.find((column) => {
        return column.name === oldTask.status;
      });

      const newColumn = state.currentBoard.columns.find((column) => {
        return column.name === newTask.status;
      });

      if (!oldColumn || !newColumn) return;

      const oldTaskIdx = oldColumn.tasks.findIndex(findById(oldTask));

      if (oldTaskIdx === -1) return;

      oldColumn.tasks.splice(oldTaskIdx, 1);
      newColumn.tasks.push({
        ...newTask,
        id: nanoid(),
      });
    },

    deleteTask(state, task: Task) {
      if (!state.currentBoard) return;

      const currentColumn = state.currentBoard.columns.find((column) => {
        return column.name === task.status;
      });

      if (!currentColumn) return;

      const taskIdx = currentColumn.tasks.findIndex(findById(task));

      if (taskIdx === -1) return;

      currentColumn.tasks.splice(taskIdx, 1);
    },
  },
});

// Set state to localStorage
store.watch(
  (state) => state,
  (state) => {
    storage.set('state', state);
  },
  {
    deep: true,
    immediate: true,
  }
);
