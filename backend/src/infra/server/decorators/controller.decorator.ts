import { MetaDataKeys } from '../types'

const Controller = (basePath: string): ClassDecorator => {
    return (target) => {
        Reflect.defineMetadata(MetaDataKeys.BASE_PATH, basePath, target)
    }
}

export default Controller
