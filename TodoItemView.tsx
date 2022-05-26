import React, {FC, useRef, useState} from 'react';
import {todoItem} from './types';
import {color_active, color_no_active, styles} from './styles';
import {Text, TouchableOpacity, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {IconButton} from 'react-native-paper';
import DialogView from './ContentDialogView';

const TodoItemView: FC<{item: todoItem; dataList: todoItem[]}> = ({
  item,
  dataList,
}) => {
  const {id, title, content, complete} = item;
  const [visible, setVisible] = useState(false);

  const onPressCompleteBtn = () => {
    console.log('press complete btn');
  };

  const onPressItemView = () => {
    console.log(`press item ${id} - title : ${title}`);
    setVisible(true);
  };

  const closeDialog = () => {
    setVisible(false);
  };

  return (
    <View>
      {visible && (
        <DialogView visible={visible} item={item} closeDialog={closeDialog} />
      )}
      <TouchableOpacity
        style={styles.itemViewContainerStyle}
        onPress={onPressItemView}>
        <Text style={{fontWeight: 'bold', fontSize: 24, color: Colors.white}}>
          {title}
        </Text>
        <IconButton
          icon="check-circle"
          color={color_no_active} //나중에 수정 들어가야 함.
          onPress={onPressCompleteBtn}
          size={28}
        />
      </TouchableOpacity>
    </View>
  );
};

export default TodoItemView;
