"use client";

import { allCocktails } from "../../constants/index.js";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Menu = () => {
  const contentRef = useRef(); // Creates a reference to the recipe content container (can be used for future animations or DOM access)
  const [currentIndex, setCurrentIndex] = useState(0); // Tracks the currently active cocktail index in the slider

  useGSAP(() => {
    /**
     * Fade in the title each time the cocktail changes
     */
    gsap.fromTo(
      "#title", // Targets the cocktail title element
      { opacity: 0 }, // Start completely transparent
      { opacity: 1, duration: 1 } // Fade in over 1 second
    );

    /**
     * Animate the cocktail image sliding in from the left
     */
    gsap.fromTo(
      ".cocktail img", // Targets the cocktail image inside the .cocktail container
      { opacity: 0, xPercent: -100 }, // Start fully transparent and shifted 100% to the left
      {
        xPercent: 0, // Moves image to its natural position
        opacity: 1, // Fades in to full visibility
        duration: 1, // Animation lasts 1 second
        ease: "power1.inOut" // Smooth easing for natural slide motion
      }
    );

    /**
     * Animate the heading inside the .details section (cocktail title)
     */
    gsap.fromTo(
      ".details h2", // Targets the title within details section
      { yPercent: 100, opacity: 0 }, // Starts shifted 100% down and invisible
      {
        yPercent: 0, // Moves into its normal position
        opacity: 100, // Makes fully visible (should ideally be opacity: 1)
        ease: "power1.inOut" // Smooth slide-up and fade-in effect
      }
    );

    /**
     * Animate the description paragraph inside the .details section
     */
    gsap.fromTo(
      ".details p", // Targets the description text
      { yPercent: 100, opacity: 0 }, // Starts off-screen below and hidden
      {
        yPercent: 0, // Slides into place
        opacity: 100, // Fades in (should ideally be opacity: 1)
        ease: "power1.inOut" // Smooth easing for consistency with heading animation
      }
    );
  }, [currentIndex]); // Re-runs animations whenever the current cocktail changes

  const totalCocktails = allCocktails.length; // Stores total number of cocktails for modular arithmetic navigation

  /**
   * Changes the current cocktail slide.
   * The modulo operation ensures the index wraps correctly when reaching the start or end.
   */
  const goToSlide = index => {
    const newIndex = (index + totalCocktails) % totalCocktails; // Wraps around the list (so -1 becomes last, etc.)
    setCurrentIndex(newIndex); // Updates the active cocktail index
  };

  /**
   * Retrieves a cocktail relative to the current index.
   * Allows fetching previous (-1), current (0), or next (+1) cocktail.
   */
  const getCocktailAt = indexOffset => {
    return allCocktails[(currentIndex + indexOffset + totalCocktails) % totalCocktails]; // Safely calculates index within array bounds
  };

  // Gets cocktails for current, previous, and next slides
  const currentCocktail = getCocktailAt(0); // Currently displayed cocktail
  const prevCocktail = getCocktailAt(-1); // Previous cocktail (for left arrow)
  const nextCocktail = getCocktailAt(1); // Next cocktail (for right arrow)

  return (
    <section id="menu" aria-labelledby="menu-heading">
      {/* Decorative leaves around the slider */}
      <img src="/images/slider-left-leaf.png" alt="left-leaf" id="m-left-leaf" />
      <img src="/images/slider-right-leaf.png" alt="right-leaf" id="m-right-leaf" />

      {/* Hidden heading for accessibility */}
      <h2 id="menu-heading" className="sr-only">
        Cocktail Menu
      </h2>

      {/* Navigation tabs for switching between cocktails */}
      <nav className="cocktail-tabs" aria-label="Cocktail Navigation">
        {allCocktails.map((cocktail, index) => {
          const isActive = index === currentIndex;
          return (
            <button key={cocktail.id} className={`${isActive ? "text-white border-white" : "text-white/50 border-white/50"}`} onClick={() => goToSlide(index)}>
              {cocktail.name}
            </button>
          );
        })}
      </nav>

      {/* Main cocktail display section */}
      <div className="content">
        {/* Navigation arrows to switch between cocktails */}
        <div className="arrows">
          <button className="text-left" onClick={() => goToSlide(currentIndex - 1)}>
            <span>{prevCocktail.name}</span> {/* Shows name of the previous cocktail */}
            <img src="/images/right-arrow.png" alt="right-arrow" aria-hidden="true" />
          </button>

          <button className="text-left" onClick={() => goToSlide(currentIndex + 1)}>
            <span>{nextCocktail.name}</span> {/* Shows name of the next cocktail */}
            <img src="/images/left-arrow.png" alt="left-arrow" aria-hidden="true" />
          </button>
        </div>

        {/* Displays the main cocktail image */}
        <div className="cocktail">
          <img src={currentCocktail.image} className="object-contain" />
        </div>

        {/* Cocktail recipe and details section */}
        <div className="recipe">
          <div ref={contentRef} className="info">
            <p>Recipe for:</p>
            <p id="title">{currentCocktail.name}</p> {/* Animated cocktail name */}
          </div>

          <div className="details">
            <h2>{currentCocktail.title}</h2> {/* Cocktail title (animated on change) */}
            <p>{currentCocktail.description}</p> {/* Cocktail description (animated on change) */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
