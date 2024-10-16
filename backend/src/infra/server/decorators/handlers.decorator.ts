import { IRouter, MetaDataKeys, Methods } from '../types'

const methodDecoratorFactory = (method: Methods) => {
    return (path?: string): MethodDecorator => {
        return (target, propertyKey) => {
            const controllerClass = target.constructor

            let routers: IRouter[] = []

            if (Reflect.hasMetadata(MetaDataKeys.ROUTERS, controllerClass)) {
                routers = Reflect.getMetadata(
                    MetaDataKeys.ROUTERS,
                    controllerClass
                )
            }

            routers.push({
                method,
                path: path ?? '',
                handlerName: propertyKey,
            })

            Reflect.defineMetadata(
                MetaDataKeys.ROUTERS,
                routers,
                controllerClass
            )
        }
    }
}

export const Get = methodDecoratorFactory(Methods.GET)
export const Post = methodDecoratorFactory(Methods.POST)
export const Put = methodDecoratorFactory(Methods.PUT)
export const Patch = methodDecoratorFactory(Methods.PATCH)
export const Delete = methodDecoratorFactory(Methods.DELETE)
