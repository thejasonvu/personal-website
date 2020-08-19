import React from "react"

import IconLinkedIn from "./linkedin"
import IconGitHub from "./github"
import IconDev from "./dev"
import IconExternal from "./external"

// Utility function to grab Icons by name
const Icon = ({ name, color }) => {
  switch (name.toLowerCase()) {
    case "linkedin":
      return <IconLinkedIn color={color} />
    case "github":
      return <IconGitHub color={color} />
    case "dev":
      return <IconDev color={color} />
    case "external":
      return <IconExternal color={color} />
    default:
      return null
  }
}

export default Icon
