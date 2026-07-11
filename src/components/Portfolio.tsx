import { useRef, useEffect, useState, useMemo, forwardRef } from "react";
import {
  motion,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowRight,
  Truck,
  CheckCircle2,
  MapPin,
  ExternalLink
} from "lucide-react";
import completeData from "../src/data/completeData.json";

import imgPortfolio1 from "@/assets/portfolio-1.webp";
import imgPortfolio2 from "@/assets/portfolio-2.jpg";
import imgPortfolio3 from "@/assets/portfolio-3.webp";
import imgPortfolio4 from "@/assets/portfolio-4.webp";
import imgPortfolio5 from "@/assets/portfolio-5.jpg";

const projectImages: Record<string, string> = {
  portfolio1: imgPortfolio1,
  portfolio2: imgPortfolio2,
  portfolio3: imgPortfolio3,
  portfolio4: imgPortfolio4,
  portfolio5: imgPortfolio5,
};

const ProjectCard = forwardRef<HTMLDivElement, { project: any; index: number }>(({ project, index }, ref) => {
  const [isHovered, setIsHovered] = useState(false);
  const resolvedImage = projectImages[project.image as keyof typeof projectImages] || projectImages.portfolio1;

  useEffect(() => {
    console.log(`[ProjectCard] resolvedImage for "${project.title}":`, resolvedImage);
  }, [resolvedImage, project.title]);

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col overflow-hidden rounded-3xl bg-card border border-border transition-all duration-500 transform-gpu hover:-translate-y-2"
      style={{
        background: "linear-gradient(135deg, var(--card-bg) 0%, var(--dark-bg) 100%)",
        boxShadow: isHovered ? "0 20px 40px rgba(230, 126, 34, 0.12)" : "none",
        borderColor: isHovered ? "rgba(230, 126, 34, 0.35)" : "var(--graphite-color)"
      }}
    >
      {/* Image Area */}
      <div className="relative w-full h-52 sm:h-60 overflow-hidden shrink-0 bg-muted">
        {/* Project Image */}
        <img
          src={resolvedImage}
          alt={project.title}
          loading="eager"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            console.error(`[ProjectCard] Failed to load resolvedImage for "${project.title}":`, resolvedImage);
            e.currentTarget.src = "/placeholder.svg";
          }}
        />

        {/* Category Badge Floating Top Left */}
        <div className="absolute top-4 left-4 bg-dark/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full z-10 shadow-lg shadow-black/30">
          <span className="text-[9px] font-black uppercase tracking-[0.15em] text-primary">
            {project.category}
          </span>
        </div>

        {/* Dynamic Dark Overlay on Hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-dark/65 backdrop-blur-[1.5px] flex items-center justify-center p-8 pointer-events-none"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: isHovered ? 1 : 0.8, opacity: isHovered ? 1 : 0 }}
            className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-dark shadow-2xl shadow-primary/20"
          >
            <ExternalLink className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>

      {/* Content Area */}
      <div className="p-6 md:p-8 flex flex-col flex-1">
        {/* Location & Year */}
        <div className="flex flex-wrap items-center gap-2 text-primary font-bold text-[9px] md:text-[10px] uppercase tracking-[0.2em] mb-3 leading-none">
          <MapPin className="w-3.5 h-3.5 text-primary" />
          {project.location}
          <span className="text-muted-foreground/30 px-1 md:px-2">/</span>
          {project.year}
        </div>

        {/* Project Title */}
        <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight leading-tight mb-3 group-hover:text-primary transition-colors duration-300 font-heading">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground text-[12px] md:text-sm leading-relaxed line-clamp-3 mb-6 flex-1 font-body">
          {project.desc}
        </p>

        {/* Scope and Arrow Details */}
        <div className="flex items-center justify-between pt-5 border-t border-border/50 mt-auto">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
            <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-foreground/75 font-body">
              {project.scope}
            </span>
          </div>
          <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-primary transform group-hover:translate-x-2 transition-transform duration-300" />
        </div>
      </div>
    </motion.div>
  );
});

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState("All");
  const { section, projects } = completeData.portfolio;

  const categories = useMemo(() => {
    const cats = new Set(projects.map(p => p.category));
    return ["All", ...Array.from(cats)];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeTab === "All") return projects;
    return projects.filter(p =>
      p.category.toLowerCase().includes(activeTab.toLowerCase())
    );
  }, [activeTab, projects]);

  return (
    <section id="portfolio" className="relative bg-background py-20 md:py-32 overflow-hidden border-t border-border">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 right-0 w-[30rem] md:w-[40rem] h-[30rem] md:h-[40rem] bg-primary/[0.03] rounded-full blur-[80px] md:blur-[100px] -translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 xs:px-6 md:px-8 relative z-10">
        {/* Structured Header */}
        <div className="flex flex-col gap-8 md:gap-12 mb-16 md:mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-3 mb-4 md:mb-6 bg-primary/10 px-4 py-2 rounded-full border border-primary/20 shadow-sm"
              >
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white shadow-lg shadow-primary/20">
                  <Truck className="w-3 h-3" />
                </div>
                <span className="text-primary uppercase tracking-[0.4em] text-[9px] md:text-[10px] font-black">
                  {section.badge}
                </span>
              </motion.div>
              <h2
                className="text-4xl sm:text-5xl md:text-7xl font-black text-foreground uppercase tracking-tighter leading-[0.9] md:leading-none font-heading"
                dangerouslySetInnerHTML={{ __html: section.headline }}
              />
            </div>
          </div>

          {/* Symmetrical Pill Navigation */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-4">
            {categories.map((cat) => {
              const isSelected = activeTab === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`text-[10px] sm:text-[11px] font-black uppercase tracking-widest transition-all duration-300 px-5 py-2.5 rounded-full border shadow-sm ${isSelected
                    ? "bg-gradient-to-r from-primary to-secondary border-primary text-dark font-black"
                    : "bg-card border-border text-muted-foreground hover:text-white hover:border-primary/40"
                    }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Symmetrical Grid Layout */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <ProjectCard
                key={project.number}
                project={project}
                index={idx}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Action */}
        <div className="mt-16 md:mt-20 pt-16 md:pt-20 border-t border-border flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h4 className="text-xl md:text-2xl font-black uppercase italic tracking-tight text-foreground font-heading">
              Ready to see more?
            </h4>
            <p className="text-muted-foreground text-[10px] md:text-sm uppercase tracking-widest mt-1 font-body">
              Browse our complete archive of heavy duty hauling and cleanout operations
            </p>
          </div>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group w-full md:w-auto inline-flex items-center justify-center gap-4 md:gap-6 bg-gradient-to-r from-primary to-secondary text-dark px-6 md:px-10 py-4 md:py-5 font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/15 transition-all hover:opacity-90"
          >
            <span>Load More Projects</span>
            <div className="hidden md:block w-8 h-[2px] bg-current transform group-hover:w-12 transition-all" />
            <ArrowRight className="md:hidden w-4 h-4" />
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
