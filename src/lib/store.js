import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create()(
    persist((set) => ({
        cart: [],
        addToCart: (newItem) => set((state) => {
            const itemAlreadyInCart = state.cart.find(
                (product) => product.id === newItem.id,
            )

            if (!itemAlreadyInCart) {
                return { cart: [...state.cart, { ...newItem, quantity: 1 }] }
            } else {
                return {
                    cart: state.cart.map((product) => {
                        if (product.id === newItem.id) {
                            return { ...product, quantity: product.quantity + 1 }
                        }
                        return product
                    })
                }
            }
        }),
        removeFromCart: (productId) => set((state) => ({
            cart: state.cart.flatMap((product) => {
                if (product.id !== productId) {
                    return [product]
                }

                if (product.quantity > 1) {
                    return [{ ...product, quantity: product.quantity - 1 }]
                }

                return []
            }),
        })),
        removeAllFromCart: () => set({ cart: [] }),
    }),
        {
            name: 'dummy-store-local-identifier', // name of the item in the storage (must be unique)
            // storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        },
    )
)