import React, {FC, memo, useContext, useMemo, useState} from 'react';
import {ActionTypes, todoItem} from '../types';
import {color_active, color_no_active, styles} from '../styles';
import {Text, TouchableOpacity, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {IconButton} from 'react-native-paper';
import DialogView from './ContentDialogView';
import {TodoContext} from './TodoListView';

const TodoItemView: FC<{id: number}> = memo(({id}) => {
  console.log('rendered ItemVIew');
  const {todoList, dispatch} = useContext(TodoContext);

  const currentItem = useMemo(
    () => todoList.find((elem: todoItem) => elem.id === id),
    [id, todoList],
  );
  const [dialogVisible, setDialogVisible] = useState(false);
  const [complete, setComplete] = useState(currentItem!.complete);

  todoList.forEach((elem: todoItem) => {
    console.log(elem.id, elem.title, elem.content);
  });

  const onPressCompleteBtn = () => {
    setComplete(!complete);
    dispatch({type: ActionTypes.CLICK_COMPLETE, id: id});
  };

  const onPressItemView = () => {
    console.log('pressItemView');
    setDialogVisible(true);
  };

  const onSaveItem = (content: string) => {
    dispatch({
      type: ActionTypes.MODIFY_TODO,
      content: content,
      id: id,
    });
    setDialogVisible(false);
  };

  const onDeleteItem = () => {
    dispatch({type: ActionTypes.DELETE_TODO, id: id});
    setDialogVisible(false);
  };

  const onCloseDialog = () => {
    setDialogVisible(false);
  };

  return (
    <View>
      {dialogVisible && (
        <DialogView
          item={todoList.find((elem: todoItem) => elem.id === id)!}
          visible={dialogVisible}
          onSaveItem={onSaveItem}
          onCloseDialog={onCloseDialog}
          onDeleteItem={onDeleteItem}
        />
      )}
      <TouchableOpacity
        style={styles.itemViewContainerStyle}
        onPress={onPressItemView}>
        <Text style={{fontWeight: 'bold', fontSize: 24, color: Colors.white}}>
          {currentItem!.title}
        </Text>
        <IconButton
          icon="check-circle"
          color={complete === true ? color_active : color_no_active} //나중에 수정 들어가야 함.
          onPress={onPressCompleteBtn}
          size={28}
        />
      </TouchableOpacity>
    </View>
  );
});

export default TodoItemView;
