import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";

const About = () => {
  useGSAP(() => {
    /**
     * Splits the text inside the #about h2 element into individual words
     * so that each word can be animated independently.
     * The SplitText plugin makes it easier to target specific text parts
     * like characters, words, or lines for animation.
     */
    const titleSplit = SplitText.create("#about h2", {
      type: "words"
    });

    /**
     * Creates a GSAP timeline linked to the scroll position using ScrollTrigger.
     * This timeline controls the animations that occur when the #about section
     * enters the viewport.
     */
    const scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#about", // The element that activates the scroll-triggered animation
        start: "top center" // Animation starts when the top of #about reaches the center of the viewport
        // "top center" uses GSAP's "elementPoint viewportPoint" syntax:
        //   - "top" refers to the top edge of the #about element.
        //   - "center" refers to the vertical center of the viewport.
        // So this means: start the animation when the top of #about hits the center of the screen.
      }
    });

    /**
     * Animates each word in the section title (#about h2) as it comes into view.
     * - The words fade in (opacity: 0 → 1)
     * - Slide upward from below (yPercent: 100 → 0)
     * - Animate sequentially due to the stagger value
     * - The "expo.out" easing creates a smooth deceleration effect.
     *
     * The stagger: 0.02 means each word begins its animation
     * 0.02 seconds after the previous one for a flowing text reveal effect.
     */
    scrollTimeline
      // Animate each word in the section title when it scrolls into view
      .from(titleSplit.words, {
        opacity: 0, // Start fully transparent; fades in to visible
        duration: 1, // Each word’s animation lasts 1 second
        yPercent: 100, // Moves each word upward from 100% of its height (i.e., from below)
        ease: "expo.out", // Smoothly decelerates at the end for a soft reveal
        stagger: 0.02 // Delays each word’s start by 0.02s for a flowing sequential effect
      })

      /**
       * Animates the images inside the .top-grid and .bottom-grid sections.
       * - Each grid div fades in sequentially as the section scrolls into view.
       * - The "power1.inOut" easing provides a smooth start and end transition.
       * - The stagger: 0.04 delays each grid item’s animation slightly for rhythm.
       *
       * The "-=0.5" means this animation overlaps with the previous one,
       * starting 0.5 seconds before the title animation finishes.
       */
      .from(
        // Animate the images in both the top and bottom grids
        ".top-grid div, .bottom-grid div",
        {
          opacity: 0, // Start fully transparent; fades in as they appear
          duration: 1, // Each grid item’s fade-in lasts 1 second
          ease: "power1.inOut", // Smooth acceleration and deceleration for natural motion
          stagger: 0.04 // Adds a 0.04s delay between each element’s animation for rhythm
        },
        "-=0.5" // Starts this animation 0.5s before the previous one finishes (overlap)
      );
  });

  return (
    <div id="about">
      <div className="mb-16 md:px-0 px-5">
        <div className="content">
          <div className="md:col-span-8">
            <p className="badge">Best Cocktails</p>
            <h2>
              Where every detail matters <span className="text-white">-</span>
              from muddle to garnish
            </h2>
          </div>

          <div className="sub-content">
            <p>Every cocktail we serve is a reflection of our obsession with detail — from the first muddle to the final garnish. That care is what turns a simple drink into something truly memorable.</p>

            <div>
              <p className="md:text-3xl text-xl font-bold">
                <span>4.5</span>/5
              </p>
              <p className="text-sm text-white-100">More than +12000 customers</p>
            </div>
          </div>
        </div>
      </div>

      <div className="top-grid">
        <div className="md:col-span-3">
          <div className="noisy" />
          <img src="/images/abt1.png" alt="grid-img-1" />
        </div>

        <div className="md:col-span-6">
          <div className="noisy" />
          <img src="/images/abt2.png" alt="grid-img-2" />
        </div>

        <div className="md:col-span-3">
          <div className="noisy" />
          <img src="/images/abt5.png" alt="grid-img-5" />
        </div>
      </div>

      <div className="bottom-grid">
        <div className="md:col-span-8">
          <div className="noisy" />
          <img src="/images/abt3.png" alt="grid-img-3" />
        </div>

        <div className="md:col-span-4">
          <div className="noisy" />
          <img src="/images/abt4.png" alt="grid-img-4" />
        </div>
      </div>
    </div>
  );
};

export default About;
