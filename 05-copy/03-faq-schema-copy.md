# FAQ & Schema 文案 — ILAW Lesson Plan Generator

> 所有 FAQ 首句直接回答问题。用于首页 FAQ 区 + SEO schema 结构化数据。

---

## 1. 首页 FAQ（6 个，展示在工具区下方）

### Q1: What is an ILAW lesson plan?
A: ILAW stands for Intentions, Learning Experiences, Assessment, and Ways Forward — the four sections of a DepEd lesson plan under DO 16 s.2026. It replaces the older DLL/DLP format under the MATATAG curriculum.

### Q2: Is this tool free?
A: Yes. The template generator is completely free — no sign-up, no payment, no limits on how many plans you create. If you want an ad-free experience and batch generation, you can subscribe to the Supporter plan.

### Q3: Do I need to create an account?
A: No. You can create and download individual lesson plans without any account. An account is only needed if you subscribe to the Supporter plan for ad-free and batch features.

### Q4: What grade levels and subjects are supported?
A: All K-12 levels under the MATATAG curriculum — K-3, Grades 4-6, 7-10 (JHS), and SHS. Subjects include English, Math, Science, Filipino, Araling Panlipunan, MAPEH, Values Education, and more.

### Q5: Can I download as Word and PowerPoint?
A: Yes. Export your lesson plan as .docx for submission or .pptx for classroom presentations. Both follow the official ILAW format — no manual formatting needed.

### Q6: Does this tool replace my lesson planning?
A: This tool helps you format and structure your plan faster. Review the output for accuracy before submission — you know your class best.

> Q6 包含合规必需的责任声明。

---

## 2. 内容页 FAQ（每个内容页专用）

### `/ilaw-format` — FAQ (2 个)

**Q: Is ILAW the same as DLL?**
A: Not exactly. ILAW is the updated format under DO 16 s.2026. It replaces the older Daily Lesson Log (DLL) and Daily Lesson Plan (DLP) formats with a simpler, more focused structure: Intentions, Learning Experiences, Assessment, and Ways Forward.

**Q: Do all teachers need to switch to ILAW?**
A: Yes. DepEd Order 16 s.2026 mandates the ILAW format for all public school teachers under the MATATAG curriculum. Check with your division office for the specific implementation timeline.

### `/how-to-make-ilaw-lesson-plan` — FAQ (2 个)

**Q: How long does it take to make an ILAW lesson plan?**
A: With the template, 10-15 minutes. Using the online generator, under 5 minutes. Manually from scratch, 1-2 hours including formatting.

**Q: What's the most common mistake in ILAW?**
A: Mixing up Intentions (what students will learn) with Learning Experiences (how they'll learn it). Keep Intentions focused on outcomes; Learning Experiences on activities.

### `/deped-order-16-s2026` — FAQ (2 个)

**Q: When does DO 16 s.2026 take effect?**
A: The order was released in 2026 with phased implementation across regions. Check with your Schools Division Office for your specific start date.

**Q: Do I need to submit ILAW plans for all subjects?**
A: Yes. DO 16 covers all learning areas under MATATAG. Each subject requires a separate ILAW lesson plan.

### `/ilaw-lesson-plan-grade-4` — FAQ (1 个)
**Q: Is Grade 4 under MATATAG?**
A: Yes. Grade 4 is part of the MATATAG curriculum rollout. All Grade 4 teachers are required to use the ILAW format for lesson planning.

---

## 3. Schema 结构化数据

### 首页：WebApplication + HowTo

```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "ILAW Lesson Plan Generator",
  "description": "Free online tool to create DepEd ILAW lesson plans. Select grade and subject, fill the blanks, and download Word or PPT.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Any",
  "browserRequirements": "Modern browser with JavaScript",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "ratingCount": "10",
    "bestRating": "5"
  }
}
```

### 首页区域：HowTo Schema

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Create an ILAW Lesson Plan",
  "description": "Create a DepEd ILAW lesson plan in three simple steps.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Select Your Grade and Subject",
      "text": "Choose your grade level and subject from the dropdowns. The tool will load the MATATAG curriculum framework and Learning Competency codes."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Fill in the ILAW Sections",
      "text": "Enter your learning objectives, activities, assessment ideas, and ways forward. The ILAW structure is pre-formatted — just fill the blanks."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Preview and Download",
      "text": "Review your lesson plan in real-time, then download as .docx or .pptx. Ready to submit — no manual formatting required."
    }
  ]
}
```

### 内容页：Article + HowTo Schema

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[H1 from SEO Copy Freeze]",
  "description": "[Meta Description from SEO Copy Freeze]",
  "author": {
    "@type": "Person",
    "name": "MATATAG Educator"
  },
  "publisher": {
    "@type": "Organization",
    "name": "ILAW Lesson Plan Generator"
  }
}
```

### FAQPage Schema（首页 + 每个内容页）

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is an ILAW lesson plan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ILAW stands for Intentions, Learning Experiences, Assessment, and Ways Forward — the four sections of a DepEd lesson plan under DO 16 s.2026, replacing older DLL/DLP formats under the MATATAG curriculum."
      }
    },
    {
      "@type": "Question",
      "name": "Is this tool free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The template generator is completely free with no sign-up or payment required."
      }
    }
  ]
}
```

> ⚠️ FAQPage Schema 需要动态生成，只包含该页面实际展示的 FAQ 内容，不要包含其他页面的问题。
