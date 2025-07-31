"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Sun, Moon, Globe, Mail, Linkedin, Github, ChevronDown, BookOpen, Users, Award, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import './globals.css';
import Link from "next/link"
import { ChatbotButton } from "@/components/chatbot-button"


// Language Context
const translations = {
  pt: {
    nav: {
      about: "Sobre Mim",
      skills: "Habilidades",
      experience: "Experiência",
      projects: "Projetos",
      contact: "Contato",
    },
    hero: {
      greeting: "Olá, eu sou",
      title: "Cientista de Dados em formação & Educadora",
      subtitle: "Transformando dados em insights e conhecimento em impacto",
      cta: "Vamos conversar",
    },
    about: {
      title: "Sobre Mim",
      text: `Sou Beatryz Kleuvyn, profissional em transição para a área de Ciência de Dados, com paixão por tecnologia, educação e impacto social. Sou formada em Análise e Desenvolvimento de Sistemas, estudante de Licenciatura em Matemática e pós-graduanda em Ciência de Dados e Inteligência Artificial e MBA em Tecnologia para Negócios (AI, DS e Big Data).
      
      Atualmente estou aprofundando meus conhecimentos em análise de dados — aprendendo na prática sobre coleta, limpeza, visualização e interpretação de dados — como base sólida para minha futura atuação como Cientista de Dados. Estou desenvolvendo projetos que envolvem chatbots com inteligência artificial, fluxos de atendimento e análise de comportamento de usuários, sempre guiada por dados reais e propósito social.
      
      Meu foco é construir soluções que unam tecnologia, educação e empatia, com curiosidade constante e desejo genuíno de aprender e contribuir. Estou aberta a oportunidades que valorizem o aprendizado contínuo e o desenvolvimento de produtos ou estratégias baseadas em dados.`,
      highlight: "Dados + Educação = Impacto",
    },
    skills: {
      title: "Expertise",
      dataScience: "Ciência de Dados",
      education: "Educação",
    },
    experience: {
      title: "Experiência & Educação",
      current: "Atual",
      years: "anos",
      list: [
                  {
                    title: "Analista de Dados - Voluntária",
                    company: "Stoá",
                    period: "jul 2025 - Atual",
                    description: `Atuação voluntária na Stoá, com foco na criação de um chatbot com Inteligência Artificial voltado ao atendimento de doadores.
                    Responsável por atividades de análise de dados;
                    Levantamento e categorização de perguntas frequentes recebidas pelo chat;
                    Estruturação de dados de interações para análise de comportamento dos usuários;
                    Apoio na criação de fluxos lógicos de resposta com base em dados reais;
                    Identificação de padrões nas dúvidas mais recorrentes para auxiliar no treinamento do chatbot.`,
                  },{
                    title: "Professora Ensino Médio",
                    company: "Colégio Ápice Educacional",
                    period: "ago de 2024 - abr de 2025",
                    description: `Atuei como professora de Matemática, Física e Filosofia no Ensino Médio. Minha missão é inspirar e capacitar os alunos a desenvolverem habilidades críticas e analíticas, integrando conceitos teóricos com aplicações práticas.`,

                  },{
                    title: "Desenvolvedora/Lider",
                    company: "IESB - BayArea",
                    period: "abr de 2023 - jul de 2024",
                    description: `No IESB, onde atuei como líder por três semestres, conduzi uma equipe dedicada ao desenvolvimento de uma plataforma de Ponto de Vendas voltada para beneficiar a comunidade. Essa iniciativa teve como objetivo principal atender às necessidades locais e promover o bem-estar coletivo. Contribuí ativamente tanto no frontend quanto no backend, implementando melhorias e desenvolvendo códigos que garantiram maior eficiência e qualidade ao sistema.`,

                  },
                ],
    },
    projects: {
      title: "Projetos em Destaque",
      viewProject: "Ver Projeto",
      itens:[
              {
              "title": "Analista de Dados",
                "description": "Projeto voluntário desenvolvido na Stoá no desenvolvimento de chatbot para a ONG Ritmos do Coração, com foco em estruturação de fluxos conversacionais orientados a dados, análise textual e automação de interações.",
                "tech": ["Python", "Dialogflow", "Lógica de Dados", "Análise Textual", "Estruturação de Chatbots"],
                color: "from-purple-500 to-turquoise-500",
                link: "https://github.com/kleuvyn"
              },
              {
                "title": "Desenvolvedora",
                "description": "Projeto voluntário desenvolvido no IESB, no qual atuei como líder por três semestres. Liderança no backend e contribuições significativas no frontend para o desenvolvimento de uma plataforma de Ponto de Vendas voltada à comunidade. A solução visava atender necessidades sociais com tecnologia acessível e bem estruturada.",
                "tech": ["React", "Node.js", "JS", "Prisma", "Docker", "CSS", "HTML", "MySQL"],
                "color": "from-blue-500 to-purple-500",
                link: "https://github.com/fabrica-bayarea"
              },

              ]
    },
    contact: {
      title: "Vamos Colaborar",
      subtitle: "Interessado em ciência de dados ou educação? Vamos conversar!",
      email: "Enviar Email",
      connect: "Conectar",
    },
  },
  en: {
    nav: {
    about: "About Me",
    skills: "Skills",
    experience: "Experience",
    projects: "Projects",
    contact: "Contact",
  },
  hero: {
    greeting: "Hi, I'm",
    title: "Aspiring Data Scientist & Educator",
    subtitle: "Turning data into insights and knowledge into impact",
    cta: "Let's Talk",
  },
  about: {
    title: "About Me",
    text: `I'm Beatryz Kleuvyn, a professional transitioning into Data Science, with a passion for technology, education, and social impact. I hold a degree in Systems Analysis and Development, study Mathematics Teaching, and I'm currently pursuing postgraduate studies in Data Science & Artificial Intelligence, as well as an MBA in Business Technology (AI, DS, and Big Data).

    Currently, I’m deepening my knowledge in data analysis — learning hands-on about data collection, cleaning, visualization, and interpretation — building a solid foundation for my future role as a Data Scientist. I'm developing projects involving AI-powered chatbots, user interaction flows, and behavior analysis, always guided by real data and a strong sense of purpose.

    My focus is to create solutions that connect technology, education, and empathy, driven by constant curiosity and a genuine desire to learn and contribute. I'm open to opportunities that value continuous learning and the development of data-driven products or strategies.`,
    highlight: "Data + Education = Impact",
  },
  skills: {
    title: "Expertise",
    dataScience: "Data Science",
    education: "Education",
  },
  experience: {
    title: "Experience & Education",
    current: "Current",
    years: "years",
    list: [
      {
        title: "Data Analyst – Volunteer",
        company: "Stoá",
        period: "Jul 2025 – Current",
        description: `Volunteer work at Stoá, focused on creating an AI-powered chatbot for donor support.
        – Responsible for data analysis activities;
        – Collected and categorized frequently asked questions from the chat;
        – Structured user interaction data for behavior analysis;
        – Supported the creation of logical response flows based on real data;
        – Identified patterns in recurring questions to support chatbot training.`,
              },
      {
        title: "High School Teacher",
        company: "Colégio Ápice Educacional",
        period: "Aug 2024 – Apr 2025",
        description: `Taught Mathematics, Physics, and Philosophy to high school students. My mission was to inspire and empower students to develop critical and analytical thinking by integrating theoretical concepts with practical applications.`,
      },
      {
        title: "Developer / Team Lead",
        company: "IESB – BayArea",
        period: "Apr 2023 – Jul 2024",
        description: `At IESB, I served as team leader for three semesters, leading the development of a Point of Sale platform aimed at supporting the local community. The project was designed to meet social needs with accessible, well-structured technology. I actively contributed to both backend and frontend development, implementing improvements and writing code that increased system efficiency and quality.`,
      }
    ]
  },
  projects: {
    title: "Featured Projects",
    viewProject: "View Project",
    itens: [
      {
        title: "Data Analyst",
        description: "Volunteer project at Stoá: development of a chatbot for the NGO Ritmos do Coração, focused on structuring data-driven conversational flows, textual analysis, and interaction automation.",
        tech: ["Python", "Dialogflow", "Data Logic", "Text Analysis", "Chatbot Design"],
        color: "from-purple-500 to-turquoise-500",
        link: "https://github.com/kleuvyn",
      },
      {
        title: "Developer",
        description: "Volunteer project at IESB, where I led a three-semester team. I managed backend development and contributed significantly to the frontend in building a Point of Sale platform aimed at social impact through accessible technology.",
        tech: ["React", "Node.js", "JS", "Prisma", "Docker", "CSS", "HTML", "MySQL"],
        color: "from-blue-500 to-purple-500",
        link: "https://github.com/fabrica-bayarea",
      }
    ]
  },
  contact: {
    title: "Let's Collaborate",
    subtitle: "Interested in data science or education? Let’s talk!",
    email: "Send Email",
    connect: "Connect",
  },
  },
  es: {
  nav: {
      about: "Sobre mí",
      skills: "Habilidades",
      experience: "Experiencia",
      projects: "Proyectos",
      contact: "Contacto",
    },
    hero: {
      greeting: "Hola, soy",
      title: "Científica de Datos en formación & Educadora",
      subtitle: "Transformando datos en ideas y el conocimiento en impacto",
      cta: "Conectemos",
    },
    about: {
      title: "Sobre mí",
      text: `Soy Beatryz Kleuvyn, una profesional en transición al campo de la Ciencia de Datos, impulsada por la pasión por la tecnología, la educación y el impacto social. Tengo un título en Análisis y Desarrollo de Sistemas, estudio Licenciatura en Matemáticas y curso posgrados en Ciencia de Datos & Inteligencia Artificial, además de un MBA en Tecnología para los Negocios (IA, CD y Big Data).

      Actualmente estoy profundizando mis conocimientos en análisis de datos: aprendiendo en la práctica sobre recolección, limpieza, visualización e interpretación de datos, como base sólida para mi futuro como Científica de Datos. Estoy desarrollando proyectos que involucran chatbots con IA, análisis de comportamiento de usuarios y flujos de servicios basados en datos reales, siempre con propósito social.

      Mi enfoque es construir soluciones que combinen tecnología, educación y empatía, con curiosidad constante y un verdadero deseo de aprender y contribuir. Estoy abierta a oportunidades que valoren el aprendizaje continuo y el desarrollo de productos o estrategias basadas en datos.`,
      highlight: "Datos + Educación = Impacto",
    },
    skills: {
      title: "Especialidades",
      dataScience: "Ciencia de Datos",
      education: "Educación",
    },
    experience: {
      title: "Experiencia & Formación",
      current: "Actual",
      years: "años",
      list: [
        {
          title: "Analista de Datos – Voluntaria",
          company: "Stoá",
          period: "Jul 2025 – Actual",
          description: `Trabajo voluntario en Stoá, centrado en la creación de un chatbot con IA para apoyar la interacción con donantes.
          Responsabilidades:
          – Análisis e interpretación de datos;
          – Recopilación y categorización de preguntas frecuentes del chat;
          – Estructuración de datos de interacción para analizar el comportamiento de los usuarios;
          – Apoyo en la creación de flujos lógicos de respuestas basadas en datos reales;
          – Identificación de patrones en preguntas recurrentes para mejorar el entrenamiento del chatbot.`,
        },
        {
          title: "Docente de Secundaria",
          company: "Colégio Ápice Educacional",
          period: "Ago 2024 – Abr 2025",
          description: `Trabajé como profesora de Matemáticas, Física y Filosofía para estudiantes de secundaria. Mi misión era inspirar y empoderar a los estudiantes para desarrollar el pensamiento crítico y analítico, integrando conceptos teóricos con aplicaciones prácticas.`,
        },
        {
          title: "Desarrolladora / Líder de Equipo",
          company: "IESB – BayArea",
          period: "Abr 2023 – Jul 2024",
          description: `En IESB, actué como líder de equipo durante tres semestres, dirigiendo el desarrollo de una plataforma de punto de venta destinada a beneficiar a la comunidad local. Esta iniciativa de código abierto tenía como objetivo atender necesidades reales y promover el bienestar colectivo. Contribuí activamente al desarrollo frontend y backend, implementando mejoras y escribiendo código para mejorar el rendimiento y la calidad del sistema.`,
        },
      ]
    },
    projects: {
      title: "Proyectos Destacados",
      viewProject: "Ver Proyecto",
      itens: [
        {
          title: "Analista de Datos",
          description: "Proyecto voluntario desarrollado en Stoá, enfocado en la creación de un chatbot para la ONG Ritmos del Coração. Participación en la estructuración de flujos conversacionales basados en datos, análisis textual y automatización de interacciones.",
          tech: ["Python", "Dialogflow", "Lógica de Datos", "Análisis Textual", "Estructuración de Chatbots"],
          color: "from-purple-500 to-turquoise-500",
          link: "https://github.com/kleuvyn",
        },
        {
          title: "Desarrolladora",
          description: "Proyecto voluntario realizado en IESB, en el que actué como líder durante tres semestres. Liderazgo en el backend y contribuciones significativas en el frontend para el desarrollo de una plataforma de Punto de Venta orientada a la comunidad. La solución tenía como objetivo atender necesidades sociales con tecnología accesible y bien estructurada.",
          tech: ["React", "Node.js", "JS", "Prisma", "Docker", "CSS", "HTML", "MySQL"],
          color: "from-blue-500 to-purple-500",
          link: "https://github.com/fabrica-bayarea",
        },
      ],
    },
    contact: {
      title: "Colaboremos",
      subtitle: "¿Te interesa ciencia de datos o educación? ¡Hablemos!",
      email: "Enviar correo",
      connect: "Conectar",
    },
  },
};
export default function Portfolio() {
  const [isDark, setIsDark] = useState(false)
  const [language, setLanguage] = useState<"pt" | "en" | "es">("pt")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("theme")
    const savedLang = localStorage.getItem("language") as "pt" | "en" | "es"

    if (savedTheme === "dark") setIsDark(true)
    if (savedLang) setLanguage(savedLang)
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("theme", isDark ? "dark" : "light")
      document.documentElement.classList.toggle("dark", isDark)
    }
  }, [isDark, mounted])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("language", language)
    }
  }, [language, mounted])

  const t = translations[language]

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  if (!mounted) return null

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "dark" : ""}`}>
      <div className="bg-gradient-to-br from-purple-50 via-white to-turquoise-50 dark:from-purple-950 dark:via-gray-900 dark:to-turquoise-950 text-gray-900 dark:text-white">
        {/* Header */}
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-purple-200 dark:border-purple-800"
        >
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-turquoise-600 bg-clip-text text-transparent"
            >
              Kleuvyn
            </motion.div>

            <nav className="hidden md:flex space-x-8">
              {Object.entries(t.nav).map(([key, value]) => (
                <motion.button
                  key={key}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => scrollToSection(key)}
                  className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  {value}
                </motion.button>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <div className="flex items-center space-x-1 bg-purple-100 dark:bg-purple-900 rounded-full p-1">
                <Globe className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                {(["pt", "en", "es"] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                      language === lang
                        ? "bg-purple-600 text-white"
                        : "text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-800"
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </motion.header>

        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center pt-20">
          <div className="container mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <p className="text-lg text-purple-600 dark:text-purple-400 mb-4">{t.hero.greeting}</p>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-turquoise-600 to-purple-800 bg-clip-text text-transparent">
                Beatryz Kleuvyn
              </h1>
              <h2 className="text-2xl md:text-3xl font-light text-gray-700 dark:text-gray-300 mb-8">{t.hero.title}</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">{t.hero.subtitle}</p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => scrollToSection("chat")}
                  className="bg-gradient-to-r from-purple-600 to-turquoise-600 hover:from-purple-700 hover:to-turquoise-700 text-white px-8 py-4 text-lg rounded-full shadow-lg"
                >
                  {t.hero.cta}
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
              <ChevronDown className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <motion.section
          id="about"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="py-20 bg-white/50 dark:bg-gray-900/50"
        >
          <div className="container mx-auto px-4">
              <div className="container mx-auto px-4 text-justify">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold text-center mb-12 text-purple-800 dark:text-purple-300"
              >
                {t.about.title}
              </motion.h2>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="w-80 h-80 mx-auto bg-gradient-to-br from-purple-400 to-turquoise-400 rounded-full flex items-center justify-center">
                    <div className="w-72 h-72 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-6xl font-bold text-purple-900 dark:text-purple-400">
                      Kleuvyn
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-6"
                >
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{t.about.text}</p>
                  <div className="bg-gradient-to-r from-purple-100 to-turquoise-100 dark:from-purple-900 dark:to-turquoise-900 p-6 rounded-lg">
                    <p className="text-xl font-semibold text-purple-800 dark:text-purple-300 text-center">
                      {t.about.highlight}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section id="skills" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="py-20">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-center mb-12 text-purple-800 dark:text-purple-300"
            >
              {t.skills.title}
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {[
                { icon: BookOpen, title: t.skills.dataScience, color: "from-purple-500 to-purple-700" },
                { icon: Users, title: t.skills.education, color: "from-pink-500 to-turquoise-700" },
              ].map((skill, index) => (
                <motion.div
                  key={skill.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                >
                  <Card className="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-purple-200 dark:border-purple-700 hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-8 text-center">
                      <div
                        className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${skill.color} flex items-center justify-center`}
                      >
                        <skill.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{skill.title}</h3>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Experience Section */}
        <motion.section
          id="experience"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="py-20 bg-white/50 dark:bg-gray-900/50"
        >
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-center mb-12 text-purple-800 dark:text-purple-300"
            >
              {t.experience.title}
            </motion.h2>

              <div className="container mx-auto px-4 text-justify">
              <div className="space-y-8">
                {t.experience.list.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-l-4 border-purple-500"
                  >
                    <h3 className="text-xl font-semibold text-purple-800 dark:text-purple-300">{exp.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">{exp.company}</p>
                    <p className="text-sm text-purple-600 dark:text-purple-400 mb-3">{exp.period}</p>
                    <p className="text-gray-700 dark:text-gray-300">{exp.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Projects Section */}
        <motion.section id="projects" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="py-20">
            <div className="container mx-auto px-4 text-justify">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-center mb-12 text-purple-800 dark:text-purple-300"
            >
              {t.projects.title}
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-2
             gap-8">
                {t.projects.itens.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                >
                  <Card className="h-full bg-white dark:bg-gray-800 border-purple-200 dark:border-purple-700 hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div
                        className={`w-full h-32 mb-4 rounded-lg bg-gradient-to-r ${project.color} flex items-center justify-center`}
                      >
                        <div className="text-white text-2xl font-bold">
                          {project.title
                            .split(" ")
                            .map((word) => word[0])
                            .join("")}
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">{project.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300 rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <Link href={project.link} target="_blank" rel="noopener noreferrer">
                        <Button
                          variant="outline"
                          className="w-full border-purple-300 text-purple-600 hover:bg-purple-50 dark:border-purple-700 dark:text-purple-400 dark:hover:bg-purple-900 bg-transparent">
                          {t.projects.viewProject}
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          id="contact"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="py-20 bg-gradient-to-r from-purple-600 to-turquoise-600 text-white"
        >
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-center mb-6"
            >
              {t.contact.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl mb-12 max-w-2xl mx-auto"
            >
              {t.contact.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <motion.a
                href="mailto:b.kleuvyn@gmail.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 bg-white text-purple-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                <Mail className="w-5 h-5" />
                {t.contact.email}
              </motion.a>

              <div className="flex gap-4">
                {[
                  { icon: Linkedin, href: "https://www.linkedin.com/in/beatryz-kleuvyn-467a23198/", label: "LinkedIn" },
                  { icon: Github, href: "https://github.com/kleuvyn", label: "GitHub" },
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="py-8 bg-gray-900 dark:bg-black text-white mx-auto px-4 text-center">
          <div className="container mx-auto px-4">
            <p className="text-gray-400">© 2025  Kleuvyn</p>
          </div>
        </footer>
      </div>
      {/* Chatbot Button */}
        <ChatbotButton />
    </div>
  )
}
