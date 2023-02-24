import { existsSync, writeFileSync, readdirSync, statSync } from "fs";
import { basename, join, sep } from "path";

const samplesDir = join(process.cwd(), "public", "samples");

export const getSamples = () => {
  const allSamples = {};
  let typeBuilder = `export type Sample = `;

  const recurse = (path) => {
    if (!statSync(path).isDirectory()) {
      // extract samples/.../*.wav from path
      let subPath: string[] = path.split(sep);
      subPath = subPath.slice(subPath.indexOf("samples"));
      let instrument = subPath[subPath.length - 2];
      let sampleName = basename(path);
      sampleName = sampleName.split(".").slice(0, -1).join();
      if (!allSamples[instrument]) allSamples[instrument] = {};
      allSamples[instrument][sampleName] = join(...subPath);
      typeBuilder += ` | "${sampleName}"`;
      return;
    }

    const subDirs = readdirSync(path);
    subDirs.map((subPath) => {
      recurse(join(path, subPath));
    });
  };

  recurse(samplesDir);

  typeBuilder += ";";
  const sampleTypePath = join(process.cwd(), "src", "sample.d.ts");
  if (!existsSync(sampleTypePath)) {
    writeFileSync(sampleTypePath, typeBuilder);
  }

  return allSamples;
};
