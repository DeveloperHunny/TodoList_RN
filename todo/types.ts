import {ActionTypes, ReducerActionType, todoItem} from '../types';

export interface IState {
  id: number;
  todoList: todoItem[];
}

export const reducer = (state: IState, action: ReducerActionType): IState => {
  let todoList = [...state.todoList];
  switch (action.type) {
    case ActionTypes.CREATE_TODO:
      console.log('CREATE TODO');
      todoList = [
        ...todoList,
        {
          title: action.title,
          id: action.id,
          content: 'default content',
          complete: false,
        },
      ];
      return {...state, todoList: todoList, id: state.id + 1};
    case ActionTypes.MODIFY_TODO:
      console.log('MODIFY TODO');
      todoList.forEach((item, index) => {
        if (item.id === action.id) {
          todoList[index] = {
            ...todoList[index],
            content: action.content,
          };
        }
      });
      return {...state, todoList: [...todoList]};
    case ActionTypes.CLICK_COMPLETE:
      console.log('CLICK COMPLETE BTN');
      todoList.forEach((item, index) => {
        if (item.id === action.id) {
          todoList[index] = {...todoList[index], complete: !item.complete};
        }
      });
      return {...state};
    case ActionTypes.DELETE_TODO:
      console.log(`DELETE TODO : ${action.id}`);
      todoList.forEach((item, index) => {
        if (item.id === action.id) {
          todoList.splice(index, 1);
          return false;
        }
      });
      return {...state, todoList: [...todoList]};

    default:
      return {...state};
  }
};
