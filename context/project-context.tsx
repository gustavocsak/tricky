"use client"

import React, { createContext, useContext, useState } from 'react'

type ProjectContextProviderProps = {
  children: React.ReactNode
}

type Project = {
  id: string,
  title: string,
  author: string,
  tickets: [],
  createdAt: string
}

type ProjectContext = {
  currentProject: Project | null;
  setProject: (project: Project) => void;
}

export const ProjectContext = createContext<ProjectContext | null>(null)

export default function ProjectContextProvider({ children }: ProjectContextProviderProps) {
  const [currentProject, setProject] = useState<Project | null>(null)

  return (
    <ProjectContext.Provider value={{ currentProject, setProject }}>
      {children}
    </ProjectContext.Provider>
  )
}

export function useProjectContext() {
  const context = useContext(ProjectContext)
  if (!context) {
    throw new Error('useProjectContext must be used within a ProjectContextProvider')
  }
  return context
}