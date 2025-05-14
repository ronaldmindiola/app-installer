// utils/spinner.ts
import ora, { Ora, spinners } from 'ora';

type SpinnerType = 'dots' | 'line' | 'arrow' | 'circle' | string;

interface SpinnerOptions {
  text?: string;
  spinnerType?: SpinnerType;
  colors?: string[];
}

const createSpinner = ({ text = 'Cargando...', spinnerType = 'dots', colors = ['cyan', 'magenta', 'yellow', 'blue', 'green'] }: SpinnerOptions) => {
  const spinner: Ora = ora({
    text,
    spinners: spinnerType,
    color: colors[0], // Comienza con el primer color
  });

  let colorIndex = 0;
  let intervalId: NodeJS.Timeout | null = null;

  const start = () => {
    spinner.start();
    if (colors.length > 1) {
      intervalId = setInterval(() => {
        colorIndex = (colorIndex + 1) % colors.length;
        spinner.color = colors[colorIndex];
      }, 1000);
    }
  };

  const stop = () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    spinner.stop();
  };

  const succeed = (msg = 'Operación completada') => {
    if (intervalId) clearInterval(intervalId);
    spinner.succeed(msg);
  };

  const fail = (msg = 'Operación fallida') => {
    if (intervalId) clearInterval(intervalId);
    spinner.fail(msg);
  };

  const warn = (msg = 'Advertencia') => {
    if (intervalId) clearInterval(intervalId);
    spinner.warn(msg);
  };

  const info = (msg = 'Información') => {
    if (intervalId) clearInterval(intervalId);
    spinner.info(msg);
  };

  const setText = (newText: string) => {
    spinner.text = newText;
    return spinner;
  };

  const setColor = (newColor: string) => {
    spinner.color = newColor;
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
  };
};

export default createSpinner;
