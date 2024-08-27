import StatsActions from "@/components/stats/actions";
import Clipboard from "@/components/stats/clipboard";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { makeRedirectURL } from "@/constants/router";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function Stats({
  params,
}: {
  params: { shortHash: string };
}) {
  const { shortHash } = params;

  const data = await prisma.url.findUnique({
    where: {
      slug: shortHash,
    },
  });

  if (!data) {
    return notFound();
  }

  const redirectUrl = makeRedirectURL(data.slug);

  return (
    <div className="container flex justify-center">
      <div className="w-full md:w-1/2 py-8 md:py-24">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Short URL</CardTitle>
            <div className="flex items-center gap-2 flex-row">
              <CardDescription className="hover:text-primary">
                <a href={redirectUrl} target="_blank">
                  {redirectUrl}
                </a>
              </CardDescription>
              <Clipboard redirectURL={redirectUrl} />
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>Total number of hits at</CardDescription>
            <div className="text-2xl font-bold">{data.hits}</div>
            <p className="text-xs text-muted-foreground">
              since {new Date(data.createdAt).toLocaleDateString()}
            </p>
          </CardContent>
          <CardFooter className="flex-col items-start gap-4">
            <StatsActions />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
