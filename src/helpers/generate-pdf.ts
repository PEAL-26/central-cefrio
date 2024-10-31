import puppeteer from "puppeteer";

export async function generatePDFPuppeteer(html: string) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Carrega o HTML com o script JavaScript embutido
  await page.setContent(html, { waitUntil: "networkidle0" });

  // Opções do PDF
  const pdf = await page.pdf({ format: "A4", waitForFonts: true });

  await browser.close();

  return pdf;
}
