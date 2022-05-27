import React, {
  createContext,
  FC,
  ReducerAction,
  useCallback,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import {
  Button,
  FlatList,
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  color_basic,
  color_basic_strong,
  space_basic,
  space_large,
  space_small,
  styles,
} from './styles';
import {
  ActionTypes,
  ContextState,
  ReducerActionType,
  TextAction1,
  TextAction2,
  TextAction3,
  todoItem,
} from './types';
import TodoItemView from './TodoItemView';
import {BottomNavigation, Colors} from 'react-native-paper';

export const TodoContext = createContext<ContextState>({
  todoList: [],
  dispatch: () => {},
});

interface IState {
  id: number;
  todoList: todoItem[];
}
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

const reducer = (state: IState, action: ReducerActionType): IState => {
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

const MoveButton: FC<{text: string}> = ({text}) => {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        backgroundColor: color_basic,
        padding: space_small,
        justifyContent: 'center',
      }}>
      <Text
        style={{
          color: Colors.white,
          fontWeight: 'bold',
          fontSize: 16,
          textAlign: 'center',
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const TestComponent = () => {
  return (
    <Text style={{fontWeight: 'bold', fontSize: 24}}>
      HELLO1432145123523143
    </Text>
  );
};

const App = () => {
  const [text, setText] = useState<string>('');
  const [state, dispatch] = useReducer(reducer, InitialState);
  const {todoList, id} = state;
  const contextValue = {
    todoList: todoList,
    dispatch: dispatch,
    id: id,
  };

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'todo', title: 'todo'},
    {key: 'alarm', title: 'alarm'},
    {key: 'timer', title: 'timer'},
  ]);
  const renderScene = BottomNavigation.SceneMap({
    todo: TestComponent,
    alarm: TestComponent,
    timer: TestComponent,
  });

  const handleOnSubmit = () => {
    dispatch({type: ActionTypes.CREATE_TODO, title: text, id: id});
  };

  const handleOnChangeText = useCallback((newText: string) => {
    setText(newText);
  }, []);

  const showAllData = () => {
    todoList.forEach(elem => {
      console.log(
        `ID : ${elem.id} TITLE : ${elem.title} COMPLETE : ${elem.complete}
        CONTENT : ${elem.content}`,
      );
    });
    console.log(`state id : ${id}`);
  };

  return (
    <View
      style={{
        backgroundColor: color_basic_strong,
        flex: 1,
      }}>
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

      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
        }}>
        <BottomNavigation
          navigationState={{index, routes}}
          onIndexChange={setIndex}
          renderScene={renderScene}
        />
        {/*<MoveButton text="TODO" />*/}
        {/*<MoveButton text="ALARM" />*/}
        {/*<MoveButton text="TIMER" />*/}
      </View>
    </View>
  );
};

export default App;
