# Show HN Post - Agentic Design Patterns

## Submission Details

**URL to Submit:**
```
https://benchthebots.ai/technical/agentic-design-patterns
```

**Optimal Posting Time:**
- Tuesday-Thursday, 9-11am EST
- Avoid Monday mornings and Friday afternoons
- Don't post on weekends

---

## Show HN Title

```
Show HN: Guide to 21 AI Agent Design Patterns with Working Code
```

**Alternative titles:**
- Show HN: The 21 Essential Patterns for Building AI Agents
- Show HN: AI Agent Design Patterns – From Chatbots to Production Systems
- Show HN: Building Real AI Agents (Not Just Fancy Chatbots)

---

## First Comment (Post Immediately After Submission)

```
Hey HN! I just published a technical series breaking down the 21 design patterns for building AI agents that actually work in production.

Background: I've been building agent systems for the past 2 years and just finished Antonio Gulli's "Agentic Design Patterns" book. This series walks through each pattern with working Python code.

What's covered:
- Part 1 (the roadmap): All 21 patterns explained - what separates real agents from glorified chatbots
- Part 2 (already live): Deep dive into foundational patterns with benchmarks - prompt chaining, routing, parallelization, reflection, tool use, planning, multi-agent

All code is on GitHub and runnable: https://github.com/ai-tools-reviews/agentic-design-patterns

Part 2 link: https://benchthebots.ai/technical/agentic-patterns-part-2-foundational

Key findings from my testing:
- Parallelization: 65% latency reduction for independent tasks
- Reflection pattern: 73% fewer bugs in code generation
- Multi-agent systems: 2x better quality vs single-agent on complex tasks

Happy to answer questions about implementation, performance, or where these patterns make sense vs. where they're overkill.
```

---

## Prepare for Common HN Questions

**"Why not just use LangChain/CrewAI/AutoGPT?"**
- Response: These frameworks abstract away the patterns, which is fine for prototyping but makes it harder to understand what's actually happening. I wanted to implement the patterns from scratch to understand the tradeoffs. That said, these frameworks implement many of these patterns under the hood.

**"What's the cost breakdown for running these patterns?"**
- Reflection pattern: ~3-7x more API calls but worth it for quality
- Parallelization: Same total calls but faster (concurrent)
- Multi-agent: 2-5x calls depending on architecture
- Have specific numbers ready from your testing

**"How does this compare to [specific framework]?"**
- Focus on patterns vs frameworks - these are the building blocks that frameworks use

**"Are these actually new or just renamed software patterns?"**
- Some are adapted from traditional software patterns (e.g., chain of responsibility), but applied specifically to LLM interactions with new considerations like token limits, latency, and non-deterministic outputs

**"Show me production metrics"**
- Be honest about what you've tested
- Share specific benchmarks from Part 2
- Admit limitations where they exist

---

## Remember

✅ Respond to every comment in the first 2 hours
✅ Be humble and honest about limitations  
✅ Share specific numbers/benchmarks when asked
✅ Be ready to engage for 2-3 hours after posting

❌ Don't be defensive if people criticize
❌ Don't promote other posts/products in comments
❌ Don't ask for upvotes anywhere
❌ Don't use marketing language
