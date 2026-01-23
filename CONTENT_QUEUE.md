# Content Publishing Queue

Track content staged for publishing and social media posts to make.

## Staged Content (on `staging` branch)

### Ready to Publish

- [ ] **Agentic Design Patterns** (`src/content/technical/agentic-design-patterns.mdx`)
  - Technical deep-dive on 21 AI agent design patterns
  - Includes book review (9.2/10)
  - Amazon affiliate link: Yes
  - Social posts needed: 2-3

- [ ] **Cost Tracking Methodology** (`src/content/technical/cost-tracking-methodology.mdx`)
  - How we track real AI model costs
  - Transparency about our testing process
  - Links to open source tools
  - Social posts needed: 2-3

## Social Media Posts to Create

### For Agentic Design Patterns
- [ ] Post 1: Main announcement with book details + charity mention
- [ ] Post 2: Highlight specific patterns (Reflection, Tool Use, RAG)
- [ ] Post 3: Cost-effectiveness angle (how patterns save money)

### For Cost Tracking Methodology
- [ ] Post 1: "Behind the scenes" transparency angle
- [ ] Post 2: Real cost comparison example (GPT-4 vs GPT-3.5)
- [ ] Post 3: Open source tools announcement

### For AI Tools Repo Updates
- [ ] Post about cost tracking feature
- [ ] Example output showing savings analysis
- [ ] Link to GitHub repo

## Publishing Workflow

1. **Before merging to main:**
   - [ ] Test build locally (`npm run build`)
   - [ ] Review all links (especially affiliate links)
   - [ ] Spell check
   - [ ] Check images/charts render correctly

2. **Create social posts:**
   - [ ] Draft posts (see examples in this file)
   - [ ] Get post text ready to copy/paste
   - [ ] Include proper capitalization and punctuation

3. **Merge to main:**
   ```bash
   git checkout main
   git merge staging
   git push origin main
   ```

4. **Post to social media:**
   - [ ] X/Twitter (use drafts below)
   - [ ] Bluesky (use drafts below)
   - [ ] LinkedIn (optional, longer form)

5. **Update this file:**
   - [ ] Move published items to "Recently Published" section
   - [ ] Clear completed social posts

## Recently Published

(Move completed items here with publish date)

---

## Draft Social Posts

### Agentic Design Patterns - Post 1
**X/Twitter:**
```
Just finished Antonio Gulli's "Agentic Design Patterns" - best practical guide I've read on building AI agents.

21 patterns with working code. Production insights. Actual engineering, not hype.

All author royalties → Save the Children.

Full review: benchthebots.ai/technical/agentic-design-patterns
```

**Bluesky:**
```
"Agentic Design Patterns" by Antonio Gulli

The AI agent engineering book I wish existed 2 years ago.

9.2/10. Author royalties → Save the Children.

benchthebots.ai/technical/agentic-design-patterns
```

### Agentic Design Patterns - Post 2
**X/Twitter:**
```
The Reflection pattern alone is worth the price of this book.

Tested it: 73% fewer bugs in AI-generated code.

Pattern: Generate → Critique → Fix → Repeat

Simple. Powerful. Actually works.

From "Agentic Design Patterns" by Antonio Gulli

benchthebots.ai/technical/agentic-design-patterns
```

### Cost Tracking - Post 1
**X/Twitter:**
```
Every AI tool review I write includes real cost data.

Not estimates. Not "contact sales." Actual dollars spent running standardized tests.

Here's how that works: benchthebots.ai/technical/cost-tracking-methodology

Open source tools. Full transparency. No BS.
```

### Cost Tracking - Post 2
**X/Twitter:**
```
GPT-4 costs 52.5x more than GPT-3.5 Turbo for the same benchmark.

But does it perform 52x better?

Real data: benchthebots.ai/technical/cost-tracking-methodology

This is why we track actual costs, not marketing claims.
```

### AI Tools Repo
**X/Twitter:**
```
Built open source tools to benchmark AI models myself.

MMLU, GSM8K, HumanEval, TruthfulQA - test any model with the same standards.

Now includes automatic cost tracking.

Code: github.com/noelniles/ai-tools-testing

Real data beats marketing every time.
```

---

## Notes

- Posts on `staging` branch don't trigger automation
- Only `main` branch triggers social media workflow
- Use `[skip post]` in commit message to prevent auto-posting
- Check affiliate links before publishing (use `benchthebots-20` tag)
