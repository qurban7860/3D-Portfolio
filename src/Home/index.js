import {
    mobile,
    backend,
    creator,
    web,
    javascript,
    typescript,
    html,
    css,
    reactjs,
    tailwind,
    nodejs,
    // mongodb,
    git,
    figma,
    meta,
    starbucks,
    tesla,
    shopify,
    carrent,
    threejs,
    Project1,
    Project2,
  } from "../assets";
  
  export const navLinks = [
    {
      id: "about",
      title: "About",
    },
    {
      id: "work",
      title: "Work",
    },
    {
      id: "contact",
      title: "Contact",
    },
  ];
  
  const services = [
    {
      title: "Software Engineer",
      icon: web,
    },
    {
      title: "React Developer",
      icon: mobile,
    },
    {
      title: "Full Stack Developer",
      icon: backend,
    },
    {
      title: "UI/UX Developer",
      icon: creator,
    },
  ];
  
  const technologies = [
    {
      name: "HTML 5",
      icon: html,
    },
    {
      name: "CSS 3",
      icon: css,
    },
    {
      name: "JavaScript",
      icon: javascript,
    },
    {
      name: "React JS",
      icon: reactjs,
    },
    {
      name: "TypeScript",
      icon: typescript,
    },
    
    {
      name: "Tailwind CSS",
      icon: tailwind,
    },
    {
      name: "Node JS",
      icon: nodejs,
    },
    // {
    //   name: "MongoDB",
    //   icon: mongodb,
    // },
    {
      name: "Three JS",
      icon: threejs,
    },
    {
      name: "git",
      icon: git,
    },
    {
      name: "figma",
      icon: figma,
    },
  
  ];
  
  const experiences = [
    {
      title: "Frontend Developer",
      company_name: "COSVM Labs",
      icon: starbucks,
      iconBg: "#383E56",
      date: "Feb 2024 - June 2024",
      points: [
        "Developing and maintaining web applications using React.js and Integrating them.",
        "Collaborated closely with the development team to create engaging and user-friendly interfaces that met clients' needs.",
        "Implementing responsive design and ensuring cross-browser compatibility.",
      ],
    },
    {
      title: "Full Stack Developer",
      company_name: "Upwork",
      icon: tesla,
      iconBg: "#E6DEDD",
      date: "Jan 2021 - Feb 2022",
      points: [
        "Created a responsive and user-friendly dashboard application using React, leading to a 30% improvement in user engagement.",
        "Developing and maintaining web applications using React.js and other related technologies.",
        "Implementing responsive design and ensuring cross-browser compatibility.",
        "Participating in code reviews and providing constructive feedback to other developers.",
      ],
    },
    {
      title: "Web Developer",
      company_name: "Shopify",
      icon: shopify,
      iconBg: "#383E56",
      date: "Jan 2023 - Present",
      points: [
        "Developed and maintained a highly scalable e-commerce platform using React, resulting in a 20% increase in online sales.",
        "Created a responsive and user-friendly dashboard application using React, leading to a 30% improvement in user engagement.",
        "Implemented a real-time chat feature for a social media platform using React, enhancing user interaction and satisfaction.",
        "Implementing responsive design and ensuring cross-browser compatibility.",
      ],
    },
    {
      title: "Frontend Developer",
      company_name: "Fiverr",
      icon: meta,
      iconBg: "#E6DEDD",
      date: "Jan 2023 - July 2023",
      points: [
        "Developing and maintaining web applications using React.js and other related technologies.",
        "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
        "Implementing responsive design and ensuring cross-browser compatibility.",
        "Participating in code reviews and providing constructive feedback to other developers.",
      ],
    },
  ];
  
  const testimonials = [
    {
      testimonial:
        "I thought it was impossible to make a website as beautiful as our product, but Qurban proved me wrong.",
      name: "Sara Henry ",
      designation: "CFO",
      company: "Acme Co",
      image : "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      testimonial:
        "I've never met a web developer who truly cares about their clients' success like Qurban does.",
      name: "Chris Jordan",
      designation: "COO",
      company: "DEF Corp",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      testimonial:
        "After Qurban optimized our website, our traffic increased by 50%. We can't thank them enough!",
      name: "Lisa william",
      designation: "CTO",
      company: "456 Enterprises",
      image: "https://randomuser.me/api/portraits/women/6.jpg",
    },
  ];
  
  const projects = [
    {
      name: "Amazon Services",
      description:
        "A product catalog with search and filtering functionality, A product detail page with reviews and recommendations, A shopping cart for adding and removing items",
      tags: [
        {
          name: "javascript",
          color: "blue-text-gradient",
        },
        {
          name: "html5",
          color: "green-text-gradient",
        },
        {
          name: "css3",
          color: "pink-text-gradient",
        },
      ],
      image: Project1,
      source_code_link: "https://github.com/qurban7860/AmazonClone.git",
    },
    {
      name: "Ecommerce Website",
      description:
        "Web-based platform that allows users to search, user-friendly and responsive interface that is easy to navigate, A product catalog with clear descriptions, A shopping cart that allows users to handle items.",

      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "javascript",
          color: "green-text-gradient",
        },
        {
          name: "tailwind",
          color: "pink-text-gradient",
        },
      ],
      image: carrent,
      source_code_link: "https://github.com/qurban7860/EcommerceResponsiveDesign.git",
    },
    {
      name: "Youtube Clone",
      description:
        "Web application that enables users to search videos, A video player with playback controls, A recommendation system to suggest videos to watch, A comment section for users to discuss videos",
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "restapi",
          color: "green-text-gradient",
        },
        {
          name: "css3",
          color: "pink-text-gradient",
        },
      ],
      image: Project2,
      source_code_link: "https://github.com/qurban7860/YoutubeClone.git",
    },
    
  ];
  
  export { services, technologies, experiences, testimonials, projects };
  