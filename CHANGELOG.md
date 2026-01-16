# HackHub Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added

- **Project Foundation** (2026-01-16)
  - Initialized Next.js 16 with React 19 and TypeScript
  - Configured Tailwind CSS 4 with theme customization
  - Installed and configured Shadcn/UI with 24 components
  - Set up Prisma ORM with SQLite database
  - Created comprehensive database schema with 22 models:
    - User, Account, Session (Authentication)
    - Event, ScheduleItem, EventRegistration (Event management)
    - Team, TeamMember, Workspace, ChatMessage (Team collaboration)
    - Submission, Score, ScoringRubric (Project judging)
    - MentorSession (Mentor portal)
    - Sponsor, EventSponsor (Sponsor showcase)
    - Resource (Resource library)
    - Workshop, WorkshopRegistration (Pre-event workshops)
    - Announcement, Notification (Communications)
    - Ticket, TicketResponse (Help desk)
    - CheckIn (Attendance)
  - Installed core dependencies: Zustand, Zod, react-hook-form, lucide-react, next-themes, date-fns
  - Created Prisma client singleton for connection management

### Why These Changes

- **Next.js 16 + React 19**: Latest stable versions with improved performance
- **Tailwind CSS 4**: Modern CSS-first approach with better performance
- **Shadcn/UI**: Accessible, customizable component library that owns the code
- **Prisma**: Type-safe database access with excellent DX
- **SQLite**: Simple development setup, easily switchable to PostgreSQL
