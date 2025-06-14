import styles from './app.module.css';
import data from './data.json';
import { useState } from 'react';

export const App = () => {
	// Можно задать 2 состояния — steps и activeIndex
	const [steps, setSteps] = useState(data);
	const [activeIndex, setActiveIndex] = useState(0);

	const lastStep = steps.length - 1;

	// И определить 3 обработчика: Клик назад, Клик вперед, Начать сначала
	const onBackButton = () => {
		if (activeIndex > 0) {
			setActiveIndex(activeIndex - 1);
		}
	};

	const onNextButton = () => {
		if (activeIndex < lastStep) {
			setActiveIndex(activeIndex + 1);
		}
	};

	const openStepByTitle = (event) => {
		const { target } = event;
		const index = target.textContent;
		setActiveIndex(index - 1);
	};

	const onResetButton = () => {
		setActiveIndex(0);
	};

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>{steps[activeIndex]['content']}</div>
					<ul className={styles['steps-list']}>
						{steps.map((item, index) => (
							<li
								key={item.id}
								className={
									styles['steps-item'] +
									' ' +
									(index < activeIndex ? ' ' + styles.done : '') +
									(index === activeIndex ? ' ' + styles.active : '')
								}
							>
								<button onClick={openStepByTitle} className={styles['steps-item-button']}>
									{index + 1}
								</button>
								{item.title}
							</li>
						))}
					</ul>
					<div className={styles['buttons-container']}>
						<button
							disabled={activeIndex === 0}
							className={styles.button}
							onClick={onBackButton}
						>
							Назад
						</button>
						{activeIndex !== steps.length - 1 ? (
							<button className={styles.button} onClick={onNextButton}>
								Далее
							</button>
						) : (
							<button className={styles.button} onClick={onResetButton}>
								Начать с начала
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
