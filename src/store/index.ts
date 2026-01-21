import { create } from "zustand";
import { persist } from "zustand/middleware";

// ==================== USER STORE ====================

interface User {
  id: string;
  email: string;
  name: string | null;
  role: string;
  image: string | null;
}

interface UserState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: true,
      setUser: (user) => set({ user, isLoading: false }),
      setLoading: (isLoading) => set({ isLoading }),
      logout: () => set({ user: null }),
    }),
    { name: "user-storage" },
  ),
);

// ==================== EVENT STORE ====================

interface Event {
  id: string;
  name: string;
  slug: string;
  status: string;
}

interface EventState {
  currentEvent: Event | null;
  events: Event[];
  setCurrentEvent: (event: Event | null) => void;
  setEvents: (events: Event[]) => void;
}

export const useEventStore = create<EventState>()((set) => ({
  currentEvent: null,
  events: [],
  setCurrentEvent: (currentEvent) => set({ currentEvent }),
  setEvents: (events) => set({ events }),
}));

// ==================== TEAM STORE ====================

interface Team {
  id: string;
  name: string;
  slug: string;
  isOpen: boolean;
}

interface TeamState {
  currentTeam: Team | null;
  teams: Team[];
  setCurrentTeam: (team: Team | null) => void;
  setTeams: (teams: Team[]) => void;
}

export const useTeamStore = create<TeamState>()((set) => ({
  currentTeam: null,
  teams: [],
  setCurrentTeam: (currentTeam) => set({ currentTeam }),
  setTeams: (teams) => set({ teams }),
}));

// ==================== NOTIFICATION STORE ====================

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: Date;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Notification) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  setNotifications: (notifications: Notification[]) => void;
}

export const useNotificationStore = create<NotificationState>()((set) => ({
  notifications: [],
  unreadCount: 0,
  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    })),
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n,
      ),
      unreadCount: Math.max(0, state.unreadCount - 1),
    })),
  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
      unreadCount: 0,
    })),
  setNotifications: (notifications) =>
    set({
      notifications,
      unreadCount: notifications.filter((n) => !n.isRead).length,
    }),
}));

// ==================== UI STORE ====================

interface UIState {
  sidebarOpen: boolean;
  workspaceFullScreen: boolean;
  theme: "light" | "dark" | "system";
  visualStyle:
    | "minimal"
    | "cyber"
    | "playful"
    | "elegant"
    | "midnight"
    | "nature"
    | "sunset"
    | "mono"
    | "glass";
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleWorkspaceFullScreen: () => void;
  setWorkspaceFullScreen: (full: boolean) => void;
  setTheme: (theme: "light" | "dark" | "system") => void;
  setVisualStyle: (
    style:
      | "minimal"
      | "cyber"
      | "playful"
      | "elegant"
      | "midnight"
      | "nature"
      | "sunset"
      | "mono"
      | "glass",
  ) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      workspaceFullScreen: false,
      theme: "system",
      visualStyle: "minimal",
      toggleSidebar: () =>
        set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
      toggleWorkspaceFullScreen: () =>
        set((state) => ({ workspaceFullScreen: !state.workspaceFullScreen })),
      setWorkspaceFullScreen: (workspaceFullScreen) =>
        set({ workspaceFullScreen }),
      setTheme: (theme) => set({ theme }),
      setVisualStyle: (visualStyle) => set({ visualStyle }),
    }),
    { name: "ui-storage" },
  ),
);
