import { Icon } from "@iconify/react"
import { useRouter } from "next/router"

export default function NotFound(){
	const router = useRouter()
	const back = ()=>{
		router.back()
	}
		return  (
		<section className="container-fluid">
      <div className="row main">
        <div className="col-md-12">

          <h1>404</h1>
          <h2><Icon icon="mdi:face-sad" /> Oh! The page cannot be found...</h2>
          <h3>The link might be incorrect...</h3>
          <h4>or the page was deleted</h4>
          <button onClick={back}>Go Back</button>
        </div>
      </div>
    </section>



		)



}