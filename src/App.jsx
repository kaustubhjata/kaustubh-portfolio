import React, { useEffect, useState } from "react";
import GlobalBackground from "./GlobalBackground";
// Replaced local import with a remote placeholder to fix build error
import kausImg from "/images/kaus2.png";
import { icons } from "./icons";
// import img1 from "./assets/baane...jpg"; 
// import img2 from "./assets/thumbsup.jpg";
// import img3 from "./assets/kauzimmer.jpg";
// import img4 from "./assets/literally me.jpg";
// import tambolaimage from "./assets/tambola blurred.png";
// import lockboximage from "./assets/LockBox.png";
// import pulseimage from "./assets/Pulse.png";
// import asisimage from "./assets/ASIS.png";
// import phishguardimage from "./assets/Phishguard.png";
// import mokshaimage from "./assets/Moska.png";
import { motion } from "framer-motion";


// Helper for clamping values
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);


function ProjectCard({ title, description, imageSrc }) {
  return (
    <div className="w-[380px] h-[520px] bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:bg-white/10 transition-all duration-300">
      <div className="h-[240px] w-full overflow-hidden">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-6 flex flex-col gap-4">
        <h3 className="text-2xl font-serif font-bold">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  // const [activeContact, setActiveContact] = useState(null);
  const Icon = ({ path }) => (
  <svg viewBox="0 0 24 24" className="w-12 h-12 fill-white/80">
    <path d={path} />
  </svg>
);


  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => setScrollY(window.scrollY));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

const [cards, setCards] = useState([
    { id: 1, src: "/images/baane...jpg", alt: "Photo 1" },
    { id: 2, src: "/images/thumbsup.jpg", alt: "Photo 2" },
    { id: 3, src: "/images/kauzimmer.jpg", alt: "Photo 3" },
    { id: 4, src: "/images/literally me.jpg", alt: "Photo 4" },
  ]);

  const handleShuffle = () => {
    setCards((prev) => {
      const newArray = [...prev];
      const first = newArray.shift();
      newArray.push(first);
      return newArray;
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => setScrollY(window.scrollY));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  // FIXED — RELIABLE SCROLLING FUNCTION 
  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (!el) return;

    const headerEl = document.querySelector("header");
    const headerHeight = headerEl
      ? Math.ceil(headerEl.getBoundingClientRect().height)
      : 80;

    const elementTop = el.getBoundingClientRect().top + window.scrollY;

    const targetY = Math.max(0, Math.floor(elementTop - headerHeight - 2));

    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  // ----------------------------------------------------
  // ANIMATION CONFIGURATION
  // ----------------------------------------------------

  const stickyHeight = 1200;
  const progress = clamp(scrollY / stickyHeight, 0, 1);

  const containerScale = 1 - progress * 0.15;
  const containerRadius = progress * 48;
  const containerTranslateY =
    scrollY > stickyHeight ? -(scrollY - stickyHeight) : 0;

  const textTranslateY = -(progress * 350);
  const textOpacity = 1 - Math.pow(progress, 3);
  const textScale = 1 + progress * 0.1;

  const imageScale = 1 + progress * 0.2;
  const imageOpacity = 1 - Math.pow(progress, 2);

  const detailsOpacity = 1 - Math.pow(progress, 1.5);
  const detailsTranslateY = -(progress * 150);

  const showNavbar = scrollY > stickyHeight * 0.8;

  return (
    <div className="bg-slate-950 text-white relative z-0 overflow-x-hidden">
      <GlobalBackground />

      {/* FIXED NAVBAR */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b border-transparent ${
          showNavbar
            ? "bg-black/80 backdrop-blur-md border-white/5 opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between px-6 sm:px-10 lg:px-20 py-4">

          {/* LEFT — scroll to top */}
          <div
            className="text-xl font-serif font-bold tracking-tighter cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            JLK.
          </div>

          {/* NAVIGATION */}
          <nav className="hidden sm:flex gap-8 text-xs font-medium uppercase tracking-widest text-slate-300">
            {["About", "Skills", "Projects", "Contact"].map((label) => (
              <span
                key={label}
                onClick={() => scrollToSection(label.toLowerCase())}
                className="cursor-pointer hover:text-white transition-colors relative group"
              >
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
              </span>
            ))}
          </nav>

        </div>
      </header>

      {/* HERO SECTION WRAPPER */}
      <div style={{ height: `${stickyHeight + 100}px` }} className="relative z-10">

        {/* STICKY CONTAINER */}
        <div
          className="fixed top-0 left-0 w-full h-screen overflow-hidden transform-gpu origin-top"
          style={{
            transform: `translate3d(0, ${containerTranslateY}px, 0) scale(${containerScale})`,
            borderRadius: `${containerRadius}px`,
            boxShadow:
              progress > 0.1 ? "0 50px 100px -20px rgba(0,0,0,0)" : "none",
          }}
        >
          <section className="relative w-full h-full flex flex-col justify-center items-center overflow-hidden">

            {/* BACKGROUND IMAGE */}
            <div
              className="absolute inset-0 z-0"
              style={{
                transform: `scale(${imageScale})`,
                opacity: imageOpacity,
                willChange: "transform, opacity",
              }}
            >
              <div className="absolute inset-0 z-10" />
              <img
                src={kausImg}
                alt="Hero Decoration"
                className="w-full h-full object-cover"
              />
            </div>

            {/* CORNER DETAILS */}
            <div
              className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between"
              style={{
                opacity: detailsOpacity,
                transform: `translate3d(0, ${detailsTranslateY}px, 0)`,
              }}
            ></div>

            {/* HERO TEXT */}
            <div
              className="relative z-30 text-center mix-blend-overlay"
              style={{
                transform: `translate3d(0, ${textTranslateY}px, 0) scale(${textScale})`,
                opacity: textOpacity,
                willChange: "transform, opacity",
              }}
            >
              <h1 className="flex flex-col items-center leading-none">
                <span className="text-[15vw] sm:text-[12vw] font-serif font-bold text-white tracking-tighter">
                  J L
                </span>
                <span className="text-[15vw] sm:text-[12vw] font-serif italic font-light text-slate-200 -mt-[4vw] sm:-mt-[3vw]">
                  Kaustubh
                </span>
              </h1>
            </div>

          </section>
        </div>
      </div>

      {/* PAGE CONTENT */}
      <div className="relative z-20 w-screen">

      {/* ABOUT SECTION */}
        <div id="about" className="min-h-screen flex items-center">
          <div className="container mx-auto px-6 py-20">
            <div className="flex flex-col md:flex-row items-center gap-16 lg:gap-24">
              
              <div className="md:flex-[3] w-full">
                <h2 className="text-5xl sm:text-6xl font-serif font-bold mb-16 text-center px-4">About Me</h2>
                <div className="text-lg sm:text-xl text-slate-300 space-y-8 leading-relaxed max-w-4xl">
                  <p>I'm not just a developer; I like to design, take photos, race, make music, and occasionally try doing all of it at once.</p>
                  <p>Right now, I'm learning how to use tech to simplify my own world, one project at a time.</p>
                  <p className="pt-4 text-slate-400 italic">Anyway, enough of me yapping—go ahead and explore what I've been working on.</p>
                </div>
              </div>

              {/* PHOTO STACK */}
              <div className="md:flex-1 w-full flex justify-center md:justify-end">
                <div className="relative w-full max-w-[280px] aspect-[4/5] cursor-pointer group" onClick={handleShuffle}>
                  {cards.map((card, index) => {
                    const isTop = index === 0;
                    return (
                      <div
                        key={card.id}
                        style={{
                          transform: `rotate(${index * 3}deg) translate(${index * 4}px, ${index * 4}px)`,
                          zIndex: cards.length - index,
                        }}
                        className={`absolute inset-0 w-full h-full rounded-2xl overflow-hidden border border-slate-700 bg-slate-900 shadow-2xl transition-all duration-500 ease-in-out ${
                          isTop ? "group-hover:-translate-y-4 group-hover:-rotate-2" : ""
                        }`}
                      >
                        <img src={card.src} alt={card.alt} className="w-full h-full object-cover pointer-events-none" />
                        {index > 0 && <div className="absolute inset-0 bg-black/40 transition-opacity duration-500" />}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* SKILLS */}
        <div id="skills" className="min-h-screen flex items-center border-t border-white/0">
          <div className="container mx-auto px-6 py-20">
            <h2 className="text-5xl sm:text-6xl font-serif font-bold mb-16 text-center px-4">Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {[
                "AI/ML",
                "Python",
                "Java",
                "React",
                "JavaScript",
                "HTML/CSS",
                "SQL",
                "Networks",
                "Graphic Design",
                "Photography",
                "Leadership",
                "Content Creation & Design"
              ].map((skill, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 text-center group cursor-default"
                >
                  <span className="text-lg font-medium text-slate-300 group-hover:text-white transition-colors">
                    {skill}
                  </span>
                </div>
              ))}
              <p>There are so many, I cant even list everything at once ;)</p>
            </div>
          </div>
        </div>

        {/* PROJECTS SECTION */}
<section
  id="projects"
  className="w-full py-32 border-t border-white/1 overflow-hidden"
>
  {/* Section Title */}
  <div className="max-w-[1200px] mx-auto px-6 mb-16">
    <h2 className="text-5xl sm:text-6xl font-serif font-bold mb-16 text-center px-4">Projects</h2>
  </div>

  {/* Infinite Scrolling Carousel */}
  <div className="relative overflow-hidden">
    <motion.div
      className="flex gap-12 will-change-transform"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration:15,
                ease: "linear",
                repeat: Infinity,
      }}
    >
      {/* Duplicate content for seamless loop */}
      {[...Array(2)].map((_, setIndex) => (
        <div key={setIndex} className="flex gap-12 shrink-0">
          
          <a href="https://lockbox-global-share.lovable.app/" target="_blank" rel="noreferrer">
            <ProjectCard
              title="LockBox"
              description="A secure online space for storing and managing files with permissions and real-time updates."
              imageSrc="/images/LockBox.png"
            />
          </a>

          <a href="https://github.com/kaustubhjata/pulse.app" target="_blank" rel="noreferrer">
            <ProjectCard
              title="Pulse"
              description="AI-powered wellness platform for journaling, mood tracking, chatrooms, and voice interaction."
              imageSrc="/images/Pulse.png"
            />
          </a>

          <a href="https://github.com/kaustubhjata/asis" target="_blank" rel="noreferrer">
            <ProjectCard
              title="ASIS"
              description="AI system that creates podcasts and summaries from documents with a Q&A chatbot."
              imageSrc="/images/ASIS.png"
            />
          </a>

          <a href="https://phishguard360.vercel.app/" target="_blank" rel="noreferrer">
            <ProjectCard
              title="PhishGuard 360"
              description="Paste a URL and instantly detect whether a website is phishing or legitimate."
              imageSrc="/images/Phishguard.png"
            />
          </a>

          <a href="https://portfolio-mokshavemulahehe.vercel.app/" target="_blank" rel="noreferrer">
            <ProjectCard
              title="Personal Portfolios"
              description="Haha! I Put this in without my friend knowing, don't tell him. He never paid me lol."
              imageSrc="/images/Moska.png"
            />
          </a>

          <a href="#" target="_blank" rel="noopener noreferrer">
                  <ProjectCard
                    title="Online Tambola"
                    description="Play Tambola online in sessions and rooms like Scribble. Still a work in progress but you'll see this here soon!"
                    imageSrc="/images/tambola blurred.png"
                  />
                </a>

        </div>
      ))}
    </motion.div>
  </div>
</section>


                    {/* CONTACT */}
{/* CONTACT */}
    <section id="contact" className="py-32 px-10 overflow-hidden">
<h2 className="text-5xl sm:text-6xl font-serif font-bold mb-16 text-center px-4">
  Contact Me!
</h2>


      <div className="max-w-7xl mx-auto">
        <div className="flex gap-6 justify-between">

          {[
            { label: "LinkedIn", link: "https://www.linkedin.com/in/jl-kaustubh/", icon: icons.linkedin },
            { label: "Twitter", link: "https://x.com/kaustubhjl", icon: icons.twitter },
            { label: "GitHub", link: "https://github.com/kaustubhjata", icon: icons.github },
            { label: "Instagram", link: "https://www.instagram.com/kaustubh_jata/", icon: icons.instagram },
            { label: "mail", link: "mailto:jlkaustubh@gmail.com", icon: icons.email },
            { label: "Resume", link: "/resume.pdf", icon: icons.resume },
          ].map((item) => (
            <motion.a
              key={item.label}
              href={item.link}
              whileHover={{ scale: 1.15, zIndex: 20 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              className="
                relative
                w-[220px]
                h-[320px]
                rounded-3xl
                bg-white/5
                border border-white/10
                backdrop-blur-xl
                flex flex-col items-center justify-center
                gap-6
                cursor-pointer
              "
            >
              <Icon path={item.icon} />

              <div className="text-center">
                <p className="text-xs uppercase tracking-widest text-slate-400 mb-1">
                  {item.label}
                </p>
                <p className="text-lg font-serif">
                  {item.value}
                </p>
              </div>

              {/* Hover Glow */}
              <motion.div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{
                  background:
                    "linear-gradient(120deg, rgba(255,255,255,0.08), transparent)",
                }}
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>

<footer className="py-16 text-center text-slate-400 text-sm">
  Made with <span className="text-red-500">♥</span> by Kaus
</footer>

    </div>
  );
  </div>);
}
