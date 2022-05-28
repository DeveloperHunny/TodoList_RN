import {StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export const color_basic = '#3495eb';
export const color_basic_strong = '#3452eb';
export const color_basic_light = '#83d2e6';
export const color_active = '#055be6';
export const color_no_active = '#7f8287';
export const space_basic = 16;
export const space_large = 32;
export const space_small = 8;

export const styles = StyleSheet.create({
  rootContainerStyle: {
    backgroundColor: color_basic_strong,
    height: '100%',
    width: '100%',
  },

  titleContainerStyle: {
    backgroundColor: Colors.white,
    flex: 1,
    marginHorizontal: space_large,
    marginVertical: space_large,
    borderRadius: 16,
    paddingVertical: 32,
    paddingHorizontal: 16,
  },

  titleInputStyle: {
    borderRadius: 8,
    borderStyle: 'solid',
    borderWidth: 4,
    borderColor: color_basic,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 18,
    fontWeight: 'bold',
  },

  itemViewContainerStyle: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: color_basic,
    borderRadius: 16,
    marginBottom: space_basic,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
