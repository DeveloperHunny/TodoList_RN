import React, {FC, useRef, useState} from 'react';
import {FlatList, Text, TextInput, View} from 'react-native';
import {
  color_active,
  color_basic_strong,
  color_no_active,
  space_large,
  styles,
} from './styles';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {IconButton} from 'react-native-paper';

interface todoItem {
  title: string;
  content: string;
  complete: boolean;
}

const TodoItemView: FC<{item: todoItem}> = ({item}) => {
  const {title, complete} = item;
  const btnActive = useRef<string>(
    complete === false ? color_no_active : color_active,
  );
  const onPressCompleteBtn = () => {
    if (complete) {
      btnActive.current = color_no_active;
    } else {
      btnActive.current = color_active;
    }
  };

  return (
    <View style={styles.itemViewContainerStyle}>
      <Text style={{fontWeight: 'bold', fontSize: 24, color: Colors.black}}>
        {title}
      </Text>
      <IconButton
        icon="check-circle"
        color={btnActive.current}
        onPress={onPressCompleteBtn}
        size={28}
      />
    </View>
  );
};

const App = () => {
  const [title, setTitle] = useState<string>('');
  const [todoList, setTodoList] = useState<todoItem[]>([]);

  const handleOnSubmit = () => {
    setTodoList(prevState => {
      return [
        ...prevState,
        {title: title, content: 'content', complete: false},
      ];
    });
  };

  const handleOnChangeText = (text: string) => {
    setTitle(text);
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
          renderItem={({item}) => <TodoItemView item={item} />}
        />
      </View>
    </View>
  );
};

export default App;
