import { NextRequest } from "next/server";

import Html from "react-pdf-html";
import Handlebars from "handlebars";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

import * as fs from "fs";
import * as path from "path";
import { invoiceTemplate } from "@/resources";
import { generatePDFPuppeteer } from "@/helpers/generate-pdf";

export async function POST(request: NextRequest) {
  const input = await request.json();
  const templateHtml = ""; //invoiceTemplate();
  const data = await generatePDFPuppeteer(templateHtml);

    console.log(data)
}
