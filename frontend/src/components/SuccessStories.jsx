import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "../stylesheets/SuccessStories.css";

const SuccessStoriesCarousel = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
  fetch("https://refinder-backend.onrender.com/api/public/success-stories")
    .then(res => res.json())
    .then(data => {
      console.log("PUBLIC STORIES:", data);
      setStories(data);
    })
    .catch(err => console.log(err));
}, []);

  return (
    <section className="slider-section">
      <div className="slider-container">

        <h2 className="slider-heading">Success Stories</h2>
        <p className="slider-subheading">
          Our community has reunited lost items with their owners
        </p>

        {stories.length === 0 ? (
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            No success stories yet...
          </p>
        ) : (
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={2}
            centeredSlides={true}
            loop={true}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {stories.map((story, index) => (
              <SwiperSlide key={index}>
                <div className="slide-card">

                  <div className="img-container">
                    <img
                      src={story.img
                    ? `https://refinder-backend.onrender.com${story.img}`
                    : "https://via.placeholder.com/150"}
                      alt={story.title}
                      className="img"
                    />
                  </div>

                  <div className="text-container">
                    <h3 className="s-title">{story.title}</h3>
                    <p className="s-desc">{story.description}</p>
                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

      </div>
    </section>
  );
};

export default SuccessStoriesCarousel;
