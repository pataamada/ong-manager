import { format, isYesterday, parseISO } from "date-fns"
import { ptBR } from "date-fns/locale"
export function formatDateYesterday(dataIsoString: string): string {
	const data = parseISO(dataIsoString)
	if (isYesterday(data)) {
		return "Ontem"
	}
	return format(data, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })
}

export function formatDateToISO(date: Date) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0'); // Adiciona 1 porque os meses são baseados em 0
	const day = String(date.getDate()).padStart(2, '0');
  
	return `${year}-${month}-${day}`;
  }