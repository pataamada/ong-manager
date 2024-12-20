/**
 * Formats a number as Brazilian Real (BRL) currency
 * @param value - The number to format
 * @returns A string with the formatted currency (e.g., "R$ 1.234,56")
 */
export function formatCurrency(value: number): string {
	return value.toLocaleString("pt-BR", {
		style: "currency",
		currency: "BRL",
	})
}
