// debounce.ts
import { ref } from 'vue'

// by convention, composable function names start with "use"
export function useDebounce() {
  // state encapsulated and managed by the composable
  const lastRunRecords = ref<Map<string, number>>(new Map());
  const timeoutIdRecords = ref<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  // const lastRun = ref<number>(Date.now());
  // const timeoutId = ref<ReturnType<typeof setTimeout>>(-1);
  const debounce = (
    debouncedFunc: (..._args: any[]) => void,
    delay = 500
  ) => {
    // in outer scope to keep track
    const signature = `${debouncedFunc}`;
    const lastRunTime = lastRunRecords.value.get(signature) || 0;
    const delta = Math.max(delay - (Date.now() - lastRunTime), 0);
    // console.log(Date.now(),`: Bouncer: ${delay}: ${debouncedFunc} | ${delta} ___ ${Date.now() - lastRunTime}`);

    return ((...args: any[]) => {
      // execute this if this func keeps getting called
      const timeoutId = timeoutIdRecords.value.get(signature) || -1;
      // console.log(Date.now(),`: id: ${timeoutId}`)
      if (timeoutId) {
        // console.log(Date.now(),': Bouncing as we has timerId:', timeoutId.value);
        clearTimeout(timeoutId);
      }

      const localId = setTimeout(
        () => {
          debouncedFunc(...args);
          lastRunRecords.value.set(signature, Date.now());
          // lastRun.value = Date.now();
        },
        delta
      );
      timeoutIdRecords.value.set(signature, localId);
    })();
  };


  // expose managed state as return value
  return { debounce }
}
