"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    $MPC_loaded?: boolean
  }
}

export default function MercadoPagoButton() {
  useEffect(() => {
    // Load Mercado Pago script
    function loadMercadoPagoScript() {
      if (window.$MPC_loaded !== true) {
        const script = document.createElement("script")
        script.type = "text/javascript"
        script.async = true
        script.src = document.location.protocol + "//secure.mlstatic.com/mptools/render.js"
        const firstScript = document.getElementsByTagName("script")[0]
        firstScript.parentNode?.insertBefore(script, firstScript)
        window.$MPC_loaded = true
      }
    }

    if (window.$MPC_loaded !== true) {
      if (window.attachEvent) {
        window.attachEvent("onload", loadMercadoPagoScript)
      } else {
        window.addEventListener("load", loadMercadoPagoScript, false)
      }
    }

    // Optional: Uncomment if you need to handle messages when modal closes
    /*
    function handleMercadoPagoMessage(event: MessageEvent) {
      // onclose modal ->CALLBACK FUNCTION
      // Handle the event.data which contains preapproval_id
      console.log("Received message:", event.data);
    }

    window.addEventListener("message", handleMercadoPagoMessage);
    
    return () => {
      window.removeEventListener("message", handleMercadoPagoMessage);
    };
    */
  }, [])

  return (
    <>
      <a
        href="https://www.mercadopago.com.pe/subscriptions/checkout?preapproval_plan_id=2c9380849563a1650195941f77c5174e"
        name="MP-payButton"
        className="w-full bg-gradient-to-r from-amber-800 to-amber-600 hover:from-amber-700 hover:to-amber-500 shadow-md hover:shadow-lg transition-all duration-300 px-4 py-2 rounded-lg text-white"
      >
        Suscribirme
      </a>
    </>
  )
}

