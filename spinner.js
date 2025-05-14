// utils/spinner.js
import ora from 'ora';

const createSpinner = ({ text = 'Cargando...', spinnerType = 'dots', colors = ['cyan', 'magenta', 'yellow', 'blue', 'green'] } = {}) => {
  const spinner = ora({
    text,
    spinner: spinnerType,
    color: colors[0], // Comienza con el primer color
  });

  let colorIndex = 0;
  let intervalId = null;

  const start = (newText, newSpinnerType, newColors) => {
    // Actualiza propiedades si se proporcionan nuevos valores al llamar a `start`
    if (newText) spinner.text = newText;
    if (newSpinnerType) spinner.spinner = newSpinnerType;
    if (newColors && newColors.length > 0) {
      colors = newColors;
      spinner.color = colors[0];
    }

    // Limpia cualquier intervalo previo
    if (intervalId) {
      clearInterval(intervalId);
    }

    // Inicia el spinner y establece el cambio de color si hay más de un color
    spinner.start();
    if (colors.length > 1) {
      intervalId = setInterval(() => {
        colorIndex = (colorIndex + 1) % colors.length;
        spinner.color = colors[colorIndex];
      }, 1000);
    }
    return spinner;
  };

  const stop = () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    spinner.stop();
    return spinner;
  };

  const succeed = (msg = 'Operación completada') => {
    if (intervalId) clearInterval(intervalId);
    spinner.succeed(msg);
    return spinner;
  };

  const fail = (msg = 'Operación fallida') => {
    if (intervalId) clearInterval(intervalId);
    spinner.fail(msg);
    return spinner;
  };

  const warn = (msg = 'Advertencia') => {
    if (intervalId) clearInterval(intervalId);
    spinner.warn(msg);
    return spinner;
  };

  const info = (msg = 'Información') => {
    if (intervalId) clearInterval(intervalId);
    spinner.info(msg);
    return spinner;
  };

  const setText = (newText) => {
    spinner.text = newText;
    return spinner;
  };

  const setColor = ([newColor]) => {
    spinner.color = newColor;
    return spinner;
  };

  const setSpinnerType = (newSpinnerType) => {
    spinner.spinner = newSpinnerType;
    return spinner;
  };

  return {
    start,
    stop,
    succeed,
    fail,
    warn,
    info,
    setText,
    setColor,
    setSpinnerType,
  };
};

export default createSpinner;
