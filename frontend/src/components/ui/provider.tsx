"use client"

import { ChakraProvider, createSystem, defaultConfig, defaultSystem, defineConfig } from "@chakra-ui/react"

export function Provider(props: React.PropsWithChildren) {
  const customConfig = defineConfig({
    globalCss: {
      "body": {
        background: "gray.50"
      }
    }
  })

  const system = createSystem(defaultConfig, customConfig)

  return (
    <ChakraProvider value={system}>
      {props.children}
    </ChakraProvider>
  )
}
