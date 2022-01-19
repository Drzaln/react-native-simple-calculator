import React, {useState, useMemo} from 'react';

export type GlobalContent = {
  currentValue: string;
  operator: string;
  previousValue: string;
  setCurrentValue: (c: string) => void;
  setOperator: (o: string) => void;
  setPreviousValue: (p: string) => void;
  calculate: (type: string, value?: string) => void;
};

const initialState = {
  currentValue: '0',
  operator: '',
  previousValue: '0',
  setCurrentValue: () => {},
  setOperator: () => {},
  setPreviousValue: () => {},
  calculate: () => {},
};

export const CalculatorContext =
  React.createContext<GlobalContent>(initialState);

export const {Provider: CalculatorProvider, Consumer: CalculatorConsumer} =
  CalculatorContext;

export const CalculatorController: React.FC = ({children}) => {
  const [currentValue, setCurrentValue] = useState<string>('0');
  const [operator, setOperator] = useState<string>('');
  const [previousValue, setPreviousValue] = useState<string>('0');

  const handleNumber = React.useCallback(
    (value: unknown) => {
      if (currentValue === '0') {
        return setCurrentValue(`${value}`);
      }

      return setCurrentValue(`${currentValue}${value}`);
    },
    [currentValue],
  );

  const handleEqual = React.useCallback(() => {
    const current = parseFloat(currentValue);
    const previous = parseFloat(previousValue);

    if (operator === '/') {
      return setCurrentValue(`${previous / current}`);
    }

    if (operator === 'x') {
      return setCurrentValue(`${previous * current}`);
    }

    if (operator === '+') {
      return setCurrentValue(`${previous + current}`);
    }

    if (operator === '-') {
      return setCurrentValue(`${previous - current}`);
    }
  }, [currentValue, operator, previousValue]);

  const calculate = React.useCallback(
    (type: string, value?: string) => {
      switch (type) {
        case 'number':
          return handleNumber(value);
        case 'operator':
          setOperator(value as string);
          setPreviousValue(currentValue);
          setCurrentValue('0');
          break;
        case 'equal':
          return handleEqual();
        case 'clear':
          setCurrentValue('0');
          setOperator('');
          setPreviousValue('0');
          break;
        case 'posneg':
          return setCurrentValue(`${parseFloat(currentValue) * -1}`);
        case 'percentage':
          return setCurrentValue(`${parseFloat(currentValue) * 0.01}`);
        default:
      }
    },
    [currentValue, handleEqual, handleNumber],
  );

  return useMemo(
    () => (
      <CalculatorProvider
        value={{
          currentValue,
          operator,
          previousValue,
          setCurrentValue,
          setOperator,
          setPreviousValue,
          calculate,
        }}>
        {children}
      </CalculatorProvider>
    ),
    [calculate, children, currentValue, operator, previousValue],
  );
};

export const useCalculatorContext = () => React.useContext(CalculatorContext);
