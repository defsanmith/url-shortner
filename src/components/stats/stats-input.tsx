"use client";

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
import { notFound, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  url: z.string().url("Please enter a valid URL"),
});

export function StatsInput() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { url } = values;

    const slug = url.split("/").pop();

    if (!slug) {
      return notFound();
    }

    router.push(makeStatsRoute(slug));
  }

  return (
    <div className="w-full md:w-1/2 py-8 md:py-24">
      <p className="text-center text-xl pb-8">
        Get Statistic for your URL Shortner URL
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
                    placeholder="Enter your URL Shortner URL to get statistics"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Get Stats</Button>
        </form>
      </Form>
    </div>
  );
}
