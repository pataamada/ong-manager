'use client'

import React from 'react';

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// zod schema validation
const formLoginSchema = z.object({
  email: z.string().email("Digite um email válido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  rememberMe: z.boolean().optional(),
});

export default function Login() {
  // react hook form config with zod
  const form = useForm<z.infer<typeof formLoginSchema>>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
			email: "",
			password: "",
			rememberMe: false,
		},
  });

  const onSubmit = (data: z.infer<typeof formLoginSchema>) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="relative flex flex-col lg:items-center h-screen lg:flex-row">
      <div className="relative bg-green-500">
        <Image
          src={'/img-pagina-login.svg'}
          width={100}
          height={100}
          alt="iamgem da página de login"
          className="hidden lg:block h-screen w-screen object-cover"
        />
      </div>

      <div className="absolute lg:static top-1/2 left-1/2 lg:left-auto -translate-x-1/2 lg:-translate-x-0 -translate-y-1/2 lg:-translate-y-0 flex w-2/3 lg:p-0 flex-col lg:mx-24 lg:w-2/6 lg:h-screen justify-center gap-4">
        <Image
          src={'/logo-caodominio-satuba.svg'}
          width={200}
          height={70}
          alt="logo do cãodominio satuba"
          className="mb-20 mx-auto"
        />
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col items-center gap-2 mx-auto">
              <h2 className="text-center">Entre em sua conta</h2>
              <h3 className="text-center">Bem-vindo de volta</h3>
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      placeholder="Digite seu email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Senha</FormLabel>
                  <FormControl>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Digite sua senha"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex items-center justify-between">
              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex items-center space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel htmlFor="rememberMe" className="ml-2 block text-sm font-semibold">
                      Lembrar-se
                    </FormLabel>
                  </FormItem>
                )}
              />
              <div className="text-sm">
                <Link
                  href="/"
                  className="font-normal text-emerald-600 hover:text-emerald-500 underline"
                >
                  Esqueceu a senha?
                </Link>
              </div>
            </div>
            <Button className="w-full" type="submit">
              Entrar
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
