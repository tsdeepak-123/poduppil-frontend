import React from 'react'

function About() {
  return (
    <div id="About" className='mt-14'>
    <h1 class="text-2xl md:text-5xl font-extrabold ml-5 md:ml-80">ABOUT US</h1>
    <div class="container md:ml-32 px-6 text-gray-600 md:px-12 xl:px-6">
        <div class="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
        <div class="md:5/12 lg:w-5/12">
            <img src="/Images/podu.png" alt="image" loading="lazy" width="" height=""/>
        </div>
        <div class="md:7/12 lg:w-6/12">
            <h2 class="text-2xl text-black font-bold md:text-4xl">Our Commitment to Excellence</h2>
            <p class="mt-6 text-gray-600">At our company, excellence isn't just a goal; it's our guiding principle. With every brick we lay, every structure we build, and every project we undertake, our unwavering commitment to excellence shines through. We don't just construct buildings; we craft legacies, and we do it with the utmost dedication to quality, precision, and innovation. Our passion for construction drives us to deliver results that stand the test of time, ensuring that your vision becomes a reality that surpasses expectations. When you choose our company, you choose excellence at every step of the journey.</p>
        </div>
        </div>
    </div>
</div>
  )
}

export default About