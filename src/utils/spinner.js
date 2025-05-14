// utils/spinner.js
import ora from 'ora';

const createSpinner = (text = 'Cargando...', spinnerType = 'dots') => {
    const spinner = ora({
        text,
        spinner: spinnerType
    });

    const startSpinner = () => {
        spinner.start();
    };

    const stopSpinner = () => {
        spinner.stop();
    };

    const setSpinnerText = (newText) => {
        spinner.text = newText;
    };

    return {
        startSpinner,
        stopSpinner,
        setSpinnerText
    };
};

export { createSpinner };
