import { useAuth } from "@/hooks/use-auth"
import { useSettings } from "@/app/(main)/settings/mutations/use-settings"


const whatsappMessages = {
  withUserAndAnimal: "Olá! Meu nome é {name} e estou interessado(a) em adotar {gender} {type} {animalName}. Gostaria de saber mais informações sobre o processo de adoção.",
  withUserOnly: "Olá! Meu nome é {name} e gostaria de saber mais informações sobre o processo de adoção.",
  withAnimalOnly: "Olá! Estou interessado(a) em adotar {gender} {type} {animalName}. Gostaria de saber mais informações sobre o processo de adoção.",
  default: "Olá! Gostaria de saber mais informações sobre o processo de adoção.",
}

const formatWhatsAppNumber = (number: string): string => {
  const formattedNumber = number.replace(/\D/g, "")
  return `https://wa.me/${formattedNumber}`
}

const formatAnimalType = (baseType: string, sex: string): string => {
  if (baseType === "cachorro") {
    return sex === "macho" ? "cachorro" : "cadela"
  }
  return sex === "macho" ? "gato" : "gata"
}

const formatAnimalGender = (sex: string): string => {
  return sex === "macho" ? "o" : "a"
}

const getCustomWhatsAppMessage = (name?: string, animalName?: string, animalType?: string, animalGender?: string): string => {
  if (name && animalName) {
    return whatsappMessages.withUserAndAnimal
      .replace("{name}", name)
      .replace("{animalName}", animalName)
      .replace("{type}", animalType || "")
      .replace("{gender}", animalGender || "")
  }
  if (name) {
    return whatsappMessages.withUserOnly.replace("{name}", name)
  }
  if (animalName) {
    return whatsappMessages.withAnimalOnly
      .replace("{animalName}", animalName)
      .replace("{type}", animalType || "")
      .replace("{gender}", animalGender || "")
  }
  return whatsappMessages.default
}


export const useContact = () => {
  const { user } = useAuth()
  const { data: settings } = useSettings()
  const userName = user?.user?.displayName

  const handleContact = (props: {
    animal?: {
      name?: string
      type?: string
      sex?: string
    }
  }) => {
    const { animal } = props
    
    if (settings?.adoption?.method === "whatsapp") {
      const formattedType = animal?.type ? formatAnimalType(animal.type, animal?.sex || "") : ""
      const formattedGender = animal?.sex ? formatAnimalGender(animal.sex) : ""
      
      const message = getCustomWhatsAppMessage(userName, animal?.name, formattedType, formattedGender)
      const encodedMessage = encodeURIComponent(message)
      const url = formatWhatsAppNumber(settings?.adoption?.whatsapp || "")
      window.open(`${url}?text=${encodedMessage}`, "_blank")
    } else if (settings?.adoption?.method === "instagram") {
      window.open(`https://instagram.com/direct/t/${settings?.adoption?.instagram?.replace(/^@/, "")}`, "_blank")
    }
  }

  return {
    handleContact
  }
}
