#!/usr/bin/env bash
set -e

echo "Creating khwahish-portfolio scaffold inside current repo..."

mkdir -p public/assets/avatars public/assets/icons public/assets/wallpapers public/assets/audio
mkdir -p src/app src/styles src/components/OS/BootScreen src/components/OS/LoginScreen src/components/OS/Desktop src/components/OS/TopBar src/components/OS/Dock src/components/OS/Taskbar src/components/OS/WindowManager src/components/OS/Window src/components/OS/Icon
mkdir -p src/components/Windows/TerminalWindow src/components/Windows/ProjectsWindow src/components/Windows/SystemMonitorWindow src/components/Windows/BlogWindow src/components/Windows/SettingsWindow src/components/Windows/ContactWindow src/components/Windows/ResumeWindow
mkdir -p src/components/UI src/lib src/hooks src/store src/data scripts

write_file() {
  local path="$1"; local content="$2"
  if [ ! -f "$path" ]; then
    echo "$content" > "$path"
    echo "  created $path"
  else
    echo "  exists $path"
  fi
}

touch public/resume.pdf
touch public/favicon.ico

write_file "src/app/layout.tsx" "import '@/styles/globals.css';\nexport const metadata = { title: 'khwahish portfolio' };\nexport default function RootLayout({ children }: { children: React.ReactNode }) {\n  return (\n    <html lang=\"en\">\n      <body>{children}</body>\n    </html>\n  );\n}\n"
write_file "src/app/page.tsx" "import OSApp from '@/components/OS/OSApp';\nexport default function Home() {\n  return <OSApp />;\n}\n"
write_file "src/styles/globals.css" "/* globals - add your global css here */\n:root{--bg:#0b0c0e;--muted:#9aa0a6}\nhtml,body,#root{height:100%}\nbody{margin:0;background:var(--bg);color:#fff;font-family:Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial}\n"
write_file "src/styles/variables.css" "/* theme variables */\n"
write_file "src/styles/utils.css" "/* helper utilities */\n"
write_file "src/components/OS/OSApp.tsx" "import React from 'react';\nimport BootScreen from './BootScreen/BootScreen';\nexport default function OSApp(){\n  return <div id=\"os-root\"><BootScreen /></div>;\n}\n"
write_file "src/components/OS/BootScreen/BootScreen.tsx" "import React from 'react';\nexport default function BootScreen(){\n  return null; // placeholder for stage 1\n}\n"
write_file "src/components/OS/BootScreen/boot.module.css" "/* boot screen styles */\n"
write_file "src/components/OS/LoginScreen/LoginScreen.tsx" "import React from 'react';\nexport default function LoginScreen(){\n  return null; // placeholder\n}\n"
write_file "src/components/OS/LoginScreen/login.module.css" "/* login styles */\n"
write_file "src/components/OS/Desktop/Desktop.tsx" "import React from 'react';\nexport default function Desktop(){\n  return null; // placeholder\n}\n"
write_file "src/components/OS/Desktop/desktop.module.css" "/* desktop styles */\n"
write_file "src/components/OS/TopBar/TopBar.tsx" "import React from 'react';\nexport default function TopBar(){\n  return null;\n}\n"
write_file "src/components/OS/TopBar/topbar.module.css" "/* topbar styles */\n"
write_file "src/components/OS/Dock/Dock.tsx" "import React from 'react';\nexport default function Dock(){\n  return null;\n}\n"
write_file "src/components/OS/Dock/dock.module.css" "/* dock styles */\n"
write_file "src/components/OS/Taskbar/Taskbar.tsx" "import React from 'react';\nexport default function Taskbar(){\n  return null;\n}\n"
write_file "src/components/OS/Taskbar/taskbar.module.css" "/* taskbar styles */\n"
write_file "src/components/OS/WindowManager/WindowManager.tsx" "import React from 'react';\nexport default function WindowManager(){\n  return null;\n}\n"
write_file "src/components/OS/WindowManager/windowManager.module.css" "/* window manager styles */\n"
write_file "src/components/OS/Window/Window.tsx" "import React from 'react';\nexport default function Window(){\n  return null;\n}\n"
write_file "src/components/OS/Window/window.module.css" "/* window styles */\n"
write_file "src/components/OS/Icon/IconButton.tsx" "import React from 'react';\nexport default function IconButton(){\n  return null;\n}\n"
write_file "src/components/OS/Icon/icon.module.css" "/* icon styles */\n"
write_file "src/components/Windows/TerminalWindow/TerminalWindow.tsx" "import React from 'react';\nexport default function TerminalWindow(){\n  return null;\n}\n"
write_file "src/components/Windows/TerminalWindow/terminal.module.css" "/* terminal styles */\n"
write_file "src/components/Windows/ProjectsWindow/index.tsx" "import React from 'react';\nexport default function ProjectsWindow(){\n  return null;\n}\n"
write_file "src/components/Windows/SystemMonitorWindow/index.tsx" "import React from 'react';\nexport default function SystemMonitorWindow(){\n  return null;\n}\n"
write_file "src/components/Windows/BlogWindow/index.tsx" "import React from 'react';\nexport default function BlogWindow(){\n  return null;\n}\n"
write_file "src/components/Windows/SettingsWindow/index.tsx" "import React from 'react';\nexport default function SettingsWindow(){\n  return null;\n}\n"
write_file "src/components/Windows/ContactWindow/index.tsx" "import React from 'react';\nexport default function ContactWindow(){\n  return null;\n}\n"
write_file "src/components/Windows/ResumeWindow/index.tsx" "import React from 'react';\nexport default function ResumeWindow(){\n  return null;\n}\n"
write_file "src/components/UI/Button.tsx" "import React from 'react';\nexport default function Button(){return null}\n"
write_file "src/components/UI/Modal.tsx" "import React from 'react';\nexport default function Modal(){return null}\n"
write_file "src/components/UI/IconSvg.tsx" "import React from 'react';\nexport default function IconSvg(){return null}\n"
write_file "src/lib/audio.ts" "export const preloadAudio = () => {};\n"
write_file "src/lib/time.ts" "export const formatTime = () => '';\n"
write_file "src/lib/battery.ts" "export const getBattery = async () => null;\n"
write_file "src/hooks/useWindowManager.ts" "export default function useWindowManager(){return {}};\n"
write_file "src/hooks/useBoot.ts" "export default function useBoot(){return {}};\n"
write_file "src/hooks/useAudioSync.ts" "export default function useAudioSync(){return {}};\n"
write_file "src/hooks/useIsMobile.ts" "export default function useIsMobile(){return false;}\n"
write_file "src/store/uiStore.ts" "export const useUiStore = () => ({ });\n"
write_file "src/data/projects.ts" "export const projects = [];\n"
write_file "src/data/blogIndex.ts" "export const blogIndex = [];\n"
write_file "src/data/skills.ts" "export const skills = [];\n"
write_file "scripts/export-to-gh-pages.sh" "#!/usr/bin/env bash\n# placeholder for gh-pages export script\n"

chmod +x scripts/export-to-gh-pages.sh
chmod +x create_structure.sh

echo \"\nScaffold finished. Run 'git add -A && git commit -m \"scaffold: project structure\"' to commit.\"
