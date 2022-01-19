import React from 'react';
import {
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import colors from './src/assets/color/color';
import {
  CalculatorController,
  useCalculatorContext,
} from './src/context/calculator';

const keyboard = [
  {
    theme: colors.buttonpurple,
    value: 'C',
    type: 'clear',
  },
  {
    theme: colors.buttonpurple,
    value: '+/-',
    type: 'posneg',
  },
  {
    theme: colors.buttonpurple,
    value: '%',
    type: 'percentage',
  },
  {
    theme: colors.buttonorange,
    value: '/',
    type: 'operator',
  },
  {
    theme: colors.buttondark,
    value: '7',
    type: 'number',
  },
  {
    theme: colors.buttondark,
    value: '8',
    type: 'number',
  },
  {
    theme: colors.buttondark,
    value: '9',
    type: 'number',
  },
  {
    theme: colors.buttonorange,
    value: 'x',
    type: 'operator',
  },
  {
    theme: colors.buttondark,
    value: '4',
    type: 'number',
  },
  {
    theme: colors.buttondark,
    value: '5',
    type: 'number',
  },
  {
    theme: colors.buttondark,
    value: '6',
    type: 'number',
  },
  {
    theme: colors.buttonorange,
    value: '-',
    type: 'operator',
  },
  {
    theme: colors.buttondark,
    value: '1',
    type: 'number',
  },
  {
    theme: colors.buttondark,
    value: '2',
    type: 'number',
  },
  {
    theme: colors.buttondark,
    value: '3',
    type: 'number',
  },
  {
    theme: colors.buttonorange,
    value: '+',
    type: 'operator',
  },
];

export default function App() {
  return (
    <CalculatorController>
      <Home />
    </CalculatorController>
  );
}

function Home() {
  const {calculate} = useCalculatorContext();
  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.background,
        flex: 1,
      }}>
      <StatusBar barStyle="light-content" />
      <View
        style={{
          padding: 20,
          flex: 1,
        }}>
        <NumberField />
        <View
          style={{
            marginTop: 18,
            marginHorizontal: -4,
            flexDirection: 'row',
            flexWrap: 'wrap',
            flex: 0.6,
            justifyContent: 'space-between',
          }}>
          {keyboard &&
            keyboard.length > 0 &&
            keyboard.map(item => (
              <Button
                key={item.value}
                item={item}
                onPress={() => calculate(item.type, item.value)}
              />
            ))}
          <LargeButton
            item={{
              theme: colors.buttondark,
              value: '0',
              type: 'number',
            }}
            onPress={() => calculate('number', '0')}
          />
          <Button
            item={{
              theme: colors.buttondark,
              value: '.',
              type: 'number',
            }}
            onPress={() => calculate('number', '.')}
          />
          <Button
            item={{
              theme: colors.buttonorange,
              value: '=',
              type: 'equal',
            }}
            onPress={() => calculate('equal')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

function NumberField() {
  const {currentValue} = useCalculatorContext();
  return (
    <View
      style={{
        borderRadius: 35,
        flex: 0.4,
      }}>
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: colors.fieldcolor,
          borderRadius: 35,
          padding: 20,
          justifyContent: 'flex-end',
        }}>
        <Text
          style={{
            fontSize: 40,
            textAlign: 'right',
          }}>
          {currentValue}
        </Text>
      </View>
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: 'black',
          borderRadius: 35,
          height: 280,
          zIndex: -1,
          transform: [{translateY: 5}, {translateX: 0}],
          opacity: 0.2,
        }}
      />
    </View>
  );
}

interface ButtonProps {
  item?: {
    theme: string;
    value: string;
    type: string;
  };
  onPress?: () => void;
}

function LargeButton({item, onPress}: ButtonProps) {
  const {width} = useWindowDimensions();
  const buttonSize = width / 2.3;
  return (
    <View
      style={{
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        height: 80,
        width: buttonSize,
        margin: 4,
      }}>
      <Pressable
        onPress={onPress}
        style={{
          borderRadius: 18,
          backgroundColor: item?.theme,
          alignItems: 'center',
          justifyContent: 'center',
          height: 80,
          width: buttonSize,
          margin: 4,
        }}>
        <Text style={{color: 'white', fontSize: 24}}>{item?.value}</Text>
      </Pressable>
      <View
        style={{
          borderRadius: 18,
          backgroundColor: 'white',
          height: 80,
          width: buttonSize + 1.5,
          margin: 4,
          position: 'absolute',
          zIndex: -1,
          transform: [{translateY: 2}, {translateX: 0}],
          opacity: 0.6,
        }}
      />
    </View>
  );
}

function Button({item, onPress}: ButtonProps) {
  const {width} = useWindowDimensions();
  const buttonSize = width / 4.9;
  return (
    <View
      style={{
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        height: buttonSize,
        width: buttonSize,
        margin: 4,
      }}>
      <Pressable
        onPress={onPress}
        style={{
          borderRadius: 18,
          backgroundColor: item?.theme,
          alignItems: 'center',
          justifyContent: 'center',
          height: buttonSize,
          width: buttonSize,
          margin: 4,
        }}>
        <Text style={{color: 'white', fontSize: 24}}>{item?.value}</Text>
      </Pressable>
      <View
        style={{
          borderRadius: 18,
          backgroundColor: 'white',
          height: buttonSize,
          width: buttonSize + 1.5,
          margin: 4,
          position: 'absolute',
          zIndex: -1,
          transform: [{translateY: 2}, {translateX: 0}],
          opacity: 0.6,
        }}
      />
    </View>
  );
}
