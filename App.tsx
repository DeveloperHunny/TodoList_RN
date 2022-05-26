import React, {useCallback, useRef, useState} from 'react';
import {Button, FlatList, TextInput, View} from 'react-native';
import {color_basic_strong, space_large, styles} from './styles';
import {todoItem} from './types';
import TodoItemView from './TodoItemView';

const App = () => {
  const [title, setTitle] = useState<string>('');
  const itemId = useRef<number>(-1);
  const [todoList, setTodoList] = useState<todoItem[]>([]);
  const [visible, setVisible] = useState(false);

  const handleOnSubmit = () => {
    setTodoList(prevState => {
      itemId.current++;
      return [
        ...prevState,
        {id: itemId.current, title: title, content: 'content', complete: false},
      ];
    });
  };

  const handleOnChangeText = useCallback((text: string) => {
    setTitle(text);
  }, []);

  const onClickShowDialogBtn = () => {
    setVisible(!visible);
  };

  return (
    <View style={{backgroundColor: color_basic_strong, flex: 1}}>
      <View style={styles.titleContainerStyle}>
        <View>
          <TextInput
            style={styles.titleInputStyle}
            placeholder="할일 목록을 입력하세요."
            onSubmitEditing={handleOnSubmit}
            onChangeText={handleOnChangeText}
          />
        </View>
        <FlatList
          style={{marginVertical: space_large, flex: 1}}
          data={todoList}
          renderItem={({item}) => {
            return <TodoItemView item={item} dataList={todoList} />;
          }}
        />
        <Button title="show dialog" onPress={onClickShowDialogBtn} />
      </View>
    </View>
  );
};

export default App;
