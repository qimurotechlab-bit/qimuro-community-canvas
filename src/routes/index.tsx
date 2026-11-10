import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Activity, ArrowUpRight, Bell, BookOpen, CheckCircle2, ChevronDown, ChevronRight,
  Cloud, Code2, Cpu, Database, FolderGit2, LayoutDashboard, Menu, Network, Plus,
  RefreshCw, Search, Server, ShieldCheck, Terminal, Wifi, WifiOff, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const nodes = [
  { name: "Kitise Community Node", location: "Kitise, Makueni", status: "Online", learners: 12, capacity: "8 / 12", sync: "Just now", type: "Primary pilot" },
  { name: "Mlolongo Learning Hub", location: "Mlolongo, Machakos", status: "Online", learners: 8, capacity: "5 / 10", sync: "4 minutes ago", type: "Community partner" },
  { name: "Kibwezi Learning Centre", location: "Kibwezi, Makueni", status: "Offline", learners: 0, capacity: "0 / 8", sync: "2 hours ago", type: "Pilot node" },
];

const projects = [
  { name: "Community Health Platform", category: "Software Engineering", language: "Node.js", progress: 72, updated: "Today, 10:42 AM", status: "In progress" },
  { name: "Crop Disease Detection", category: "AI Engineering", language: "Python", progress: 48, updated: "Today, 9:15 AM", status: "In progress" },
  { name: "Local Business API", category: "Backend Engineering", language: "TypeScript", progress: 100, updated: "Yesterday", status: "Completed" },
];

const pathways = [
  { title: "Software Engineering", description: "Build applications, backend services and production-ready software.", icon: Code2, level: "Foundation to advanced", modules: 8 },
  { title: "AI Engineering", description: "Build, experiment with and deploy practical AI systems.", icon: Cpu, level: "Foundation to advanced", modules: 6 },
  { title: "Cloud & Infrastructure", description: "Understand deployment, infrastructure and system operations.", icon: Cloud, level: "Intermediate", modules: 7 },
  { title: "Systems Architecture", description: "Design reliable, scalable and distributed technology systems.", icon: Network, level: "Advanced", modules: 5 },
];

const resources = [
  { name: "Backend Engineering Starter Kit", type: "Project template", size: "24 MB" },
  { name: "Python Development Environment", type: "Development environment", size: "180 MB" },
  { name: "Introduction to System Design", type: "Technical resource", size: "12 MB" },
  { name: "AI Model Deployment Guide", type: "Technical resource", size: "8 MB" },
];

const navigation = [
  { label: "Overview", icon: LayoutDashboard }, { label: "Workspaces", icon: Terminal },
  { label: "Projects", icon: FolderGit2 }, { label: "Engineering pathways", icon: BookOpen },
  { label: "Resources", icon: Database }, { label: "Community nodes", icon: Network },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Qimuro Academy | Community Engineering Network" },
      { name: "description", content: "Explore engineering workspaces, practical learning pathways, community nodes and locally available resources with Qimuro Academy." },
      { property: "og:title", content: "Qimuro Academy | Community Engineering Network" },
      { property: "og:description", content: "A community engineering network for building beyond the classroom." },
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
  const [selectedNode, setSelectedNode] = useState("Kitise Community Node");
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [selectedPathway, setSelectedPathway] = useState<(typeof pathways)[number] | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState("");

  const notify = (message: string) => {
    setNotification(message);
    window.setTimeout(() => setNotification(""), 3000);
  };
  const handleSync = () => {
    if (!online) {
      notify("Synchronisation will resume when connectivity returns.");
      return;
    }
    setSyncing(true);
    window.setTimeout(() => {
      setSyncing(false);
      notify("Node synchronisation completed successfully.");
    }, 1600);
  };

  const visibleNodes = nodes.map((node) => ({
    ...node,
    status: !online && node.name === selectedNode ? "Offline" : node.status,
  }));
  const filteredProjects = projects.filter((project) => project.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-background text-foreground lg:flex">
      {sidebarOpen && <button aria-label="Close navigation" onClick={() => setSidebarOpen(false)} className="fixed inset-0 z-40 bg-foreground/30 lg:hidden" />}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col bg-sidebar text-sidebar-foreground transition-transform duration-300 lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-[82px] items-center justify-between border-b border-sidebar-border px-6">
          <div><div className="text-xl font-bold">QIMURO<span className="text-primary">.</span></div><div className="mt-1 text-[10px] tracking-[0.2em] text-muted-foreground">ACADEMY</div></div>
          <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Close navigation" onClick={() => setSidebarOpen(false)}><X /></Button>
        </div>
        <div className="px-5 pb-3 pt-7 text-[10px] font-semibold uppercase tracking-[0.17em] text-muted-foreground">Workspace</div>
        <nav className="space-y-1 px-3" aria-label="Workspace navigation">
          {navigation.map(({ label, icon: Icon }) => <Button key={label} variant="ghost" onClick={() => { setActivePage(label); setSidebarOpen(false); }} className={`h-11 w-full justify-start gap-3 px-3 text-sm ${activePage === label ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-muted-foreground hover:text-sidebar-foreground"}`}><Icon size={17} /><span>{label}</span>{activePage === label && <span className="ml-auto size-1.5 rounded-full bg-primary" />}</Button>)}
        </nav>
        <div className="px-5 pb-3 pt-9 text-[10px] font-semibold uppercase tracking-[0.17em] text-muted-foreground">Your environment</div>
        <div className="mx-4 rounded-md border border-sidebar-border bg-sidebar-accent p-4">
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold"><Server size={16} className="text-primary" />Local engineering node</div>
          <div className="text-sm font-medium">{selectedNode}</div>
          <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground"><span className={`size-2 rounded-full ${online ? "bg-primary" : "bg-warning"}`} />{online ? "Operating locally" : "Internet disconnected"}</div>
          <Button variant="outline" size="sm" onClick={() => setOnline(!online)} className="mt-4 w-full border-sidebar-border bg-transparent text-xs text-sidebar-foreground hover:bg-sidebar-accent">{online ? "Simulate internet outage" : "Restore connectivity"}</Button>
        </div>
        <div className="mt-auto border-t border-sidebar-border p-4">
          <div className="flex items-center gap-3"><div className="flex size-9 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary">CO</div><div><div className="text-sm font-medium">Demo Learner</div><div className="text-xs text-muted-foreground">Community member</div></div></div>
        </div>
      </aside>

      <main className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex h-[82px] items-center justify-between border-b border-border bg-card px-5 md:px-8">
          <div className="flex items-center gap-3"><Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open navigation" onClick={() => setSidebarOpen(true)}><Menu /></Button><div><div className="text-sm font-semibold">{activePage}</div><div className="mt-1 text-xs text-muted-foreground">Qimuro Academy / {activePage}</div></div></div>
          <div className="flex items-center gap-3 md:gap-5"><span className={`hidden items-center gap-2 rounded-full px-3 py-2 text-xs sm:flex ${online ? "bg-primary/10 text-primary" : "bg-warning/10 text-warning"}`}>{online ? <Wifi size={14} /> : <WifiOff size={14} />}{online ? "Connected" : "Offline mode"}</span><Button variant="ghost" size="icon" aria-label="Notifications" className="relative" onClick={() => notify("You are all caught up.")}><Bell size={19} /><span className="absolute right-2 top-2 size-2 rounded-full bg-primary" /></Button><div className="hidden items-center gap-2 text-sm text-muted-foreground md:flex">Kitise Centre<ChevronDown size={15} /></div></div>
        </header>

        <div className="mx-auto max-w-[1500px] space-y-7 p-5 md:p-8">
          {activePage === "Overview" && <>
            <section className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><div className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">Community engineering network</div><h1 className="mt-2 text-2xl font-semibold md:text-3xl">Build beyond the classroom.</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">Your engineering environment is ready. Access development tools, build projects and work with local resources through your community node.</p></div><Button onClick={() => setWorkspaceOpen(true)} className="h-11"><Plus size={17} />Open engineering workspace</Button></section>
            {!online && <div className="flex items-start gap-3 rounded-md border border-warning/30 bg-warning/10 p-4"><WifiOff size={19} className="mt-0.5 text-warning" /><div><div className="text-sm font-semibold">You are working offline</div><p className="mt-1 text-xs leading-5 text-muted-foreground">Your local engineering environment remains available. Remote services and synchronisation are temporarily unavailable.</p></div></div>}
            <section className="grid grid-cols-2 gap-4 xl:grid-cols-4">{[{ label: "Active workspaces", value: "08", detail: "On this community node", icon: Terminal }, { label: "Community nodes", value: "03", detail: "Across the pilot network", icon: Server }, { label: "Active projects", value: "24", detail: "Across engineering pathways", icon: FolderGit2 }, { label: "Local resources", value: "156", detail: "Available without internet", icon: Database }].map(({ label, value, detail, icon: Icon }) => <div key={label} className="rounded-md border border-border bg-card p-5"><div className="flex items-center justify-between"><span className="text-xs text-muted-foreground">{label}</span><Icon size={17} className="text-primary" /></div><div className="mt-4 text-3xl font-semibold">{value}</div><div className="mt-2 text-[11px] text-muted-foreground">{detail}</div></div>)}</section>
            <section className="grid grid-cols-1 gap-5 xl:grid-cols-3"><div className="rounded-md border border-border bg-card p-5 md:p-6 xl:col-span-2"><div className="flex items-center justify-between gap-3"><div><h2 className="text-base font-semibold">Your engineering environment</h2><p className="mt-1 text-xs text-muted-foreground">Tools available on your local node</p></div><span className="rounded-full bg-primary/10 px-3 py-1.5 text-[10px] text-primary">Local services</span></div><div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">{[{ name: "Code workspace", sub: "Browser IDE", icon: Code2 }, { name: "Local Git", sub: "Project versioning", icon: FolderGit2 }, { name: "Databases", sub: "Local development", icon: Database }, { name: "Resource library", sub: "Offline materials", icon: BookOpen }].map(({ name, sub, icon: Icon }) => <Button variant="outline" key={name} onClick={() => setWorkspaceOpen(true)} className="h-auto min-h-32 flex-col items-start justify-start whitespace-normal p-4 text-left"><span className="flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary"><Icon size={18} /></span><span className="mt-4 text-sm font-semibold">{name}</span><span className="text-[11px] text-muted-foreground">{sub}</span></Button>)}</div><div className="mt-6 flex flex-col justify-between gap-3 rounded-md bg-secondary p-4 sm:flex-row sm:items-center"><div className="flex items-center gap-3"><Activity size={18} className="text-primary" /><div><div className="text-xs font-semibold">Local environment status</div><div className="mt-1 text-[11px] text-muted-foreground">Development services available on this node</div></div></div><span className="text-xs font-medium text-primary">All core services operational</span></div></div>
              <div className="rounded-md bg-sidebar p-5 text-sidebar-foreground md:p-6"><div className="flex items-center justify-between"><h2 className="text-base font-semibold">Node infrastructure</h2><Server size={19} className="text-primary" /></div><p className="mt-1 text-xs text-muted-foreground">Kitise Community Node</p><div className="mt-7 space-y-5">{[{ label: "Compute capacity", value: 68 }, { label: "Memory utilisation", value: 54 }, { label: "Storage utilisation", value: 32 }].map((item) => <div key={item.label}><div className="mb-2 flex justify-between text-xs"><span className="text-muted-foreground">{item.label}</span><span>{item.value}%</span></div><div className="h-1.5 overflow-hidden rounded-full bg-sidebar-accent"><div className="h-full rounded-full bg-primary" style={{ width: `${item.value}%` }} /></div></div>)}</div><div className="mt-7 grid grid-cols-2 gap-4 border-t border-sidebar-border pt-5"><div><div className="text-xs text-muted-foreground">Learners active</div><div className="mt-1 text-xl font-semibold">12</div></div><div><div className="text-xs text-muted-foreground">Node uptime</div><div className="mt-1 text-xl font-semibold">99.2%</div></div></div><div className="mt-5 text-[10px] text-muted-foreground">Illustrative infrastructure metrics for demo purposes</div></div>
            </section>
            <section><div className="mb-4 flex items-end justify-between"><div><h2 className="text-base font-semibold">Engineering pathways</h2><p className="mt-1 text-xs text-muted-foreground">Practical routes into modern technology development</p></div><Button variant="link" size="sm" onClick={() => setActivePage("Engineering pathways")}>Explore all<ArrowUpRight size={13} /></Button></div><div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">{pathways.map((pathway) => { const Icon = pathway.icon; return <button key={pathway.title} onClick={() => setSelectedPathway(pathway)} className="rounded-md border border-border bg-card p-5 text-left transition-colors hover:border-primary/50"><span className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary"><Icon size={20} /></span><h3 className="mt-4 text-sm font-semibold">{pathway.title}</h3><p className="mt-2 min-h-[60px] text-xs leading-5 text-muted-foreground">{pathway.description}</p><div className="mt-4 flex items-center justify-between border-t border-border pt-3"><span className="text-[10px] text-muted-foreground">{pathway.modules} modules</span><ChevronRight size={15} className="text-primary" /></div></button>; })}</div></section>
            <section className="grid grid-cols-1 gap-5 xl:grid-cols-3"><div className="rounded-md border border-border bg-card p-5 xl:col-span-2"><div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center"><div><h2 className="text-base font-semibold">Recent engineering projects</h2><p className="mt-1 text-xs text-muted-foreground">Work being developed across the network</p></div><div className="relative"><Search size={14} className="absolute left-3 top-2.5 text-muted-foreground" /><input aria-label="Search projects" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search projects" className="h-9 w-full rounded-md border border-input bg-background pl-9 pr-3 text-xs outline-none focus-visible:ring-1 focus-visible:ring-ring sm:w-48" /></div></div><div className="space-y-4">{filteredProjects.map((project) => <div key={project.name} className="border-b border-border pb-4 last:border-0 last:pb-0"><div className="flex justify-between gap-3"><div><div className="text-sm font-semibold">{project.name}</div><div className="mt-1 text-[11px] text-muted-foreground">{project.category} · {project.language}</div></div><span className="h-fit rounded-full bg-secondary px-2 py-1 text-[10px] text-secondary-foreground">{project.status}</span></div><div className="mt-3 flex items-center gap-3"><div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary"><div className="h-full rounded-full bg-primary" style={{ width: `${project.progress}%` }} /></div><span className="text-[10px] text-muted-foreground">{project.progress}%</span></div><div className="mt-2 text-[10px] text-muted-foreground">Updated {project.updated}</div></div>)}{filteredProjects.length === 0 && <p className="text-xs text-muted-foreground">No matching projects found.</p>}</div></div>
              <div className="rounded-md border border-border bg-card p-5"><div className="flex items-center justify-between"><div><h2 className="text-base font-semibold">Community network</h2><p className="mt-1 text-xs text-muted-foreground">Distributed engineering nodes</p></div><Network size={19} className="text-primary" /></div><div className="mt-5 space-y-4">{visibleNodes.map((node) => <button key={node.name} onClick={() => { setSelectedNode(node.name); notify(`${node.name} selected.`); }} className={`w-full rounded-md border p-3 text-left transition-colors ${selectedNode === node.name ? "border-primary/50 bg-primary/5" : "border-border hover:bg-secondary"}`}><div className="flex items-center justify-between"><span className="text-xs font-semibold">{node.name}</span><span className={`size-2 rounded-full ${node.status === "Online" ? "bg-primary" : "bg-warning"}`} /></div><div className="mt-1 text-[10px] text-muted-foreground">{node.location}</div><div className="mt-3 flex justify-between text-[10px] text-muted-foreground"><span>{node.capacity} workspaces</span><span>{node.status}</span></div></button>)}</div><Button variant="outline" className="mt-4 w-full" onClick={() => setActivePage("Community nodes")}>View node network<ArrowUpRight size={13} /></Button></div>
            </section>
          </>}

          {activePage === "Workspaces" && <section><h1 className="text-2xl font-semibold">Engineering workspaces</h1><p className="mt-2 text-sm text-muted-foreground">Development environments hosted on your community node.</p><div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{["Node.js Backend", "Python & AI Lab", "Web Development", "Database Lab"].map((name) => <div key={name} className="rounded-md border border-border bg-card p-5"><div className="flex justify-between"><span className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary"><Terminal size={19} /></span><span className="h-fit rounded-full bg-primary/10 px-2 py-1 text-[10px] text-primary">Available locally</span></div><h3 className="mt-4 font-semibold">{name}</h3><p className="mt-2 text-xs text-muted-foreground">A ready-to-use development environment for practical engineering work.</p><Button onClick={() => setWorkspaceOpen(true)} className="mt-5 w-full">Launch workspace<ArrowUpRight size={13} /></Button></div>)}</div></section>}

          {activePage === "Projects" && <section><div className="flex items-center justify-between"><div><h1 className="text-2xl font-semibold">Projects</h1><p className="mt-2 text-sm text-muted-foreground">Build, manage and share engineering projects.</p></div><Button onClick={() => notify("Project creation is simulated in this demo.")}><Plus size={15} />New project</Button></div><div className="mt-6 divide-y divide-border rounded-md border border-border bg-card">{projects.map((project) => <div key={project.name} className="flex items-center justify-between gap-3 p-5"><div><div className="text-sm font-semibold">{project.name}</div><div className="mt-1 text-xs text-muted-foreground">{project.category} · {project.language}</div></div><span className="text-xs text-muted-foreground">{project.progress}% complete</span></div>)}</div></section>}

          {activePage === "Engineering pathways" && <section><h1 className="text-2xl font-semibold">Engineering pathways</h1><p className="mt-2 text-sm text-muted-foreground">Learn through building, experimentation and real engineering projects.</p><div className="mt-6 grid gap-4 md:grid-cols-2">{pathways.map((pathway) => { const Icon = pathway.icon; return <button key={pathway.title} onClick={() => setSelectedPathway(pathway)} className="rounded-md border border-border bg-card p-6 text-left hover:border-primary/50"><Icon className="text-primary" size={24} /><h3 className="mt-4 font-semibold">{pathway.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{pathway.description}</p><div className="mt-4 text-xs text-muted-foreground">{pathway.modules} learning modules · {pathway.level}</div></button>; })}</div></section>}

          {activePage === "Resources" && <section><h1 className="text-2xl font-semibold">Engineering resource library</h1><p className="mt-2 text-sm text-muted-foreground">Technical resources cached locally for access without internet.</p><div className="mt-6 divide-y divide-border rounded-md border border-border bg-card">{resources.map((resource) => <div key={resource.name} className="flex items-center justify-between gap-3 p-5"><div className="flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary"><Database size={18} /></span><div><div className="text-sm font-semibold">{resource.name}</div><div className="mt-1 text-xs text-muted-foreground">{resource.type} · {resource.size}</div></div></div><span className="rounded-full bg-primary/10 px-2 py-1 text-[10px] text-primary">Available offline</span></div>)}</div></section>}

          {activePage === "Community nodes" && <section><h1 className="text-2xl font-semibold">Community node network</h1><p className="mt-2 text-sm text-muted-foreground">A distributed network of locally operated engineering environments.</p><div className="mt-6 grid gap-4 md:grid-cols-3">{visibleNodes.map((node) => <div key={node.name} className="rounded-md border border-border bg-card p-5"><div className="flex justify-between"><Server className="text-primary" size={22} /><span className="text-xs text-muted-foreground">{node.status}</span></div><h3 className="mt-5 font-semibold">{node.name}</h3><p className="mt-1 text-xs text-muted-foreground">{node.location}</p><div className="mt-5 grid grid-cols-2 gap-3 border-t border-border pt-4"><div><div className="text-xs text-muted-foreground">Workspaces</div><div className="mt-1 font-semibold">{node.capacity}</div></div><div><div className="text-xs text-muted-foreground">Last sync</div><div className="mt-2 text-xs font-semibold">{node.sync}</div></div></div><div className="mt-4 text-[10px] text-muted-foreground">{node.type}</div></div>)}</div><div className="mt-5 rounded-md border border-border bg-card p-6"><h3 className="font-semibold">Network synchronisation</h3><p className="mt-2 text-sm text-muted-foreground">Synchronise selected project changes and approved resources when a node reconnects.</p><Button disabled={syncing || !online} onClick={handleSync} className="mt-5"><RefreshCw size={15} className={syncing ? "animate-spin" : ""} />{syncing ? "Synchronising..." : "Synchronise network"}</Button>{!online && <p className="mt-3 text-xs text-warning">Internet connectivity is required for network synchronisation.</p>}</div></section>}

          <footer className="flex flex-col justify-between gap-2 border-t border-border pt-5 text-[10px] text-muted-foreground sm:flex-row"><span>Qimuro Academy · Engineering infrastructure for everyone.</span><span>Visual demonstration · Illustrative data · Not a live infrastructure deployment</span></footer>
        </div>
      </main>

      {workspaceOpen && <div className="fixed inset-0 z-[70] flex items-center justify-center bg-foreground/60 p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setWorkspaceOpen(false); }}><section role="dialog" aria-modal="true" aria-labelledby="workspace-title" className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-md bg-card shadow-2xl"><div className="flex items-center justify-between bg-sidebar p-5 text-sidebar-foreground"><div><div className="text-xs uppercase tracking-widest text-primary">Local development environment</div><h2 id="workspace-title" className="mt-1 text-lg font-semibold">Engineering workspace</h2></div><Button variant="ghost" size="icon" aria-label="Close workspace" onClick={() => setWorkspaceOpen(false)}><X /></Button></div><div className="p-6"><div className="flex items-center justify-between gap-3"><div><div className="text-sm font-semibold">Node.js Backend Environment</div><div className="mt-1 text-xs text-muted-foreground">Kitise Community Node · Workspace 001</div></div><span className="rounded-full bg-primary/10 px-3 py-1.5 text-[10px] text-primary">Ready</span></div><div className="mt-5 rounded-md bg-sidebar p-5 font-mono text-xs leading-7 text-primary-foreground"><div className="text-muted-foreground"># Your local engineering environment</div><div>$ node --version</div><div className="text-primary">v22.0.0</div><div>$ npm --version</div><div className="text-primary">10.8.0</div><div>$ git status</div><div className="text-primary">On branch main</div><div className="text-muted-foreground"># Working tree clean</div><div className="mt-2 text-primary">environment@qimuro:~$ <span className="animate-pulse">_</span></div></div><div className="mt-5 grid grid-cols-2 gap-3"><div className="rounded-md border border-border p-3"><div className="text-xs text-muted-foreground">Runtime</div><div className="mt-1 text-sm font-semibold">Node.js 22</div></div><div className="rounded-md border border-border p-3"><div className="text-xs text-muted-foreground">Version control</div><div className="mt-1 text-sm font-semibold">Local Git</div></div></div><div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground"><ShieldCheck size={15} className="text-primary" />This is a simulated terminal preview. No code is executed by this demo.</div><Button onClick={() => { setWorkspaceOpen(false); notify("Workspace preview opened."); }} className="mt-5 w-full">Enter workspace preview<ArrowUpRight size={15} /></Button></div></section></div>}

      {selectedPathway && <div className="fixed inset-0 z-[70] flex items-center justify-center bg-foreground/60 p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedPathway(null); }}><section role="dialog" aria-modal="true" aria-labelledby="pathway-title" className="w-full max-w-lg rounded-md bg-card p-6 shadow-2xl"><div className="flex items-start justify-between"><span className="flex size-11 items-center justify-center rounded-md bg-primary/10 text-primary"><selectedPathway.icon size={22} /></span><Button variant="ghost" size="icon" aria-label="Close pathway details" onClick={() => setSelectedPathway(null)}><X /></Button></div><h2 id="pathway-title" className="mt-5 text-xl font-semibold">{selectedPathway.title}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{selectedPathway.description}</p><div className="mt-5 rounded-md bg-secondary p-4"><div className="text-xs text-muted-foreground">Pathway structure</div><div className="mt-1 font-semibold">{selectedPathway.modules} practical modules</div><div className="mt-1 text-xs text-muted-foreground">{selectedPathway.level}</div></div><p className="mt-4 text-xs text-muted-foreground">Learning content and assessment activities are illustrative placeholders for this demo.</p><Button onClick={() => { setSelectedPathway(null); setWorkspaceOpen(true); }} className="mt-5 w-full">Explore engineering environment</Button></section></div>}

      {notification && <div role="status" className="fixed bottom-5 right-5 z-[90] flex items-center gap-2 rounded-md bg-sidebar px-5 py-3 text-xs text-sidebar-foreground shadow-xl"><CheckCircle2 size={16} className="text-primary" />{notification}</div>}
    </div>
  );
}