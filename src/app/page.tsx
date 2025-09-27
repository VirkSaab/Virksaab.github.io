'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Cyberpunk Sound System
const useCyberpunkSounds = () => {
  const audioContextRef = useRef<AudioContext | null>(null)
  const [isAudioEnabled, setIsAudioEnabled] = useState(false)

  useEffect(() => {
    // Try to initialize audio context immediately
    const initAudio = () => {
      if (!audioContextRef.current) {
        try {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
          setIsAudioEnabled(true)
          console.log('🔊 Audio enabled immediately!')
        } catch (error) {
          console.log('🔊 Audio requires user interaction, will enable on first click')
        }
      }
    }

    // Try to init immediately
    initAudio()

    // Fallback: Add event listeners for first user interaction
    const events = ['click', 'touchstart', 'keydown']
    events.forEach(event => {
      document.addEventListener(event, initAudio, { once: true })
    })

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, initAudio)
      })
    }
  }, [])

  const createCyberpunkSound = useCallback(async (type: 'click' | 'hover' | 'open' | 'close' | 'shuffle') => {
    if (!audioContextRef.current) return

    const ctx = audioContextRef.current
    
    // Resume audio context if suspended
    if (ctx.state === 'suspended') {
      try {
        await ctx.resume()
        setIsAudioEnabled(true)
      } catch (error) {
        console.log('🔊 Could not resume audio context')
        return
      }
    }
    
    const now = ctx.currentTime

    if (type === 'click') {
      console.log('🔊 NEW CLICK SOUND PLAYING!')
      // Create a wood block / percussion click sound
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()
      const filterNode = ctx.createBiquadFilter()

      // Connect nodes
      oscillator.connect(filterNode)
      filterNode.connect(gainNode)
      gainNode.connect(ctx.destination)

      // Wood block percussion sound
      oscillator.frequency.setValueAtTime(800, now)
      oscillator.type = 'triangle'
      
      // Sharp attack and quick decay like a wood block
      gainNode.gain.setValueAtTime(0.3, now)
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.08)
      
      // Filter for percussive character
      filterNode.type = 'highpass'
      filterNode.frequency.setValueAtTime(400, now)
      filterNode.Q.setValueAtTime(1, now)

      // Start and stop
      oscillator.start(now)
      oscillator.stop(now + 0.1)
      return
    }

    // Create oscillator for other sounds
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()
    const filterNode = ctx.createBiquadFilter()

    // Connect nodes
    oscillator.connect(filterNode)
    filterNode.connect(gainNode)
    gainNode.connect(ctx.destination)

    // Configure sound based on type
    switch (type) {

      case 'hover':
        // Quick tech beep
        oscillator.frequency.setValueAtTime(900, now)
        oscillator.frequency.exponentialRampToValueAtTime(950, now + 0.02)
        filterNode.frequency.setValueAtTime(2500, now)
        gainNode.gain.setValueAtTime(0.04, now)
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.04)
        oscillator.type = 'square'
        break

      case 'open':
        // Professional access granted sound
        oscillator.frequency.setValueAtTime(440, now)
        oscillator.frequency.exponentialRampToValueAtTime(880, now + 0.06)
        oscillator.frequency.exponentialRampToValueAtTime(1320, now + 0.12)
        filterNode.frequency.setValueAtTime(1000, now)
        filterNode.frequency.exponentialRampToValueAtTime(6000, now + 0.12)
        gainNode.gain.setValueAtTime(0.1, now)
        gainNode.gain.exponentialRampToValueAtTime(0.02, now + 0.15)
        oscillator.type = 'sawtooth'
        break

      case 'close':
        // Quick tech close sound
        oscillator.frequency.setValueAtTime(1000, now)
        oscillator.frequency.exponentialRampToValueAtTime(400, now + 0.06)
        filterNode.frequency.setValueAtTime(3000, now)
        gainNode.gain.setValueAtTime(0.07, now)
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.08)
        oscillator.type = 'square'
        break

      case 'shuffle':
        // Card shuffle scanning sound
        oscillator.frequency.setValueAtTime(1200, now)
        oscillator.frequency.exponentialRampToValueAtTime(1400, now + 0.03)
        filterNode.frequency.setValueAtTime(2500, now)
        filterNode.frequency.exponentialRampToValueAtTime(3500, now + 0.03)
        gainNode.gain.setValueAtTime(0.05, now)
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05)
        oscillator.type = 'sine'
        break
    }

    // Set filter type
    filterNode.type = 'lowpass'
    filterNode.Q.setValueAtTime(5, now)

    // Start and stop oscillator - quick tech sounds
    oscillator.start(now)
    oscillator.stop(now + 0.12)

  }, [isAudioEnabled])

  return { playSound: createCyberpunkSound, isAudioEnabled }
}

interface FolderData {
  id: string
  title: string
  subtitle: string
  icon: string
  color: string
  content: any
}

export default function Home() {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)
  const [hoveredFolder, setHoveredFolder] = useState<string | null>(null)
  const [folderOrder, setFolderOrder] = useState<string[]>(['personal', 'experience', 'skills', 'projects', 'education'])
  const [isInitializing, setIsInitializing] = useState(false)
  const [currentCycleIndex, setCurrentCycleIndex] = useState(-1)
  const [isAutoScrolling, setIsAutoScrolling] = useState(false)
  const [userInteracted, setUserInteracted] = useState(false)
  const [showAudioPrompt, setShowAudioPrompt] = useState(true)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null)
  
  // Initialize cyberpunk sound system
  const { playSound, isAudioEnabled } = useCyberpunkSounds()

  // Handle audio prompt click
  const handleAudioPromptClick = () => {
    setShowAudioPrompt(false)
    // Play a test sound to confirm audio is working
    playSound('shuffle')
    // Start the initialization animation after a brief delay
    setTimeout(() => {
      setIsInitializing(true)
    }, 300)
  }

  // Initialization cycling animation
  useEffect(() => {
    if (!isInitializing) return

    const cycleInterval = setInterval(() => {
      setCurrentCycleIndex(prev => {
        const nextIndex = prev + 1
        if (nextIndex >= folderOrder.length) {
          // Cycling complete, settle into normal state
          setTimeout(() => {
            setIsInitializing(false)
            setCurrentCycleIndex(-1)
            // Automatically open PERSONAL_ID card after initialization
            setTimeout(() => {
              setSelectedFolder('personal')
              // Move personal folder to top of stack
              const newOrder = [...folderOrder.filter(id => id !== 'personal'), 'personal']
              setFolderOrder(newOrder)
              // Play open sound when auto-opening personal folder
              playSound('open')
            }, 100) // Ultra-fast auto-opening
          }, 100) // Ultra-short pause before settling
          return prev
        }
        
        // Play shuffle sound for each card cycle
        playSound('shuffle')
        return nextIndex
      })
    }, 200) // Ultra-fast cycling - each card highlighted for only 200ms

    return () => clearInterval(cycleInterval)
  }, [isInitializing, folderOrder])

  // Update scrollbar colors based on selected folder
  useEffect(() => {
    if (selectedFolder) {
      const folder = folders.find(f => f.id === selectedFolder)
      const colors = {
        'cyber-primary': { main: '#00ff41', glow: 'rgba(0, 255, 65, 0.3)', border: 'rgba(0, 255, 65, 0.2)' },
        'cyber-accent': { main: '#00d4ff', glow: 'rgba(0, 212, 255, 0.3)', border: 'rgba(0, 212, 255, 0.2)' },
        'cyber-secondary': { main: '#ff0080', glow: 'rgba(255, 0, 128, 0.3)', border: 'rgba(255, 0, 128, 0.2)' }
      }
      const color = colors[folder?.color as keyof typeof colors] || colors['cyber-primary']
      
      // Update CSS custom properties for scrollbar
      document.documentElement.style.setProperty('--scrollbar-thumb', color.main)
      document.documentElement.style.setProperty('--scrollbar-border', color.border)
      document.documentElement.style.setProperty('--scrollbar-glow', color.glow)
    }
  }, [selectedFolder])

  // Auto-scroll functionality
  const startAutoScroll = useCallback(() => {
    if (!scrollContainerRef.current || userInteracted) return
    
    const container = scrollContainerRef.current
    const canScroll = container.scrollHeight > container.clientHeight
    
    if (!canScroll) {
      setIsAutoScrolling(false)
      return
    }
    
    setIsAutoScrolling(true)
    
    const scrollStep = () => {
      if (!container || userInteracted) {
        setIsAutoScrolling(false)
        return
      }
      
      // Slow scroll speed: 0.5 pixels per step
      container.scrollTop += 0.5
      
      // Reset to top when reaching bottom
      if (container.scrollTop >= container.scrollHeight - container.clientHeight) {
        setTimeout(() => {
          if (container && !userInteracted) {
            container.scrollTop = 0
          }
        }, 2000) // Pause at bottom for 2 seconds
      }
    }
    
    // Start scrolling after 2 seconds delay
    setTimeout(() => {
      if (!userInteracted) {
        autoScrollRef.current = setInterval(scrollStep, 50) // 20 FPS for smooth scrolling
      }
    }, 1000)
  }, [userInteracted])
  
  const stopAutoScroll = useCallback(() => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current)
      autoScrollRef.current = null
    }
    setIsAutoScrolling(false)
    setUserInteracted(true)
    
    // Reset user interaction after 5 seconds of no interaction
    setTimeout(() => {
      setUserInteracted(false)
    }, 5000)
  }, [])
  
  // Start auto-scroll when content changes
  useEffect(() => {
    if (selectedFolder && !userInteracted) {
      // Clear any existing auto-scroll
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current)
      }
      
      // Reset scroll position
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0
      }
      
      // Start new auto-scroll
      startAutoScroll()
    }
    
    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current)
      }
    }
  }, [selectedFolder, startAutoScroll, userInteracted])
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current)
      }
    }
  }, [])

  const folders: FolderData[] = [
    {
      id: 'personal',
      title: 'PERSONAL_ID',
      subtitle: 'Identity Matrix',
      icon: '',
      color: 'cyber-primary',
      content: {
        name: 'JITENDER SINGH',
        title: 'Machine Learning Engineer',
        summary: 'AI Engineer and Researcher with 3+ years of industry and 3 years of research academic experience in deep learning and medical imaging. Specialized in vision-language models and scalable, production-grade AI solutions. Led R&D as CTO & Lead AI Engineer at a healthcare AI startup. Collaborated with top institutions on grants & research projects. Skilled in PyTorch, Python, and end-to-end AI deployment.',
        email: 'jrshpro@gmail.com',
        location: 'Bengaluru, India',
        github: 'https://github.com/VirkSaab',
        linkedin: 'linkedin.com/in/jsv47'
      }
    },
    {
      id: 'experience',
      title: 'CAREER_LOG',
      subtitle: 'Professional Timeline',
      icon: '',
      color: 'cyber-accent',
      content: [
        {
          role: 'Machine Learning Engineer',
          company: 'Pibit AI',
          location: 'Bangalore, Karnataka, India',
          period: 'Aug 2025 - Present',
          achievements: [
            'Improving Appetite Solution for autonomous commerical insurance documents analysis.',
          ]
        },
        {
          role: 'AI Engineer',
          company: 'Manentia AI (early-stage startup)',
          location: 'Bangalore, Karnataka, India',
          period: 'Apr 2022 - Aug 2025',
          achievements: [
            'Designed, developed, and deployed an AI-driven scan-to-report radiology workflow in production reducing reporting time by 45-50% by automated abnormalities, pathologies, lesion detection and report generation with direct PACS connectivity. It uses 2D and 3D CNNs and ViT vision models for image feature extraction across various modalities such as CT, MRI, DX, MG, PET, etc. and LLMs for report generation. The system supports segmentation, detection, classification, and generation tasks with a feedback loop for self-training, and automated pipeline selector based on modality and body part examined.',
            'Built a feedback-driven self-training system that reuses radiologists\' final reports for model refinement and optimisation, addressing the challenge of limited annotated medical data.',
            'Developed an LLM + RAG-powered clinical reporting chat app for structured radiology reports, reducing reformatting time by 20% (validated by 15 radiologists).',
            'Built a DICOM-aware pipeline selector with AI fallback for missing metadata or non-DICOM inputs, including a 99.8% accurate modality classifier trained on 1.2M samples and 98% accurate zero-shot body-part classifier, routing studies to the correct DAG pipelines.',
            'Designed, developed, and deployed CDSCO-approved (regulated under standards similar to FDA [U.S.] and CE-mark [EU MDR/IVDR]) 3D CT Pulmonary Nodule Detection (lung segmentation: 0.98 AUC, lobe segmentation: 0.90 AUC, nodule segmentation: 0.87 AUC, classification: 93% accuracy) compliant with Fleischner Society 2017 guidelines.',
            'Filed a patent titled "Lung Nodule Detection and Classification with Automatic Report Generation."',
            'Led a cross-functional AI R&D team delivering production-grade AI solutions for X-Ray and CT workflows.',
            'Contributed to 4 RSNA 2025 (accepted), 4 ECR 2025 (published), and 3 ERS 2025 (accepted) abstracts through team collaboration.',
            'Developed a 2D deep learning pipeline from data munging to deployable deep neural network for Lung Disease Classification using X-Ray Imaging.'
          ]
        },
        {
          role: 'MRI Image Processor and Analyst',
          company: 'Radiodiagnosis and Imaging Department, PGIMER',
          location: 'Chandigarh, India',
          period: 'Jul 2021 - Mar 2022',
          achievements: [
            'Performed statistical analysis on Diffusion Kurtosis Imaging (DKI) brain imaging including image preprocessing and registration as part of the NIH-funded research grant "MRSI and DKI Evaluation of HIV-1 Clade C Infection in the Whole Brain" in collaboration with the University of Miami School of Medicine and awarded/supported/administered by Fogarty International Center, U.S. National Institutes of Health (NIH).',
            'Performed statistical analysis on DTI pediatric brain imaging including image processing and registration for a clinical research study on Infantile Tremor Syndrome (ITS) in North India.'
          ]
        },
        {
          role: 'Medical Machine Learning Research Assistant',
          company: 'CBIL Lab, Indian Institute of Technology (IIT) Ropar',
          location: 'Rupnagar, Punjab, India',
          period: 'Mar 2019 - Mar 2022',
          achievements: [
            'Developed "VQAMixUp", a SOTA medical Visual Question-Answering and Generation (VQAG) method, achieving top performance on ImageCLEF-VQA-MED benchmark with approximately 65% fewer parameters, in collaboration with Inception Institute of Artificial Intelligence (IIAI), Abu Dhabi.',
            'Built a risk prediction model for Postpartum Depression (PPD) by combining neural networks and tree-based classifiers. Applied auto-sklearn for hyperparameter optimization and model ensembling, alongside tabular data feature engineering, achieving ~75% accuracy as part of the ongoing Swedish Mom2B study in collaboration with Uppsala University Hospital.',
            'Designed and implemented a lightweight (4.5M parameters only) custom CNN algorithm using mixed asymmetric kernels achieving 0.91 AUC on Deeplesion hand-labeled test dataset using semi-supervised training for efficient medical image analysis.',
            'Organized, collected, and cleaned ~1.5TB unlabeled CT scans dataset for semi-supervised training.',
            'Contributed to MRI–PET multi-modal Alzheimer\'s classification (92.9% accuracy) as part of the "GLA-GAN" study.'
          ]
        },
        {
          role: 'Machine Learning Research Intern',
          company: 'LASII group, Indian Institute of Technology (IIT) Ropar',
          location: 'Rupnagar, Punjab, India',
          period: 'Aug 2018 - Feb 2019',
          achievements: [
            'Developed Computer Vision-based automatic collage maker Android app in collaboration with Samsung India.',
            'Developed Garuda: A Deep Learning-based background danger detection while taking selfies Android app achieving 89% accuracy in real world camera feed with inference run-time average of 300ms per frame.'
          ]
        },
        {
          role: 'Machine Learning Innovation Fellow',
          company: 'Savera.ai startup (Sungineers Energy Private Limited)',
          location: 'Remote',
          period: 'July 2018 - Dec 2018',
          achievements: [
            'Developed an end-to-end rooftop detection and segmentation pipeline for Indian buildings using aerial/satellite imagery, leveraging U-Net with Keras/TensorFlow to achieve 92.2% accuracy and 61.44 IoU on the Inria and Massachusetts Buildings datasets.'
          ]
        },
        {
          role: 'AI Research Fellow',
          company: 'Axis India Machine Learning Lab',
          location: 'Jaipur, Rajasthan, India',
          period: 'Aug 2017 - May 2018',
          achievements: [
            'Implemented a deep learning–based face recognition and verification system using FaceNet with Inception ResNet v1 and MTCNN for face alignment, achieving 99.2% accuracy on the LFW dataset with TensorFlow.',
            'Studied Computer Vision, Natural Language Processing, Machine Learning, Deep Learning, and Reinforcement Learning fundamentals from scratch.',
            'Contributed as assistant speaker with Prof. Jaskirat Singh in several Machine Learning workshops to raise awareness among college students and industry professionals.'
          ]
        }
      ]
    },
    {
      id: 'skills',
        title: 'SKILLS',
      subtitle: 'Capability Matrix',
      icon: '',
      color: 'cyber-secondary',
      content: {
        programming: ['Python (expert)', 'C++ (hands-on)', 'SQL (hands-on)', 'Java (hands-on)'],
        frameworks: ['PyTorch', 'PyTorch Lightning', 'Keras', 'HuggingFace Transformers', 'Lightning', 'MONAI', 'XGBoost', 'Scikit-Learn', 'auto-sklearn', 'Optuna', 'NumPy', 'Pandas', 'LiteLLM', 'Ollama', 'LangChain'],
        nlp: ['LLM Fine-tuning', 'Prompt Engineering', 'Retrieval-Augmented Generation (RAG)', 'Whisper', 'F5-TTS'],
        devops: ['Docker', 'Kubeflow', 'MLflow', 'Weights & Biases (W&B)', 'Google Cloud Platform (GCP)', 'FastAPI', 'Git', 'CI/CD', 'Workflow Orchestration (DAG Pipelines)', 'Experiment Tracking', 'Attrs', 'Pydantic'],
        computerVision: ['Segmentation', 'Object Detection', 'Lesion & Abnormality Detection', 'Cross-Attention & Fusion Methods', '3D-Slicer', 'DICOM', 'NIfTI', 'MRI', 'CT', 'X-Ray', 'DTI', 'DKI', 'FSL', 'MRICron'],
        research: ['Computer Vision', 'Natural Language Processing (NLP)', 'Reinforcement Learning', 'Agentic AI', 'AI Agents', 'LLMs', 'Vision-Language Models (VLMs)', 'Transfer Learning', 'Semi-Supervised Learning', 'Self-Supervised Learning', 'Visual Question Answering (VQA)', 'Multi-Modal Learning', 'Multi-Task & Multi-Label Classification', 'System Design', 'Design Patterns'],
        tools: ['Cursor', 'Warp', 'VSCode', 'Streamlit', 'Gradio', 'Jupyter Notebook'],
        languages: ['English (fluent)', 'Hindi (fluent)', 'Punjabi (native)']
      }
    },
    {
      id: 'projects',
      title: 'PUBLICATIONS',
      subtitle: 'Research Publications',
      icon: '',
      color: 'cyber-primary',
      content: [
        {
          year: '2025',
          title: 'MRI to PET Cross-Modality Translation using Globally & Locally Aware GAN (GLA-GAN) for Multi-Modal Diagnosis of Alzheimer\'s Disease',
          authors: 'Apoorva Sikka, Skand Peri, Jitender Singh, Usma Niyaz, Deepti R Bathula',
          journal: 'The Journal of Precision Medicine: Health and Disease',
          type: 'Publication'
        },
        {
          year: '2024',
          title: 'Data-Driven and Artificial Intelligence Approaches for System-Wide Prediction of the Drugable Proteome to Drug Discovery in Farm Animals',
          authors: 'AS Ben Geoffrey, Jitender Singh, Deepti Mittal, Gurjeet Kaur, Syed Azmal Ali',
          journal: 'Springer Nature Switzerland, Chapter, pp 155-172, 19',
          type: 'Publication'
        },
        {
          year: '2023',
          title: 'Simple Methods is All You Need for Medical VQA: An ImageCLEFs Med-VQA Task Methods Review',
          authors: 'Jitender Singh and Surender Singh',
          journal: 'ICAIDS 2022: GRENZE International Journal of Engineering and Technology, Volume 9, Issue 1, Pages: 2292-2299',
          type: 'Publication'
        },
        {
          year: '2023',
          title: 'Medical VQA: MixUp Helps Keeping it Simple',
          authors: 'Jitender Singh, Dwarikanath Mahapatra, and Deepti R. Bathula',
          journal: 'IVCNZ 2022: Image and Vision Computing, LNCS, Volume 13836, pp 402-414',
          type: 'Publication'
        },
        {
          year: '2022',
          title: 'Mom2B: a study of perinatal health via smartphone application and machine learning methods',
          authors: 'A. Bilal, D. Bathula, E. Bränn, E. Fransson, J. Singh, F. Papadopoulos, and A. Skalkidou',
          journal: 'European Psychiatry 65 (S1), S574-S575',
          type: 'Abstract'
        },
        {
          year: '2021',
          title: 'Automatic Image Alignment and Fusion in a Digital Photomontage',
          authors: 'Jitender Singh and Dr Surender Singh',
          journal: 'ITSS-IoE',
          type: 'Publication'
        },
        {
          year: '2021',
          title: 'Domain-Specific, Semi-Supervised Transfer Learning for Medical Imaging',
          authors: 'Jitender Singh and Deepti R. Bathula',
          journal: 'CODS-COMAD',
          type: 'Publication'
        },
        {
          year: '2020',
          title: 'Recent update on COVID-19 in India: Is locking down the country enough',
          authors: 'Jitender Singh, Syed Azmal Ali, and Gurjeet Kaur',
          journal: 'medRxiv',
          type: 'Publication'
        },
        {
          year: '2019',
          title: 'Garuda: A Deep Learning-Based Solution for Capturing Selfies Safely',
          authors: 'Jitender Singh and Abhinav Dhall',
          journal: 'ACM IUI',
          type: 'Publication'
        }
      ]
    },
    {
      id: 'education',
      title: 'EDUCATION',
      subtitle: 'Academic Records',
      icon: '',
      color: 'cyber-accent',
      content: [
        {
          degree: 'M.E. in CSE (Artificial Intelligence & Machine Learning Specialization)',
          institution: 'Chandigarh University',
          location: 'Ajitgarh, Punjab, India',
          period: 'Aug 2020 - Aug 2022',
          cgpa: '9.11 / 10.0',
          achievements: [
            'Gold medalist for outstanding academic achievement',
            'Dissertation: Medical Visual Question Answering and Generation',
            'Graduate semester project: Molecular Chemical Images to Text Translation'
          ]
        },
        {
          degree: 'Bachelor of Technology in Computer Science and Engineering',
          institution: 'JECRC University',
          location: 'Jaipur, Rajasthan, India',
          period: 'Jul 2013 - Jul 2017',
          cgpa: '7.24 / 10.0',
          achievements: [
            'Dissertation: Real-time Twitter Sentiment Analysis with Big Data and Hadoop Ecosystem',
            'Undergrad semester projects: Teacher Review System, Home Automation System'
          ]
        }
      ]
    }
  ]

  const renderContent = () => {
    const folder = folders.find(f => f.id === selectedFolder)
    if (!folder) return null

    switch (folder.id) {
      case 'personal':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h1 className="text-2xl sm:text-3xl lg:text-5xl font-cyber font-bold text-white mb-2 sm:mb-4">{folder.content.name}</h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-cyber-primary">{folder.content.title}</p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:gap-4">
              {Object.entries(folder.content).filter(([key]) => key !== 'name' && key !== 'title').map(([key, value]) => (
                <motion.div 
                  key={key} 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.05 }}
                  className="p-3 sm:p-4 backdrop-blur-sm relative overflow-hidden transition-all border rounded-lg"
                  style={{
                    backgroundColor: folder.color === 'cyber-primary' ? 'rgba(0, 255, 65, 0.1)' : 
                                    folder.color === 'cyber-accent' ? 'rgba(0, 212, 255, 0.1)' : 'rgba(255, 0, 128, 0.1)',
                    borderColor: folder.color === 'cyber-primary' ? 'rgba(0, 255, 65, 0.3)' : 
                                folder.color === 'cyber-accent' ? 'rgba(0, 212, 255, 0.3)' : 'rgba(255, 0, 128, 0.3)'
                  }}
                >
                  <p 
                    className="text-md uppercase mb-1 sm:mb-2 font-semibold text-center"
                    style={{
                      color: folder.color === 'cyber-primary' ? '#00ff41' : 
                            folder.color === 'cyber-accent' ? '#00d4ff' : '#ff0080'
                    }}
                  >
                    {key}
                  </p>
                  <p className={`text-white text-sm sm:text-base lg:text-lg break-words text-center`}>{value as string}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )
      
      case 'experience':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 sm:space-y-8 lg:space-y-12 relative"
          >
            {/* Timeline line */}
            <div 
              className="absolute left-4 sm:left-6 lg:left-8 top-0 bottom-0 w-0.5 opacity-60"
              style={{
                background: `linear-gradient(to bottom, ${folder.color === 'cyber-primary' ? '#00ff41' : 
                            folder.color === 'cyber-accent' ? '#00d4ff' : '#ff0080'}, ${folder.color === 'cyber-primary' ? '#00ff41' : 
                            folder.color === 'cyber-accent' ? '#00d4ff' : '#ff0080'})`
              }}
            ></div>
            
            {folder.content.map((exp: any, index: number) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, x: -60, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 120,
                  damping: 20
                }}
                className="relative pl-10 sm:pl-16 lg:pl-20 pb-6 sm:pb-8 lg:pb-12 group"
              >
                {/* Timeline node */}
                <motion.div 
                  className="absolute left-2 sm:left-4 lg:left-6 top-4 sm:top-6 w-4 h-4 sm:w-5 sm:h-5 border-2 sm:border-4 group-hover:scale-125 transition-all duration-300"
                  style={{
                    borderColor: folder.color === 'cyber-primary' ? '#00ff41' : 
                                folder.color === 'cyber-accent' ? '#00d4ff' : '#ff0080',
                    backgroundColor: 'rgb(16, 16, 16)'
                  }}
                  whileHover={{ 
                    scale: 1.3, 
                    boxShadow: `0 0 20px ${folder.color === 'cyber-primary' ? '#00ff41' : 
                                           folder.color === 'cyber-accent' ? '#00d4ff' : '#ff0080'}`
                  }}
                >
                  <div 
                    className="absolute inset-1 opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300"
                    style={{
                      backgroundColor: folder.color === 'cyber-primary' ? '#00ff41' : 
                                      folder.color === 'cyber-accent' ? '#00d4ff' : '#ff0080'
                    }}
                  ></div>
                </motion.div>
                
                {/* Content card */}
                <motion.div 
                  className="bg-gradient-to-br from-cyber-gray/30 to-cyber-gray/10 p-4 sm:p-6 lg:p-8 border border-cyber-accent/30 hover:border-cyber-accent/60 transition-all duration-300 backdrop-blur-sm relative overflow-hidden group rounded-lg"
                  whileHover={{ 
                    scale: 1.01,
                    boxShadow: "0 20px 40px rgba(0, 212, 255, 0.1)"
                  }}
                >
                  {/* Background glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyber-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 sm:mb-6 relative z-10 space-y-2 sm:space-y-0">
                    <div className="flex-1 min-w-0">
                      <motion.h3 
                        className="text-lg sm:text-xl lg:text-3xl font-cyber font-bold text-white mb-1 sm:mb-2 group-hover:text-cyber-accent transition-colors duration-300 leading-tight"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.15 + 0.1 }}
                      >
                        {exp.role}
                      </motion.h3>
                      <motion.p 
                        className="text-sm sm:text-base lg:text-xl text-cyber-accent font-semibold"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.15 + 0.15 }}
                      >
                        {exp.company}
                      </motion.p>
                      {exp.location && (
                        <p className="text-xs sm:text-sm text-gray-400">{exp.location}</p>
                      )}
                    </div>
                    <motion.span 
                      className="text-xs sm:text-sm lg:text-lg text-gray-300 bg-cyber-dark/50 px-2 sm:px-3 lg:px-4 py-1 sm:py-2 rounded-lg border border-cyber-primary/30 font-mono whitespace-nowrap"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.15 + 0.2 }}
                    >
                      {exp.period}
                    </motion.span>
                  </div>
                  
                  {/* Achievements grid */}
                  <div className="grid grid-cols-1 gap-3 sm:gap-4 relative z-10">
                    {exp.achievements.map((achievement: string, idx: number) => (
                      <motion.div 
                        key={idx} 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (index * 0.15) + (idx * 0.05) + 0.25 }}
                        className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-cyber-gray/20 hover:bg-cyber-primary/10 transition-all duration-300 border border-transparent hover:border-cyber-primary/30 rounded-lg group/item"
                        whileHover={{ x: 5 }}
                      >
                        <span 
                          className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                          style={{
                            backgroundColor: folder.color === 'cyber-primary' ? '#00ff41' : 
                                            folder.color === 'cyber-accent' ? '#00d4ff' : '#ff0080'
                          }}
                        ></span>
                        <span className="text-gray-300 group-hover/item:text-white transition-colors duration-300 leading-relaxed text-sm sm:text-base">{achievement}</span>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-16 h-16 border border-cyber-accent/20 opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 w-8 h-8 border border-cyber-primary/20 rotate-45 opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )
      
      case 'skills':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 sm:space-y-8 lg:space-y-12"
          >
            {Object.entries(folder.content).map(([category, skills], index) => {
              const categoryColors = {
                frontend: folder.color,
                backend: folder.color, 
                database: folder.color,
                devops: folder.color,
                tools: folder.color
              };
              const categoryColor = categoryColors[category as keyof typeof categoryColors] || folder.color;
              
              const getColorValue = (colorName: string) => {
                switch (colorName) {
                  case 'cyber-primary': return { main: '#00ff41', bg: 'rgba(0, 255, 65, 0.1)', border: 'rgba(0, 255, 65, 0.3)' }
                  case 'cyber-accent': return { main: '#00d4ff', bg: 'rgba(0, 212, 255, 0.1)', border: 'rgba(0, 212, 255, 0.3)' }
                  case 'cyber-secondary': return { main: '#ff0080', bg: 'rgba(255, 0, 128, 0.1)', border: 'rgba(255, 0, 128, 0.3)' }
                  default: return { main: '#00ff41', bg: 'rgba(0, 255, 65, 0.1)', border: 'rgba(0, 255, 65, 0.3)' }
                }
              };
              const colors = getColorValue(categoryColor);
              
              return (
                <motion.div 
                  key={category}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 150,
                    damping: 20
                  }}
                  className="relative"
                >
                  {/* Category header with icon */}
                  <motion.div 
                    className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6 lg:mb-8"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.05 }}
                  >
                    <div 
                      className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 border-2 flex items-center justify-center rounded-md"
                      style={{
                        backgroundColor: colors.bg,
                        borderColor: colors.border
                      }}
                    >
                      <div 
                        className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
                        style={{ backgroundColor: colors.main }}
                      ></div>
                    </div>
                    <h3 
                      className="text-base sm:text-lg lg:text-2xl font-cyber uppercase tracking-wider font-bold"
                      style={{ color: colors.main }}
                    >
                      {category}
                    </h3>
                    <div 
                      className="flex-1 h-px"
                      style={{
                        background: `linear-gradient(to right, ${colors.border}, transparent)`
                      }}
                    ></div>
                  </motion.div>
                  
                  {/* Skills grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {(skills as string[]).map((skill, skillIndex) => {
                      return (
                        <motion.div 
                          key={skillIndex} 
                          initial={{ opacity: 0, x: -25, scale: 0.95 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          transition={{ 
                            delay: (index * 0.1) + (skillIndex * 0.03) + 0.15,
                            type: "spring",
                            stiffness: 150
                          }}
                          className="group cursor-pointer"
                          whileHover={{ scale: 1.02 }}
                        >
                          <div 
                            className="bg-cyber-gray/20 hover:bg-cyber-gray/30 p-3 sm:p-4 border transition-all duration-300 backdrop-blur-sm relative overflow-hidden flex flex-col justify-center items-center text-center min-h-[60px] sm:min-h-[70px] lg:min-h-[80px] rounded-lg"
                            style={{
                              backgroundColor: colors.bg,
                              borderColor: colors.border
                            }}
                          >
                            {/* Background glow */}
                            <div 
                              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                              style={{
                                background: `linear-gradient(to right, ${colors.bg}, transparent)`
                              }}
                            ></div>
                            
                            {/* Skill name only */}
                            <div className="flex flex-col items-center space-y-1 sm:space-y-2 relative z-10">
                              <motion.div 
                                className="w-2 h-2 sm:w-3 sm:h-3 group-hover:shadow-lg"
                                style={{
                                  backgroundColor: colors.main,
                                  boxShadow: `0 0 0px ${colors.main}`
                                }}
                                whileHover={{ scale: 1.2 }}
                                animate={{ 
                                  boxShadow: [`0 0 0px ${colors.main}`, `0 0 15px ${colors.main}`, `0 0 0px ${colors.main}`]
                                }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              />
                              <span className="font-medium text-white group-hover:transition-colors duration-300 text-xs sm:text-sm leading-tight text-center">
                                {skill}
                              </span>
                            </div>
                            
                            {/* Decorative corner elements */}
                            <div 
                              className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 group-hover:transition-all duration-300"
                              style={{
                                borderColor: `${colors.border}60`
                              }}
                            ></div>
                            <div 
                              className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 group-hover:transition-all duration-300"
                              style={{
                                borderColor: `${colors.border}60`
                              }}
                            ></div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        )
      
      case 'projects':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 sm:space-y-6"
          >
            {folder.content.map((publication: any, index: number) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 120
                }}
                className="group cursor-pointer"
                whileHover={{ scale: 1.01 }}
              >
                <div className="bg-cyber-gray/10 hover:bg-cyber-gray/20 p-4 sm:p-6 border transition-all duration-300 backdrop-blur-sm relative overflow-hidden rounded-lg"
                     style={{
                       backgroundColor: folder.color === 'cyber-primary' ? 'rgba(0, 255, 65, 0.1)' : 
                                       folder.color === 'cyber-accent' ? 'rgba(0, 212, 255, 0.1)' : 'rgba(255, 0, 128, 0.1)',
                       borderColor: folder.color === 'cyber-primary' ? 'rgba(0, 255, 65, 0.3)' : 
                                   folder.color === 'cyber-accent' ? 'rgba(0, 212, 255, 0.3)' : 'rgba(255, 0, 128, 0.3)'
                     }}
                >
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 space-y-3 sm:space-y-0">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-cyber font-bold text-white mb-2 group-hover:transition-colors duration-300 leading-tight">
                        {publication.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-400 mb-1">
                        <span className="font-semibold">Authors:</span> {publication.authors}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-400">
                        <span className="font-semibold">Journal:</span> {publication.journal}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 sm:ml-4">
                      <span className="text-gray-300 text-xs sm:text-sm font-mono bg-cyber-dark/30 px-2 sm:px-3 py-1 rounded border border-cyber-accent/30 whitespace-nowrap">
                        {publication.year}
                      </span>
                      <div 
                        className="text-xs sm:text-sm font-bold font-cyber px-2 sm:px-3 py-1 border whitespace-nowrap"
                        style={{
                          color: folder.color === 'cyber-primary' ? '#00ff41' : 
                                folder.color === 'cyber-accent' ? '#00d4ff' : '#ff0080',
                          backgroundColor: folder.color === 'cyber-primary' ? 'rgba(0, 255, 65, 0.1)' : 
                                          folder.color === 'cyber-accent' ? 'rgba(0, 212, 255, 0.1)' : 'rgba(255, 0, 128, 0.1)',
                          borderColor: folder.color === 'cyber-primary' ? 'rgba(0, 255, 65, 0.4)' : 
                                      folder.color === 'cyber-accent' ? 'rgba(0, 212, 255, 0.4)' : 'rgba(255, 0, 128, 0.4)'
                        }}
                      >
                        {publication.type}
                      </div>
                    </div>
                    </div>
                    
                  {/* Decorative corner elements */}
                    <div 
                    className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 group-hover:transition-all duration-300"
                      style={{
                      borderColor: `${folder.color === 'cyber-primary' ? 'rgba(0, 255, 65, 0.6)' : 
                                   folder.color === 'cyber-accent' ? 'rgba(0, 212, 255, 0.6)' : 'rgba(255, 0, 128, 0.6)'}60`
                      }}
                    ></div>
                    <div 
                    className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 group-hover:transition-all duration-300"
                      style={{
                      borderColor: `${folder.color === 'cyber-primary' ? 'rgba(0, 255, 65, 0.6)' : 
                                   folder.color === 'cyber-accent' ? 'rgba(0, 212, 255, 0.6)' : 'rgba(255, 0, 128, 0.6)'}60`
                      }}
                    ></div>
                  </div>
                </motion.div>
              ))}
          </motion.div>
        )
      
      case 'education':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 sm:space-y-8 lg:space-y-12"
          >
            {/* Main Degree Section */}
            <motion.div 
              initial={{ opacity: 0, x: -100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.2
              }}
              className="relative group"
            >
              <div 
                className="p-4 sm:p-6 lg:p-10 border transition-all duration-500 backdrop-blur-sm relative overflow-hidden rounded-lg"
                style={{
                  backgroundColor: folder.color === 'cyber-primary' ? 'rgba(0, 255, 65, 0.08)' : 
                                  folder.color === 'cyber-accent' ? 'rgba(0, 212, 255, 0.08)' : 'rgba(255, 0, 128, 0.08)',
                  borderColor: folder.color === 'cyber-primary' ? 'rgba(0, 255, 65, 0.4)' : 
                              folder.color === 'cyber-accent' ? 'rgba(0, 212, 255, 0.4)' : 'rgba(255, 0, 128, 0.4)'
                }}
              >
                {/* Background effects */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(to right, ${folder.color === 'cyber-primary' ? 'rgba(0, 255, 65, 0.1)' : 
                                folder.color === 'cyber-accent' ? 'rgba(0, 212, 255, 0.1)' : 'rgba(255, 0, 128, 0.1)'}, transparent)`
                  }}
                ></div>
                <motion.div 
                  className="absolute top-0 left-0 w-full h-2"
                  style={{
                    background: folder.color === 'cyber-primary' ? '#00ff41' : 
                               folder.color === 'cyber-accent' ? '#00d4ff' : '#ff0080'
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                />
                
                {/* Degree content */}
                <div className="relative z-10 space-y-4 sm:space-y-6 lg:space-y-8">
                  {folder.content.map((education: any, index: number) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + (index * 0.2) }}
                      className="group cursor-pointer"
                    >
                      <div className="bg-cyber-gray/10 hover:bg-cyber-gray/20 p-4 sm:p-6 border transition-all duration-300 backdrop-blur-sm relative overflow-hidden rounded-lg"
                           style={{
                             backgroundColor: folder.color === 'cyber-primary' ? 'rgba(0, 255, 65, 0.1)' : 
                                             folder.color === 'cyber-accent' ? 'rgba(0, 212, 255, 0.1)' : 'rgba(255, 0, 128, 0.1)',
                             borderColor: folder.color === 'cyber-primary' ? 'rgba(0, 255, 65, 0.3)' : 
                                         folder.color === 'cyber-accent' ? 'rgba(0, 212, 255, 0.3)' : 'rgba(255, 0, 128, 0.3)'
                           }}
                      >
                        {/* Header */}
                        <div className="mb-4 sm:mb-6">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 space-y-3 sm:space-y-0">
                            <div className="flex items-start space-x-3 sm:space-x-4 flex-1">
                              <div 
                                className="w-10 h-10 sm:w-12 sm:h-12 border-2 rounded-lg flex items-center justify-center flex-shrink-0"
                                style={{
                                  backgroundColor: folder.color === 'cyber-primary' ? 'rgba(0, 255, 65, 0.3)' : 
                                                  folder.color === 'cyber-accent' ? 'rgba(0, 212, 255, 0.3)' : 'rgba(255, 0, 128, 0.3)',
                                  borderColor: folder.color === 'cyber-primary' ? 'rgba(0, 255, 65, 0.6)' : 
                                              folder.color === 'cyber-accent' ? 'rgba(0, 212, 255, 0.6)' : 'rgba(255, 0, 128, 0.6)'
                                }}
                              >
                                <div 
                                  className="w-5 h-5 sm:w-6 sm:h-6"
                                  style={{
                                    backgroundColor: folder.color === 'cyber-primary' ? '#00ff41' : 
                                                    folder.color === 'cyber-accent' ? '#00d4ff' : '#ff0080'
                                  }}
                                ></div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-base sm:text-lg lg:text-xl font-cyber font-bold text-white mb-2 group-hover:transition-colors duration-300 leading-tight">
                                  {education.degree}
                                </h3>
                                <p 
                                  className="text-sm sm:text-base lg:text-lg font-semibold mb-1"
                                  style={{
                                    color: folder.color === 'cyber-primary' ? '#00ff41' : 
                                          folder.color === 'cyber-accent' ? '#00d4ff' : '#ff0080'
                                  }}
                                >
                                  {education.institution}
                                </p>
                                <p className="text-gray-400 text-xs sm:text-sm">{education.location}</p>
                              </div>
                            </div>
                            <div className="flex flex-col sm:items-end space-y-2 sm:ml-4">
                              <span className="text-gray-300 text-xs sm:text-sm font-mono bg-cyber-dark/30 px-2 sm:px-3 py-1 rounded border border-cyber-accent/30 whitespace-nowrap">
                                {education.period}
                              </span>
                              <div 
                                className="text-sm sm:text-base lg:text-lg font-bold font-cyber px-3 sm:px-4 py-1 sm:py-2 border whitespace-nowrap"
                                style={{
                                  color: folder.color === 'cyber-primary' ? '#00ff41' : 
                                        folder.color === 'cyber-accent' ? '#00d4ff' : '#ff0080',
                                  backgroundColor: folder.color === 'cyber-primary' ? 'rgba(0, 255, 65, 0.1)' : 
                                                  folder.color === 'cyber-accent' ? 'rgba(0, 212, 255, 0.1)' : 'rgba(255, 0, 128, 0.1)',
                                  borderColor: folder.color === 'cyber-primary' ? 'rgba(0, 255, 65, 0.4)' : 
                                              folder.color === 'cyber-accent' ? 'rgba(0, 212, 255, 0.4)' : 'rgba(255, 0, 128, 0.4)'
                                }}
                              >
                                CGPA: {education.cgpa}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Achievements */}
                        {education.achievements && education.achievements.length > 0 && (
                          <div className="mt-4 sm:mt-6">
                            <h4 className="text-xs sm:text-sm font-semibold text-gray-300 mb-2 sm:mb-3 uppercase tracking-wider">
                              Key Achievements & Projects
                            </h4>
                            <ul className="space-y-2 sm:space-y-3">
                              {education.achievements.map((achievement: string, achievementIndex: number) => (
                                <li key={achievementIndex} className="flex items-start space-x-2 sm:space-x-3 text-gray-300">
                                  <span 
                                    className="w-2 h-2 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"
                                    style={{
                                      backgroundColor: folder.color === 'cyber-primary' ? '#00ff41' : 
                                                      folder.color === 'cyber-accent' ? '#00d4ff' : '#ff0080'
                                    }}
                                  ></span>
                                  <span className="text-xs sm:text-sm leading-relaxed">{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {/* Decorative corner elements */}
                        <div 
                          className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 group-hover:transition-all duration-300"
                          style={{
                            borderColor: `${folder.color === 'cyber-primary' ? 'rgba(0, 255, 65, 0.6)' : 
                                         folder.color === 'cyber-accent' ? 'rgba(0, 212, 255, 0.6)' : 'rgba(255, 0, 128, 0.6)'}60`
                          }}
                        ></div>
                        <div 
                          className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 group-hover:transition-all duration-300"
                          style={{
                            borderColor: `${folder.color === 'cyber-primary' ? 'rgba(0, 255, 65, 0.6)' : 
                                         folder.color === 'cyber-accent' ? 'rgba(0, 212, 255, 0.6)' : 'rgba(255, 0, 128, 0.6)'}60`
                          }}
                        ></div>
                    </div>
                  </motion.div>
                ))}
              </div>
                
                {/* Decorative elements */}
                <div className="absolute bottom-4 right-4 w-20 h-20 border border-cyber-accent/20 opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-300"></div>
                <div className="absolute top-6 right-6 w-8 h-8 border border-cyber-primary/20 rotate-45 opacity-20 group-hover:opacity-40 group-hover:rotate-90 transition-all duration-300"></div>
            </div>
            </motion.div>
            
          </motion.div>
        )
      
      default:
        return null
    }
  }

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-cyber-darker via-black to-cyber-dark relative overflow-hidden">
      {/* Audio Prompt Overlay */}
      {showAudioPrompt && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center cursor-pointer"
          onClick={handleAudioPromptClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="text-center p-8 border border-cyber-primary/30 bg-cyber-dark/90 rounded-lg backdrop-blur-md max-w-md mx-4"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-3xl mb-2 text-cyber-primary font-bold">
              WELCOME
            </div>
            <div className="text-lg mb-4 text-gray-200">
              to Jitender Singh's
            </div>
            <div className="text-2xl mb-6 text-cyber-primary glitch-text font-bold">
              Portfolio
            </div>
            <div className="text-sm mb-6 text-gray-300">
              Experience an immersive journey through my professional matrix<br />
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm text-cyber-primary bg-cyber-dark/50 px-4 py-2 rounded border border-cyber-primary/20">
              <span>CLICK TO CONTINUE</span>
              <div className="w-2 h-2 rounded-full bg-cyber-primary animate-pulse ml-2"></div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.02)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
      
      {/* Mobile Layout */}
      <div className="lg:hidden relative z-50">
        <div className="min-h-screen relative z-50">
          {/* Mobile Header */}
          <motion.div 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6 pt-6 px-4"
          >
            <h1 className="text-2xl sm:text-3xl font-cyber font-bold text-cyber-primary mb-2">NEURAL COMMAND</h1>
            <p className="text-gray-400 text-sm">Tap folders to access data</p>
            <p className="text-red-400 text-xs mt-2">DEBUG: Selected = {selectedFolder || 'none'}</p>
          </motion.div>

          {/* Mobile Folder Grid */}
          <div className="space-y-3 pb-8 px-4">
            {folders.map((folder, index) => {
              const getColor = (colorName: string) => {
                switch (colorName) {
                  case 'cyber-primary': return '#00ff41'
                  case 'cyber-accent': return '#00d4ff'
                  case 'cyber-secondary': return '#ff0080'
                  default: return '#00ff41'
                }
              }
              
              return (
                <motion.div
                  key={folder.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative z-50"
                >
                  <div
                    onClick={(e) => {
                      console.log('=== CLICK DEBUG ===');
                      console.log('Clicked folder:', folder.id);
                      console.log('Current selectedFolder:', selectedFolder);
                      console.log('Are they equal?', selectedFolder === folder.id);
                      
                      e.preventDefault();
                      e.stopPropagation();
                      
                      const newSelected = selectedFolder === folder.id ? null : folder.id;
                      console.log('New selectedFolder will be:', newSelected);
                      
                      // Play cyberpunk sound effect
                      if (newSelected) {
                        playSound('open'); // Opening a folder
                      } else {
                        playSound('close'); // Closing a folder
                      }
                      
                      setSelectedFolder(newSelected);
                      
                      // Check state after a brief delay
                      setTimeout(() => {
                        console.log('State after update:', selectedFolder);
                      }, 100);
                    }}
                    className="p-4 sm:p-5 bg-gradient-to-r from-cyber-gray/30 to-cyber-gray/10 border transition-all duration-300 cursor-pointer touch-manipulation rounded-lg"
                    style={{
                      borderColor: getColor(folder.color) + (selectedFolder === folder.id ? '80' : '50'),
                      backgroundColor: selectedFolder === folder.id ? getColor(folder.color) + '15' : 'transparent',
                      boxShadow: selectedFolder === folder.id 
                        ? `0 0 20px ${getColor(folder.color)}40` 
                        : 'none'
                    }}
                  >
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div 
                        className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-lg sm:text-xl border-2 rounded-md flex-shrink-0"
                        style={{
                          borderColor: getColor(folder.color),
                          backgroundColor: getColor(folder.color) + '20'
                        }}
                      >
                        {folder.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 
                          className="text-base sm:text-lg font-cyber font-bold mb-1 truncate"
                          style={{ color: getColor(folder.color) }}
                        >
                          {folder.title}
                        </h3>
                        <p className="text-gray-400 text-xs sm:text-sm truncate">{folder.subtitle}</p>
                      </div>
                      <div 
                        className={`w-5 h-5 sm:w-6 sm:h-6 border-2 transition-transform duration-300 flex-shrink-0 ${
                          selectedFolder === folder.id ? 'rotate-45' : ''
                        }`}
                        style={{ borderColor: getColor(folder.color) }}
                      >
                        {selectedFolder === folder.id ? (
                          <div className="w-full h-full flex items-center justify-center text-xs" style={{ color: getColor(folder.color) }}>
                            ✕
                          </div>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs" style={{ color: getColor(folder.color) }}>
                            ▶
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Mobile Content Panel */}
                  <AnimatePresence>
                    {selectedFolder === folder.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 sm:p-6 bg-cyber-dark/50 border-x border-b rounded-b-lg" style={{ borderColor: getColor(folder.color) + '30' }}>
                          <div className="max-h-96 overflow-y-auto">
                            {renderContent()}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
      
      {/* Desktop Layout - Two Panel Design */}
      <div className="hidden lg:flex h-screen">
        {/* Left Panel - Folder Cards */}
        <div className="w-1/2 h-full relative overflow-hidden">
          {/* Header - Fixed on Left */}
          <div className="absolute top-0 left-0 right-0 z-50 p-8">
            <motion.div 
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-left mb-8"
            >
              {/* <h1 className="text-4xl font-cyber font-bold text-cyber-primary mb-2">
                JITENDER SINGH PORTFOLIO
              </h1> */}
              <p className="text-gray-400">
                {isInitializing 
                  ? `Neural scan in progress... ${currentCycleIndex >= 0 ? `[${currentCycleIndex + 1}/${folderOrder.length}]` : '[Initiating...]'}`
                  : selectedFolder 
                    ? 'Data matrix active' 
                    : 'Click folders to access data matrix'
                }
              </p>
              
              {/* Audio Status Indicator */}
          <div className="flex items-center justify-center mt-2 space-x-2 text-xs">
            <div className="w-2 h-2 rounded-full bg-cyber-primary animate-pulse"></div>
            <span className="font-mono text-cyber-primary">
              AUDIO: SYSTEM ACTIVE
            </span>
          </div>
            </motion.div>
          </div>

          {/* Stacked Cards Container - Drawer Style */}
          <div className="absolute inset-0 flex items-center justify-start pl-16">
            <div className="relative" style={{ perspective: '1200px' }}>
              {folderOrder.map((folderId, index) => {
                const folder = folders.find(f => f.id === folderId)!
                const originalIndex = folders.findIndex(f => f.id === folderId)
                const getColor = (colorName: string) => {
                  switch (colorName) {
                    case 'cyber-primary': return '#00ff41'
                    case 'cyber-accent': return '#00d4ff'
                    case 'cyber-secondary': return '#ff0080'
                    default: return '#00ff41'
                  }
                }
                
                const folderColor = getColor(folder.color)
                const isSelected = selectedFolder === folder.id
                const isHovered = hoveredFolder === folder.id
                const isCycleActive = isInitializing && currentCycleIndex === index
                
                // Drawer-style positioning: last card on top, first at back
                const stackOrder = folderOrder.length - index - 1 // Reverse order for proper stacking
                const zIndex = index + 1 // Last card has highest z-index
                
                // Vertical positioning for drawer effect
                const baseY = -120 // Start position
                const spacing = 60 // Space between visible headers
                const yPosition = baseY + (stackOrder * spacing)
                
                // Selected card pulls out from the stack
                let pullOut = isSelected ? 100 : isHovered ? 30 : 0
                
                // During initialization cycle, pull out the currently highlighted card
                if (isCycleActive) {
                  pullOut = 150 // Pull out even further during cycle for more dramatic effect
                }
                
                const xPosition = pullOut
                
                // Rotation for 3D effect
                const rotateX = isSelected || isCycleActive ? 0 : -5
                const rotateY = isSelected || isCycleActive ? 0 : 5
                const rotateZ = 10 // Consistent tilt for all cards
                
                return (
                  <motion.div
                    key={folder.id}
                    className={`absolute cursor-pointer ${isCycleActive ? 'animate-pulse' : ''}`}
                    style={{
                      zIndex,
                      transformOrigin: 'center bottom'
                    }}
                    initial={{ 
                      opacity: 0,
                      y: yPosition + 50,
                      x: -50,
                      rotateX: -20,
                      rotateY: 15,
                      rotateZ: rotateZ
                    }}
                    animate={{ 
                      opacity: 1,
                      y: yPosition,
                      x: xPosition,
                      rotateX,
                      rotateY,
                      rotateZ,
                      scale: isSelected || isCycleActive ? 1.05 : 1
                    }}
                    transition={{
                      type: "spring",
                      stiffness: isCycleActive ? 600 : 200, // Much higher stiffness during cycling
                      damping: isCycleActive ? 35 : 20, // Higher damping for snappier movement
                      delay: isInitializing ? 0 : (folderOrder.length - index - 1) * 0.05 // No delay during cycling
                    }}
                    whileHover={{
                      x: isSelected ? 100 : 40,
                      scale: isSelected ? 1.05 : 1.02,
                      rotateY: isSelected ? 0 : 8
                    }}
                    onClick={() => {
                      // Don't allow interaction during initialization
                      if (isInitializing) return
                      
                      const newSelected = selectedFolder === folder.id ? null : folder.id;
                      
                      // Play cyberpunk sound effect
                      if (newSelected) {
                        playSound('open'); // Opening a folder
                      } else {
                        playSound('close'); // Closing a folder
                      }
                      
                      // Move clicked folder to top of stack (end of array for highest z-index)
                      const newOrder = [...folderOrder.filter(id => id !== folder.id), folder.id]
                      setFolderOrder(newOrder)
                      
                      // Handle folder selection
                      setSelectedFolder(newSelected)
                    }}
                    onHoverStart={() => {
                      setHoveredFolder(folder.id)
                      playSound('hover') // Play subtle hover sound
                    }}
                    onHoverEnd={() => setHoveredFolder(null)}
                  >
                    {/* Folder Card */}
                    <div 
                      className="w-96 h-56 border-2 relative overflow-hidden backdrop-blur-sm shadow-2xl"
                      style={{
                        backgroundColor: isSelected || isCycleActive ? `${folderColor}15` : '#1a1a1a',
                        borderColor: isSelected || isCycleActive ? folderColor : `${folderColor}80`,
                        boxShadow: isSelected || isCycleActive
                          ? `0 0 40px ${folderColor}50, inset 0 0 20px ${folderColor}10` 
                          : `0 10px 30px rgba(0,0,0,0.5), 0 0 15px ${folderColor}30`
                      }}
                    >
                      {/* Background gradient */}
                      <div 
                        className="absolute inset-0 opacity-5"
                        style={{
                          background: `linear-gradient(135deg, ${folderColor}, transparent 70%)`
                        }}
                      />
                      
                      {/* Content Area - Main card content */}
                      {(isSelected || isHovered || isCycleActive) && (
                        <motion.div 
                          className="absolute top-4 left-0 right-0 bottom-20 p-4"
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: isCycleActive ? 0.05 : 0.05 }} // Faster content reveal during cycling
                        >
                          <div className="text-gray-300 text-sm space-y-2">
                            <div className="flex items-center space-x-2">
                              <div 
                                className="w-1 h-4"
                                style={{ backgroundColor: folderColor }}
                              />
                              <span>Access Level: {isSelected || isCycleActive ? 'Administrator' : 'Preview'}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div 
                                className="w-1 h-4"
                                style={{ backgroundColor: folderColor }}
                              />
                              <span>Data Matrix: {Object.keys(folder.content).length} entries</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div 
                                className="w-1 h-4"
                                style={{ backgroundColor: folderColor }}
                              />
                              <span>Status: {isSelected || isCycleActive ? 'Active Session' : 'Standby'}</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                      
                      {/* Header Section - At bottom without tab box */}
                      <div className="absolute bottom-0 left-0 right-0 h-16 p-4 flex items-center space-x-4 z-5">
                        <div className="flex-1">
                          <motion.h3 
                            className="text-lg font-cyber font-bold leading-tight"
                            style={{ color: folderColor }}
                          >
                            {folder.title}
                          </motion.h3>
                          <motion.p 
                            className="text-gray-400 text-xs"
                          >
                            {folder.subtitle}
                          </motion.p>
                        </div>
                        
                        {/* Status indicator */}
                        <div className="flex items-center space-x-2">
                          <div 
                            className="w-2 h-2 rounded-full animate-pulse"
                            style={{ backgroundColor: folderColor }}
                          />
                          <span className="text-xs text-gray-500 font-mono">
                            {isSelected || isCycleActive ? 'OPEN' : 'READY'}
                          </span>
                        </div>
                      </div>
                      
                      {/* Holographic scan lines */}
                      {(isSelected || isHovered || isCycleActive) && (
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                          {Array.from({ length: 8 }).map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-full h-px opacity-40"
                              style={{
                                backgroundColor: folderColor,
                                top: `${18 + (i * 28)}px` // Fine-tuned: 3px higher for perfect text spacing
                              }}
                              initial={{ scaleX: 0, x: '-100%' }}
                              animate={{ scaleX: 1, x: '0%' }}
                              transition={{ 
                                delay: isCycleActive ? i * 0.01 : i * 0.04, // Much faster scan lines during cycling
                                duration: isCycleActive ? 0.1 : 0.3 // Ultra-fast scan line animation
                              }}
                            />
                          ))}
                        </div>
                      )}
                      
                      {/* Corner accents */}
                      <div 
                        className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 opacity-60"
                        style={{ borderColor: folderColor }}
                      />
                      <div 
                        className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 opacity-60"
                        style={{ borderColor: folderColor }}
                      />
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right Side - Floating Transparent Information Card */}
        <div className="w-2/3 h-full relative overflow-hidden">
          <AnimatePresence>
            {selectedFolder && (
              <motion.div
                key={selectedFolder}
                initial={{ 
                  opacity: 0, 
                  scale: 0.95,
                  y: 20
                }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  y: 0
                }}
                transition={{ 
                  duration: 0.08,
                  type: "spring",
                  stiffness: 500,
                  damping: 30
                }}
                className="absolute inset-8 backdrop-blur-xl overflow-hidden"
               
              >
                {/* Simple Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
                </div>
                
                <div className="h-full flex flex-col relative z-10">
                  
                  {/* Floating Card Content */}
                  <motion.div
                    ref={scrollContainerRef}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.03, duration: 0.08 }}
                    className="flex-1 overflow-y-auto dynamic-scrollbar p-8 relative"
                    style={{
                      scrollbarWidth: 'thin',
                      scrollbarColor: `${folders.find(f => f.id === selectedFolder)?.color === 'cyber-primary' ? '#00ff41' : 
                                        folders.find(f => f.id === selectedFolder)?.color === 'cyber-accent' ? '#00d4ff' : '#ff0080'} rgba(16, 16, 16, 0.5)`
                    }}
                    onWheel={stopAutoScroll}
                    onMouseDown={stopAutoScroll}
                    onTouchStart={stopAutoScroll}
                    onKeyDown={stopAutoScroll}
                  >
                    {/* Auto-scroll indicator */}
                    {isAutoScrolling && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-2 right-2 z-50 bg-cyber-dark/80 backdrop-blur-sm px-3 py-1 rounded-full border"
                        style={{
                          borderColor: folders.find(f => f.id === selectedFolder)?.color === 'cyber-primary' ? 'rgba(0, 255, 65, 0.3)' : 
                                      folders.find(f => f.id === selectedFolder)?.color === 'cyber-accent' ? 'rgba(0, 212, 255, 0.3)' : 'rgba(255, 0, 128, 0.3)'
                        }}
                      >
                        <div className="flex items-center space-x-2">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="w-3 h-3 border-2 border-t-transparent rounded-full"
                            style={{
                              borderColor: folders.find(f => f.id === selectedFolder)?.color === 'cyber-primary' ? '#00ff41' : 
                                          folders.find(f => f.id === selectedFolder)?.color === 'cyber-accent' ? '#00d4ff' : '#ff0080',
                              borderTopColor: 'transparent'
                            }}
                          />
                          <span 
                            className="text-xs font-mono"
                            style={{
                              color: folders.find(f => f.id === selectedFolder)?.color === 'cyber-primary' ? '#00ff41' : 
                                    folders.find(f => f.id === selectedFolder)?.color === 'cyber-accent' ? '#00d4ff' : '#ff0080'
                            }}
                          >
                            AUTO-SCROLL
                          </span>
                        </div>
                      </motion.div>
                    )}
                    
                    {renderContent()}
                  </motion.div>
                </div>
                
                {/* Corner Accents */}
                <div 
                  className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 opacity-60"
                  style={{
                    borderColor: folders.find(f => f.id === selectedFolder)?.color === 'cyber-primary' ? '#00ff41' : 
                                folders.find(f => f.id === selectedFolder)?.color === 'cyber-accent' ? '#00d4ff' : '#ff0080'
                  }}
                ></div>
                <div 
                  className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 opacity-60"
                  style={{
                    borderColor: folders.find(f => f.id === selectedFolder)?.color === 'cyber-primary' ? '#00ff41' : 
                                folders.find(f => f.id === selectedFolder)?.color === 'cyber-accent' ? '#00d4ff' : '#ff0080'
                  }}
                ></div>

              </motion.div>
            )}
            {!selectedFolder && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-8 flex items-center justify-center"
              >
                <div className="text-center space-y-6 p-12 bg-gradient-to-br from-cyber-dark/60 via-cyber-dark/40 to-transparent 
                  rounded-2xl border border-cyber-primary/20 backdrop-blur-md">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.05, 1],
                      opacity: [0.4, 0.7, 0.4]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-24 h-24 mx-auto border-2 border-cyber-primary/30 rounded-lg flex items-center justify-center"
                  >
                    <div className="w-12 h-12 border border-cyber-primary/50 rounded bg-cyber-primary/10"></div>
                  </motion.div>
                  <div>
                    <h2 className="text-2xl font-cyber text-cyber-primary mb-2">DATA MATRIX IDLE</h2>
                    <p className="text-gray-400 max-w-md mx-auto leading-relaxed">
                      Select a folder from the left panel to initialize data stream and access neural network information.
                    </p>
                  </div>
                  <motion.div
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex items-center justify-center space-x-2 text-cyber-accent/60"
                  >
                    <div className="w-2 h-2 bg-cyber-accent/60 rounded-full"></div>
                    <div className="w-2 h-2 bg-cyber-accent/40 rounded-full"></div>
                    <div className="w-2 h-2 bg-cyber-accent/20 rounded-full"></div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  )
}