import React from 'react';

function Feedback() {
  const feedbackStyles = {
    backgroundImage: 'url("/Images/feedback_bacground.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '384px',
  };

  return (
    <div style={feedbackStyles}>
      <div className="flex flex-col justify-center h-96 bg-black bg-opacity-50">
        <h1 className="text-4xl font-extrabold text-white text-center mb-5">FEEDBACKS</h1>

        <div id="testimonials-container" className="overflow-hidden text-white text-center">
          <div className="testimonial-slide inline-block w-full md:w-1/2">
            <p className="testimonial-text font-bold text-xl">
              "During my recent project with Construction Builders, I was thoroughly impressed with the quality of their work and their commitment to meeting deadlines. Their team, led by Sarah Johnson, demonstrated a high level of professionalism throughout."
            </p>
            <p className="testimonial-author"> - John Anderson</p>
          </div>
          <div className="testimonial-slide inline-block w-full md:w-1/2" style={{ display: 'none' }}>
            <p className="testimonial-text font-bold text-xl">
              "I had the pleasure of working with Greenfield Construction, and I couldn't be happier with the outcome. Their team, led by Michael Williams, consistently delivered top-notch craftsmanship and attention to detail. The project was completed on time, and Michael's excellent communication skills made the entire process seamless."
            </p>
            <p className="testimonial-author"> - Emily Davis</p>
          </div>
          <div className="testimonial-slide inline-block w-full md:w-1/2" style={{ display: 'none' }}>
            <p className="testimonial-text font-bold text-xl">
              "I recently hired Suncoast Builders for a home renovation project, and I'm thrilled with the results. Under the guidance of Rebecca Turner, their team demonstrated exceptional professionalism and skill."
            </p>
            <p className="testimonial-author"> - David Mitchell</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
