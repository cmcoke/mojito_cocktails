import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

const Hero = () => {
  const videoRef = useRef(); // Creates a reference to the <video> element, allowing direct control in GSAP animations

  const isMobile = useMediaQuery({ maxWidth: 767 }); // Detects if the user's screen width is 767px or less (mobile view)

  useGSAP(() => {
    const heroSplit = new SplitText(".title", { type: "chars, words" }); // Splits the text in elements with class "title" into individual characters and words for separate animation control
    const paragraphSplit = new SplitText(".subtitle", { type: "lines" }); // Splits subtitle text into individual lines for smoother staggered animations

    heroSplit.chars.forEach(char => char.classList.add("text-gradient")); // Applies a gradient text effect class to each character in the title

    /**
     * Animates each character of the title from bottom to top
     * with a staggered, smooth "pop-up" entrance.
     */
    gsap.from(heroSplit.chars, {
      yPercent: 100, // Moves each character upward from 100% of its height
      duration: 1.8, // Duration of animation per character
      ease: "expo.out", // Uses an exponential easing function for a smooth motion
      stagger: 0.06 // Delays each character's animation start by 0.06 seconds
    });

    /**
     * Animates the subtitle lines by fading and sliding them upward.
     * The delay ensures the subtitle appears after the main title animation.
     */
    gsap.from(paragraphSplit.lines, {
      opacity: 0, // Fades lines from invisible to visible
      yPercent: 100, // Moves lines upward from below
      duration: 1.8, // Duration of animation
      ease: "expo.out", // Smooth easing function
      stagger: 0.06, // Staggers animation of each line for a natural flow
      delay: 1 // Waits one second before starting the subtitle animation
    });

    /**
     * Creates a timeline for animating the leaf images when scrolling through the hero section.
     * The leaves move in opposite directions to create a parallax effect.
     */
    gsap
      .timeline({
        // Using an object form `{}` for scrollTrigger allows multiple configuration options
        scrollTrigger: {
          trigger: "#hero", // The animation triggers when the #hero section scrolls into view
          start: "top, top", // Starts when the top of #hero reaches the top of the viewport
          end: "bottom top", // Ends when the bottom of #hero reaches the top of the viewport
          scrub: true // Smoothly ties the animation progress to scroll position
        }
      })
      .to(".right-leaf", { y: 200 }, 0) // Moves the right leaf down as the user scrolls
      .to(".left-leaf", { y: -200 }, 0); // Moves the left leaf up as the user scrolls (opposite direction)

    /**
     * Defines scroll start and end points differently for mobile and desktop using GSAP's "start end" syntax.
     *
     * The syntax "triggerPosition viewportPosition" means:
     *   - "top 50%" → The top of the trigger element reaches 50% down the viewport.
     *   - "center 60%" → The center of the trigger element reaches 60% down the viewport.
     *   - "120% top" → When the point 120% below the top of the trigger element hits the top of the viewport.
     *   - "bottom top" → When the bottom of the trigger element hits the top of the viewport.
     */
    const startValue = isMobile ? "top 50%" : "center 60%";
    const endValue = isMobile ? "120% top" : "bottom top";

    /**
     * Creates a GSAP timeline to control the video playback during scroll.
     * The video is pinned in place and scrubbed to sync with scrolling.
     */
    let tl = gsap.timeline({
      // Using an object form `{}` gives full control over scrollTrigger configuration
      scrollTrigger: {
        trigger: "video", // Animation triggers when the <video> element enters the viewport
        start: startValue, // Scroll start position (responsive based on screen size)
        end: endValue, // Scroll end position
        scrub: true, // Synchronizes animation progress with scroll
        pin: true // Keeps the video fixed during the scroll animation
      }
    });

    /**
     * Waits for the video metadata (like duration) to load before animating it.
     * Once ready, GSAP animates the video’s playback by changing its currentTime.
     */
    videoRef.current.onloadedmetadata = () => {
      //
      tl.to(videoRef.current, {
        currentTime: videoRef.current.duration // Progressively increases the video’s playback time as the user scrolls
      });
    };
  }, []);

  return (
    <>
      <section id="hero" className="noisy">
        <h1 className="title">MOJITO</h1>

        <img src="/images/hero-left-leaf.png" alt="left leaf" className="left-leaf" />
        <img src="/images/hero-right-leaf.png" alt="right leaf" className="right-leaf" />

        <div className="body">
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p>Cool. Crisp. Classic</p>
              <p className="subtitle">
                Sip the Spirit <br /> of Summer
              </p>
            </div>

            <div className="view-cocktails">
              <p className="subtitle">Every cocktail on our menu is a blend of premium ingredients, creative flair, and timeless recipes — designed to delight your senses.</p>
              <a href="#cocktails">View cocktails</a>
            </div>
          </div>
        </div>
      </section>

      <section className="video absolute inset-0">
        <video src="/videos/output.mp4" muted playsInline preload="auto" ref={videoRef}></video>
      </section>
    </>
  );
};

export default Hero;
