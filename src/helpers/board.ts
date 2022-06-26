import {Board, Column, Subtask, Task} from '@interfaces';
import dashify from 'dashify';
import {nanoid} from 'nanoid';
import {getRandomColor} from './common';

export const createColumn = (
  name: string = '',
  tasks: Task[] = []
): Column => ({
  name,
  tasks,
  id: nanoid(),
  color: getRandomColor(),
});

export const createBoard = (
  name: string = '',
  columns: Column[] = []
): Board => ({
  name,
  columns,
  id: nanoid(),
  path: name ? `/${dashify(name)}` : '',
});

export const createSubtask = (title: string = ''): Subtask => ({
  title,
  id: nanoid(),
  isCompleted: false,
});
