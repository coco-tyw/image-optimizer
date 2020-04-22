import Sharp from 'sharp'

type config = {
  width?: number
  height?: number
  fit?: "contain" | "cover" | "fill" | "inside" | "outside"
  position?: string,
  background?: Object
}

const defaultConfig: config = {
  width: 100,
  height: 100,
  fit: 'contain',
  position: 'top',
}

export default async function (image: Buffer, config: config = {}) {
  const c = Object.assign({}, defaultConfig, config)
  const data = await Sharp(image)
  const meta = await data.metadata()
  const newImage = await data
      .resize(meta.width, meta.height)
      .webp({ quality: 90 })
      .toBuffer()
  return {
    data: newImage,
    type: 'webp'
  }
}