# InviteDesign

InviteDesign is a digital invitation platform for creating and sharing
interactive and 3D invitations through a simple web link.

## Project Vision

Users can create a personalized invitation, publish it, and share the
generated invitation link through WhatsApp or other messaging platforms.

Guests can open the invitation directly in their mobile browser without
installing an application.

## Core Experience

### User A — Invitation Creator

1. Create an invitation.
2. Select an invitation design.
3. Enter event details.
4. Preview the invitation.
5. Publish the invitation.
6. Generate a unique invitation link.
7. Share the link through WhatsApp.

### User B — Guest

1. Open the invitation link.
2. View the interactive 3D invitation.
3. View event details.
4. View the venue.
5. RSVP to the event.
6. Add the event to their calendar.

## Technology Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Three.js
- React Three Fiber
- Node.js
- PostgreSQL
- Git
- GitHub
- Blender

## Development Branch Strategy

```text
main
 │
 └── develop
      │
      ├── feat/project-foundation
      ├── feat/ui-ux
      ├── feat/template-system
      ├── feat/3d-engine
      ├── feat/backend-database
      ├── feat/public-invitation
      ├── feat/whatsapp-sharing
      ├── feat/event-features
      ├── feat/qa-performance
      └── feat/deployment

## Development Roadmap

### Phase 1 — Project Foundation

**Branch:** `feat/project-foundation`

**Status:** Completed

- [x] Next.js project setup
- [x] TypeScript configuration
- [x] Tailwind CSS
- [x] Project folder structure
- [x] Global layout
- [x] Metadata
- [x] Global styles
- [x] Reusable Button component
- [x] Initial landing page
- [x] TypeScript validation
- [x] ESLint validation
- [x] README roadmap
- [x] Package name configuration
- [x] Final Git review
- [x] Commit and push
- [x] Pull Request
- [x] Merge into `develop`

### Phase 2 — UI/UX

**Branch:** `feat/ui-ux`

**Status:** Completed

- [x] Landing page refinement
- [x] Desktop navigation
- [x] Mobile navigation
- [x] Header
- [x] Footer
- [x] Dashboard
- [x] Create Invitation page
- [x] Invitation Preview component
- [x] Invitation Preview page
- [x] Designs page
- [x] Featured designs
- [x] How it works section
- [x] Final CTA
- [x] Responsive design
- [x] Desktop responsive testing
- [x] Mobile responsive testing
- [x] TypeScript validation
- [x] ESLint validation
- [x] Final Git review
- [x] Commit and push
- [x] Pull Request
- [x] Merge into `develop`

### Phase 3 — Template System

**Branch:** `feat/template-system`

**Status:** Planned

- [ ] Template architecture
- [ ] Template selection
- [ ] Theme system
- [ ] Color customization
- [ ] Typography system
- [ ] Template preview
- [ ] Initial invitation templates
- [ ] Template data structure
- [ ] Reusable invitation template components
- [ ] Template configuration system

### Phase 4 — 3D Engine

**Branch:** `feat/3d-engine`

**Status:** Planned

- [ ] Three.js integration
- [ ] React Three Fiber integration
- [ ] 3D scene
- [ ] Camera and lighting
- [ ] GLB/GLTF model loading
- [ ] 3D invitation envelope
- [ ] Invitation card
- [ ] Opening animation
- [ ] Text animations
- [ ] Particles and effects
- [ ] Interactive 3D controls
- [ ] Mobile 3D optimization
- [ ] 3D performance optimization

### Phase 5 — Backend & Database

**Branch:** `feat/backend-database`

**Status:** Planned

- [ ] Database setup
- [ ] User model
- [ ] Invitation model
- [ ] Template model
- [ ] API structure
- [ ] Create invitation API
- [ ] Update invitation API
- [ ] Delete invitation API
- [ ] Publish/unpublish functionality
- [ ] Unique invitation ID
- [ ] Invitation data validation
- [ ] Database migrations
- [ ] Environment configuration

### Phase 6 — Public Invitation

**Branch:** `feat/public-invitation`

**Status:** Planned

- [ ] Public invitation route
- [ ] Unique invitation URL
- [ ] Invitation data loading
- [ ] 3D invitation rendering
- [ ] Mobile guest experience
- [ ] Loading state
- [ ] Error state
- [ ] Expired invitation handling
- [ ] Public invitation SEO metadata
- [ ] Social sharing metadata

### Phase 7 — WhatsApp Sharing

**Branch:** `feat/whatsapp-sharing`

**Status:** Planned

- [ ] WhatsApp share button
- [ ] Share message generation
- [ ] Copy invitation link
- [ ] Native mobile sharing
- [ ] Open Graph metadata
- [ ] WhatsApp link preview
- [ ] Share URL validation
- [ ] Mobile share experience

### Phase 8 — Event Features

**Branch:** `feat/event-features`

**Status:** Planned

- [ ] Venue information
- [ ] Google Maps integration
- [ ] Add to Calendar
- [ ] RSVP system
- [ ] RSVP database
- [ ] RSVP management
- [ ] Photo gallery
- [ ] Background music
- [ ] Event countdown
- [ ] Guest response management

### Phase 9 — QA & Performance

**Branch:** `feat/qa-performance`

**Status:** Planned

- [ ] Functional testing
- [ ] Playwright automation
- [ ] Responsive testing
- [ ] Cross-browser testing
- [ ] API testing
- [ ] k6 performance testing
- [ ] 3D loading optimization
- [ ] Image optimization
- [ ] Performance validation
- [ ] Accessibility testing
- [ ] Error handling validation
- [ ] Security testing
- [ ] Production smoke testing

### Phase 10 — Deployment

**Branch:** `feat/deployment`

**Status:** Planned

- [ ] Production configuration
- [ ] Production database
- [ ] Environment variables
- [ ] Domain configuration
- [ ] HTTPS
- [ ] Cloud deployment
- [ ] Production testing
- [ ] Error monitoring
- [ ] Production logging
- [ ] Backup strategy
- [ ] Final release validation

## Project Structure

```text
inviteDesign/
├── app/
│   ├── create/
│   │   └── page.tsx
│   ├── designs/
│   │   └── page.tsx
│   ├── invitations/
│   │   └── page.tsx
│   ├── preview/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── invitation/
│   │   └── InvitationPreview.tsx
│   │
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   │
│   └── ui/
│       └── Button.tsx
│
├── lib/
├── types/
│
├── public/
│   ├── fonts/
│   ├── images/
│   └── models/
│
├── .gitignore
├── AGENTS.md
├── CLAUDE.md
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md