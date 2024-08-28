"use client";

import { createShortURL } from "@/app/api/prune/actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { makeStatsRoute } from "@/constants/router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  url: z.string().url("Please enter a valid URL"),
});

export function ShortnerInput() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { url } = values;

    const data = await createShortURL(url);

    router.push(makeStatsRoute(data.slug));
  }

  return (
    <div className="w-full md:w-1/2 py-8 md:pb-24 md:pt-12">
      <p className="text-center text-xl pb-8">
        Simplify Your Links, Amplify Your Reach
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full space-x-2"
        >
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    placeholder="Enter your long link to get a custom, compact prne.me URL"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Prune</Button>
        </form>
      </Form>
    </div>
  );
}
