import React, { useEffect, useState } from "react";
import { axiosUser } from "../../../Api/Api";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import CloseIcon from '@mui/icons-material/Close';

const Header = () => {
  const [bannerData, setBannerData] = useState([]);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axiosUser.get("findbanner");
      setBannerData(response?.data?.allBannerData || []);
    } catch (error) {
      console.error("Error fetching banner data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const defaultBanner = "/Images/home_background.jpg";

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const renderMenuItems = (isMobile = false) => (
    <div className={`flex ${isMobile ? "flex-col items-center" : "space-x-4"}`}>
      <a href="#home" className={`${isMobile ? "text-black" : "text-white"} font-bold`}>
        Home
      </a>
      <a href="#Services" className={`${isMobile ? "text-black" : "text-white"} font-bold`}>
        Services
      </a>
      <a href="#About" className={`${isMobile ? "text-black" : "text-white"} font-bold`}>
        About
      </a>
      <a href="#Projects" className={`${isMobile ? "text-black" : "text-white"} font-bold`}>
        Projects
      </a>
      <a
        href="#Contact"
        className={`text-${isMobile ? "black" : "white"} bg-yellow-500 hover:text-white font-bold rounded-lg text-sm px-5 py-2`}
      >
        Contact
      </a>
    </div>
  );

  return (
    <>
      <header className="text-white p-4 flex items-center justify-between fixed top-0 left-0 right-0 z-10 bg-transparent">
        <nav className="container mx-auto flex items-center justify-between">
          <div className="mr-4">
            <img src="/Images/podu.png" alt="Logo" className="h-24 w-24" />
          </div>
          <div className="md:flex md:items-center">
            <div className="hidden md:flex space-x-4">{renderMenuItems()}</div>
          </div>
          <div className="md:hidden relative">
            <button
              id="mobileMenuButton"
              onClick={toggleMobileMenu}
              className="transition ease-in delay-150 text-amber-950 hover:text-yellow-500"
            >
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
          <div
            id="mobileMenu"
            className={`${
              isMobileMenuOpen ? "block" : "hidden"
            } md:hidden absolute top-0 left-0 w-full bg-white align-middle h-64`}
          >
            <div className="flex justify-end p-4">
              <CloseIcon className="text-black hover:text-yellow-500" onClick={toggleMobileMenu} />
            </div>
            {renderMenuItems(true)}
          </div>
        </nav>
      </header>
      <div className="">
        {bannerData.length > 0 ? (
          <Carousel
            autoPlay
            infiniteLoop
            interval={3000}
            showThumbs={false}
            showArrows={false}
            showStatus={false}
          >
            {bannerData.map((banner, index) => (
              <div key={index}>
                <img
                  src={banner.photo}
                  alt={`Banner ${index + 1}`}
                  className="h-[400px] md:h-[100vh] object-cover w-full"
                  onError={(e) => {
                    e.target.src = defaultBanner; // Use default banner on error
                  }}
                />
                <div
                  className="absolute z-40 top-[50%]  sm:top-[30%] flex items-center flex-col justify-center h-fit w-full "
                  id="home"
                >
                  <div className="flex flex-col justify-center items-center w-full">
                    <h1 className="text-4xl md:text-8xl text-center font-extrabold text-yellow-500">
                      PODUPPIL
                    </h1>
                    <h1 className="text-4xl md:text-8xl text-center font-extrabold">
                      <span className="bg-gradient-to-r from-yellow-500 to-red-500 text-transparent bg-clip-text">
                        CONSTRUCTIONS
                      </span>
                    </h1>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        ) : (
          <>
          <img
            src={defaultBanner}
            alt="Default Banner"
            className="h-[400px] md:h-[100vh] object-cover w-full"
          />
          
          <div
          className="absolute z-40 top-[50%]  sm:top-[30%] flex items-center flex-col justify-center h-fit w-full "
          id="home"
        >
          <div className="flex flex-col justify-center items-center w-full">
            <h1 className="text-4xl md:text-8xl text-center font-extrabold text-yellow-500">
              PODUPPIL
            </h1>
            <h1 className="text-4xl md:text-8xl text-center font-extrabold">
              <span className="bg-gradient-to-r from-yellow-500 to-red-500 text-transparent bg-clip-text">
                CONSTRUCTIONS
              </span>
            </h1>
          </div>
        </div>
        </>
        )}    
      </div>
    </>
  );
};

export default Header;
