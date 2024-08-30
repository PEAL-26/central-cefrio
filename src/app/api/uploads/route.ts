import { randomUUID } from "crypto";
import * as fs from "fs";
import { NextRequest, NextResponse } from "next/server";

import { getFileType } from "@/helpers/form-data";
import { checkOrCreateDirectory } from "@/helpers/input-output";
import { responseError } from "@/helpers/response/route-response";

export async function POST(request: NextRequest) {
  try {
    let path = null;
    const pathSplitted = request.url.split("?")[1];
    if (pathSplitted) {
      path = pathSplitted.substring(5);
    }

    const formData = await request.formData();
    const formDataEntryValues = Array.from(formData.values());

    const files = [];
    for (const formDataEntryValue of formDataEntryValues) {
      if (
        typeof formDataEntryValue === "object" &&
        "arrayBuffer" in formDataEntryValue
      ) {
        const file = formDataEntryValue as unknown as Blob as File;
        const fileType = getFileType(file.name);
        const fileName = `${new Date().getTime()}_${randomUUID()}.${fileType}`;
        const newPath = path ? path : "public/files";
        checkOrCreateDirectory(newPath);
        const buffer = Buffer.from(await file.arrayBuffer());
        fs.writeFileSync(`${newPath}/${fileName}`, buffer);
        files.push(fileName);
      }
    }
    return NextResponse.json(files, { status: 200 });
  } catch (error: any) {
    return responseError(error);
  }
}
