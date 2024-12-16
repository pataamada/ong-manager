'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { validateCpf } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogProps } from "@radix-ui/react-dialog";
import { InputMask } from "@react-input/mask";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Steps } from "../Steps";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { saveDonationAction } from "@/actions/transaction/saveDonation";
import { formatDateToISO } from "@/utils/formatData";

interface UploadedImage {
  file: File;
  preview: string;
}

interface INewRegisterModal extends DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void
}

const mockedCauses = ['Água', 'Cirurgia', 'Limpeza', 'Energia', 'Ração', 'Aluguel']
const mockedAnimal = ['Nina', 'Cabeça de Pastel', 'Caramelo Amarelo', 'Pretinho', 'Lua', 'Batata quente']

const mockedSteps = {
    donation: [
        {step: 1, label: 'Tipo do registro'},
        {step: 2, label: 'Doador'},
        {step: 3, label: 'Dados'},
    ],
    expensive: [
        {step: 1, label: 'Tipo do registro'},
        {step: 2, label: 'Doador'},
    ],
}

const DonationStepTwoSchema = z
.object({
  name: z
    .string().optional(),
  cpf: z
    .string()
    .min(11, "O CPF deve ter pelo menos 11 caracteres")
    .trim()
    .transform(cpf => cpf.replaceAll(".", "").replace("-", ""))
    .optional()
    .or(z.literal("")),
})
.refine(data => !data.cpf || validateCpf(data.cpf), {
  message: "Digite um CPF valido",
  path: ["cpf"],
})

const DonationStepThreeSchema = z.object({
  value: z.string(),
  cause: z.string(),
  animalId: z.string(),
  description: z.string().trim(),
  proof: z.array(z.instanceof(File)), 
});

const ExpensiveStepTwoSchema = z
.object({
  value: z.string(),
  categoryId: z.string(),
  description: z.string().trim(),
  proof: z.array(z.instanceof(File)),
})

export const NewRegister = ({
  open,
  onOpenChange,
  ...props
}: INewRegisterModal) => {
  const [type, setType] = useState<'donation' | 'expensive'>('donation')
  const [step, setStep] = useState(1)
  const [donationsFiles, setDonationsFiles] = useState<{ file: File; preview: string }[]>([]);
  const [expensivesFiles, setExpensivesFiles] = useState<UploadedImage[] | []>([]);

  const handleImageUpload = (event: any, setValue: any) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setValue((prevImages) => [...prevImages, ...newImages]);
  };

  const removeImage = (indexToRemove: number, setValue: any) => {
    setValue((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
  };

  const steps = type === 'donation' ? mockedSteps.donation : mockedSteps.expensive

  const formDonationStepTwo = useForm<z.infer<typeof DonationStepTwoSchema>>({
    resolver: zodResolver(DonationStepTwoSchema),
  })

  const formDonationStepThree = useForm<z.infer<typeof DonationStepThreeSchema>>({
    resolver: zodResolver(DonationStepThreeSchema),
  })

  const formExpensiveStepTwo = useForm<z.infer<typeof ExpensiveStepTwoSchema>>({
    resolver: zodResolver(ExpensiveStepTwoSchema),
  })
  
  const handleOnSubmitStepTwo = (data) => {
    console.log(data, 'data StepTwo')

    setStep(step + 1)
  }  

  const handleOnSubmitStepThree = (e) => {
    e.preventDefault();
    console.log({...formDonationStepThree.control._formValues}, 'data')
    const formData = {
      ...formDonationStepThree.control._formValues,
      proof: donationsFiles.map((item) => item.file),
    };
  
    try {
      const validatedData = DonationStepThreeSchema.parse(formData);
      const allData = {
        userName: 'Anya Forger',
        userCpf: '81552346064',
        animalId: validatedData.animalId,
        category: validatedData.cause,
        value: Number(500),
        description: validatedData.description,
        proof: ['validatedData.proof'],
        date: formatDateToISO(new Date())
      }
      const response = saveDonationAction(allData)
      console.log(response, 'reponse')
    } catch (error) {
      console.error("Erro de validação:", error.errors);
    }
  };

  const handleOnSubmitStepTwoExpensive = (data) => {
    console.log(data, 'data StepTwoExpensive')
  }  

  const handleCancel = () => {
    setStep(step === 1 ? 1 : step -1)
  }  

  const handleNext = () => {

    if (type === 'donation' && step === 2) {
      formDonationStepTwo.handleSubmit(handleOnSubmitStepTwo)
    }
    setStep(step + 1)
  }  

  let content = (
    <div className="flex gap-4">
      <div onClick={() => setType('donation')} className={`flex w-full flex-col ${type === 'donation' ? 'border-2 border-[#27272A]' : 'border border-[#E4E4E7]' } gap-4 p-6 rounded-lg hover:cursor-pointer`}>
        <div
          className={`flex justify-center items-center rounded h-[56px] w-[56px] bg-[#F4F4F5]`}
        >
          <Image
            src={`/finance/heart-handshake.svg`}
            width={32}
            height={32}
            priority
            alt="ícone"
          />
        </div>
        <div>
          <div className="font-bold text-2xl text-[#09090B]">Doação</div>
          <div className="font-normal text-base text-[#52525B]">Registrar entrada monetária</div>
        </div>
      </div>
      <div onClick={() => setType('expensive')} className={`flex w-full flex-col ${type === 'expensive' ? 'border-2 border-[#27272A]' : 'border border-[#E4E4E7]' } gap-4 p-6 rounded-lg hover:cursor-pointer`}>
        <div
          className={`flex justify-center items-center rounded h-[56px] w-[56px] bg-[#F4F4F5]`}
        >
          <Image
            src={`/finance/trending-down-black.svg`}
            width={32}
            height={32}
            priority
            alt="ícone"
          />
        </div>
        <div>
          <div className="font-bold text-2xl text-[#09090B]">Despesas</div>
          <div className="font-normal text-base text-[#52525B]">Controlar gastos e saídas </div>
        </div>
      </div>
    </div>
  );

  if (type === 'donation' && step === 2) {
    content = (
      <>
        <div className="flex w-full rounded-md mb-4 py-2 px-3 gap-2 bg-[#FFF7ED] border border-[#FB923C]">
          <Image
              src={`/finance/info.svg`}
              width={16}
              height={16}
              priority
              alt="ícone"
            />
          <div className="flex gap-1">
            <div className="font-normal text-base text-[#FB923C]">
              Caso não seja preenchido, a doação será
            </div>
            <div className="font-bold text-base text-[#FB923C]">
            anônima.
            </div>
          </div>
        </div>

      <Form {...formDonationStepTwo}>
        <form
          onSubmit={formDonationStepTwo.handleSubmit(handleOnSubmitStepTwo)}
          className="flex flex-col gap-6"
        >
          <div className="grid gap-2">
            <FormField
              control={formDonationStepTwo.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Nome completo</FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      placeholder="Digite o nome completo"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formDonationStepTwo.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">CPF</FormLabel>
                  <FormControl>
                    <InputMask
                      mask="___.___.___-__"
                      replacement={{ _: /\d/ }}
                      component={Input}
                      id="cpf"
                      placeholder="ex: ###.###.###-##"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end gap-2 mt-6">
              <Button variant='outline' className="flex items-center gap-2" onClick={handleCancel}>
                Cancelar
              </Button>
              <Button type="submit" variant='default' className="flex items-center gap-2 bg-[#09090B] hover:bg-[#3A3A3B]">
                {step === steps.length ? 'Criar' : 'Avançar'}
              </Button>
            </div>
        </form>
      </Form>
    </>
    )
  }

  if (type === 'donation' && step === 3) {
    content = (
      <>
        <Form {...formDonationStepThree}>
          <form
            onSubmit={handleOnSubmitStepThree}
            className="flex flex-col gap-6"
          >
            <div className="grid gap-2">
              <FormField
                control={formDonationStepThree.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Qual o valor da doação?
                    </FormLabel>
                    <FormControl>
                      <Input id="value" placeholder="ex: 230,00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formDonationStepThree.control}
                name="cause"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Qual a causa da doação??
                    </FormLabel>
                    <FormControl>
                      <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecionar causa" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockedCauses.map(i => (
                            <SelectItem key={i} value={i}>{i}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formDonationStepThree.control}
                name="animalId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Qual animal recebeu a doação?
                    </FormLabel>
                    <FormControl>
                      <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecionar animal" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockedAnimal.map(i => (
                            <SelectItem key={i} value={i}>{i}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formDonationStepThree.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Descrição</FormLabel>
                    <FormControl>
                      <div className="flex items-center w-full rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 group container-input gap-2">
                        <textarea
                          id="description"
                          placeholder="Descreva do que se trata a despesa..."
                          className="w-full h-[100px] py-2 resize-none bg-transparent focus:outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground group-[.container-input]:focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel className="font-semibold">Comprovantes</FormLabel>
                <FormControl>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-4">
                      <label className="cursor-pointer">
                        <div className="w-[100px] h-[100px] flex items-center justify-center gap-1 p-3 border border-dashed border-[#A1A1AA] rounded bg-[#FAFAFA]">
                          <div className="text-normal text-3xl text-[#71717A]">
                            +
                          </div>
                          <div className="text-normal text-sm text-[#71717A]">
                            Novo
                          </div>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={(e) =>
                            handleImageUpload(e, setDonationsFiles)
                          }
                        />
                      </label>

                      {donationsFiles.map((image, index) => (
                        <div
                          key={index}
                          className="relative w-[100px] h-[100px]"
                        >
                          <Image
                            src={image.preview}
                            alt={`preview-${index}`}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-md"
                          />
                          <button
                            onClick={() =>
                              removeImage(index, setDonationsFiles)
                            }
                            className="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center  hover:bg-red-600"
                          >
                            X
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant='outline' className="flex items-center gap-2" onClick={handleCancel}>
                Cancelar
              </Button>
              <Button type="submit" variant='default' className="flex items-center gap-2 bg-[#09090B] hover:bg-[#3A3A3B]">
                {step === steps.length ? 'Criar' : 'Avançar'}
              </Button>
            </div>
          </form>
        </Form>
      </>
    );
  }

  if (type === 'expensive' && step === 2) {
    content = (
      <>
        <Form {...formExpensiveStepTwo}>
          <form
            onSubmit={formExpensiveStepTwo.handleSubmit(handleOnSubmitStepTwoExpensive)}
            className="flex flex-col gap-6"
          >
            <div className="grid gap-2">
              <FormField
                control={formExpensiveStepTwo.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Qual o valor da despesa?
                    </FormLabel>
                    <FormControl>
                      <Input id="value" placeholder="ex: 230,00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formExpensiveStepTwo.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Categoria</FormLabel>
                    <FormControl>
                      <Select
                      // onValueChange={}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecionar categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          {/* <SelectItem value={}>Administrador</SelectItem> */}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formExpensiveStepTwo.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Descrição</FormLabel>
                    <FormControl>
                      <div className="flex items-center w-full rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 group container-input gap-2">
                        <textarea
                          id="description"
                          placeholder="Descreva do que se trata a despesa..."
                          className="w-full h-[100px] py-2 resize-none bg-transparent focus:outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground group-[.container-input]:focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel className="font-semibold">Comprovantes</FormLabel>
                <FormControl>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-4">
                      <label className="cursor-pointer">
                        <div className="w-[100px] h-[100px] flex items-center justify-center gap-1 p-3 border border-dashed border-[#A1A1AA] rounded bg-[#FAFAFA]">
                          <div className="text-normal text-3xl text-[#71717A]">
                            +
                          </div>
                          <div className="text-normal text-sm text-[#71717A]">
                            Novo
                          </div>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={(e) =>
                            handleImageUpload(e, setExpensivesFiles)
                          }
                        />
                      </label>

                      {expensivesFiles.map((image, index) => (
                        <div
                          key={index}
                          className="relative w-[100px] h-[100px]"
                        >
                          <Image
                            src={image.preview}
                            alt={`preview-${index}`}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-md"
                          />
                          <button
                            onClick={() =>
                              removeImage(index, setExpensivesFiles)
                            }
                            className="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center  hover:bg-red-600"
                          >
                            X
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            </div>
          </form>
        </Form>
      </>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange} {...props}>
      <DialogContent className="sm:max-w-[653px]">
        <div className="flex flex-col gap-6">
          <div className="font-bold text-2xl text-[#09090B]">Novo registro</div>

          <div className="flex flex-col">
            {/* steps */}
            <div className="mx-auto mb-10 flex justify-between">
              {steps.map((i) => (
               <Steps key={i.step} label={i.label} step={i.step} currentStep={step} stepsCount={steps.length} />
              ))}
            </div>

            {content}

            {step === 1 && (
              <div className="flex justify-end gap-2 mt-6">
                <Button variant='outline' className="flex items-center gap-2" onClick={handleCancel}>
                  Cancelar
                </Button>
                <Button variant='default' className="flex items-center gap-2 bg-[#09090B] hover:bg-[#3A3A3B]" onClick={handleNext}>
                  {step === steps.length ? 'Criar' : 'Avançar'}
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
