import express from 'express'

import { Context } from './context'

export enum MetaDataKeys {
    BASE_PATH = 'base_path',
    ROUTERS = 'routers',
}

export enum Methods {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    PATCH = 'patch',
    DELETE = 'delete',
}

export interface IRouter {
    method: Methods
    path: string
    handlerName: string | symbol
}

export interface Handler extends express.Handler {
    context: Context

    bind: (thisArgs: any, ...args: any[]) => any
}
