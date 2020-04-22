import path from 'path'
import sharp from './plugins/sharp'
import { local as LocalDataStore } from './datastore'

const dataStore = new LocalDataStore()
const reg=/(.*)(?:\.([^.]+$))/

const init = async() => {
  const imagePromises = await dataStore.getImages()

  imagePromises.map(promise => {
    return promise.then(async(image) => {
      const newImage = await sharp(image.data)
      return {
        name: `${image.name.match(reg)![1]}.${newImage.type}`, 
        data: newImage.data
      }
    }).then(image => dataStore.postImage(image.name, image.data))
  })
}

init()
