import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: { shortHash: string } },
) {
  try {
    const { shortHash } = params;

    // update the count
    const data = await prisma.url.update({
      where: {
        slug: shortHash,
      },
      data: {
        hits: {
          increment: 1,
        },
      },
    });

    if (!data) {
      return notFound();
    }

    // insert into logs table
    await prisma.redirectLog.create({
      data: {
        urlId: data.id,
        userAgent: _.headers.get("user-agent"),
        ip: _.headers.get("X-Forwarded-For"),
        referer: _.headers.get("referer"),
      },
    });

    return NextResponse.redirect(data.url);
  } catch (error) {
    return notFound();
  }
}
