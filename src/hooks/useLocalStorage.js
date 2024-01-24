import { useCallback, useEffect, useState } from "react";

/**
 * Custom hook for storing and retrieving data in local storage.
 *
 * @param {string} key - The key to use for storing the data in local storage.
 * @param {*} initialValue - The initial value to use if no data is found in local storage.
 * @returns {[value: *, setValue: Function]} An array that correspond to the localStorage key where:
 * - The first element, `value`, is the stored value.
 * - The second element, `setValue`, is a function that can be called to update the localStorage stored value .
 */
export default function useLocalStorage(key, initialValue) {
	const [storedValue, setStoredValue] = useState(initialValue);

	useEffect(() => {
		try {
			const item = localStorage.getItem(key);
			setStoredValue(item ? JSON.parse(item) : initialValue);
		} catch (error) {
			console.error(error);
			setStoredValue(initialValue);
		}
	}, [key, initialValue]);

	const setValue = useCallback(
		(value) => {
			try {
				const valueToStore =
					value instanceof Function ? value(storedValue) : value;
				setStoredValue(valueToStore);
				localStorage.setItem(key, JSON.stringify(valueToStore));
				return valueToStore;
			} catch (error) {
				console.error(error);
			}
		},
		[key, storedValue]
	);

	return [storedValue, setValue];
}
