import { promises as fs } from 'fs'
import path from 'path'

export default class {
  getImage(name: string) {
    return fs.readFile(path.resolve(__dirname, 'data', name))
  }
  postImage(name: string, image: any) {
    return fs.writeFile(path.resolve(__dirname, 'dist', name), image)
  }

  async getImages() {
    const names = await fs.readdir(path.resolve(__dirname, 'data'))
    const promises = names.map(async(name) => {
      const data = await this.getImage(path.resolve(__dirname, 'data', name))
      return { name, data }
    })
    return promises
  }
  postImages(images: any[]) {
    const promises = images.map(image => {
      return this.postImage(image.name, image.data)
    })
    return promises
  }
}