import { useState, useEffect, useCallback } from 'react'
import Navbar from '@/components/portfolio/Navbar'
import HeroSection from '@/components/portfolio/HeroSection'
import SkillsSection from '@/components/portfolio/SkillsSection'
import ProjectsSection from '@/components/portfolio/ProjectsSection'
import CertificationsSection from '@/components/portfolio/CertificationsSection'
import AchievementsSection from '@/components/portfolio/AchievementsSection'
import ResumeSection from '@/components/portfolio/ResumeSection'
import ContactSection from '@/components/portfolio/ContactSection'
import ParticleCanvas from '@/components/portfolio/ParticleCanvas'

const SECTIONS = ['home', 'skills', 'projects', 'certifications', 'achievements', 'resume', 'contact']

export default function App() {
  const [activeSection, setActiveSection] = useState('home')

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 100
      for (const id of SECTIONS) {
        const el = document.getElementById(id)
        if (el) {
          const { top, bottom } = el.getBoundingClientRect()
          const absTop = top + window.scrollY
          const absBottom = bottom + window.scrollY
          if (scrollY >= absTop && scrollY < absBottom) {
            setActiveSection(id)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigateTo = useCallback((id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveSection(id)
    }
  }, [])

  return (
    <main className="relative min-h-screen bg-background text-foreground noise-bg">
      <ParticleCanvas />
      <Navbar activeSection={activeSection} onNavigate={navigateTo} />
      <HeroSection onNavigate={navigateTo} />
      <SkillsSection />
      <ProjectsSection />
      <CertificationsSection />
      <AchievementsSection />
      <ResumeSection />
      <ContactSection />
    </main>
  )
}
