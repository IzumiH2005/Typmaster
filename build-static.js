import { build } from 'vite';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

const execPromise = promisify(exec);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function buildStatic() {
  console.log('Building client...');
  await build({
    root: path.resolve(__dirname, 'client'),
    build: {
      outDir: path.resolve(__dirname, 'dist/public'),
      emptyOutDir: true,
    }
  });

  // Copy static assets and configuration files
  console.log('Copying static assets and configuration files...');
  try {
    await fs.copyFile(
      path.resolve(__dirname, 'client/public/_redirects'),
      path.resolve(__dirname, 'dist/public/_redirects')
    );
    console.log('Configuration files copied successfully.');
  } catch (err) {
    console.error('Error copying configuration files:', err);
  }

  console.log('Static build completed successfully!');
}

buildStatic().catch(err => {
  console.error('Build failed:', err);
  process.exit(1);
});