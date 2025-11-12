import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { cocktailLists, mockTailLists } from "../../constants/index.js";

const Cocktails = () => {
  useGSAP(() => {
    /**
     * Creates a GSAP timeline that links animations to the user's scroll position
     * using the ScrollTrigger plugin. The parallax effect will cause the left
     * and right leaf images to move slightly as the user scrolls.
     */
    const parallaxTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#cocktails", // The section element that activates the scroll animation
        start: "top 30%", // Animation starts when the top of #cocktails reaches 30% down the viewport
        end: "bottom 80%", // Animation ends when the bottom of #cocktails reaches 80% down the viewport
        // "top 30%" and "bottom 80%" use GSAP’s "elementPoint viewportPoint" syntax:
        //   - "top 30%" → triggers when the top of the element hits 30% down from the top of the viewport
        //   - "bottom 80%" → ends when the bottom of the element reaches 80% down from the top of the viewport
        // These values help control *when* the parallax effect begins and ends for smoother scroll timing.
        scrub: true // Smoothly ties the animation's progress to the scroll position
      }
    });

    /**
     * Moves the left leaf slightly upward and to the right as the user scrolls.
     * This creates a natural parallax effect for the left-side image.
     */
    parallaxTimeline.from("#c-left-leaf", {
      x: -100,
      y: 100
    });

    /**
     * Moves the right leaf slightly upward and to the left as the user scrolls.
     * Works together with the left leaf to create a mirrored parallax movement.
     */
    parallaxTimeline.from("#c-right-leaf", {
      x: 100,
      y: 100
    });
  });

  return (
    <section id="cocktails" className="noisy">
      {/* Decorative leaves that move with the parallax scroll animation */}
      <img src="/images/cocktail-left-leaf.png" alt="l-leaf" id="c-left-leaf" />
      <img src="/images/cocktail-right-leaf.png" alt="r-leaf" id="c-right-leaf" />

      <div className="list">
        <div className="popular">
          <h2>Most popular cocktails:</h2>

          <ul>
            {/* Loops through the cocktailLists array and displays each cocktail's details */}
            {cocktailLists.map(({ name, country, detail, price }) => (
              <li key={name}>
                <div className="md:me-28">
                  <h3>{name}</h3>
                  <p>
                    {country} | {detail}
                  </p>
                </div>
                <span>- {price}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="loved">
          <h2>Most loved mocktails:</h2>

          <ul>
            {/* Loops through the mockTailLists array and displays each mocktail's details */}
            {mockTailLists.map(({ name, country, detail, price }) => (
              <li key={name}>
                <div className="me-28">
                  <h3>{name}</h3>
                  <p>
                    {country} | {detail}
                  </p>
                </div>
                <span>- {price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Cocktails;
