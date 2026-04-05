PR: User Directory — Performance Fix & Design Overhaul


What was the problem?
The User Directory page was freezing the browser every time someone opened it. The app was loading all 5,000 users at once and rendering them on a single page, which made the page completely unusable. There was also no way to search for a specific user.

What changed?
The page no longer freezes
Instead of loading all 5,000 users at once, the app now loads only 20 users at a time. Users can browse through pages using numbered pagination controls at the bottom (1, 2, 3, ... 250).

Search now works
A search bar at the top lets you find users instantly by typing a name or role. The filtering happens on the server, so it's fast regardless of how many users exist.

The design is cleaner and more professional
Each user appears as a card with an avatar, name, role, status indicator, and last-seen date
Active users show a green dot; offline users show a gray dot
The layout adapts to both desktop and mobile screens
The header stays visible while scrolling
The code is now structured for maintainability
The original code had everything crammed into two oversized files. We separated it into focused, reusable pieces:

Server side: Data handling, search logic, and API responses are each in their own layer
Client side: The search bar, user cards, user list, and pagination are each independent building blocks
Communication: The frontend and backend are configured to talk to each other securely, with connection details managed through configuration
Why does this matter?
Before	After
Browser freezes on load	Loads instantly (20 users per page)
No search	Real-time search by name or role
One giant unreadable file	Small, testable, reusable components
Hardcoded connection URLs	Configurable via environment settings
No pagination	Numbered page navigation (1, 2, 3 ...)
Basic flat layout	Modern card-based responsive design
