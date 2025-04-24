import { useQuery } from "@tanstack/react-query"
import { findAll } from "@/services/social-media.service"

export const useGetSocial = () => {
    return useQuery({
        queryKey: ["socials"],
        queryFn: async () => {
            const request = await findAll()
            return request || []
        },
    })
}