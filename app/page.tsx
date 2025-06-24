// app/page.tsx (or wherever this Page function exists)

import Component from "../task-tracker"

export const metadata = {
  title: "Daily Task Tracker",  // 👈 This changes the browser tab title
  description: "A task tracker built with React and Next.js",
}

export default function Page() {
  return <Component />
}
