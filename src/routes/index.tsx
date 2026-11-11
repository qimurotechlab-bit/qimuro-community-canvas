import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  ArrowUpRight,
  Bell,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Cloud,
  Code2,
  Cpu,
  Database,
  FolderGit2,
  LayoutDashboard,
  Menu,
  Network,
  Plus,
  RefreshCw,
  Search,
  Server,
  ShieldCheck,
  Terminal,
  Wifi,
  WifiOff,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const nodes = [
  { name: "Kitise pilot node", location: "Kitise, Makueni", status: "Online", capacity: "8 / 12", sync: "Recently", type: "Illustrative community pilot" },
  { name: "Mlolongo pilot node", location: "Mlolongo, Machakos", status: "Online", capacity: "5 / 10", sync: "Recently", type: "Illustrative community pilot" },
  { name: "Kibwezi pilot node", location: "Kibwezi, Makueni", status: "Offline", capacity: "0 / 8", sync: "Not connected", type: "Illustrative community pilot" },
];

const initialProjects = [
  { name: "Community Health Platform", category: "Software Engineering", language: "Node.js", progress: 72, updated: "Today", status: "In progress" },
  { name: "Crop Disease Detection", category: "AI Engineering", language: "Python", progress: 48, updated: "Today", status: "In progress" },
  { name: "Local Business API", category: "Backend Engineering", language: "TypeScript", progress: 100, updated: "Recently", status: "Completed" },
];

const pathways = [
  { title: "Software Engineering", description: "Build applications, backend services and production-ready software.", icon: Code2, level: "Foundation to advanced", modules: 8 },
  { title: "AI Engineering", description: "Build, experiment with and deploy practical AI systems.", icon: Cpu, level: "Foundation to advanced", modules: 6 },
  { title: "Cloud & Infrastructure", description: "Understand deployment, infrastructure and system operations.", icon: Cloud, level: "Intermediate", modules: 7 },
  { title: "Systems Architecture", description: "Design reliable, portable and distributed technology systems.", icon: Network, level: "Advanced", modules: 5 },
];

const resources = [
  { name: "Backend Engineering Starter Kit", type: "Project template", size: "24 MB", access: "Available locally", local: true },
  { name: "Python Development Environment", type: "Development environment", size: "180 MB", access: "Available locally", local: true },
  { name: "Introduction to System Design", type: "Technical resource", size: "12 MB", access: "Available locally", local: true },
  { name: "AI Model Deployment Guide", type: "Technical resource", size: "8 MB", access: "Internet required for updates", local: false },
];

const navigation = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Workspaces", icon: Terminal },
  { label: "Projects", icon: FolderGit2 },
  { label: "Engineering pathways", icon: BookOpen },
  { label: "Resources", icon: Database },
  { label: "Infrastructure", icon: Server },
  { label: "Network", icon: Network },
];

const accessOptions = [
  { id: "device", title: "Use my device", detail: "Use your own computer and local development tools.", badge: "Your computer", icon: Terminal },
  { id: "node", title: "Connect to a node", detail: "Explore shared community or institution infrastructure.", badge: "Optional connection", icon: Network },
  { id: "shared", title: "Use shared computing", detail: "Consider additional remote resources when your device needs help.", badge: "Proposed capability", icon: Cpu },
] as const;

type AccessMode = (typeof accessOptions)[number]["id"];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Qimuro Academy | Your Engineering Workspace" },
      { name: "description", content: "A personal engineering workspace for building practical technology with your own device, optional shared infrastructure, and portable resources." },
      { property: "og:title", content: "Qimuro Academy | Your Engineering Workspace" },
      { property: "og:description", content: "Build practical technology across personal devices, optional community infrastructure, and institutions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AcademyDashboard,
});

function AcademyDashboard() {
  const [activePage, setActivePage] = useState("Overview");
  const [online, setOnline] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState("");
  const [accessMode, setAccessMode] = useState<AccessMode>("device");
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [selectedPathway, setSelectedPathway] = useState<(typeof pathways)[number] | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [syncLabel, setSyncLabel] = useState("No live service connected");
  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState("");
  const [projects, setProjects] = useState(initialProjects);
  const [newProjectOpen, setNewProjectOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");

  const notify = (message: string) => {
    setNotification(message);
    window.setTimeout(() => setNotification(""), 3000);
  };

  const handleSync = () => {
    if (!online) {
      setSyncLabel("Sync pending · reconnect to continue");
      notify("Changes are pending. Sync can resume when connectivity returns.");
      return;
    }
    setSyncing(true);
    setSyncLabel("Demo sync in progress");
    window.setTimeout(() => {
      setSyncing(false);
      setSyncLabel("Demo sync complete · just now");
      notify("Demo sync completed. No live services were contacted.");
    }, 900);
  };

  const visibleNodes = nodes.map((node) => ({
    ...node,
    status: !online && node.name === selectedNode ? "Offline" : node.status,
  }));
  const filteredProjects = projects.filter((project) => project.name.toLowerCase().includes(search.toLowerCase()));

  const selectAccess = (mode: AccessMode) => {
    setAccessMode(mode);
    const message = mode === "device"
      ? "Personal device selected. This demo does not connect to your computer."
      : mode === "node"
        ? "Node access is optional and illustrative; no node was connected."
        : "Shared computing is a proposed option, not a live service.";
    notify(message);
  };

  const createProject = () => {
    const name = newProjectName.trim();
    if (!name) {
      notify("Enter a project name to continue.");
      return;
    }
    setProjects((current) => [{ name, category: "Personal project", language: "Not selected", progress: 0, updated: "Just created", status: "In progress" }, ...current]);
    setNewProjectName("");
    setNewProjectOpen(false);
    notify("Demo project added to your workspace.");
  };

  return (
    <div className="min-h-screen bg-background text-foreground lg:flex">
      {sidebarOpen && <button aria-label="Close navigation" onClick={() => setSidebarOpen(false)} className="fixed inset-0 z-40 bg-foreground/30 lg:hidden" />}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col bg-sidebar text-sidebar-foreground transition-transform duration-300 lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-[82px] items-center justify-between border-b border-sidebar-border px-6">
          <div><div className="text-xl font-bold">QIMURO<span className="text-primary">.</span></div><div className="mt-1 text-[10px] text-muted-foreground">ACADEMY</div></div>
          <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Close navigation" onClick={() => setSidebarOpen(false)}><X /></Button>
        </div>
        <div className="px-5 pb-3 pt-7 text-[10px] font-semibold uppercase text-muted-foreground">My workspace</div>
        <nav className="space-y-1 px-3" aria-label="Workspace navigation">
          {navigation.map(({ label, icon: Icon }) => <Button key={label} variant="ghost" onClick={() => { setActivePage(label); setSidebarOpen(false); }} className={`h-11 w-full justify-start gap-3 px-3 text-sm ${activePage === label ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-muted-foreground hover:text-sidebar-foreground"}`}><Icon size={17} /><span>{label}</span>{activePage === label && <span className="ml-auto size-1.5 rounded-full bg-primary" />}</Button>)}
        </nav>
        <div className="px-5 pb-3 pt-9 text-[10px] font-semibold uppercase text-muted-foreground">Access mode</div>
        <div className="mx-4 rounded-md border border-sidebar-border bg-sidebar-accent p-4">
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold"><Terminal size={16} className="text-primary" />{accessMode === "device" ? "Your own device" : accessMode === "node" ? "Optional node access" : "Shared computing"}</div>
          <div className="text-xs text-muted-foreground">{online ? "Local workspaces shown as a demo" : "Local access simulated · remote unavailable"}</div>
          <Button variant="outline" size="sm" onClick={() => setOnline(!online)} className="mt-4 w-full border-sidebar-border bg-transparent text-xs text-sidebar-foreground hover:bg-sidebar-accent">{online ? "Simulate internet outage" : "Restore connectivity"}</Button>
        </div>
        <div className="mt-auto border-t border-sidebar-border p-4">
          <div className="flex items-center gap-3"><div className="flex size-9 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary">QA</div><div><div className="text-sm font-medium">Demo profile</div><div className="text-xs text-muted-foreground">Individual workspace</div></div></div>
        </div>
      </aside>

      <main className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex min-h-[82px] items-center justify-between gap-3 border-b border-border bg-card px-4 md:px-8">
          <div className="flex items-center gap-3"><Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open navigation" onClick={() => setSidebarOpen(true)}><Menu /></Button><div><div className="text-sm font-semibold">{activePage}</div><div className="mt-1 text-xs text-muted-foreground">Qimuro Academy / {activePage}</div></div></div>
          <div className="flex items-center gap-2 md:gap-5"><span className={`hidden items-center gap-2 rounded-full px-3 py-2 text-xs sm:flex ${online ? "bg-primary/10 text-primary" : "bg-warning/10 text-warning"}`}>{online ? <Wifi size={14} /> : <WifiOff size={14} />}{online ? "Connected" : "Offline mode"}</span><Button variant="ghost" size="icon" aria-label="Notifications" onClick={() => notify("No new demo notifications.")}><Bell size={19} /></Button><span className="hidden text-xs text-muted-foreground md:inline">Individual workspace · Demo</span></div>
        </header>

        <div className="mx-auto max-w-[1500px] space-y-7 p-4 md:p-8">
          {activePage === "Overview" && <>
            <section className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><div className="text-xs font-semibold uppercase text-primary">Your engineering workspace</div><h1 className="mt-2 max-w-3xl text-2xl font-semibold md:text-3xl">Your environment. Your tools. Your engineering journey.</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">Access the resources and computing environments you need to design, build, test and deploy technology. Start with your own computer; shared infrastructure is optional.</p></div><Button onClick={() => setWorkspaceOpen(true)} className="h-11"><Terminal size={17} />Open workspace preview</Button></section>
            {!online && <div className="flex items-start gap-3 rounded-md border border-warning/30 bg-warning/10 p-4"><WifiOff size={19} className="mt-0.5 text-warning" /><div><div className="text-sm font-semibold">Offline mode · demo</div><p className="mt-1 text-xs leading-5 text-muted-foreground">Resources marked available locally remain listed. Remote computing and updates are unavailable; synchronization is pending. Local execution is not connected in this prototype.</p></div></div>}

            <section aria-label="Access choices"><div className="mb-4"><h2 className="text-base font-semibold">Choose how you work</h2><p className="mt-1 text-xs text-muted-foreground">Use your own device, or explore optional shared environments.</p></div><div className="grid gap-3 md:grid-cols-3">{accessOptions.map(({ id, title, detail, badge, icon: Icon }) => <div key={id} className={`rounded-md border bg-card p-4 ${accessMode === id ? "border-primary" : "border-border"}`}><div className="flex items-start justify-between gap-3"><span className="flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary"><Icon size={18} /></span><span className="text-right text-[10px] text-muted-foreground">{badge}</span></div><h3 className="mt-3 text-sm font-semibold">{title}</h3><p className="mt-1 min-h-10 text-xs leading-5 text-muted-foreground">{detail}</p><Button variant={accessMode === id ? "secondary" : "outline"} size="sm" className="mt-3 w-full" onClick={() => selectAccess(id)}>{accessMode === id ? "Selected for this demo" : id === "device" ? "Choose this option" : "Explore option"}</Button></div>)}</div><p className="mt-2 text-[10px] text-muted-foreground">Demo choices only · No computer, node, institution or remote service is connected.</p></section>

            <section className="grid grid-cols-2 gap-3 xl:grid-cols-4">{[{ label: "My demo workspaces", value: "04", detail: "Personal environment examples", icon: Terminal }, { label: "My demo projects", value: String(projects.length).padStart(2, "0"), detail: "Illustrative project list", icon: FolderGit2 }, { label: "Local resources", value: String(resources.filter((resource) => resource.local).length).padStart(2, "0"), detail: "Marked available offline", icon: Database }, { label: "Pilot nodes", value: "03", detail: "Illustrative, not live deployments", icon: Network }].map(({ label, value, detail, icon: Icon }) => <div key={label} className="rounded-md border border-border bg-card p-4 md:p-5"><div className="flex items-start justify-between gap-2"><span className="text-xs text-muted-foreground">{label}</span><Icon size={17} className="shrink-0 text-primary" /></div><div className="mt-3 text-2xl font-semibold">{value}</div><div className="mt-2 text-[10px] leading-4 text-muted-foreground">{detail}</div></div>)}</section>

            <section className="grid grid-cols-1 gap-5 xl:grid-cols-3"><div className="rounded-md border border-border bg-card p-5 md:p-6 xl:col-span-2"><div className="flex items-center justify-between gap-3"><div><h2 className="text-base font-semibold">My workspaces</h2><p className="mt-1 text-xs text-muted-foreground">Local-first development environment examples</p></div><span className="rounded-full bg-secondary px-3 py-1.5 text-[10px] text-secondary-foreground">Demo availability</span></div><div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">{[{ name: "Software development", sub: "Personal device · demo", icon: Code2 }, { name: "Python & AI", sub: "Personal device · demo", icon: Cpu }, { name: "Backend tools", sub: "Local environment · demo", icon: Server }, { name: "Database tools", sub: "Local environment · demo", icon: Database }].map(({ name, sub, icon: Icon }) => <Button variant="outline" key={name} onClick={() => setWorkspaceOpen(true)} className="h-auto min-h-32 flex-col items-start justify-start whitespace-normal p-4 text-left"><span className="flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary"><Icon size={18} /></span><span className="mt-3 text-sm font-semibold">{name}</span><span className="text-[11px] text-muted-foreground">{sub}</span></Button>)}</div><div className="mt-5 flex flex-col justify-between gap-3 rounded-md bg-secondary p-4 sm:flex-row sm:items-center"><div className="flex items-center gap-3"><Activity size={18} className="text-primary" /><div><div className="text-xs font-semibold">Environment availability</div><div className="mt-1 text-[11px] text-muted-foreground">Device-local and remote services are not connected in this prototype.</div></div></div><span className="text-xs font-medium text-primary">Illustrative</span></div></div>
              <div className="rounded-md bg-sidebar p-5 text-sidebar-foreground md:p-6"><div className="flex items-center justify-between"><h2 className="text-base font-semibold">Compute and infrastructure</h2><Server size={19} className="text-primary" /></div><p className="mt-1 text-xs leading-5 text-muted-foreground">Resources may come from you or a connected partner; Qimuro does not provide every resource.</p><div className="mt-5 space-y-4">{[{ label: "Personal device", status: "Your own resources" }, { label: "Community node", status: "Optional · illustrative" }, { label: "Institutional infrastructure", status: "Optional · illustrative" }, { label: "Shared remote computing", status: "Proposed · not connected" }].map((item) => <div key={item.label} className="border-b border-sidebar-border pb-3 last:border-0"><div className="text-xs font-medium">{item.label}</div><div className="mt-1 text-[10px] text-muted-foreground">{item.status}</div></div>)}</div><div className="mt-3 text-[10px] text-muted-foreground">No live capacity or uptime is being reported.</div></div>
            </section>

            <PathwaySection onSelect={setSelectedPathway} onExplore={() => setActivePage("Engineering pathways")} />
            <ProjectSection projects={filteredProjects} search={search} setSearch={setSearch} onCreate={() => setNewProjectOpen(true)} />
            <ResourcePreview online={online} onView={() => setActivePage("Resources")} />
            <NodePreview nodes={visibleNodes} selectedNode={selectedNode} onSelect={(name) => { setSelectedNode(name); setAccessMode("node"); notify(`${name} is an illustrative pilot, not a live connection.`); }} onView={() => setActivePage("Network")} />
          </>}

          {activePage === "Workspaces" && <section><SectionHeading title="My engineering workspaces" description="Personal-device-first environments with optional shared resources." /><div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{[{ name: "Software Development", location: "Your device · demo", icon: Code2 }, { name: "Python & AI", location: "Your device · demo", icon: Cpu }, { name: "Backend Development", location: "Local environment · demo", icon: Terminal }, { name: "Database Environment", location: "Local environment · demo", icon: Database }].map(({ name, location, icon: Icon }) => <div key={name} className="rounded-md border border-border bg-card p-5"><div className="flex items-center justify-between"><span className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary"><Icon size={19} /></span><span className="text-right text-[10px] text-muted-foreground">Demo only</span></div><h3 className="mt-4 font-semibold">{name}</h3><p className="mt-2 text-xs text-muted-foreground">A practical environment example; not connected to a running computer.</p><div className="mt-2 text-[10px] text-muted-foreground">{location}</div><Button onClick={() => setWorkspaceOpen(true)} className="mt-5 w-full">View environment preview<ArrowUpRight size={13} /></Button></div>)}</div><div className="mt-5 rounded-md border border-border p-5"><h2 className="font-semibold">Connect your tools</h2><p className="mt-2 text-sm text-muted-foreground">Connecting personal development tools is a planned capability. This demo does not access your device or accounts.</p></div></section>}

          {activePage === "Projects" && <ProjectSection projects={filteredProjects} search={search} setSearch={setSearch} onCreate={() => setNewProjectOpen(true)} full />}

          {activePage === "Engineering pathways" && <PathwaySection onSelect={setSelectedPathway} />}

          {activePage === "Resources" && <section><SectionHeading title="Technical resources" description="Reference material, development templates and tools; availability shown per item." /><div className="mt-6 divide-y divide-border rounded-md border border-border bg-card">{resources.map((resource) => <div key={resource.name} className="flex items-center justify-between gap-3 p-4 md:p-5"><div className="flex min-w-0 items-center gap-3"><span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary"><Database size={18} /></span><div className="min-w-0"><div className="text-sm font-semibold">{resource.name}</div><div className="mt-1 text-xs text-muted-foreground">{resource.type} · {resource.size}</div></div></div><span className={`shrink-0 text-right text-[10px] ${resource.local ? "text-primary" : "text-warning"}`}>{online ? resource.access : resource.local ? "Available locally · demo" : "Requires internet"}</span></div>)}</div><p className="mt-3 text-[10px] text-muted-foreground">Illustrative resource list · local availability is not verified against a real device.</p></section>}

          {activePage === "Infrastructure" && <section><SectionHeading title="Compute and infrastructure" description="Engineering environments can span personal devices and infrastructure provided by connected partners." /><div className="mt-6 grid gap-4 md:grid-cols-2">{[{ title: "Personal device", text: "Use your own computer and local development tools. Qimuro-hosted compute is not required.", state: "First-class access route", icon: Terminal }, { title: "Community infrastructure", text: "Shared devices and local environments through a community partner, where available.", state: "Optional · illustrative", icon: Network }, { title: "Institutional infrastructure", text: "An organization may connect its own environments for its teams.", state: "Concept demonstration", icon: Server }, { title: "Shared remote computing", text: "Additional remote resources may help when local hardware is insufficient.", state: "Proposed · not connected", icon: Cloud }].map(({ title, text, state, icon: Icon }) => <div key={title} className="rounded-md border border-border bg-card p-5"><div className="flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary"><Icon size={20} /></span><div><h2 className="text-sm font-semibold">{title}</h2><div className="mt-1 text-[10px] text-muted-foreground">{state}</div></div></div><p className="mt-4 text-sm leading-6 text-muted-foreground">{text}</p></div>)}</div><div className="mt-5 rounded-md bg-secondary p-5"><h2 className="text-sm font-semibold">Portable, local-first coordination</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Identity, environment portability and controlled synchronization are part of the broader product direction. They are not live services in this prototype.</p></div></section>}

          {activePage === "Network" && <NetworkSection nodes={visibleNodes} online={online} selectedNode={selectedNode} syncing={syncing} syncLabel={syncLabel} onSelect={(name) => { setSelectedNode(name); setAccessMode("node"); notify(`${name} is illustrative; no connection was made.`); }} onSync={handleSync} />}

          <footer className="flex flex-col justify-between gap-2 border-t border-border pt-5 text-[10px] text-muted-foreground sm:flex-row"><span>Qimuro Academy · Practical engineering across your own device and optional shared infrastructure.</span><span>Visual demo · Illustrative data · No live infrastructure connection</span></footer>
        </div>
      </main>

      {workspaceOpen && <Dialog title="Workspace preview" eyebrow="Personal engineering environment · Demo" onClose={() => setWorkspaceOpen(false)}><div className="flex items-center justify-between gap-3"><div><div className="text-sm font-semibold">Software Development Environment</div><div className="mt-1 text-xs text-muted-foreground">Personal device workflow · Preview only</div></div><span className="rounded-full bg-secondary px-3 py-1.5 text-[10px] text-secondary-foreground">Not connected</span></div><div className="mt-5 rounded-md bg-sidebar p-5 font-mono text-xs leading-7 text-primary-foreground"><div className="text-muted-foreground"># Illustrative terminal preview</div><div>$ node --version</div><div className="text-primary">v22.0.0</div><div>$ git status</div><div className="text-primary">Example workspace · no commands executed</div><div className="mt-2 text-primary">environment@qimuro:~$ <span className="animate-pulse">_</span></div></div><div className="mt-5 grid grid-cols-2 gap-3"><div className="rounded-md border border-border p-3"><div className="text-xs text-muted-foreground">Access route</div><div className="mt-1 text-sm font-semibold">Your own device</div></div><div className="rounded-md border border-border p-3"><div className="text-xs text-muted-foreground">Demo state</div><div className="mt-1 text-sm font-semibold">Local-first example</div></div></div><div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground"><ShieldCheck size={15} className="text-primary" />Simulated preview; no code runs and no computer is connected.</div><Button onClick={() => { setWorkspaceOpen(false); notify("Workspace preview closed. No device was connected."); }} className="mt-5 w-full">Close preview</Button></Dialog>}

      {selectedPathway && <Dialog title={selectedPathway.title} eyebrow="Practical engineering pathway" onClose={() => setSelectedPathway(null)}><p className="text-sm leading-6 text-muted-foreground">{selectedPathway.description}</p><div className="mt-5 rounded-md bg-secondary p-4"><div className="text-xs text-muted-foreground">Illustrative pathway structure</div><div className="mt-1 font-semibold">{selectedPathway.modules} practical modules</div><div className="mt-1 text-xs text-muted-foreground">{selectedPathway.level}</div></div><p className="mt-4 text-xs text-muted-foreground">Pathway content is a prototype example, not a live course.</p><Button onClick={() => { setSelectedPathway(null); setActivePage("Workspaces"); }} className="mt-5 w-full">Explore workspaces</Button></Dialog>}

      {newProjectOpen && <Dialog title="Create a project" eyebrow="Personal project · Demo" onClose={() => setNewProjectOpen(false)}><label htmlFor="new-project-name" className="text-sm font-medium">Project name</label><input id="new-project-name" autoFocus value={newProjectName} onChange={(event) => setNewProjectName(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") createProject(); }} placeholder="e.g. Water quality monitor" className="mt-2 h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring" /><p className="mt-2 text-xs text-muted-foreground">This adds a sample project to this page only. It is not saved to an account.</p><Button onClick={createProject} className="mt-5 w-full"><Plus size={16} />Add demo project</Button></Dialog>}

      {notification && <div role="status" className="fixed bottom-5 right-5 z-[90] flex max-w-[calc(100vw-2.5rem)] items-center gap-2 rounded-md bg-sidebar px-5 py-3 text-xs text-sidebar-foreground shadow-xl"><CheckCircle2 size={16} className="shrink-0 text-primary" />{notification}</div>}
    </div>
  );
}

function SectionHeading({ title, description }: { title: string; description: string }) {
  return <div><h1 className="text-2xl font-semibold">{title}</h1><p className="mt-2 text-sm text-muted-foreground">{description}</p></div>;
}

function PathwaySection({ onSelect, onExplore }: { onSelect: (pathway: (typeof pathways)[number]) => void; onExplore?: () => void }) {
  return <section><div className="mb-4 flex items-end justify-between"><div><h2 className="text-base font-semibold">Engineering pathways</h2><p className="mt-1 text-xs text-muted-foreground">Practical routes through building and experimentation</p></div>{onExplore && <Button variant="link" size="sm" onClick={onExplore}>Explore all<ArrowUpRight size={13} /></Button>}</div><div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">{pathways.map((pathway) => { const Icon = pathway.icon; return <Button variant="outline" key={pathway.title} onClick={() => onSelect(pathway)} className="h-auto min-h-52 flex-col items-stretch justify-start whitespace-normal p-5 text-left"><span className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary"><Icon size={20} /></span><span className="mt-4 text-sm font-semibold">{pathway.title}</span><span className="mt-2 min-h-10 text-xs leading-5 text-muted-foreground">{pathway.description}</span><span className="mt-4 flex items-center justify-between border-t border-border pt-3 text-[10px] text-muted-foreground">{pathway.modules} practical modules<ChevronRight size={15} className="text-primary" /></span></Button>; })}</div></section>;
}

function ProjectSection({ projects, search, setSearch, onCreate, full = false }: { projects: typeof initialProjects; search: string; setSearch: (value: string) => void; onCreate: () => void; full?: boolean }) {
  return <section className={`rounded-md border border-border bg-card p-5 ${full ? "" : "xl:col-span-2"}`}><div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center"><div><h2 className="text-base font-semibold">{full ? "My projects" : "Recent projects"}</h2><p className="mt-1 text-xs text-muted-foreground">Illustrative personal project list · stored locally in this demo</p></div><div className="flex flex-col gap-2 sm:flex-row"><div className="relative"><Search size={14} className="absolute left-3 top-2.5 text-muted-foreground" /><input aria-label="Search projects" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search projects" className="h-9 w-full rounded-md border border-input bg-background pl-9 pr-3 text-xs outline-none focus-visible:ring-1 focus-visible:ring-ring sm:w-48" /></div><Button size="sm" onClick={onCreate}><Plus size={15} />New project</Button></div></div><div className="space-y-4">{projects.map((project) => <div key={project.name} className="border-b border-border pb-4 last:border-0 last:pb-0"><div className="flex justify-between gap-3"><div><div className="text-sm font-semibold">{project.name}</div><div className="mt-1 text-[11px] text-muted-foreground">{project.category} · {project.language}</div></div><span className="h-fit rounded-full bg-secondary px-2 py-1 text-[10px] text-secondary-foreground">{project.status}</span></div><div className="mt-3 flex items-center gap-3"><div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary"><div className="h-full rounded-full bg-primary" style={{ width: `${project.progress}%` }} /></div><span className="text-[10px] text-muted-foreground">{project.progress}%</span></div><div className="mt-2 text-[10px] text-muted-foreground">Updated {project.updated}</div></div>)}{projects.length === 0 && <p className="text-xs text-muted-foreground">{search ? "No matching projects found." : "No projects yet."}</p>}</div></section>;
}

function ResourcePreview({ online, onView }: { online: boolean; onView: () => void }) {
  return <section><div className="mb-4 flex items-end justify-between"><div><h2 className="text-base font-semibold">Resources</h2><p className="mt-1 text-xs text-muted-foreground">Local availability is noted; internet is needed for some updates.</p></div><Button variant="link" size="sm" onClick={onView}>Browse resources<ArrowUpRight size={13} /></Button></div><div className="grid gap-3 md:grid-cols-2">{resources.slice(0, 2).map((resource) => <div key={resource.name} className="flex items-center gap-3 rounded-md border border-border bg-card p-4"><span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary"><BookOpen size={18} /></span><div><div className="text-sm font-semibold">{resource.name}</div><div className="mt-1 text-[10px] text-muted-foreground">{online ? resource.access : "Available locally · demo"} · {resource.size}</div></div></div>)}</div></section>;
}

function NodePreview({ nodes: pilotNodes, selectedNode, onSelect, onView }: { nodes: typeof nodes; selectedNode: string; onSelect: (name: string) => void; onView: () => void }) {
  return <section className="rounded-md border border-border bg-card p-5"><div className="flex items-center justify-between"><div><h2 className="text-base font-semibold">Optional network access</h2><p className="mt-1 text-xs text-muted-foreground">Illustrative community pilots · not confirmed deployments</p></div><Network size={19} className="text-primary" /></div><div className="mt-4 grid gap-3 md:grid-cols-3">{pilotNodes.map((node) => <div key={node.name} className={`rounded-md border p-3 ${selectedNode === node.name ? "border-primary/50 bg-primary/5" : "border-border"}`}><div className="flex items-center justify-between gap-2"><span className="text-xs font-semibold">{node.name}</span><span className={`size-2 shrink-0 rounded-full ${node.status === "Online" ? "bg-primary" : "bg-warning"}`} /></div><div className="mt-1 text-[10px] text-muted-foreground">{node.location}</div><div className="mt-2 text-[10px] text-muted-foreground">Illustrative status: {node.status}</div><Button variant="outline" size="sm" className="mt-3 w-full text-xs" onClick={() => onSelect(node.name)}>{selectedNode === node.name ? "Selected in demo" : "Explore node"}</Button></div>)}</div><Button variant="link" size="sm" className="mt-3 px-0" onClick={onView}>View network details<ArrowUpRight size={13} /></Button></section>;
}

function NetworkSection({ nodes: pilotNodes, online, selectedNode, syncing, syncLabel, onSelect, onSync }: { nodes: typeof nodes; online: boolean; selectedNode: string; syncing: boolean; syncLabel: string; onSelect: (name: string) => void; onSync: () => void }) {
  return <section><SectionHeading title="Optional network access" description="Explore illustrative community nodes. Community or institutional access is optional and no node is connected in this demo." /><div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{pilotNodes.map((node) => <div key={node.name} className="rounded-md border border-border bg-card p-5"><div className="flex justify-between"><Server className="text-primary" size={22} /><span className="text-xs text-muted-foreground">Illustrative: {node.status}</span></div><h2 className="mt-5 font-semibold">{node.name}</h2><p className="mt-1 text-xs text-muted-foreground">{node.location}</p><div className="mt-5 grid grid-cols-2 gap-3 border-t border-border pt-4"><div><div className="text-xs text-muted-foreground">Example capacity</div><div className="mt-1 text-sm font-semibold">{node.capacity}</div></div><div><div className="text-xs text-muted-foreground">Example sync</div><div className="mt-1 text-sm font-semibold">{node.sync}</div></div></div><div className="mt-3 text-[10px] text-muted-foreground">{node.type} · sample data only</div><Button variant="outline" className="mt-4 w-full" onClick={() => onSelect(node.name)}>{selectedNode === node.name ? "Selected for demo" : "Explore access option"}</Button></div>)}</div><div className="mt-5 rounded-md border border-border bg-card p-5"><h2 className="font-semibold">Synchronization · visual demo</h2><p className="mt-2 text-sm text-muted-foreground">{online ? "When connected, synchronization could resume. This button simulates a status only." : "Offline: sync is pending. Remote computing and synchronization are unavailable."}</p><div className="mt-3 text-xs text-muted-foreground">{!online ? "Pending · waiting for connectivity" : syncLabel}</div><Button disabled={syncing || !online} onClick={onSync} className="mt-4"><RefreshCw size={15} className={syncing ? "animate-spin" : ""} />{syncing ? "Simulating sync..." : "Simulate sync"}</Button>{!online && <p className="mt-3 text-xs text-warning">Reconnect before simulating sync. Local resources are listed separately from remote services.</p>}</div></section>;
}

function Dialog({ title, eyebrow, onClose, children }: { title: string; eyebrow: string; onClose: () => void; children: React.ReactNode }) {
  return <div className="fixed inset-0 z-[70] flex items-center justify-center bg-foreground/60 p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section role="dialog" aria-modal="true" aria-labelledby="dialog-title" className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-md bg-card p-5 shadow-2xl md:p-6"><div className="mb-5 flex items-start justify-between gap-4"><div><div className="text-xs text-primary">{eyebrow}</div><h2 id="dialog-title" className="mt-1 text-lg font-semibold">{title}</h2></div><Button variant="ghost" size="icon" aria-label="Close dialog" onClick={onClose}><X /></Button></div>{children}</section></div>;
}