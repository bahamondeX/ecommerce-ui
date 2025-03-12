// firebaseClient.ts
import { User } from "firebase/auth";
import type { Product, CartItem, ShippingInfo, ShoppingCart, Order } from "@/types/cart";
import { useFirestore } from "@/hooks/use-firestore";
import { useEffect, useState, useContext, useCallback, useRef, useMemo } from "react"
import { nanoid } from "nanoid"


export default function useShoppingCart() {
    const [getProduct, setProduct, deleteProduct, products] = useFirestore("products")
    const [getOrder, setOrder, deleteOrder, orders] = useFirestore("orders")
    const [cart, setCart] = useState<ShoppingCart>({ items: [] })

}, [])

