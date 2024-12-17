import puppeteer from 'puppeteer';

type Configs = {
  Authorization?: string;
};

export async function generatePDFPuppeteer(html: string, configs?: Configs) {
  const { Authorization = '' } = configs || {};
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setExtraHTTPHeaders({
    Authorization,
  });

  // Carrega o HTML com o script JavaScript embutido
  await page.setContent(html, { waitUntil: 'networkidle0' });

  // Opções do PDF
  const pdf = await page.pdf({ format: 'A4', waitForFonts: true });

  await browser.close();

  return pdf;
}
