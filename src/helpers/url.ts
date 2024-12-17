const http = require('http');

export async function generateFileFromUrl(url?: string | null) {
  if (!url) return url === null ? null : undefined;

  const response = await fetch(url);
  const name = url.split('/').pop() || '';
  const data = await response.blob();

  const metadata = {
    type: data.type,
  };

  return new File([data], name, metadata);
}

export async function generateImageDataURLFromURL(imageURL: string): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!imageURL) return resolve('');

    const parsedURL = new URL(imageURL);

    const options = {
      hostname: parsedURL.hostname,
      port: parsedURL.port || 80,
      path: parsedURL.pathname,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0', // Set a user agent to prevent being blocked
      },
    };

    const req = http.request(options, (res: any) => {
      const imageData: Uint8Array[] = [];

      res.on('data', (chunk: Uint8Array) => {
        imageData.push(chunk);
      });

      console.log({ headers: res.headers });
      res.on('end', () => {
        const contentType = res.headers['content-type'];
        console.log({contentType})
        const data = Buffer.concat(imageData);
        const dataURL = `data:${contentType};base64,${data.toString('base64')}`;
        resolve(dataURL);
      });
    });

    req.on('error', (error: Error) => {
      reject(error);
    });

    req.end();
  });
}
