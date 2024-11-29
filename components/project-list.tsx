"use client";
import ProjectCard from "./project-card";
import { useProjectContext } from "@/context/project-context";
import { Project } from "@/lib/types";
import { useEffect } from "react";

interface ProjectListProps {
  data: Project[];
}

export default function ProjectList({ data }: ProjectListProps) {
  const { setProjects, projects } = useProjectContext();

  /* To be used in project-view */
  useEffect(() => {
    setProjects(data);
  }, [data, setProjects]);

  return (
    <ul>
      {projects.map((project: Project) => {
        return <ProjectCard project={project} key={project.id} />;
      })}
    </ul>
  );
}
