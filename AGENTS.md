# AI Agents Configuration - My-Itch

## 1. Agent Roles
### 1.1 Content Moderator Agent
- **Responsibility**: Scan uploaded game descriptions and comments for prohibited content.
- **Trigger**: New game submission or comment posted.
- **Action**: Flag for review or auto-hide.

### 1.2 Recommendation Agent
- **Responsibility**: Suggest games to users based on play history and browsing behavior.
- **Mechanism**: Vector similarity search on game tags/descriptions.

### 1.3 Tech Support Helper
- **Responsibility**: Assist users with common issues (download failures, payment questions).
- **Interface**: Chatbot on help pages.

## 2. Implementation Strategy
- Use OpenAI API or local LLMs for text analysis.
- Background jobs for processing queues.
