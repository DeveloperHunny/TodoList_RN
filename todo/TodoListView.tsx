import {FlatList, Text, TextInput, TouchableOpacity, View} from 'react-native';
import DialogView from './ContentDialogView';
import {
  color_active,
  color_basic,
  color_basic_strong,
  color_no_active,
  space_large,
  space_small,
  styles,
} from '../styles';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {BottomNavigation, IconButton} from 'react-native-paper';
import React, {
  createContext,
  FC,
  memo,
  useCallback,
  useReducer,
  useState,
} from 'react';
import {ActionTypes, ContextState, ReducerActionType, todoItem} from '../types';
import TodoItemView from './TodoItemView';
import {IState, reducer} from './types';

export const TodoContext = createContext<ContextState>({
  todoList: [],
  dispatch: () => {},
});

const InitialState: IState = {
  id: 5,
  todoList: [
    {id: 0, title: 'Math', complete: false, content: 'defualt content'},
    {id: 1, title: 'Englsih', complete: false, content: 'defualt content'},
    {id: 2, title: 'Science', complete: false, content: 'defualt content'},
    {id: 3, title: 'Society', complete: false, content: 'defualt content'},
    {id: 4, title: 'Computer', complete: false, content: 'defualt content'},
  ],
};

const TodoListView = memo(() => {
  const [text, setText] = useState<string>('');
  const [state, dispatch] = useReducer(reducer, InitialState);
  const {todoList, id} = state;

  const contextValue = {
    todoList: todoList,
    dispatch: dispatch,
  };

  const handleOnSubmit = () => {
    dispatch({type: ActionTypes.CREATE_TODO, title: text, id: id});
  };

  const handleOnChangeText = useCallback((newText: string) => {
    setText(newText);
  }, []);

  return (
    <View style={styles.rootContainerStyle}>
      <View style={{height: '100%'}}>
        <TodoContext.Provider value={contextValue}>
          <View style={styles.titleContainerStyle}>
            <View>
              <TextInput
                style={styles.titleInputStyle}
                placeholder="할일 목록을 입력하세요."
                onSubmitEditing={handleOnSubmit}
                onChangeText={handleOnChangeText}
                value={text}
              />
            </View>
            <FlatList
              style={{marginVertical: space_large, flex: 1}}
              data={todoList}
              keyExtractor={item => item.id.toString()}
              extraData={todoList}
              renderItem={({item}) => {
                return <TodoItemView id={item.id} />;
              }}
            />
          </View>
        </TodoContext.Provider>
      </View>
    </View>
  );
});

export default TodoListView;
