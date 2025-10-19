# Privacy Policy & Terms of Service

**Last updated: October 5, 2025**

## Introduction

Thank you for visiting our website! At FYDY ("Fuzzy Dynamics, Inc.", "our", "we", "us"), our sole concern is to make good new things for the world. We believe that truly good tools are built on trust—and trust requires transparency about how we handle the information you bring or create on Theatre. This isn't just about compliance; it's fundamental to building something worth using.

For detailed terms and policies, please contact us at [team@fydy.ai](mailto:team@fydy.ai).

Theatre is an AI platform for software development and research. To provide these capabilities, Theatre processes and stores different types of data:

- **Code & Technical Files**: Source code, documentation, codebases, and specifications processed on our servers.
- **Research Data**: Notes, findings, experiments, and hypotheses.
- **Memory Systems**: Embeddings, knowledge graphs, and indexes computed on our infrastructure to enable context-aware AI interactions and intelligent recall.
- **Conversations**: Chat history, prompts, AI-generated responses, and artifacts.
- **Collaboration Data**: Shared specs, reviews, team communications, and workflow patterns. May include metadata to improve services or as requested by your team.
- **Workflow & Recording Data**: Screen interactions, meeting transcripts, and usage patterns (only when you explicitly enable recording features).
- **Version Control Data**: Snapshots of computational states and reasoning chains to enable branching and rollback features.

As we continue developing Theatre, our policies may evolve—we'll keep you informed of any significant changes. Key principles include:

- **Privacy Mode**: Controls retention of metadata and processed data (embeddings, indexes, summaries). Your raw code and files are never stored permanently—only temporarily during active sessions for processing. Conversations are stored to serve them back to you, but can be deleted anytime. Never used for training, advertising, or sold to third parties.
- **Secure Storage**: All data encrypted in transit and at rest. Stored on regional servers (US, India, EU) based on your location.
- **Zero Retention with AI Providers**: We have legally binding zero data retention agreements with all third-party AI providers (OpenAI, Anthropic, Google, and xAI). They process your raw data to generate responses but cannot store or train on it. The raw content is deleted immediately after processing.
- **What We Store**: We store conversations to serve them back to you, and metadata/processed representations (embeddings, knowledge graphs, indexes) to avoid expensive recomputation and provide fast, intelligent features. Your raw code and files are only held in memory during active sessions.

# **Privacy Controls**

**Privacy Mode: Available to all users** (free and paid).

Privacy Mode controls how long we retain your data and whether it can be used for training. In both modes, your data is processed in the cloud to provide Theatre's features—the difference is in retention and usage.

**When Privacy Mode is enabled:**

Your conversations are stored to serve them back to you. Your raw code/files are processed but never permanently stored. We retain metadata and processed representations with time-limited retention:

- **Code & Files (Raw Data)**:
  - Sent to AI providers for processing, then immediately deleted by providers (zero retention agreement)
  - Held temporarily on our servers ONLY during active sessions (in-memory processing)
  - **Never written to permanent storage** - discarded when session ends
  - This allows Theatre to work with your code without storing it

- **Code & Files (Metadata/Processed Data)**:
  - Embeddings, indexes, and structural metadata computed to avoid expensive recomputation
  - Retained for up to 90 days of inactivity to power semantic search without re-processing
  - Contains mathematical representations, not your actual code
  - Automatically deleted after 90 days of inactivity or when you delete your account
  - **Why we store this**: Computing embeddings for large codebases is expensive. Storing these processed representations allows instant semantic search without re-processing your code every time.

- **Conversations**:
  - Full conversation history stored on our servers to serve back to you across sessions and devices
  - Retained until you explicitly delete them via the UI
  - Can be deleted individually or cleared entirely at any time

- **Conversation Metadata**:
  - Embeddings and summaries of conversations for search and context features
  - Retained for up to 30 days after conversation is deleted
  - Allows "search across conversations" without re-processing entire history
  - Deleted after 30 days or when you delete your account

- **Research & Experiments**:
  - Research content stored to serve back to you (similar to conversations)
  - Metadata and indexes retained for up to 90 days after project deletion
  - Enables continuity and search features
  - Can be deleted at any time

- **Memory Systems** (Embeddings, Knowledge Graphs):
  - These are processed representations computed from your data
  - Retained for up to 90 days of inactivity
  - **Why we store this**: Avoids recomputing expensive operations every session. Enables instant semantic search and context-aware features.
  - Automatically pruned after inactivity periods
  - Can be manually cleared at any time from settings

- **Version Control Snapshots**:
  - State metadata and reasoning chains for branching and rollback features
  - Retained for up to 180 days
  - Can be manually pruned or deleted at any time

- **Zero Training**: Your data (raw or processed) is never used to train our models or third-party models. Privacy Mode strictly prohibits all training use.
- **Zero Third-Party Retention**: AI providers process your raw data but must immediately delete it. They cannot store or train on it.
- **No Ads, No Sales**: Your data is never used for advertising, sold to third parties, or shared outside of delivering Theatre's services.

**This approach is standard practice**: Storing processed metadata (embeddings, indexes) while not storing raw data is how modern intelligent systems operate efficiently. The alternative—recomputing embeddings for your entire codebase on every request—would be prohibitively slow and expensive.

**When Privacy Mode is disabled:**

Same session-only storage for raw code/files, with extended retention of metadata for enhanced features:

- **Code & Files (Raw Data)**:
  - Still NEVER stored permanently—only during active sessions
  - Privacy Mode does NOT change raw file storage behavior
  - Raw code remains in-memory only during processing, then discarded

- **Code & Files (Metadata/Processed Data)**:
  - Embeddings and indexes retained **indefinitely** (until you delete projects or your account)
  - Provides persistent semantic search and codebase understanding
  - Eliminates need to recompute embeddings across sessions
  - Can be cleared at any time from settings

- **Conversations**:
  - Full conversation history stored indefinitely (until you delete them)
  - Same as Privacy Mode ON—conversations are always stored to serve back to you
  - Can be manually deleted or cleared at any time

- **Conversation Metadata**:
  - Embeddings, summaries, and patterns retained indefinitely
  - Enables long-term context and preference learning
  - Can be cleared at any time from settings

- **Memory Systems**:
  - Embeddings and knowledge graphs stored persistently
  - Provides fast, continuous semantic search without recomputation
  - These are processed representations, not raw content
  - Can be cleared at any time

- **Research & Experiments**:
  - Research content: Stored until you delete it (same as conversations)
  - Metadata: Retained indefinitely to build persistent knowledge graphs
  - Connects insights across time and projects

- **Version Control Snapshots**:
  - Full version history retained indefinitely
  - Enables branching and rollback features

- **Training (Explicit Opt-in)**:
  - You may opt-in to allow your data (conversations, metadata) to improve Theatre
  - Requires explicit consent through a separate setting
  - **Never includes raw code/files** (since those aren't stored anyway)
  - Training is never enabled by default

**You are always in control:**

- **AI Provider Consent**: Explicitly opt-in to each third-party AI provider (OpenAI, Anthropic, Google, xAI) before any data is sent. Choose which providers you trust and revoke access at any time.
- **Granular Control**: Enable Privacy Mode globally or per-project. Different projects can have different privacy settings.
- **Real-time Visibility**: See exactly what data is being processed, where it's being sent, and which AI providers are being used for each request.
- **Provider Restrictions**: Limit routing to specific providers, or use only FYDY's own models if you prefer.
- **Immediate Deletion**: Delete your account and all associated data at any time. Complete removal guaranteed within 30 days.
- **Session Management**: Force-end sessions and clear all temporary caches at any time.
- **Recording Features**: Screen recording, meeting transcription, and workflow capture are always opt-in and can be disabled at any time.

# **Understanding Data Types & Storage**

**What Theatre Stores (and Doesn't Store)**

Theatre's storage model balances privacy with performance:

**Raw Code & Files - NOT Permanently Stored:**
- Your source code, documentation, and specification files are **never written to permanent storage**
- Processed only in-memory during active sessions while you're working
- Sent to AI providers for processing, then immediately discarded by both the provider and our servers
- This applies to both Privacy Mode ON and OFF
- **Why**: Storing millions of lines of code permanently would be a massive privacy and security risk. We don't need to store your code to provide intelligent features—we only need the processed metadata.

**Conversations - Stored to Serve You:**
- Full conversation text stored on our servers
- **Why**: You expect to see your conversation history when you log in
- Retained until you explicitly delete them
- This is the same as email, messaging apps, or any service that stores user content
- Can be deleted individually or cleared entirely at any time

**Metadata & Processed Data - Stored for Performance:**

These are computational artifacts derived from your data, stored to avoid expensive recomputation:

1. **Embeddings**: Mathematical vector representations (arrays of numbers)
   - Example: Your code file → [0.234, -0.891, 0.445, ...] (thousands of numbers)
   - Used for semantic search ("find files related to authentication")
   - Computing embeddings for a large codebase can take minutes or hours
   - **Security note**: While embeddings are mathematical representations, recent research shows they may contain recoverable information. We treat embeddings with the same security rigor as sensitive data.

2. **Knowledge Graphs**: Structural relationships between concepts
   - Example: "file X imports function Y from module Z"
   - Enables intelligent suggestions and code navigation
   - Contains metadata and connections, not code content

3. **Indexes**: Search structures for fast lookup
   - Maps keywords/concepts to file locations
   - Avoids scanning your entire codebase on every search

4. **Summaries**: Condensed representations of conversations/research
   - Used for context without loading full conversation history
   - Example: "User is working on authentication feature for React app"

**Why Storing Processed Data is Necessary and Acceptable:**

Without storing metadata, Theatre would need to:
- Re-embed your entire codebase on every search query (minutes of delay)
- Re-index all files on every session (slow startup)
- Re-process conversation history to understand context (expensive, slow)

This would make the product unusable. Storing processed metadata is:
- ✅ **Industry standard practice** (VSCode, GitHub Copilot, Cursor all do this)
- ✅ **Privacy-preserving** (metadata cannot reconstruct your original code)
- ✅ **Performance-critical** (enables instant search and intelligent features)
- ✅ **User-controlled** (can be cleared at any time from settings)

**Storage Duration:**
- **Privacy Mode ON**: Metadata retained for 30-180 days depending on type
- **Privacy Mode OFF**: Metadata retained indefinitely for persistent features
- **Both modes**: All data (raw and metadata) deleted when you delete your account

# **Security Approach**

**Infrastructure & Regional Hosting**

Our servers are distributed regionally to ensure low latency and appropriate data residency:

- US servers (AWS/GCP) for US users.
- India servers (AWS/GCP) for Indian users.
- EU servers (AWS/GCP) for EU users.

All infrastructure is:

- Hosted on enterprise-grade cloud infrastructure (AWS and Google Cloud Platform).
- Encrypted in transit (TLS 1.3+) and at rest.
- SOC 2 Type II compliance in progress.
- Subject to regular security audits and penetration testing.
- Protected by network-level controls and least-privilege access policies.

**AI Providers & Request Routing**

Theatre can integrate with multiple AI providers to deliver optimal results. **Important**: We will always request your explicit opt-in before sending your data to third-party AI providers.

- **Explicit Opt-In Required**:
  - Before sending any data to third-party AI providers (OpenAI, Anthropic, Google Vertex, xAI), we will request your explicit consent
  - You can choose which providers you're comfortable with and revoke access at any time
  - Different features may require different providers—we'll always tell you which provider will process your data before you use the feature
  - **If you don't opt-in**: Theatre will only use our own infrastructure and custom models (hosted on Fireworks). Some advanced features that require specific third-party models may not be available.

- **Dynamic Routing (With Your Permission)**:
  - Once you've opted in to specific providers, requests may be routed to different AI providers based on the task
  - For example, if you've opted into both Claude and OpenAI, we may send chat requests to Claude and summarization to OpenAI for performance optimization
  - You'll always see which provider is being used in real-time
  - You can restrict routing to specific providers in settings

- **Zero Data Retention by AI Providers**:
  - AI providers receive your raw data (code snippets, conversation context, files) to process requests
  - They must immediately delete it after generating responses
  - Legally binding zero data retention agreements prohibit storage or training
  - This applies to all third-party providers we work with

- **What FYDY Stores**:
  - **NOT your raw code/files**: Only held in-memory during active sessions
  - **Conversations**: Stored to serve back to you (like email or messaging apps)
  - **Metadata**: Embeddings, indexes, summaries—stored to avoid expensive recomputation
  - See "Understanding Data Types & Storage" section for details
  - Your opt-in preferences and provider usage logs (for transparency)

- **Custom Models**:
  - Our custom models are hosted on Fireworks (US, Tokyo, Europe)
  - These models are trained only on conversation data from users who have explicitly opted in to training (never code/files, since those aren't stored)
  - Available to all users, even without third-party provider opt-in

- **Privacy Mode Routing**: When Privacy Mode is enabled, additional safeguards limit metadata retention periods as described above. Your provider opt-in preferences remain separate from Privacy Mode.

**What We Never Do**

- Sell or share your data with third parties for advertising or marketing.
- Train models on your data without explicit opt-in consent (and training never includes raw code/files since those aren't stored).
- Share content between different user accounts or organizations.
- Access your data outside of Theatre's explicitly documented features.
- Store your raw code or files permanently (only processed metadata is retained).
- Store data in regions outside your configured preference without consent.

**Your Rights**

You have comprehensive control over your data:

- **Access & Export**: Request and download all data we have about you in standard formats (JSON, CSV).
- **Correction**: Update or correct any inaccurate information.
- **Deletion**: Delete your account and all associated data at any time. We guarantee complete removal within 30 days (immediate deletion + backup cleanup).
- **Portability**: Export your data to use with other services.
- **Objection**: Object to specific types of processing and we will honor your request.

# **Terms of Service**

**Service Use**

- Theatre is provided "as-is" during our development phase. We're actively improving the platform and appreciate your patience.
- You retain all intellectual property rights to your code, research, and content. Theatre does not claim ownership of anything you create.
- We reserve the right to modify, add, or remove features as we improve the platform. We'll notify you of significant changes.
- Free tier and paid subscriptions are subject to fair use policies to ensure platform stability for all users.

**Acceptable Use**

Theatre is designed to help you build, research, and create. Please use it responsibly:

- Use Theatre for legitimate software development, research, and discovery purposes.
- Comply with all applicable laws and respect intellectual property rights.
- Do not use Theatre for illegal, harmful, or malicious activities.
- Do not attempt to reverse engineer, exploit vulnerabilities, or abuse rate limits.
- Do not share your account credentials or bypass security measures.

**Liability & Warranties**

- Theatre is provided without warranties of any kind, express or implied.
- We are not liable for any code, research, or content generated by AI systems through Theatre.
- You are responsible for reviewing and validating all AI-generated outputs before use.
- We are not responsible for data loss due to user error, though we maintain regular backups.
- Our total liability is limited to the amount you paid for Theatre in the past 12 months.

**Team & Enterprise Accounts**

- Team administrators can enforce Privacy Mode and access management policies for all team members.
- Organizations are responsible for ensuring their use of Theatre complies with their internal policies and regulations.
- Enterprise customers may have separate agreements with additional terms.
- **On-Premise & VPC Deployment**: Enterprise customers can request on-premise installations or VPC (Virtual Private Cloud) deployments for maximum data sovereignty and control. Contact [team@fydy.ai](mailto:team@fydy.ai) for enterprise deployment options.

# **Updates & Contact**

**Policy Updates**

We may update this Privacy Policy and Terms of Service as Theatre evolves. When we do:

- We'll update the "Last updated" date at the top of this page.
- For material changes, we'll notify you via email and/or prominent notice in the application.
- Continued use of Theatre after changes constitutes acceptance of the updated policies.

**Contact Us**

For questions, concerns, or requests related to privacy, security, or terms:

- **General Support**: [help@fydy.ai](mailto:help@fydy.ai).
- **Legal, Privacy & Security**: [team@fydy.ai](mailto:team@fydy.ai).

For detailed legal documentation, data processing agreements, or enterprise compliance information, please contact our team directly. Thank you for trusting Theatre with your work. We're committed to building tools that respect your privacy and amplify your capabilities.
