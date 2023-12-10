import React from 'react'

function ProjectCard({name,image}) {
  return (
    <div class="w-full md:w-1/2 lg:w-1/3 px-4">
                    <div class="bg-gray-200 rounded-lg overflow-hidden mb-10 hover:bg-black text-gray-600 hover:text-white transition ease-in delay-150">
                        <img
                            src={image}
                            alt="image"
                            class="w-full h-80"
                            />
                        <div class="p-8 sm:p-9 md:p-7 xl:p-9 text-center h-32 cursor-pointer">
                            <h3 class="font-bold text-2xl mb-4 block">{name}</h3>
                        </div>
                    </div>
                </div>
  )
}

export default ProjectCard