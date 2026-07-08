/**
 * ILAW 配方引擎 — ilawrecipe.js
 * 内容配方系统：按 年级 × 科目 × 原则 × 节数 输出差异化教案
 * 纯前端，零 API 成本，秒级生成
 */

// ============================================================
// 第一部分：内容库 — Intention（4 年级 × 8 科目 = 32 种）
// ============================================================

const INTENTION_DB = {
  // ── K-3 (Key Stage 1) ──
  k3: {
    english: {
      title: "Foundational Literacy",
      learning: "Learners develop foundational literacy skills through phonemic awareness, letter recognition, and simple word formation in meaningful contexts.",
      success: "By the end of the lesson, learners will be able to identify target letters/sounds and use them in simple words with teacher guidance.",
      focus: "emergent literacy — letter-sound relationships, print awareness, and oral language development."
    },
    math: {
      title: "Early Numeracy",
      learning: "Learners build early numeracy skills through concrete experiences with counting, comparing, and classifying objects in their environment.",
      success: "By the end of the lesson, learners will be able to count, compare, and sort objects with 80% accuracy using manipulatives.",
      focus: "early numeracy — one-to-one correspondence, number sense, and hands-on exploration."
    },
    science: {
      title: "Scientific Discovery",
      learning: "Learners observe and describe the natural world around them, developing curiosity and basic scientific thinking through sensory exploration.",
      success: "By the end of the lesson, learners will be able to identify and describe observable properties of objects or living things.",
      focus: "inquiry-based discovery — observation, classification, and wonder-driven exploration."
    },
    filipino: {
      title: "Maagang Literasiya",
      learning: "Nauunawaan ng mga mag-aaral ang mga pangunahing konsepto sa Filipino sa pamamagitan ng pagtukoy ng mga letra, salita, at payak na pangungusap.",
      success: "Sa pagtatapos ng aralin, ang mga mag-aaral ay inaasahang makababasa ng mga simpleng salita at makasusulat ng kanilang pangalan.",
      focus: "maagang literasiya — pagkilala ng letra, pagbuo ng salita, at oral na komunikasyon."
    },
    ap: {
      title: "Sarili at Pamilya",
      learning: "Nauunawaan ng mga mag-aaral ang konsepto ng pamilya at tahanan bilang unang komunidad na kanilang kinabibilangan.",
      success: "Sa pagtatapos ng aralin, ang mga mag-aaral ay makapaglalarawan ng mga kasapi ng pamilya at kanilang mga tungkulin.",
      focus: "pagkilala sa sarili at pamilya — konsepto ng komunidad at pagkakakilanlan."
    },
    mapeh: {
      title: "Creative Expression",
      learning: "Learners explore basic concepts of self-expression through movement, music, and art in a play-based environment.",
      success: "By the end of the lesson, learners will demonstrate understanding of rhythm, balance, or color through guided creative activities.",
      focus: "creative exploration — body awareness, rhythm, color recognition, and expressive movement."
    },
    values: {
      title: "Values Formation",
      learning: "Learners understand basic values such as sharing, honesty, and respect through stories, role-play, and classroom routines.",
      success: "By the end of the lesson, learners will demonstrate the target value through actions and words during class activities.",
      focus: "values formation — character building through stories, modeling, and practice."
    },
    other: {
      title: "Foundational Learning",
      learning: "Learners engage with the topic through hands-on, play-based activities that build foundational understanding and curiosity.",
      success: "By the end of the lesson, learners will demonstrate understanding of key concepts through guided practice and group participation.",
      focus: "play-based foundational learning — concrete experience, exploration, and oral expression."
    }
  },

  // ── Grades 4-6 (Key Stage 2) ──
  "g4-6": {
    english: {
      title: "Reading & Writing Development",
      learning: "Learners develop reading comprehension and written expression skills by analyzing texts, using context clues, and organizing ideas coherently.",
      success: "By the end of the lesson, learners will be able to identify main ideas, make inferences, and write a short paragraph demonstrating understanding.",
      focus: "reading comprehension and written expression — text analysis, grammar in context, and structured writing."
    },
    math: {
      title: "Procedural Fluency & Problem-Solving",
      learning: "Learners deepen mathematical understanding by applying operations, solving multi-step problems, and explaining their reasoning process clearly.",
      success: "By the end of the lesson, learners will correctly solve problems and explain their thinking using mathematical vocabulary.",
      focus: "procedural fluency and problem-solving — operations, word problems, and mathematical discourse."
    },
    science: {
      title: "Scientific Investigation",
      learning: "Learners investigate scientific concepts through guided experiments, data collection, and evidence-based reasoning in real-world contexts.",
      success: "By the end of the lesson, learners will conduct a simple investigation, record observations, and draw a conclusion supported by evidence.",
      focus: "scientific method — observation, experimentation, data recording, and evidence-based conclusions."
    },
    filipino: {
      title: "Pagbasa at Pagsulat",
      learning: "Napauunlad ng mga mag-aaral ang kanilang kasanayan sa pagbasa at pagsulat sa pamamagitan ng pag-unawa sa teksto at pagpapahayag ng sariling ideya.",
      success: "Sa pagtatapos ng aralin, ang mga mag-aaral ay makababasa nang may pag-unawa at makasusulat ng payak na talata tungkol sa paksa.",
      focus: "pagbasa at pagsulat — pag-unawa sa teksto, pagbuo ng talata, at pagpapahayag."
    },
    ap: {
      title: "Bansa at Kultura",
      learning: "Nauunawaan ng mga mag-aaral ang heograpiya, kultura, at kasaysayan ng Pilipinas sa pamamagitan ng pagsusuri ng mga mapa at primaryang sanggunian.",
      success: "Sa pagtatapos ng aralin, ang mga mag-aaral ay makapaghahambing ng mga lugar o kaganapan at makapagbibigay ng kanilang interpretasyon.",
      focus: "pag-aaral ng bansa — heograpiya, kultura, at pagpapahalaga sa pagkakakilanlang Pilipino."
    },
    mapeh: {
      title: "Skill Development & Expression",
      learning: "Learners develop skills in creative expression, physical coordination, and health awareness through structured practice and collaborative activities.",
      success: "By the end of the lesson, learners will demonstrate the target skill in a group performance or individual presentation.",
      focus: "skill development and creative expression — technique, coordination, teamwork, and health literacy."
    },
    values: {
      title: "Moral & Ethical Development",
      learning: "Learners examine moral values and ethical decision-making through real-life scenarios, group discussions, and reflective writing.",
      success: "By the end of the lesson, learners will identify the right action in a given scenario and explain their moral reasoning.",
      focus: "moral development — ethical reasoning, empathy, and responsible decision-making."
    },
    other: {
      title: "Conceptual Understanding",
      learning: "Learners engage with the subject matter through structured activities that build both conceptual understanding and practical application skills.",
      success: "By the end of the lesson, learners will demonstrate understanding of core concepts and apply them in a guided practice activity.",
      focus: "conceptual understanding with practical application — guided discovery and hands-on practice."
    }
  },

  // ── Grades 7-10 (Key Stage 3 / JHS) ──
  "g7-10": {
    english: {
      title: "Critical Literacy",
      learning: "Learners analyze literary and informational texts critically, constructing evidence-based interpretations and developing academic writing skills.",
      success: "By the end of the lesson, learners will produce a well-structured paragraph or short essay with a clear thesis, supporting evidence, and conclusion.",
      focus: "critical literacy — text analysis, argumentation, academic writing, and multimedia communication."
    },
    math: {
      title: "Abstract Reasoning & Application",
      learning: "Learners engage with abstract mathematical concepts through logical reasoning, pattern recognition, and real-world application of formulas and theorems.",
      success: "By the end of the lesson, learners will solve problems showing complete solutions with justifications for each logical step.",
      focus: "abstract reasoning and application — algebraic/geometric thinking, proof, and mathematical modeling."
    },
    science: {
      title: "Scientific Inquiry",
      learning: "Learners explore scientific principles through inquiry-based investigations, analyzing variables, and constructing evidence-based explanations.",
      success: "By the end of the lesson, learners will design and conduct an experiment, analyze data, and communicate findings using scientific language.",
      focus: "scientific inquiry — experimental design, data analysis, and evidence-based reasoning."
    },
    filipino: {
      title: "Panitikan at Akademikong Pagsulat",
      learning: "Nasusuri ng mga mag-aaral ang iba't ibang anyo ng panitikan at napauunlad ang kasanayan sa akademikong pagsulat sa pamamagitan ng pananaliksik at pagsusuri.",
      success: "Sa pagtatapos ng aralin, ang mga mag-aaral ay makasusulat ng isang maikling sanaysay na may wastong estruktura at malinaw na argumento.",
      focus: "panitikan at akademikong pagsulat — pagsusuri ng teksto, pananaliksik, at kritikal na pag-iisip."
    },
    ap: {
      title: "Social Analysis",
      learning: "Nasusuri ng mga mag-aaral ang mga isyung panlipunan, pangkabuhayan, at pampulitika sa Pilipinas at sa daigdig gamit ang mga konseptong pang-ekonomiya at pangkasaysayan.",
      success: "Sa pagtatapos ng aralin, ang mga mag-aaral ay makapagtatanggol ng isang posisyon sa isang isyung panlipunan gamit ang ebidensya.",
      focus: "pagsusuri ng lipunan — ekonomiks, kasaysayan, at pakikilahok sibiko."
    },
    mapeh: {
      title: "Specialization & Performance",
      learning: "Learners develop specialized skills in arts, music, physical education, or health through project-based learning and performance assessment.",
      success: "By the end of the lesson, learners will create or perform a piece demonstrating mastery of the target technique and creative interpretation.",
      focus: "specialization and performance — technique mastery, creative expression, and health advocacy."
    },
    values: {
      title: "Ethical Reasoning",
      learning: "Learners analyze complex ethical dilemmas and develop principled decision-making frameworks through case studies and structured debate.",
      success: "By the end of the lesson, learners will defend a position on an ethical issue using logical arguments and moral principles.",
      focus: "ethical reasoning — moral philosophy, critical analysis, and principled decision-making."
    },
    other: {
      title: "Higher-Order Thinking",
      learning: "Learners analyze complex concepts and develop higher-order thinking skills through research, discussion, and project-based application.",
      success: "By the end of the lesson, learners will synthesize information from multiple sources and present their findings in a structured format.",
      focus: "higher-order thinking — analysis, synthesis, evaluation, and academic discourse."
    }
  },

  // ── SHS (Senior High School) ──
  shs: {
    english: {
      title: "Academic & Professional Communication",
      learning: "Learners demonstrate academic and professional communication competence through research, critical analysis, and discipline-specific writing conventions.",
      success: "By the end of the lesson, learners will produce a discipline-appropriate academic output meeting standard conventions.",
      focus: "academic and professional communication — research writing, discourse analysis, and presentation skills."
    },
    math: {
      title: "Mathematical Modeling",
      learning: "Learners apply advanced mathematical concepts to model real-world phenomena, make predictions, and solve unstructured problems using appropriate technology.",
      success: "By the end of the lesson, learners will develop a mathematical model for a real-world scenario and present findings.",
      focus: "mathematical modeling — advanced reasoning, statistical analysis, and technology integration."
    },
    science: {
      title: "Research & Innovation",
      learning: "Learners engage with advanced scientific concepts and research methodologies, designing investigations that contribute to scientific knowledge.",
      success: "By the end of the lesson, learners will formulate a research question, design a methodology, and present preliminary findings.",
      focus: "research and innovation — scientific inquiry, experimental design, and academic presentation."
    },
    filipino: {
      title: "Pananaliksik at Malikhaing Pagpapahayag",
      learning: "Napauunlad ng mga mag-aaral ang kanilang kakayahang komunikatibo sa Filipino sa pamamagitan ng pananaliksik, pagsusuri ng diskurso, at malikhaing pagpapahayag.",
      success: "Sa pagtatapos ng aralin, ang mga mag-aaral ay makapaghaharap ng isang papel-pananaliksik o malikhaing akda na sumusunod sa akademikong pamantayan.",
      focus: "pananaliksik at malikhaing pagpapahayag — akademikong pagsulat, diskurso, at kritikal na pag-iisip."
    },
    ap: {
      title: "Contemporary Analysis",
      learning: "Nasusuri ng mga mag-aaral ang mga kontemporaryong isyu at hamon sa bansa at daigdig, at nakabubuo ng mga posisyong may matibay na batayan.",
      success: "Sa pagtatapos ng aralin, ang mga mag-aaral ay makabubuo ng isang policy brief o position paper na nagpapakita ng malalim na pag-unawa.",
      focus: "kontemporaryong pagsusuri — patakaran, pamamahala, at pakikilahok sibiko."
    },
    mapeh: {
      title: "Holistic Development",
      learning: "Learners integrate arts, health, and physical education concepts to develop holistic well-being, creative industries awareness, and lifelong fitness habits.",
      success: "By the end of the lesson, learners will design a personal wellness plan or creative portfolio demonstrating application of concepts.",
      focus: "holistic development — creative industries, wellness planning, and lifelong fitness."
    },
    values: {
      title: "Principled Leadership",
      learning: "Learners develop principled leadership and civic responsibility through analysis of social issues, ethical frameworks, and community engagement.",
      success: "By the end of the lesson, learners will formulate a personal action plan addressing a community issue based on ethical principles.",
      focus: "principled leadership — civic engagement, ethical frameworks, and social responsibility."
    },
    other: {
      title: "Advanced Specialization",
      learning: "Learners engage with specialized subject matter at an advanced level, developing analytical frameworks and producing scholarly or professional outputs.",
      success: "By the end of the lesson, learners will produce a structured academic or professional output demonstrating mastery of the subject.",
      focus: "advanced specialization — scholarly inquiry, professional application, and critical analysis."
    }
  }
};


// ============================================================
// 第二部分：课堂活动池（按年级分，每个阶段 5 种变体）
// ============================================================

const ACTIVITY_POOLS = {
  k3: {
    opening: [
      "Sing a welcome song or chant related to the topic to capture attention and build routine.",
      "Show a picture book or big book introducing the concept through a short shared reading.",
      "Ask an open-ended question and invite learners to share through show-and-tell or picture talk.",
      "Play a simple movement game or finger play that connects to the day's learning objective.",
      "Present a mystery object or picture and ask learners to describe what they see, hear, or feel."
    ],
    presentation: [
      "Teacher presents the new concept using pictures, flashcards, or real objects while learners observe and listen.",
      "Use a big book or wall chart to introduce the concept, pointing to key features and asking simple questions.",
      "Demonstrate the skill step by step using concrete materials, narrating each action clearly for learners.",
      "Show a short educational video or interactive presentation, pausing to ask comprehension questions.",
      "Use a flannel board or magnetic board to visually build the concept piece by piece."
    ],
    guided: [
      "Learners practice with teacher guidance using worksheets or manipulatives, with immediate feedback.",
      "Small group activity with teacher facilitation: learners sort, match, or identify target items together.",
      "Whole-class response activity where learners use actions, gestures, or individual whiteboards to respond.",
      "Pair work: learners take turns practicing the target skill while teacher circulates and supports.",
      "Learning center rotation: small groups visit stations with different hands-on practice activities."
    ],
    independent: [
      "Learners complete a simple worksheet or activity page independently while teacher observes and assists.",
      "Learners draw, color, or create something related to the concept, demonstrating understanding creatively.",
      "Individual hands-on activity: learners manipulate objects or complete a puzzle related to the learning target.",
      "Learners trace, write, or copy target letters, words, or numbers in their activity books.",
      "Learners complete a simple cut-and-paste or matching activity independently at their seats."
    ],
    closing: [
      "Learners share their work with the class, explaining what they did and what they learned.",
      "Sing a closing song or chant that reviews the key concept from the lesson.",
      "Quick oral review: teacher asks learners to name one thing they learned or enjoyed today.",
      "Movement-based review game where learners show answers through actions (thumbs up/down, stand/sit).",
      "Teacher leads a brief recap using the 'What? So What? Now What?' framework at learner level."
    ]
  },

  "g4-6": {
    opening: [
      "Begin with a 5-minute review activity (quiz, quick write, or pair discussion) to activate prior knowledge.",
      "Present a real-world scenario, image, or short video that sparks curiosity and connects to the lesson.",
      "Pose a thought-provoking question and use think-pair-share to surface prior knowledge and misconceptions.",
      "Use a K-W-L chart (Know-Want to Know-Learned) to activate schema and set a purpose for the lesson.",
      "Present a problem or puzzle related to the topic and ask learners to attempt an initial solution."
    ],
    presentation: [
      "Teacher presents the concept through direct instruction with worked examples, visual aids, and guided practice.",
      "Use an anchor chart or graphic organizer to visually map out the concept, modeling each step clearly.",
      "Demonstrate the skill with think-alouds, explaining the reasoning process behind each decision.",
      "Present a multimedia resource (video, interactive simulation, or digital presentation) with embedded questions.",
      "Use a gradual release model: teacher models one example, then works through another with class input."
    ],
    guided: [
      "Learners work in small groups to solve problems, analyze texts, or complete experiments with assigned roles.",
      "Station rotation: learners rotate through learning stations, each targeting a different sub-skill or application.",
      "Guided practice with structured worksheets: teacher works through first items with class, then releases gradually.",
      "Peer tutoring in pairs: stronger learners support classmates using structured guiding questions.",
      "Whole-class collaborative activity using response cards, mini-whiteboards, or digital polling."
    ],
    independent: [
      "Learners complete a practice set or worksheet independently, applying the skill without teacher assistance.",
      "Learners write a short response, paragraph, or reflection demonstrating their understanding of the concept.",
      "Individual project task: learners create a product, model, or visual representation of the concept.",
      "Problem-solving task: learners apply the concept to a new scenario or real-world situation.",
      "Learning log entry: learners document their process, strategies used, and questions that remain."
    ],
    closing: [
      "Learners complete an exit slip with 2-3 questions assessing understanding of the day's key concepts.",
      "Learners explain the key concept to a partner using the 'Teach It' strategy to reinforce understanding.",
      "Learners write a short reflection noting what they understood and what still confuses them.",
      "Quick formative quiz (multiple choice, true/false) with immediate feedback to check whole-class understanding.",
      "Teacher leads a whole-class summary discussion, identifying the most important takeaways."
    ]
  },

  "g7-10": {
    opening: [
      "Begin with a diagnostic activity (short quiz, concept map, or discussion) revealing prior knowledge and misconceptions.",
      "Present a real-world case study or current event illustrating the relevance of the lesson topic.",
      "Pose a debatable question and have learners take an initial stance, justifying their position briefly.",
      "Show a short video clip, infographic, or news article and facilitate a guided analysis discussion.",
      "Present an authentic problem or scenario that requires concepts from today's lesson to solve."
    ],
    presentation: [
      "Teacher facilitates guided discussion and inquiry, challenging learners to explain, justify, and critique ideas.",
      "Use a structured lecture with embedded pauses for pair discussion, questioning, and concept checks.",
      "Demonstrate analytical frameworks using primary sources, data sets, or discipline-specific texts.",
      "Present a problem-solving approach step by step, then have learners apply it to a similar problem.",
      "Use a Socratic questioning approach to guide learners toward discovering the concept themselves."
    ],
    guided: [
      "Collaborative group work using protocols: jigsaw, gallery walk, or Socratic seminar for distributed learning.",
      "Structured investigation: learners conduct experiments, research, or analyses with guided protocols.",
      "Small group problem-solving with accountable talk structures ensuring rigorous academic discourse.",
      "Think-pair-share-square: individual thinking, pair discussion, then quad sharing and synthesis.",
      "Teacher-facilitated workshop: mini-lesson followed by work time with targeted teacher conferencing."
    ],
    independent: [
      "Learners apply concepts to novel problems or scenarios, demonstrating transfer of learning.",
      "Independent research task: learners gather, analyze, and synthesize information from multiple sources.",
      "Analytical writing task: learners construct an evidence-based argument or interpretation.",
      "Project milestone: learners complete a defined project component with self-assessment against criteria.",
      "Reflective journal entry using a structured prompt connecting the lesson to personal learning."
    ],
    closing: [
      "Learners write a structured reflection connecting the lesson to their own learning journey.",
      "Formative assessment quiz checking both factual recall and conceptual understanding.",
      "Learners create a one-page synthesis or concept map showing connections to previous learning.",
      "Whole-class discussion synthesizing key findings and addressing remaining misconceptions.",
      "Peer assessment using a rubric with written feedback for improvement."
    ]
  },

  shs: {
    opening: [
      "Begin with a pre-assessment or diagnostic task that surfaces existing knowledge and frames the learning trajectory.",
      "Present a complex case study, research finding, or industry problem that frames the day's inquiry question.",
      "Pose a controversial or nuanced question. Learners write an initial position statement before new material.",
      "Present data sets, research abstracts, or primary sources for initial analysis before formal instruction.",
      "Present a professional or academic scenario requiring application of advanced concepts from the lesson."
    ],
    presentation: [
      "Socratic seminar or academic discussion using primary sources, research papers, or discipline-specific texts.",
      "Lecture with integrated discussion: present theoretical framework, then challenge learners to apply it critically.",
      "Demonstrate analytical methodology using real research data, walking through each step of the analysis.",
      "Use the case method: present a complex case, guide analysis, and debrief with theoretical connections.",
      "Workshop format: brief input followed by application, with teacher circulating for targeted coaching."
    ],
    guided: [
      "Academic discourse protocols: fishbowl, debate, panel discussion, or structured academic controversy.",
      "Guided research workshop: learners formulate questions, gather data, analyze findings with peer feedback.",
      "Small group case analysis: groups analyze different aspects of a case, then present to the whole class.",
      "Protocol-based peer review: learners critique each other's work using discipline-appropriate rubrics.",
      "Structured collaborative inquiry: groups investigate different dimensions of a shared research question."
    ],
    independent: [
      "Extended research or writing task with milestones: proposal, draft, peer review, revision, final submission.",
      "Learners synthesize multiple sources or perspectives into a coherent framework, model, or argument.",
      "Project-based task: learners develop a professional-quality output (paper, presentation, or creative work).",
      "Problem-solving task requiring integration of multiple concepts and methodologies.",
      "Portfolio entry: learners document their process, decisions, and reflections on their learning."
    ],
    closing: [
      "Metacognitive reflection: learners document strategies used, questions remaining, and application plans.",
      "Summative assessment task or performance-based assessment aligned with college/career readiness standards.",
      "Synthesis task: learners integrate the lesson into a framework or model demonstrating mastery.",
      "Structured peer review using discipline-appropriate rubrics, preparing for academic peer review processes.",
      "Application task: learners transfer learning to a real-world professional or academic context."
    ]
  }
};


// ============================================================
// 第三部分：Assessment 内容池
// ============================================================

const ASSESSMENT_POOLS = {
  k3: {
    formative: [
      "Teacher observation during center activities using a simple checklist or anecdotal notes.",
      "Thumbs up/down or facial expression checks after each segment of the lesson.",
      "Oral questioning during group activities to check for understanding.",
      "Learner drawings or simple written responses as evidence of learning.",
      "One-on-one quick checks while learners work at centers or independently."
    ],
    summative: [
      "Performance-based assessment through a hands-on task or creative output.",
      "Oral assessment where learners explain or demonstrate what they learned.",
      "Portfolio collection of learner work samples over the unit or term.",
      "Simple rubric-based assessment of a final product or creative work."
    ],
    differentiation: "Assessment tasks offer multiple response modes: verbal, visual, kinesthetic, or with teacher scribing. Success measured against individual growth."
  },
  "g4-6": {
    formative: [
      "Exit tickets with 2-3 targeted questions assessing the day's learning objective.",
      "Whiteboard responses during whole-class instruction for immediate feedback.",
      "Peer assessment using simple criteria checklists during pair work.",
      "Teacher observation with running records during group activities.",
      "Quick-writes or journal entries capturing learner understanding."
    ],
    summative: [
      "Written quiz (multiple choice, short answer, problem-solving) with 5-10 items.",
      "Performance task or project with rubric-aligned assessment criteria.",
      "Unit test covering key competencies with a mix of question types.",
      "Portfolio submission with self-assessment and teacher feedback."
    ],
    differentiation: "Assessment tasks tiered by complexity. Learners may demonstrate understanding through written, oral, or visual formats."
  },
  "g7-10": {
    formative: [
      "3-2-1 exit cards: 3 things learned, 2 questions, 1 connection made.",
      "Mini-whiteboard responses to check procedural and conceptual understanding.",
      "Peer evaluation using structured rubrics during collaborative work.",
      "Quick-write responding to a prompt related to the lesson's key concept.",
      "Teacher observation with targeted questioning during group investigations."
    ],
    summative: [
      "Written summative assessment with multiple-choice, short answer, and extended response items.",
      "Performance-based assessment: research paper, experiment report, or analytical essay.",
      "Project-based assessment with milestones: proposal, draft, peer review, final submission.",
      "Oral defense or presentation with questioning by teacher and peers."
    ],
    differentiation: "Tiered assessments with options for demonstrating mastery. Extended time and scaffolding available as needed."
  },
  shs: {
    formative: [
      "One-minute papers or muddiest-point reflections to identify areas needing clarification.",
      "Discipline-specific diagnostic tasks revealing depth of understanding.",
      "Peer review of drafts using academic rubrics and feedback protocols.",
      "Concept mapping or framework synthesis to check integration of ideas.",
      "Socratic questioning during seminar discussions to probe understanding depth."
    ],
    summative: [
      "Research paper, thesis, or capstone project with multiple revision cycles.",
      "Comprehensive examination with analysis, synthesis, and evaluation items.",
      "Portfolio-based assessment demonstrating growth and mastery over time.",
      "Oral defense or professional presentation with Q&A panel."
    ],
    differentiation: "Flexible assessment pathways aligned with UDL. Learners negotiate assessment format with teacher. Mastery-based grading with revision opportunities."
  }
};


// ============================================================
// 第四部分：Ways Forward 内容池
// ============================================================

const WAYSFORWARD_POOLS = {
  k3: {
    remediation: [
      "One-on-one or small group reteaching with additional manipulatives and visual supports.",
      "Simplify the task and provide additional guided practice with teacher assistance.",
      "Peer tutoring where a more confident learner helps a classmate during center time.",
      "Send home a simple practice activity with parent/guardian instructions.",
      "Repeat the activity with different materials to reinforce understanding."
    ],
    enrichment: [
      "Extension activities at learning centers for learners who finish early.",
      "Challenge learners to teach the concept to a friend (peer teaching opportunity).",
      "Open-ended exploration task related to the topic for deeper investigation.",
      "Include the concept in daily routines and transitions for additional practice.",
      "Advanced materials (more complex books, puzzles, or activities) for ready learners."
    ],
    reflection: "Learners draw or talk about what they learned. Teacher notes observations for next lesson's differentiation."
  },
  "g4-6": {
    remediation: [
      "Small group reteaching with targeted instruction on identified gaps from formative assessment.",
      "Additional guided practice with worked examples and step-by-step scaffolds.",
      "Peer tutoring with structured protocols: tutor explains, tutee practices, then switch roles.",
      "Modified worksheets or tasks with reduced complexity and additional visual supports.",
      "Online practice resources or learning videos assigned for home review."
    ],
    enrichment: [
      "Challenge problems or extension tasks requiring higher-order thinking (analysis, evaluation).",
      "Independent research or project extension related to the lesson topic.",
      "Cross-curricular connections extending the concept to other subject areas.",
      "Learner-led teaching: prepare a mini-lesson or demonstration for the class.",
      "Advanced reading materials or digital resources for self-directed exploration."
    ],
    reflection: "Exit slip data informs next lesson's differentiation. Learners set one goal for improvement."
  },
  "g7-10": {
    remediation: [
      "Targeted small group instruction focusing on specific gaps from formative assessment data.",
      "Structured reteaching with modified materials, additional models, and scaffolded practice.",
      "Peer tutoring using 'Expert-Novice' protocol with structured questions and checks.",
      "Supplementary practice sets with answer keys for self-checking and independent review.",
      "Online tutorials, videos, or interactive modules for independent remediation."
    ],
    enrichment: [
      "Extended investigation or research project deepening understanding of the topic.",
      "Cross-disciplinary connections: apply the concept to another subject or real-world context.",
      "Learner-designed lessons or presentations on advanced aspects of the topic.",
      "Participation in academic competitions, fairs, or contests related to the topic.",
      "Mentorship connection: interview a professional or researcher in the field."
    ],
    reflection: "Structured reflection: Description, Feelings, Evaluation, Analysis, Conclusion, Action Plan."
  },
  shs: {
    remediation: [
      "Individualized learning plans with targeted interventions based on diagnostic data.",
      "Tutorial sessions with scaffolded materials focused on specific competency gaps.",
      "Peer mentoring with senior learners using structured protocols.",
      "Supplementary readings, video lectures, and practice sets for independent review.",
      "Office hours or one-on-one conferencing for personalized support and goal setting."
    ],
    enrichment: [
      "Independent research project with mentorship leading to a scholarly output.",
      "Internship, fieldwork, or community engagement opportunity related to the subject.",
      "Publication or presentation opportunity: student journal or conference submission.",
      "Advanced coursework or certification programs (online courses, workshops).",
      "Leadership role: serve as peer tutor, teaching assistant, or workshop facilitator."
    ],
    reflection: "Metacognitive portfolio entry: document learning process, strategies, challenges, and future goals."
  }
};


// ============================================================
// 第五部分：设计原则 → 内容映射（7 原则 × 4 年级 = 28 条）
// ============================================================

const PRINCIPLES_DB = {
  k3: {
    "Clear Goals": "Learning objectives are stated simply and visually. A 'What We Will Learn Today' chart is displayed and reviewed at the end.",
    "Scaffolding": "Teacher provides step-by-step modeling (I do → We do → You do). Visual cues and sentence starters support learners at each stage.",
    "Checks for Understanding": "Teacher asks frequent questions (thumbs up/down, show fingers) and observes center work to adjust pacing in real time.",
    "Active Retrieval": "Learners recall prior learning through quick review games, naming what they remember from the previous lesson.",
    "Social Learning": "Learners work in pairs or small groups, practicing turn-taking, sharing materials, and helping classmates.",
    "Values & Purpose": "The lesson connects to real-life situations and emphasizes positive values such as sharing, helping, or caring for others.",
    "Inclusion": "Activities offer multiple ways to participate — drawing, speaking, moving, or pointing. Materials adapted for varied learning needs."
  },
  "g4-6": {
    "Clear Goals": "Learning objectives and success criteria are displayed and discussed at the start. Learners self-assess against criteria at the end.",
    "Scaffolding": "I do → We do → You do structure. Anchor charts, graphic organizers, and sentence frames support learners during guided practice.",
    "Checks for Understanding": "Embedded formative checks every 10-15 minutes using whiteboards, hand signals, or quick-writes to gauge understanding.",
    "Active Retrieval": "Daily 'Do Now' activities, weekly review quizzes, and cumulative connections to prior topics reinforce long-term retention.",
    "Social Learning": "Structured cooperative learning (think-pair-share, jigsaw, numbered heads together) ensures all learners participate meaningfully.",
    "Values & Purpose": "Lessons connect to real-world applications, career relevance, or community impact to deepen learner motivation.",
    "Inclusion": "Differentiated tasks tiered by complexity, flexible grouping, and multiple response formats ensure all learners access the content."
  },
  "g7-10": {
    "Clear Goals": "Learning targets in student-friendly language with exemplars of quality work. Learners track progress against targets.",
    "Scaffolding": "Complex tasks chunked with graphic organizers, sentence frames, and model responses. Support fades as learners gain confidence.",
    "Checks for Understanding": "Mini-whiteboard responses, exit tickets, and '3-2-1' summaries. Teacher adjusts pacing based on real-time data.",
    "Active Retrieval": "Low-stakes retrieval practice (brain dumps, flashcards, concept maps) at lesson start to strengthen long-term memory.",
    "Social Learning": "Accountable talk structures, Socratic seminars, and collaborative protocols ensure rigorous academic discourse among peers.",
    "Values & Purpose": "Lessons connect to personal relevance, career pathways, or civic engagement. Learners reflect on why the content matters.",
    "Inclusion": "Universal Design for Learning (UDL) principles: multiple means of representation, expression, and engagement for diverse learners."
  },
  shs: {
    "Clear Goals": "Learning targets framed as 'I can' statements at analysis/synthesis/evaluation level. Rubrics co-constructed with learners.",
    "Scaffolding": "Zone of Proximal Development approach with tiered readings, structured note-taking templates, and guided research protocols.",
    "Checks for Understanding": "One-minute papers, muddiest point, and application checks. Data informs next-day differentiation strategies.",
    "Active Retrieval": "Interleaved practice across topics, cumulative assessments, and spaced review building deep, durable learning.",
    "Social Learning": "Academic discourse protocols (fishbowl, debate, panel discussion) modeling college and professional communication norms.",
    "Values & Purpose": "Lessons connect to career pathways, higher education readiness, and authentic civic or professional applications.",
    "Inclusion": "Flexible pathways for demonstrating mastery (written, oral, multimedia, project-based) aligned with UDL framework."
  }
};


// ============================================================
// 第六部分：生成引擎
// ============================================================

/**
 * 确定性选择：相同 seed 永远选同一项
 */
function pick(arr, seed) {
  if (!arr || arr.length === 0) return "";
  return arr[Math.abs(seed) % arr.length];
}

/**
 * 生成教案
 */
function generateILAW(input) {
  const grade = input.gradeLevel || "g4-6";
  const subject = input.subject || "english";
  const principles = input.principles || [];
  const lcCode = input.lcCode || "";
  const term = input.term || "1";
  const week = input.week || "1";
  const sessions = input.sessions || 1;

  // 确定性种子：grade + subject + sessions + 固定偏移 → 相同输入=相同输出
  const seed = (grade.charCodeAt(0) * 1000) + (subject.charCodeAt(0) * 100) + (sessions * 10);

  // ---- I: Intention ----
  const intent = INTENTION_DB[grade]?.[subject] || INTENTION_DB["g4-6"]?.english || {};
  const intention = `
    <p><strong>Learning Intention:</strong> ${intent.learning || "Learners will understand the key concepts of the lesson."}</p>
    <p><strong>Success Criteria:</strong> ${intent.success || "By the end of the lesson, learners will demonstrate understanding through guided activities."}</p>
    <p><strong>Focus:</strong> ${intent.focus || "Conceptual understanding through structured activities."}</p>
    ${lcCode ? `<p><strong>LC Code:</strong> ${lcCode}</p>` : ""}
    <p><strong>Duration:</strong> ${sessions === 1 ? "45 minutes" : sessions * 45 + " minutes (" + sessions + " sessions)"}</p>
  `;

  // ---- L: Learning Experiences (含时间分配) ----
  const acts = ACTIVITY_POOLS[grade] || ACTIVITY_POOLS["g4-6"];
  const perSessionMin = sessions === 1 ? 45 : Math.min(45, Math.floor(60 / sessions));
  const openTime = Math.round(perSessionMin * 0.12);
  const presTime = Math.round(perSessionMin * 0.22);
  const guideTime = Math.round(perSessionMin * 0.33);
  const indTime = Math.round(perSessionMin * 0.22);
  const closeTime = Math.max(5, perSessionMin - openTime - presTime - guideTime - indTime);

  // 每个环节从池中选一个
  const openAct = pick(acts.opening, seed);
  const presAct = pick(acts.presentation, seed + 1);
  const guideAct = pick(acts.guided, seed + 2);
  const indAct = pick(acts.independent, seed + 3);
  const closeAct = pick(acts.closing, seed + 4);

  // 原则段落
  let principlesHtml = "";
  if (principles.length > 0) {
    const pdb = PRINCIPLES_DB[grade] || PRINCIPLES_DB["g4-6"];
    const matched = principles
      .map(p => pdb[p] ? `<li><strong>${p}:</strong> ${pdb[p]}</li>` : "")
      .filter(Boolean);
    if (matched.length > 0) {
      principlesHtml = `<p><strong>Learning Design Principles:</strong></p><ul>${matched.join("")}</ul>`;
    }
  }

  const learningExperiences = `
    <ol style="padding-left:1.2rem;margin:0.5rem 0;">
      <li><strong>Opening (${openTime} min):</strong> ${openAct}</li>
      <li><strong>Presentation (${presTime} min):</strong> ${presAct}</li>
      <li><strong>Guided Practice (${guideTime} min):</strong> ${guideAct}</li>
      <li><strong>Independent Practice (${indTime} min):</strong> ${indAct}</li>
      <li><strong>Closing (${closeTime} min):</strong> ${closeAct}</li>
    </ol>
    ${principlesHtml}
  `;

  // ---- A: Assessment ----
  const assessPool = ASSESSMENT_POOLS[grade] || ASSESSMENT_POOLS["g4-6"];
  const formPick = pick(assessPool.formative, seed + 5);
  const summPick = pick(assessPool.summative, seed + 6);
  const assessment = `
    <p><strong>Formative Assessment:</strong> ${formPick}</p>
    <p><strong>Summative Assessment:</strong> ${summPick}</p>
    <p><strong>Differentiation:</strong> ${assessPool.differentiation}</p>
  `;

  // ---- W: Ways Forward ----
  const wfPool = WAYSFORWARD_POOLS[grade] || WAYSFORWARD_POOLS["g4-6"];
  const remPick = pick(wfPool.remediation, seed + 7);
  const enrichPick = pick(wfPool.enrichment, seed + 8);
  const waysForward = `
    <p><strong>Remediation (for learners needing support):</strong> ${remPick}</p>
    <p><strong>Enrichment (for learners ready to advance):</strong> ${enrichPick}</p>
    <p><strong>Reflection:</strong> ${wfPool.reflection}</p>
  `;

  return {
    meta: { grade, subject, term, week, sessions, lcCode, principles },
    intention,
    learningExperiences,
    assessment,
    waysForward,
    // 纯文本版（用于统计）
    _seed: seed
  };
}


// ============================================================
// 第七部分：统计差异化能力
// ============================================================

function calculateVariations() {
  const grades = Object.keys(INTENTION_DB);         // 4
  const subjects = Object.keys(INTENTION_DB.k3);     // 8
  const principlesCount = 7;                          // 7
  const allPrinciples = Object.keys(PRINCIPLES_DB.k3);// 7

  // ---- Intention 差异 ----
  // 每个年级 × 每个科目 → 不同内容
  const uniqueIntentions = grades.length * subjects.length;  // 4 × 8 = 32

  // ---- Activity 差异 ----
  // 每个年级有独立的 5 个环节，每个环节 5 个变体
  // 但只有"年级"级别的差异是显著的（K-3 vs G4-6 vs G7-10 vs SHS）
  const gradeActivityPools = Object.keys(ACTIVITY_POOLS).length;  // 4
  const activitiesPerGrade = 5 * 5 * 5 * 5 * 5;  // 5 openings × 5 presentations × ... = 3125
  // 但 3125 种变体只是同一"类型"活动的不同措辞
  // 实际有意义的差异 = 每个环节的活动类型不同

  const meaningfullyDifferentActivities = 4;  // 4 个年级各有不同活动类型

  // ---- Assessment 差异 ----
  const assessGradePools = Object.keys(ASSESSMENT_POOLS).length;  // 4
  const assessPerGrade = 5 * 4;  // 5 formative × 4 summative = 20

  // ---- Ways Forward 差异 ----
  const wfGradePools = Object.keys(WAYSFORWARD_POOLS).length;  // 4
  const wfPerGrade = 5 * 5;  // 5 remediation × 5 enrichment = 25

  // ---- Principles 差异 ----
  // 2^7 = 128 种勾选组合
  // 但很多组合效果相似（比如只选1个 vs 选2个差别不大）
  const principleCombos = Math.pow(2, principlesCount);  // 128

  // ---- 总组合数（含变体措辞） ----
  // 4 grade × 8 subject × 3125 activities × 20 assess × 25 wf × 128 principles = ...
  const totalCombinations = uniqueIntentions * activitiesPerGrade * assessPerGrade * wfPerGrade * principleCombos;

  // ---- 有意义的差异化输出数 ----
  // 只看"用户感觉到的不同"：
  // Intentions: 32 种完全不同（Grade 1 English vs Grade 5 Math 天差地别）
  // Activities: 4 个年级各有不同的活动类型 → 4 种
  // 但活动类型相同只是措辞不同 → 对用户来说"都一样"
  // Principles: 勾选了 vs 没勾选 → 2 种状态（多了个段落）
  // Sessions: 1 session → 45min plan; 2+ sessions → multi-session plan

  console.log("");
  console.log("=".repeat(60));
  console.log("  ILAW 配方系统 — 差异化能力统计");
  console.log("=".repeat(60));
  console.log("");
  console.log("  ┌──────────────────────────────────────────┬───────────┐");
  console.log("  │ 维度                                     │ 种数      │");
  console.log("  ├──────────────────────────────────────────┼───────────┤");
  console.log(("  │ I — Intentions（年级 × 科目）             │ " + String(uniqueIntentions).padStart(7) + " │").slice(0, 60) + " │");
  console.log(("  │ L — Opening 活动（年级×5变体）            │ " + String(gradeActivityPools * 5).padStart(7) + " │").slice(0, 60) + " │");
  console.log(("  │ L — Presentation 活动（年级×5变体）       │ " + String(gradeActivityPools * 5).padStart(7) + " │").slice(0, 60) + " │");
  console.log(("  │ L — Guided Practice（年级×5变体）         │ " + String(gradeActivityPools * 5).padStart(7) + " │").slice(0, 60) + " │");
  console.log(("  │ L — Independent Practice（年级×5变体）    │ " + String(gradeActivityPools * 5).padStart(7) + " │").slice(0, 60) + " │");
  console.log(("  │ L — Closing 活动（年级×5变体）            │ " + String(gradeActivityPools * 5).padStart(7) + " │").slice(0, 60) + " │");
  console.log(("  │ A — Formative（年级×5变体）               │ " + String(assessGradePools * 5).padStart(7) + " │").slice(0, 60) + " │");
  console.log(("  │ A — Summative（年级×4变体）               │ " + String(assessGradePools * 4).padStart(7) + " │").slice(0, 60) + " │");
  console.log(("  │ W — Remediation（年级×5变体）             │ " + String(wfGradePools * 5).padStart(7) + " │").slice(0, 60) + " │");
  console.log(("  │ W — Enrichment（年级×5变体）              │ " + String(wfGradePools * 5).padStart(7) + " │").slice(0, 60) + " │");
  console.log(("  │ Principles 勾选组合（2^7）                │ " + String(principleCombos).padStart(7) + " │").slice(0, 60) + " │");
  console.log(("  │ Session 数量（1-5）                       │ " + String(5).padStart(7) + " │").slice(0, 60) + " │");
  console.log("  ├──────────────────────────────────────────┼───────────┤");
  console.log(("  │ 理论总组合数（5.12 × 10^12）              │ ∞ │").slice(0, 60) + " │");
  console.log(("  │ 教师能真正感知的差异                      │ ~36 种    │").slice(0, 60) + " │");
  console.log("  └──────────────────────────────────────────┴───────────┘");
  console.log("");
  console.log("  ── 解释 ──");
  console.log("  理论组合很大：每个环节有 5 种不同措辞，排列组合×128 种原则组合");
  console.log('  但教师能感知的"不同"只有：');
  console.log('  • 32 种 Intentions（4年级 × 8科目 — 内容完全不同）');
  console.log('  • 4 种活动风格（K3=玩+唱, G4-6=结构练习, JHS=研讨, SHS=学术）');
  console.log('  • 多一个"设计原则"段落 vs 没有');
  console.log('  • 单节 vs 多节的时间分配不同');
  console.log("");
  console.log('  === 核心结论 ===');
  console.log('  配方系统给的是"好看但通用"的输出。比现在的全是模板好很多，');
  console.log('  但跟 AI（每个用户输入都会变成教案内容）有根本差距。');
  console.log("");
}

calculateVariations();

// 导出供浏览器使用
if (typeof window !== "undefined") {
  window.ILAWEngine = {
    generate: generateILAW,
    stats: calculateVariations
  };
}
