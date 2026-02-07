import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Message {
  id: string
  content: string
  sender: 'user' | 'assistant'
  type: 'text' | 'file'
  timestamp: number
  attachment?: {
    name: string
    url: string
    type: 'image' | 'file'
  }
}

interface ChatState {
  isOpen: boolean
  isTyping: boolean
  messages: Message[]
  setIsOpen: (isOpen: boolean) => void
  setIsTyping: (isTyping: boolean) => void
  addMessage: (message: Message) => void
  resetChat: () => void
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      isOpen: false,
      isTyping: false,
      messages: [
        {
          id: '1',
          content: "Bonjour! 👋 \nComment puis-je vous aider avec votre projet aujourd'hui ?",
          sender: 'assistant',
          type: 'text',
          timestamp: Date.now()
        }
      ],
      setIsOpen: (isOpen) => set({ isOpen }),
      setIsTyping: (isTyping) => set({ isTyping }),
      addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
      resetChat: () => set({
        messages: [
            {
              id: '1',
              content: "Bonjour! 👋 \nComment puis-je vous aider avec votre projet aujourd'hui ?",
              sender: 'assistant',
              type: 'text',
              timestamp: Date.now()
            }
          ]
      })
    }),
    {
      name: 'chat-storage',
    }
  )
)
