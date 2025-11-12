import { useGSAP } from "@gsap/react";
import { navLinks } from "../../constants";
import gsap from "gsap";

const Navbar = () => {
  useGSAP(() => {
    /**
     * Creates a GSAP timeline that uses ScrollTrigger to detect when the
     * navigation bar scrolls out of or into view.
     *
     * The timeline will trigger an animation based on the position of the 'nav' element.
     */
    const navTween = gsap.timeline({
      scrollTrigger: {
        trigger: "nav", // Defines the element that triggers the animation — in this case, the <nav> tag
        start: "bottom top" // Starts the animation when the bottom of the nav reaches the top of the viewport
      }
    });

    /**
     * Defines a from-to animation on the navigation bar element.
     *
     * This changes the background color and adds a blur effect
     * as the user scrolls, making the navbar transition smoothly
     * from transparent to semi-transparent with a blurred background.
     */
    navTween.fromTo(
      "nav", // Targets the <nav> element for the animation

      /**
       * Starting state of the navbar before the animation begins.
       */
      { backgroundColor: "transparent" },

      /**
       * Ending state of the navbar and animation settings.
       */
      {
        backgroundColor: "#00000050", // Applies a semi-transparent black background
        backdropFilter: "blur(10px)", // Adds a subtle blur effect to the background
        duration: 1, // Duration of the animation in seconds
        ease: "power1.inOut" // Smooth easing for both the start and end of the transition
      }
    );
  }, []);

  return (
    <nav>
      <div>
        <a href="#home" className="flex items-center gap-2">
          <img src="/images/logo.png" alt="logo" />
          <p>Velvet Pour</p>
        </a>
        <ul>
          {/* 
            Maps over the navLinks array to dynamically generate navigation items.
            Each link smoothly scrolls to its corresponding section when clicked.
          */}
          {navLinks.map(link => (
            <li key={link.id}>
              <a href={`#${link.id}`}>{link.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
