import { format, isToday, isYesterday, parseISO } from "date-fns"
import { ptBR } from "date-fns/locale"

export function formatDateTodayYesterday(dataIsoString: string): string {
	const data = parseISO(dataIsoString)

	if (isToday(data)) {
		return "Hoje"
	}

	if (isYesterday(data)) {
		return "Ontem"
	}

	return format(data, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })
}
