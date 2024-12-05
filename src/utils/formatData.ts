import { format, isYesterday, parseISO } from "date-fns"
import { ptBR } from "date-fns/locale"
export function formatDateYesterday(dataIsoString: string): string {
	const data = parseISO(dataIsoString)
	if (isYesterday(data)) {
		return "Ontem"
	}
	return format(data, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })
}