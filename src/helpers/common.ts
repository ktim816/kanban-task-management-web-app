export const last = <T = any>(arr: T[]) => arr[arr.length - 1];

export const sequence = (...fns: any[]) => {
  return (...args: any[]) => {
    fns.forEach((fn) => fn(...args));
  };
};

export const getRandomColor = () => {
  const letters = '0123456789ABCDEF';

  let color = '#';

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
};
