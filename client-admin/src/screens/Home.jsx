import React from 'react'
import Container from '../components/container/container.component'
import Footer from '../components/home/Footer'
import RBG from '../assests/img/MoyR.png'
import RR from '../assests/img/header-bg.jpg'
import COTU from '../assests/img/cotubg.jpg'

import Fournisseur from '../components/home/Fournisseur'
import Fourniture from '../components/home/Fourniture'
import Gamme from '../components/home/Gamme'

const Home = () => {
    return (
		<>
		<Container>	
			<section class="w-full px-6 pb-12 antialiased bg-white">
			<div class="mx-auto max-w-7xl">

				<div class="container max-w-lg px-4 py-32 mx-auto text-left md:max-w-none md:text-center">
					
					<h1 class="text-5xl font-extrabold leading-10 tracking-tight text-left text-gray-900 md:text-center sm:leading-none md:text-6xl lg:text-7xl">
						<span class="inline md:block"></span> 
					<span class="relative mt-2 text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-indigo-500 md:inline-block">
						<img src={RBG}/></span></h1>
						<br />
						<br />
						<div class="m-0 text-xl font-normal leading-tight border-0 border-blue-300 lg:text-2xl md:text-2xl">
						Nous avons l’honneur de tenir cette opportunité pour nous présenter brièvement notre société </div>
						<br />
						<div class="m-0 text-xl font-normal leading-tight border-0 border-blue-300 lg:text-2xl md:text-2xl">
						Nous « Le Record », sommes spécialisé dans la commercialisation de fournitures de confection</div>
				</div>
				<div class="w-full md:text-center">
							<div class="w-full overflow-hidden rounded-md shadow-xl sm:rounded-xl">
								<img src={COTU} />
							</div>
				</div>
			</div>
			</section>	

			<Fournisseur/>
			<Fourniture/>
			<Gamme/>
		</Container>
		<Footer/>
		</>

    )
}

export default Home