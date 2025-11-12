import gsap from "gsap";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import { featureLists, goodLists } from "../../constants/index.js";

const Art = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 }); // Detects if the screen width is 767px or less (mobile view)

  useGSAP(() => {
    // Sets different scroll start points based on device size
    // "top 20%" → starts animation when the top of the section reaches 20% down the viewport (mobile)
    // "top top" → starts when the top of the section reaches the very top of the viewport (desktop)
    const start = isMobile ? "top 20%" : "top top";

    /**
     * Create a GSAP timeline for the masked image animation
     * that triggers when the #art section scrolls into view
     */
    const maskTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#art", // The section element that activates this animation
        start, // Uses the device-based start value defined above
        end: "bottom center", // Animation ends when the bottom of the section reaches the center of the viewport
        scrub: 1.5, // Smoothly scrubs animation progress as user scrolls (adds 1.5s smoothing delay)
        pin: true // Keeps the section fixed in place during the animation for a cinematic scroll effect
      }
    });

    /**
     * Animation sequence for fading out text, scaling the masked image,
     * and fading in the hidden content
     */
    maskTimeline
      // Step 1: Fade out elements with the "will-fade" class (headings and lists)
      .to(".will-fade", {
        opacity: 0, // Gradually becomes invisible
        stagger: 0.2, // Adds a 0.2s delay between each element’s fade-out for smooth staggering
        ease: "power1.inOut" // Smooth acceleration and deceleration for natural fade
      })

      // Step 2: Zoom in on the masked image and expand its mask effect
      .to(".masked-img", {
        scale: 1.3, // Enlarges the image to 130% for a zoom-in effect
        maskPosition: "center", // Centers the CSS mask as it expands
        maskSize: "400%", // Expands the mask size to reveal more of the image
        duration: 1, // The zoom animation lasts 1 second
        ease: "power1.inOut" // Smooth ease for natural zoom motion
      })

      // Step 3: Fade in the hidden text content once the image is revealed
      .to("#masked-content", {
        opacity: 1, // Gradually becomes visible
        duration: 1, // Fades in over 1 second
        ease: "power1.inOut" // Smooth transition for the reveal
      });
  });

  return (
    <div id="art">
      <div className="container mx-auto h-full pt-20">
        <h2 className="will-fade">The ART</h2>

        <div className="content">
          <ul className="space-y-4 will-fade">
            {/* Loops through a list of "good" features and displays each with a check icon */}
            {goodLists.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <img src="/images/check.png" alt="check" />
                <p>{feature}</p>
              </li>
            ))}
          </ul>

          {/* Central cocktail image that will be masked and zoomed */}
          <div className="cocktail-img">
            <img src="/images/under-img.jpg" alt="cocktail" className="abs-center masked-img size-full object-contain" />
          </div>

          <ul className="space-y-4 will-fade">
            {/* Loops through a list of "feature" items with check icons */}
            {featureLists.map((feature, index) => (
              <li key={index} className="flex items-center justify-start gap-2">
                <img src="/images/check.png" alt="check" />
                <p className="md:w-fit w-60">{feature}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Hidden content that fades in after the image zooms */}
        <div className="masked-container">
          <h2 className="will-fade">Sip-Worthy Perfection</h2>
          <div id="masked-content">
            <h3>Made with Craft, Poured with Passion</h3>
            <p>This isn't just a drink. It's a carefully crafted moment made just for you.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Art;
