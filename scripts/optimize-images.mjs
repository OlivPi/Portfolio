import sharp from 'sharp'
import { readdir } from 'fs/promises'
import { join, extname, basename } from 'path'

const PUBLIC_DIR = './public'
const PROJECTS_DIR = './public/projects'

const tasks = [
  {
    input: join(PUBLIC_DIR, 'OlivWebN&B.png'),
    output: join(PUBLIC_DIR, 'OlivWebN&B.png'),
    maxWidth: 500,
  },
]

const files = await readdir(PROJECTS_DIR)
for (const file of files) {
  if (['.png', '.jpg', '.jpeg'].includes(extname(file).toLowerCase())) {
    tasks.push({
      input: join(PROJECTS_DIR, file),
      output: join(PROJECTS_DIR, file),
      maxWidth: 1200,
    })
  }
}

for (const { input, output, maxWidth } of tasks) {
  const meta = await sharp(input).metadata()
  if (meta.width && meta.width <= maxWidth) {
    console.log(`✓ skip  ${basename(input)} (${meta.width}px)`)
    continue
  }
  await sharp(input)
    .resize({ width: maxWidth, withoutEnlargement: true })
    .png({ compressionLevel: 9, quality: 85 })
    .toFile(output + '.tmp')

  const { rename } = await import('fs/promises')
  await rename(output + '.tmp', output)
  const after = await sharp(output).metadata()
  console.log(`✓ opt   ${basename(input)} ${meta.width}px → ${after.width}px`)
}
