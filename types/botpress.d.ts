declare global {
  interface Window {
    botpressWebChat: {
      init: (config: { configUrl: string; hostUrl: string }) => void
      show: () => void
      hide: () => void
    }
    toggleBotpressChat: () => void
  }
}

export {}
