import {
  AppErrorResponse,
  makeErrorResponse,
  makeSuccessResponse,
} from "@/lib/response";
import { createShortURL } from "./actions";
import { CreateUrlDto } from "./dtos";

export async function POST(request: Request) {
  try {
    const body: CreateUrlDto = await request.json();

    const data = await createShortURL(body.url);

    return makeSuccessResponse(data, "Short URL created successfully");
  } catch (error) {
    return makeErrorResponse(error as AppErrorResponse);
  }
}
