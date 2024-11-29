"use client";

import React from "react";
import { LinkNone2Icon } from "@radix-ui/react-icons";
import { ModeToggle } from "./ui/mode-toggle";
import { useProjectContext } from "@/context/project-context";
import { Button } from "./ui/button";
import { ChartNoAxesColumn } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const { setCurrentProject } = useProjectContext();

  return (
    <nav className="py-3 flex justify-center border-b-2 border-border/90">
      <div className="flex w-10/12 justify-between align-center">
        <div className="flex items-center gap-2">
          <LinkNone2Icon />
          <h1 className="font-bold text-xl">tricky</h1>
        </div>
        <div className="flex gap-2">
          <ModeToggle />
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentProject(null)}
          >
            <ChartNoAxesColumn className="scale-100" />
          </Button>
          <UserButton />
        </div>
      </div>
    </nav>
  );
}
