# Introduction

Thank you for visiting our website! At FYDY ("Fuzzy Dynamics, Inc.", "our", "we", "us"), our sole concern is to make good new things for the world. We believe that truly good tools are built on trust—and trust requires transparency about how we handle the information you bring or create on Theatre. This isn't just about compliance; it's fundamental to building something worth using.

For detailed terms and policies, please contact us at [team@fydy.ai](mailto:team@fydy.ai).

Theatre is an AI platform for discovery and engineering with four integrated modes:

- **Explore**: Research, experimentation, and knowledge discovery with AI-powered synthesis, spatial reasoning, and collaborative intelligence.
- **Build**: Specification-driven development with agent hooks, code generation, and live review.
- **Review**: Human-in-the-loop navigation and review of code, research, and workflows to maintain agency over automated changes.
- **Plan**: Task and issue orchestration across platforms like Linear, GitHub, and Jira.

To provide these capabilities, Theatre processes and stores different types of data:

- **Code & Technical Files**: Source code, documentation, codebases, and specifications processed on our servers.
- **Research Data**: Notes, findings, experiments, hypotheses, and discovery artifacts from Explore mode.
- **Memory Systems**: Embeddings, knowledge graphs, and indexes computed on our infrastructure to enable context-aware AI interactions and intelligent recall.
- **Conversations**: Chat history, prompts, AI-generated responses, and artifacts.
- **Collaboration Data**: Shared specs, reviews, team communications, and workflow patterns. May include metadata to improve services or as requested by your team.
- **Workflow & Recording Data**: Screen interactions, meeting transcripts, and usage patterns (only when you explicitly enable recording features). Stored in the cloud unless local storage is technically feasible and you request it.
- **Version Control Data**: DITO (Dynamics and Information Tracker) provides version control for memory, compute states, and reasoning chains, similar to git for your computational environment.

As we continue developing Theatre, our policies may evolve—we'll keep you informed of any significant changes. Key principles include:

- **Privacy Mode**: When enabled, your data is processed in the cloud but retained only as long as functionally necessary to deliver Theatre's capabilities. Never used for training, advertising, or sold to third parties. Automatically deleted when you delete your account.
- **Secure Storage**: All data encrypted in transit and at rest. Stored on regional servers (US, India, EU) based on your location.
- **Human in the Loop**: Theatre is built around keeping humans in control. You decide what gets processed, shared, or automated.
- **Zero Retention with AI Providers**: We have legally binding zero data retention agreements with all third-party AI providers (OpenAI, Anthropic, Google, and xAI). They process your data but cannot store or train on it.

# **Privacy Controls**

**Privacy Mode: Available to all users** (free and paid).

Privacy Mode controls how long we retain your data and whether it can be used for training. In both modes, your data is processed in the cloud to provide Theatre's features—the difference is in retention and usage.

**When Privacy Mode is enabled:**

Your data is processed on our servers and sent to AI providers to deliver Theatre's capabilities, but with strict guarantees:

- **Code & Files**: Processed on our servers and sent to AI providers as needed. Retained only for the duration functionally necessary to deliver Theatre's features (such as maintaining context during active sessions, powering semantic search, or enabling real-time collaboration). Automatically deleted when no longer required for service operation or when you delete your account.
- **Memory Systems**: Embeddings, knowledge graphs, and indexes are computed on our servers to power intelligent features. Retained as long as needed to provide seamless context-aware assistance across your work. Deleted when you clear your data or delete your account.
- **Conversations**: Processed in the cloud to generate AI responses. May be retained to maintain context during active sessions. Deleted when you end sessions, clear history, or delete your account.
- **Research & Experiments**: Processed and stored on our servers to support ongoing research workflows. Retained to enable continuity across sessions. Deleted when you remove projects or delete your account.
- **DITO Version Control**: Snapshots of compute states, reasoning chains, and memory are stored to enable branching, rollback, and collaborative workflows. Retained to support version control features. Deleted when you prune history or delete your account.
- **Zero Training**: Your data is never used to train our models or third-party models. Privacy Mode strictly prohibits all training use.
- **Zero Third-Party Retention**: We have legally binding zero data retention agreements with all AI providers (OpenAI, Anthropic, Google, and xAI). They process your data to generate responses but cannot store or train on it.
- **No Ads, No Sales**: Your data is never used for advertising, sold to third parties, or shared outside of delivering Theatre's services to you.

**When Privacy Mode is disabled:**

Same cloud processing as Privacy Mode, with extended retention for enhanced features and the option to opt-in to training:

- **Code & Files**: Retained for extended periods to provide persistent codebase indexing, cross-device synchronization, improved context across sessions, and long-term project continuity. May be retained indefinitely until you delete projects or your account.
- **Memory Systems**: Embeddings and knowledge graphs stored persistently to provide fast, continuous semantic search and memory across sessions. Helps Theatre learn your codebase and research over time. You can clear these at any time from settings.
- **Conversations**: Stored to provide conversation history across devices and sessions, enabling Theatre to maintain context over longer periods and understand your preferences.
- **Research & Experiments**: Retained to build a persistent knowledge base that evolves with your work, connecting insights across time and projects.
- **DITO Version Control**: Full version history retained to enable comprehensive branching, time-travel debugging, and collaborative workflows.
- **Training (Explicit Opt-in)**: When Privacy Mode is disabled, you may opt-in to allow your data to be used to improve Theatre's models and features. This requires explicit consent through a separate setting. Training is never enabled by default.

**You are always in control:**

- **Granular Control**: Enable Privacy Mode globally or per-project. Different projects can have different privacy settings.
- **Real-time Visibility**: See exactly what data is being processed, where it's being sent, and which AI providers are being used.
- **Immediate Deletion**: Delete your account and all associated data at any time. Complete removal guaranteed within 30 days.
- **Session Management**: Force-end sessions and clear all temporary caches at any time.
- **Recording Features**: Screen recording, meeting transcription, and workflow capture are always opt-in and can be disabled at any time.

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

Theatre integrates with multiple AI providers to deliver optimal results. Important details:

- **Dynamic Routing**: Requests may be routed to different AI providers (OpenAI, Anthropic, Google Vertex, xAI) based on the task, even if you've selected a specific model. For example, if you select Claude in chat, we may still send summarization requests to OpenAI for performance optimization.
- **Zero Data Retention**: We have legally binding zero data retention agreements with all AI providers. They process your data only to fulfill the immediate request and cannot store or train on it.
- **Custom Models**: Some Theatre features use our custom models hosted on Fireworks (US, Tokyo, Europe). These models are trained only on data from users who have explicitly opted in to training.
- **Privacy Mode Routing**: When Privacy Mode is enabled, additional safeguards ensure no data is persisted by any provider.

**Memory Systems & Data Processing**

Theatre uses a layered memory architecture to provide intelligent, context-aware assistance. All processing happens in the cloud, with retention policies controlled by your Privacy Mode setting:

1. **Working Memory (Context Management)**:

   - Manages active context for your current tasks and sessions.
   - Enables Theatre to maintain coherent assistance across your work.
   - Privacy Mode ON: Retained as long as functionally necessary for active sessions and context continuity.
   - Privacy Mode OFF: May be retained longer to optimize cross-session performance.
   - Processed entirely on our secure infrastructure.

2. **Active Memory**:

   - Computational memory that enables intelligent recall, pattern recognition, and synthesis of information.
   - Powers Theatre's ability to act as a true collaborative partner rather than a simple chatbot.
   - Privacy Mode ON: Computed and retained as needed to deliver seamless assistance. Deleted when you clear data or delete your account.
   - Privacy Mode OFF: Retained persistently to improve performance and enable continuous learning about your work.
   - This is where intelligent processing happens - not just storage, but active computation.

3. **Persistent Storage** (Knowledge Graphs, Vector Databases, Embeddings):
   - Enables semantic search, context-aware suggestions, and long-term memory across your projects.
   - Privacy Mode ON: Computed on our servers and retained as functionally necessary. Deleted when you clear data or delete your account.
   - Privacy Mode OFF: Stored persistently to enable fast semantic search and evolving understanding of your work.
   - Stored with encrypted metadata and obfuscated file paths.
   - Can be cleared at any time from your settings.

**Codebase Indexing**: When enabled (can be disabled in settings), Theatre computes embeddings of your code on our servers to power semantic search and context-aware code generation. Privacy Mode controls retention policies and training permissions, not processing location. All computation happens in the cloud for performance and scale.

**What We Never Do**

- Sell or share your data with third parties for advertising or marketing.
- Train models on your code, research, or conversations without explicit opt-in consent.
- Share content between different user accounts or organizations.
- Access your files or data outside of Theatre's explicitly documented features.
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
