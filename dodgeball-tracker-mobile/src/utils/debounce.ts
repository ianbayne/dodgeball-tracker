function debounce(func: (arg: string) => void, timeout: number = 300) {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: [arg: string]) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}

export default debounce;
