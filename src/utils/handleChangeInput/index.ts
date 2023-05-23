/**
 * This function handles the change of an input element.
 * @property {HTMLInputElement}  element                - The element to handle the change.
 * @property {function}  callback                - The callback to execute after the change.
 */
export function handleChangeInput(
  element: HTMLInputElement,
  callback?: (value: string | number | boolean) => void,
) {
  element.addEventListener('change', (ev) => {
    if (ev.target instanceof HTMLInputElement) {
      const value =
        element.type === 'checkbox' ? ev.target.checked : ev.target.value;
      if (callback) callback(value);
    }
  });
}
