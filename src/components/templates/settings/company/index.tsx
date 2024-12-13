"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ReactLoading } from "@/libs/react-loading";
import { Textarea } from "@/components/ui/textarea";
import { ImageSelector } from "@/components/ui/image-selector";

import { useSettings } from "./use-settings";
import { Loading } from "@/components/ui/loading";

export function SettingsCompany() {
  const { form, isLoading, isLoadingData, onSubmit, uploadProgress } =
    useSettings();

  if (isLoadingData) {
    return <Loading />;
  }

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
          <div className="col-span-2">
            <div className="relative w-[170px] h-[170px]">
              <ImageSelector
                url={form.getValues("logo.url")}
                disabled={isLoading}
                name="logo.file"
                form={form}
              />
              {isLoading && form.getValues("logo.file") && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white">
                  <span className="font-bold">{`${uploadProgress}%`}</span>
                </div>
              )}
            </div>
          </div>
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormControl className="hidden">
                <Input hidden disabled={isLoading} {...field} />
              </FormControl>
            )}
          />
          <div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full flex-1">
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      type="text"
                      placeholder="Acme Inc."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="telephone"
              render={({ field }) => (
                <FormItem className="w-full flex-1">
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      type="text"
                      placeholder="(+244) 900 00 00 00"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full flex-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      type="text"
                      placeholder="email@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="site"
              render={({ field }) => (
                <FormItem className="w-full flex-1">
                  <FormLabel>Site</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      type="text"
                      placeholder="www.example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="w-full flex-1">
                  <FormLabel>Endereço</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isLoading}
                      rows={3}
                      placeholder="123 Main St, Anytown USA"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="taxpayer"
              render={({ field }) => (
                <FormItem className="w-full flex-1">
                  <FormLabel>Contribuinte</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      type="text"
                      placeholder="xxxxxxxxxxxx"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="w-full flex-1">
                  <FormLabel>Localização</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      type="text"
                      placeholder="Angola - Luanda"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button disabled={isLoading} type="submit">
            Salvar
          </Button>
        </div>
      </form>
    </Form>
  );
}
