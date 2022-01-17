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
    text: 'C',
    desc: 'clear',
  },
  {
    theme: colors.buttonpurple,
    text: '+/-',
    desc: 'posneg',
  },
  {
    theme: colors.buttonpurple,
    text: '%',
    desc: 'percentage',
  },
  {
    theme: colors.buttonorange,
    text: '/',
    desc: 'operator',
  },
  {
    theme: colors.buttondark,
    text: '7',
    desc: 'number',
  },
  {
    theme: colors.buttondark,
    text: '8',
    desc: 'number',
  },
  {
    theme: colors.buttondark,
    text: '9',
    desc: 'number',
  },
  {
    theme: colors.buttonorange,
    text: 'x',
    desc: 'operator',
  },
  {
    theme: colors.buttondark,
    text: '4',
    desc: 'number',
  },
  {
    theme: colors.buttondark,
    text: '5',
    desc: 'number',
  },
  {
    theme: colors.buttondark,
    text: '6',
    desc: 'number',
  },
  {
    theme: colors.buttonorange,
    text: '-',
    desc: 'operator',
  },
  {
    theme: colors.buttondark,
    text: '1',
    desc: 'number',
  },
  {
    theme: colors.buttondark,
    text: '2',
    desc: 'number',
  },
  {
    theme: colors.buttondark,
    text: '3',
    desc: 'number',
  },
  {
    theme: colors.buttonorange,
    text: '+',
    desc: 'operator',
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
  const {setCurrentValue} = useCalculatorContext();
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
                key={item.text}
                item={item}
                onPress={() => setCurrentValue(item.text)}
              />
            ))}
          <LargeButton />
          <Button
            item={{
              theme: colors.buttondark,
              text: '.',
              desc: 'number',
            }}
          />
          <Button
            item={{
              theme: colors.buttonorange,
              text: '=',
              desc: 'equal',
            }}
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

function LargeButton() {
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
        style={{
          borderRadius: 18,
          backgroundColor: colors.buttondark,
          alignItems: 'center',
          justifyContent: 'center',
          height: 80,
          width: buttonSize,
          margin: 4,
        }}>
        <Text style={{color: 'white', fontSize: 24}}>0</Text>
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

interface ButtonProps {
  item?: {
    theme: string;
    text: string;
    desc: string;
  };
  onPress?: () => void;
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
        <Text style={{color: 'white', fontSize: 24}}>{item?.text}</Text>
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
