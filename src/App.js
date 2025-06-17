import styles from './App.module.css';
import { useState } from 'react';

export const App = () => {
	const NUMS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const ACTIONS = ['C', '=', '-', '+']

	const [operand1, setOperand1] = useState('');
	const [operand2, setOperand2] = useState('');
	const [operator, setOperator] = useState('');

	const numEnd = (num) => {
		if (!operator) {
			setOperand1(operand1 + num);
		} else {
			setOperand2(operand2 + num);
		}
	};

  const doAction = (action) => {
    switch (action) {
      case '+':
        setOperator('+');
        break;

      case '-':
        setOperator('-');
        break;

      case 'C':
        setOperand1('');
        setOperand2('');
        setOperator('');
        break;

      case '=':
        if (operand1 && operand2 && operator) {
          if (operator === '+') {
            const answer = Number(operand1) + Number(operand2);
            setOperand1(String(answer))
          } else {
            const answer = Number(operand1) - Number(operand2);
            setOperand1(String(answer));
          }
          setOperand2('');
          setOperator('');
        }
        break;

      default:
        break;
    }
  }

	return (
		<div className={styles.calculator}>
			<div className={styles.display}>
				<p className={styles.displayContent}>
					{operand1 + (operator ? operator + operand2 : '')}
				</p>
			</div>
			<div className={styles.buttons}>
				<div className={styles.actions}>
          {ACTIONS.map((action) => (
            <button key={action} onClick={() => doAction(action)}>
              {action}
            </button>))}
				</div>
				<div className={styles.numbers}>
					{NUMS.map((num) => (
						<button key={num} onClick={() => numEnd(num)}>
							{num}
						</button>
					))}
				</div>
			</div>
		</div>
	);
};
