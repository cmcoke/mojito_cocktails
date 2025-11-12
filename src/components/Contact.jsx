import { openingHours, socials } from "../../constants/index.js"; // Import static data for opening hours and social media links
import { useGSAP } from "@gsap/react"; // Hook to run GSAP animations in React components
import { SplitText } from "gsap/all"; // Plugin to split text into words, chars, or lines for animation
import gsap from "gsap"; // Core GSAP library

const Contact = () => {
  useGSAP(() => {
    // Split the <h2> heading text into individual words for animation
    const titleSplit = SplitText.create("#contact h2", { type: "words" }); //

    /**
     * Create a timeline for scroll-triggered animations
     */
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#contact", // Animation triggers when the #contact section enters the viewport
        start: "top center" // Animation starts when top of #contact reaches the center of the viewport
      },
      ease: "power1.inOut" // Default easing for the timeline
    });

    /**
     * Sequential animations for contact section
     */
    timeline
      // Animate each word in the h2 heading
      .from(titleSplit.words, {
        opacity: 0, // Words start invisible
        yPercent: 100, // Words start shifted 100% downward
        stagger: 0.02 // Animate each word sequentially with a small delay
      })
      // Animate all h3 headings and paragraphs inside #contact
      .from("#contact h3, #contact p", {
        opacity: 0, // Start invisible
        yPercent: 100, // Start shifted downward
        stagger: 0.02 // Sequentially animate elements
      })
      // Animate the right leaf image moving upwards
      .to("#f-right-leaf", {
        y: "-50", // Moves 50px upwards
        duration: 1, // Animation lasts 1 second
        ease: "power1.inOut" // Smooth easing
      })
      // Animate the left leaf image moving upwards simultaneously with the right leaf
      .to(
        "#f-left-leaf",
        {
          y: "-50", // Moves 50px upwards
          duration: 1, // Lasts 1 second
          ease: "power1.inOut" // Smooth easing
        },
        "<" // "<" means start this animation at the same time as previous animation
      );
  });

  return (
    <footer id="contact">
      {/* Decorative leaf images */}
      <img src="/images/footer-right-leaf.png" alt="leaf-right" id="f-right-leaf" />
      <img src="/images/footer-left-leaf.png" alt="leaf-left" id="f-left-leaf" />

      <div className="content">
        <h2>Where to Find Us</h2>

        {/* Visit information */}
        <div>
          <h3>Visit Our Bar</h3>
          <p>456, Raq Blvd. #404, Los Angeles, CA 90210</p>
        </div>

        {/* Contact details */}
        <div>
          <h3>Contact Us</h3>
          <p>(555) 987-6543</p>
          <p>hello@jsmcocktail.com</p>
        </div>

        {/* Opening hours mapped from the imported constant */}
        <div>
          <h3>Open Every Day</h3>
          {openingHours.map(time => (
            <p key={time.day}>
              {time.day} : {time.time} {/* Displays each day's opening hours */}
            </p>
          ))}
        </div>

        {/* Social media links */}
        <div>
          <h3>Socials</h3>
          <div className="flex-center gap-5">
            {socials.map(social => (
              <a
                key={social.name} // Unique key for React list rendering
                href={social.url} // Link to social profile
                target="_blank" // Opens link in a new tab
                rel="noopener noreferrer" // Security best practice for external links
                aria-label={social.name} // Accessibility label
              >
                <img src={social.icon} /> {/* Displays the social media icon */}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
