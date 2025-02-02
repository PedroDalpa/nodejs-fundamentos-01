import { parse } from 'csv-parse';
import fs from 'node:fs';

const csvPath = new URL('./data.csv', import.meta.url);

const stream = fs.createReadStream(csvPath);

const csvParse = parse({
  delimiter: ',',
  skipEmptyLines: true,
  fromLine: 2, // skip the header line
});

async function run() {
  const linesParse = stream.pipe(csvParse);

  for await (const line of linesParse) {
    const [title, description] = line;
    console.log({ title, description });

    await fetch('http://localhost:3000/task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
}

run();
