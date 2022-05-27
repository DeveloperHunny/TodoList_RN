import {Dispatch} from 'react';

export interface todoItem {
  id: number;
  title: string;
  content: string;
  complete: boolean;
}

export interface ContextState {
  todoList: todoItem[];
  dispatch: Dispatch<ReducerActionType>;
}

export type ReducerActionType =
  | TestAction
  | CreateTodoAction
  | ModifyTodoAction
  | DeleteTodoAction
  | ClickCompleteAction;

export const ActionTypes = {
  TEST: 'TEST',
  CREATE_TODO: 'CREATE_TODO',
  MODIFY_TODO: 'MODIFY_TODO',
  DELETE_TODO: 'DELETE_TODO',
  CLICK_COMPLETE: 'CLICK_COMPLETE',
};

export interface TestAction {
  type: typeof ActionTypes.TEST;
}

export interface CreateTodoAction {
  type: typeof ActionTypes.CREATE_TODO;
  id: number;
  title: string;
}

export interface ModifyTodoAction {
  type: typeof ActionTypes.MODIFY_TODO;
  id: number;
  content: string;
}

export interface DeleteTodoAction {
  type: typeof ActionTypes.CLICK_COMPLETE;
  id: number;
}

export interface ClickCompleteAction {
  type: typeof ActionTypes.CLICK_COMPLETE;
  id: number;
}
