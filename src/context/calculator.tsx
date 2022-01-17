import React, {useState, useMemo} from 'react';

export type GlobalContent = {
  currentValue: string;
  operator: string;
  previousValue: number;
  setCurrentValue: (c: string) => void;
  setOperator: (o: string) => void;
  setPreviousValue: (p: number) => void;
};

const initialState = {
  currentValue: '0',
  operator: '',
  previousValue: 0,
  setCurrentValue: () => {},
  setOperator: () => {},
  setPreviousValue: () => {},
};

export const CalculatorContext =
  React.createContext<GlobalContent>(initialState);

export const {Provider: CalculatorProvider, Consumer: CalculatorConsumer} =
  CalculatorContext;

export const CalculatorController: React.FC = ({children}) => {
  const [currentValue, setCurrentValue] = useState<string>('0');
  const [operator, setOperator] = useState<string>('');
  const [previousValue, setPreviousValue] = useState<number>(0);

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
        }}>
        {children}
      </CalculatorProvider>
    ),
    [children, currentValue, operator, previousValue],
  );
};

export const useCalculatorContext = () => React.useContext(CalculatorContext);
