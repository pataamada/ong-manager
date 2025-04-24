import { useQuery } from "@tanstack/react-query";
import { findSettingsAction } from "@/actions/settings/find";
import type { SettingsModel } from "@/models/settings";

export function useSettings() {
  return useQuery({
    queryKey: ["settings"],
    queryFn: async () => {
      const request = await findSettingsAction()
      if(request?.data) {
        return JSON.parse(request.data) as SettingsModel
      }
      return undefined
    }
  })
}