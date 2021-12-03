export enum QueryMethod {
    Get = "get",
    Update = "update",
    Create = "create",
    Delete = "delete",
  }
  
export type GetHandlerModuleParams = {
  resource: string
  method?: QueryMethod
  plural?: boolean
}

export type BlitzDataProviderParams  = {
  invoke: (module: any, params: any) => any
}

export type GetHandlerParams = GetHandlerModuleParams & BlitzDataProviderParams

  