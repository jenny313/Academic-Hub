export interface ResourceItem {
  id: string;
  title: string;
  courseCode: string;
  courseName: string;
  department: string;
  yearLevel: 'Year 1' | 'Year 2' | 'Year 3' | 'Year 4' | 'Postgraduate';
  category: 'lecture-notes' | 'past-papers' | 'revision-guides' | 'formula-sheets' | 'lab-manuals';
  term: string;
  lecturer: string;
  fileType: 'PDF' | 'ZIP' | 'DOCX';
  fileSize: string;
  pages: number;
  downloadsCount: number;
  rating: number;
  summary: string;
  keyTopics: string[];
  previewContent: string[];
}

export interface AnnouncementItem {
  id: string;
  title: string;
  category: 'Urgent' | 'Academic' | 'Administrative' | 'Campus Life';
  date: string;
  department: string;
  content: string;
  actionLabel?: string;
  actionUrl?: string;
  isPinned?: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  endDate?: string;
  time?: string;
  category: 'exam' | 'deadline' | 'holiday' | 'milestone';
  description: string;
  location?: string;
  affectedPrograms?: string;
}

export interface CampusEvent {
  id: string;
  title: string;
  category: 'Academic' | 'Career' | 'Student Life' | 'Wellness' | 'Tech' | 'Sports';
  date: string;
  time: string;
  location: string;
  venueType: 'In-Person' | 'Hybrid' | 'Virtual';
  host: string;
  description: string;
  capacity: number;
  rsvps: number;
  tags: string[];
}

export interface CampusService {
  id: string;
  name: string;
  category: 'Academic Support' | 'Health & Wellness' | 'Administration' | 'Campus Facilities';
  location: string;
  hours: string;
  phone: string;
  email: string;
  description: string;
  urgentNote?: string;
}

export const INITIAL_RESOURCES: ResourceItem[] = [
  {
    id: 'res-1',
    title: 'Data Structures & Algorithm Complexity Complete Notes',
    courseCode: 'CS201',
    courseName: 'Data Structures & Algorithms',
    department: 'Computer Science & Engineering',
    yearLevel: 'Year 2',
    category: 'lecture-notes',
    term: 'Fall 2026',
    lecturer: 'Prof. Marcus Vance',
    fileType: 'PDF',
    fileSize: '4.8 MB',
    pages: 68,
    downloadsCount: 1420,
    rating: 4.9,
    summary: 'Comprehensive 12-week lecture pack covering asymptotic Big-O analysis, balanced BSTs, graph traversal algorithms (Dijkstra, A*), and dynamic programming paradigms with annotated diagrams.',
    keyTopics: ['Red-Black Trees', 'Dijkstra & Prim Algorithms', 'Memoization & DP', 'Hash Tables & Collisions'],
    previewContent: [
      'Chapter 1: Asymptotic bounds, Big-O, Omega, and Theta notations with mathematical proof examples.',
      'Chapter 2: Linear vs Non-linear structures: Array doubling amortized analysis vs Linked List cache locality.',
      'Chapter 3: Graph Representations: Adjacency list memory footprint vs Adjacency matrix fast lookup.',
      'Chapter 4: Dynamic Programming: Bellman equation formulation and knapsack problem decomposition.'
    ]
  },
  {
    id: 'res-2',
    title: '2024–2025 Final Examination Paper & Official Marking Scheme',
    courseCode: 'MATH215',
    courseName: 'Multivariable Calculus & Linear Algebra',
    department: 'Mathematics & Physical Sciences',
    yearLevel: 'Year 2',
    category: 'past-papers',
    term: 'Spring 2025',
    lecturer: 'Dr. Elena Rostova',
    fileType: 'PDF',
    fileSize: '3.1 MB',
    pages: 18,
    downloadsCount: 2180,
    rating: 4.8,
    summary: 'Complete past paper containing Section A (Linear Transformations, Eigenvalues) and Section B (Stokes Theorem, Triple Integrals in Spherical Coordinates) with step-by-step marking rubrics.',
    keyTopics: ['Eigenvectors & Diagonalization', 'Green & Stokes Theorem', 'Lagrange Multipliers', 'Jacobian Determinants'],
    previewContent: [
      'Problem 1 (15 Marks): Find the eigenvalues and orthonormal eigenvectors of matrix A = [[4, 2], [2, 1]].',
      'Problem 2 (20 Marks): Evaluate the surface integral using Gauss Divergence Theorem over the closed paraboloid.',
      'Official Solution Step 2.1: Boundary formulation and conversion to cylindrical polar coordinates (dr dθ dz).',
      'Marking Rubric: 5 marks for divergence calculation, 10 marks for volume integral limits, 5 marks for final simplification.'
    ]
  },
  {
    id: 'res-3',
    title: 'Cellular Biochemistry & Metabolic Pathways Revision Kit',
    courseCode: 'BIO110',
    courseName: 'Molecular Cell Biology',
    department: 'Biological & Health Sciences',
    yearLevel: 'Year 1',
    category: 'revision-guides',
    term: 'Fall 2026',
    lecturer: 'Dr. Sarah Jenkins',
    fileType: 'PDF',
    fileSize: '8.4 MB',
    pages: 44,
    downloadsCount: 960,
    rating: 4.9,
    summary: 'Visual study cheat-sheet mapping glycolysis, Krebs citric acid cycle, ATP synthase proton gradient, and enzyme kinetics (Michaelis-Menten Lineweaver-Burk plots).',
    keyTopics: ['Glycolysis Regulatory Steps', 'Electron Transport Chain', 'Enzyme Inhibition (Competitive vs Non-competitive)', 'Allosteric Regulation'],
    previewContent: [
      'Section 1: Rate-limiting enzymes of glycolysis: Hexokinase, PFK-1, and Pyruvate Kinase control mechanisms.',
      'Section 2: High-yield exam mnemonic for Krebs cycle intermediates: Citrate, Isocitrate, α-Ketoglutarate, Succinyl-CoA.',
      'Section 3: Chemiosmosis: Complex I-IV proton pumping stoichiometry and ATP synthase rotation mechanics.'
    ]
  },
  {
    id: 'res-4',
    title: 'Macroeconomics Midterm Past Paper & Model Answers',
    courseCode: 'ECON102',
    courseName: 'Principles of Macroeconomics',
    department: 'Business & Economics',
    yearLevel: 'Year 1',
    category: 'past-papers',
    term: 'Fall 2025',
    lecturer: 'Prof. David Sterling',
    fileType: 'PDF',
    fileSize: '2.4 MB',
    pages: 14,
    downloadsCount: 1750,
    rating: 4.7,
    summary: 'Midterm paper with multiple-choice rationale breakdowns and structured essay answers on IS-LM model curves, monetary policy shifts, and inflation targeting.',
    keyTopics: ['IS-LM Equilibrium', 'Central Bank Rate Decisions', 'Phillips Curve Dynamics', 'Fiscal Multipliers'],
    previewContent: [
      'Question 3: Diagrammatic shift of LM curve under open-market treasury bond purchases.',
      'Model Answer: Increased real money supply shifts LM rightward, lowering equilibrium nominal interest rate from r1 to r2.',
      'Examiner Tip: Always state exogenous assumption on price rigidity in the short run.'
    ]
  },
  {
    id: 'res-5',
    title: 'Operating Systems & Concurrency Lab Handbook',
    courseCode: 'CS312',
    courseName: 'Operating Systems & Distributed Architecture',
    department: 'Computer Science & Engineering',
    yearLevel: 'Year 3',
    category: 'lab-manuals',
    term: 'Fall 2026',
    lecturer: 'Dr. Tariq Al-Mansoor',
    fileType: 'PDF',
    fileSize: '5.2 MB',
    pages: 52,
    downloadsCount: 890,
    rating: 4.8,
    summary: 'Practical laboratory exercises for POSIX thread programming, mutex locks, semaphores, deadlock condition prevention, and virtual memory page replacement algorithms.',
    keyTopics: ['Pthreads & Mutexes', 'Producer-Consumer Semaphore', 'LRU vs Clock Page Replacement', 'Fork & Exec System Calls'],
    previewContent: [
      'Lab Exercise 2: Implementing a thread-safe bounded buffer using condition variables pthread_cond_wait().',
      'Lab Exercise 4: Simulating Belady anomaly in FIFO page replacement vs Optimal offline algorithm.',
      'Code Walkthrough: Memory leak profiling with Valgrind memcheck.'
    ]
  },
  {
    id: 'res-6',
    title: 'Constitutional Law Case Briefs & Exam Revision Guide',
    courseCode: 'LAW204',
    courseName: 'Constitutional & Administrative Law',
    department: 'Law & Governance',
    yearLevel: 'Year 2',
    category: 'revision-guides',
    term: 'Fall 2026',
    lecturer: 'Prof. Eleanor Wright, QC',
    fileType: 'PDF',
    fileSize: '3.7 MB',
    pages: 36,
    downloadsCount: 1120,
    rating: 4.9,
    summary: 'High-distinction case synthesis manual covering judicial review thresholds, separation of powers doctrines, parliamentary sovereignty, and fundamental rights precedents.',
    keyTopics: ['Wednesbury Unreasonableness', 'Prerogative Powers', 'Proportionality Test', 'Legitimate Expectation'],
    previewContent: [
      'Key Case Synthesis: Council of Civil Service Unions v Minister for the Civil Service [1985] AC 374 (GCHQ Case).',
      'Exam Problem Strategy: Structured IRAC methodology for identifying procedural ultra vires vs substantive illegality.'
    ]
  },
  {
    id: 'res-7',
    title: 'Corporate Finance & Valuation Formula Cheat-Sheet',
    courseCode: 'FIN301',
    courseName: 'Corporate Finance & Investment Analysis',
    department: 'Business & Economics',
    yearLevel: 'Year 3',
    category: 'formula-sheets',
    term: 'Fall 2026',
    lecturer: 'Prof. Alan Zhao',
    fileType: 'PDF',
    fileSize: '1.8 MB',
    pages: 8,
    downloadsCount: 2450,
    rating: 4.9,
    summary: 'Curated 8-page quick reference sheet with WACC, CAPM beta de-levering, Black-Scholes option pricing formulas, DuPont analysis identity, and bond duration calculations.',
    keyTopics: ['WACC Calculation', 'Unlevered Beta Hamada Equation', 'Free Cash Flow to Firm (FCFF)', 'Macaulay & Modified Duration'],
    previewContent: [
      'Formula 1: WACC = (E/V * Re) + (D/V * Rd * (1 - Tc)).',
      'Formula 2: Gordon Growth Model: P0 = D1 / (r - g) with sustainable growth rate g = ROE * b.',
      'Exam Checklist: Adjusting net debt for operating lease capitalization.'
    ]
  },
  {
    id: 'res-8',
    title: 'Organic Chemistry II Reaction Mechanisms Master Guide',
    courseCode: 'CHEM220',
    courseName: 'Organic Chemistry II',
    department: 'Mathematics & Physical Sciences',
    yearLevel: 'Year 2',
    category: 'revision-guides',
    term: 'Spring 2026',
    lecturer: 'Dr. Michael Cho',
    fileType: 'PDF',
    fileSize: '9.1 MB',
    pages: 58,
    downloadsCount: 1640,
    rating: 4.9,
    summary: 'Step-by-step electron arrow-pushing mechanisms for aldol condensation, Diels-Alder cycloadditions, Grignard reagents, and aromatic electrophilic substitutions.',
    keyTopics: ['Aldol & Claisen Condensations', 'Diels-Alder Stereochemistry (Endo rule)', 'EAS Directing Groups', 'Wittig Reaction'],
    previewContent: [
      'Mechanism 4.1: Acid-catalyzed enol formation vs base-mediated enolate generation.',
      'Mechanism 7.3: Diels-Alder orbital symmetry considerations: Suprafacial [4+2] Woodward-Hoffmann rules.',
      'Synthesis Problem Set: Multi-step retrosynthesis strategies for substituted bicyclic rings.'
    ]
  },
  {
    id: 'res-9',
    title: 'Cognitive Psychology & Memory Systems Lecture Slides Pack',
    courseCode: 'PSYC105',
    courseName: 'Introduction to Cognitive Psychology',
    department: 'Biological & Health Sciences',
    yearLevel: 'Year 1',
    category: 'lecture-notes',
    term: 'Fall 2026',
    lecturer: 'Dr. Hannah Aris',
    fileType: 'PDF',
    fileSize: '6.4 MB',
    pages: 72,
    downloadsCount: 830,
    rating: 4.6,
    summary: 'Full slide deck with lecturer commentary covering Baddeley’s Working Memory Model, episodic vs semantic memory consolidation, and experimental paradigms.',
    keyTopics: ['Baddeley Multi-component Working Memory', 'Long-term Potentiation in Hippocampus', 'Dual Coding Theory', 'Stroop Effect'],
    previewContent: [
      'Slide 14: The Phonological Loop and Visuo-spatial Sketchpad working alongside the Central Executive.',
      'Slide 28: Evidence from patient H.M. on retrograde vs anterograde amnesia dissociation.'
    ]
  },
  {
    id: 'res-10',
    title: 'Digital Signal Processing Past Paper Solutions (2023–2025)',
    courseCode: 'EE340',
    courseName: 'Signals, Systems & Digital Filtering',
    department: 'Computer Science & Engineering',
    yearLevel: 'Year 3',
    category: 'past-papers',
    term: 'Spring 2025',
    lecturer: 'Prof. Simon Campbell',
    fileType: 'PDF',
    fileSize: '4.5 MB',
    pages: 26,
    downloadsCount: 1390,
    rating: 4.8,
    summary: 'Compiled exam papers with fully written answers for Z-transform ROCs, FFT butterfly flow diagrams, and Butterworth vs Chebyshev filter design.',
    keyTopics: ['Z-Transform Region of Convergence', 'Radix-2 Cooley-Tukey FFT', 'Bilinear Transformation', 'Impulse Invariance Method'],
    previewContent: [
      'Question 2: Determine causality and stability of system function H(z) = (1 - 0.5z^-1) / ((1 - 0.2z^-1)(1 + 0.8z^-1)).',
      'Step-by-step Solution: Pole zero diagram with pole locations at z = 0.2 and z = -0.8; unit circle contained in ROC.'
    ]
  }
];

export const INITIAL_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: 'ann-1',
    title: 'University Main Library 24/7 Extended Study Hours for Midterms',
    category: 'Urgent',
    date: 'Today, Nov 7',
    department: 'University Library Services',
    content: 'Starting Monday, Floors 1 through 4 of the William James Main Library and the Frank Commons will operate 24 hours daily with free study room bookings and extended security escorts.',
    actionLabel: 'View Study Desks',
    isPinned: true
  },
  {
    id: 'ann-2',
    title: 'Spring 2027 Course Registration Window Opens Next Week',
    category: 'Academic',
    date: 'Nov 5, 2026',
    department: 'Office of the University Registrar',
    content: 'Senior students registration opens Nov 12 at 08:00 AM; Juniors on Nov 14; Sophomores & Freshmen on Nov 16. Ensure all academic advising holds are cleared before your slot.',
    actionLabel: 'Check Schedule',
    isPinned: true
  },
  {
    id: 'ann-3',
    title: 'Undergraduate Research Fellowship Grants Application Deadline',
    category: 'Academic',
    date: 'Nov 3, 2026',
    department: 'Office of Vice Provost for Research',
    content: 'Stipends up to $3,500 available for faculty-mentored spring semester research projects across STEM and Humanities. Faculty endorsement required.',
    actionLabel: 'Guidelines'
  },
  {
    id: 'ann-4',
    title: 'Campus Shuttle Route 3 Service Update Due to West Gate Works',
    category: 'Campus Life',
    date: 'Nov 1, 2026',
    department: 'Campus Facilities & Transportation',
    content: 'Route 3 (Science Quad to Student Village) will temporarily reroute via Maple Avenue until Friday. Frequency remains every 8 minutes during peak hours.',
    actionLabel: 'Live Transit'
  }
];

export const CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: 'cal-1',
    title: 'Midterm Examination Period Begins',
    date: '2026-11-10',
    endDate: '2026-11-21',
    category: 'exam',
    description: 'Centrally scheduled in-person and digital examinations for undergraduate modules.',
    affectedPrograms: 'All Faculties'
  },
  {
    id: 'cal-2',
    title: 'Final Date for Course Withdrawal with W Grade',
    date: '2026-11-14',
    category: 'deadline',
    description: 'Deadline to submit module withdrawal request via the student portal without academic penalty.',
    location: 'Registrar Online Portal'
  },
  {
    id: 'cal-3',
    title: 'Spring 2027 Priority Course Enrollment Opens',
    date: '2026-11-16',
    category: 'milestone',
    description: 'Registration opens for graduating seniors and honors program scholars.',
    location: 'University Student Portal'
  },
  {
    id: 'cal-4',
    title: 'Thanksgiving & Fall Break Recess (No Classes)',
    date: '2026-11-25',
    endDate: '2026-11-29',
    category: 'holiday',
    description: 'University administrative offices closed Nov 26-27; residence halls and library commons remain open.',
    affectedPrograms: 'Campus-wide'
  },
  {
    id: 'cal-5',
    title: 'Final Honors Thesis & Capstone Project Submission',
    date: '2026-12-04',
    category: 'deadline',
    description: 'Hard deadline to upload thesis drafts to departmental repository for faculty assessment.',
    location: 'Faculty Department Portals'
  },
  {
    id: 'cal-6',
    title: 'Fall Semester Classes End',
    date: '2026-12-08',
    category: 'milestone',
    description: 'Official conclusion of regular lecture and lab teaching sessions.'
  },
  {
    id: 'cal-7',
    title: 'Reading Days (Quiet Study Period)',
    date: '2026-12-09',
    endDate: '2026-12-11',
    category: 'milestone',
    description: 'No academic classes or evaluations permitted. Quiet hours enforced across academic buildings.',
    affectedPrograms: 'All Students'
  },
  {
    id: 'cal-8',
    title: 'Final Examination Week',
    date: '2026-12-12',
    endDate: '2026-12-20',
    category: 'exam',
    description: 'Final written papers and oral assessments. Detailed room seating will be posted on student portal.',
    location: 'University Sports Complex & Examination Halls'
  },
  {
    id: 'cal-9',
    title: 'Winter Vacation & Semester Break',
    date: '2026-12-21',
    endDate: '2027-01-11',
    category: 'holiday',
    description: 'Winter break for all undergraduate and graduate students. Spring semester commences Jan 12, 2027.'
  }
];

export const CAMPUS_EVENTS: CampusEvent[] = [
  {
    id: 'ev-1',
    title: 'Annual Tech & Engineering Career Networking Symposium',
    category: 'Career',
    date: 'Wednesday, Nov 12',
    time: '10:00 AM – 4:00 PM',
    location: 'Great Hall, Campus Student Union',
    venueType: 'In-Person',
    host: 'University Career & Professional Development Center',
    description: 'Connect with over 65 premier employers in software engineering, biotechnology, finance, and renewable energy. Bring printed CVs; professional headshot booth available.',
    capacity: 500,
    rsvps: 384,
    tags: ['Internships', 'Full-time Jobs', 'Resume Review', 'Networking']
  },
  {
    id: 'ev-2',
    title: 'Exam Survival Workshop: Cognitive Memory & Stress Regulation',
    category: 'Wellness',
    date: 'Friday, Nov 14',
    time: '2:30 PM – 4:00 PM',
    location: 'Mindfulness Studio, Student Health Pavilion (Room 204)',
    venueType: 'Hybrid',
    host: 'Counseling & Mental Health Psychological Services',
    description: 'Learn evidence-based spaced repetition study protocols, sleep hygiene during finals, and active stress reduction techniques led by clinical psychologists.',
    capacity: 80,
    rsvps: 62,
    tags: ['Mental Health', 'Study Skills', 'Free Refreshments']
  },
  {
    id: 'ev-3',
    title: 'University Hackathon 2026: Code for Sustainable Cities',
    category: 'Tech',
    date: 'Saturday–Sunday, Nov 21–22',
    time: '9:00 AM Kickoff (36h Event)',
    location: 'Engineering Building 4 Innovation Labs',
    venueType: 'In-Person',
    host: 'ACM Student Chapter & Department of Computer Science',
    description: '36-hour sprint building real-world open-source solutions for climate resilience and smart transit. Over $12,000 in sponsor prizes, hardware kits, and free meals.',
    capacity: 250,
    rsvps: 218,
    tags: ['Coding', 'Hackathon', 'Mentorship', 'Prizes']
  },
  {
    id: 'ev-4',
    title: 'Guest Lecture: Dr. Aris Thorne on "AI in Modern Drug Discovery"',
    category: 'Academic',
    date: 'Tuesday, Nov 24',
    time: '5:00 PM – 6:30 PM',
    location: 'Auditorium B, Life Sciences Building',
    venueType: 'Hybrid',
    host: 'Faculty of Pharmacy & Biomedical Sciences',
    description: 'Pioneering researcher Dr. Thorne discusses computational molecular docking, generative protein models, and clinical trial acceleration.',
    capacity: 180,
    rsvps: 145,
    tags: ['Biotech', 'Keynote', 'Q&A', 'Reception']
  },
  {
    id: 'ev-5',
    title: 'Intramural Basketball Championship Finals & Pep Rally',
    category: 'Sports',
    date: 'Friday, Dec 04',
    time: '6:30 PM – 9:00 PM',
    location: 'Varsity Arena, West Campus Sports Complex',
    venueType: 'In-Person',
    host: 'Campus Recreation & Athletic Association',
    description: 'Cheer for the top collegiate teams competing for the annual Chancellor Cup. Free rally towels, halftime student half-court shot contest ($500 bookstore credit).',
    capacity: 800,
    rsvps: 610,
    tags: ['Sports', 'Free Entry', 'Student Spirit']
  }
];

export const CAMPUS_SERVICES: CampusService[] = [
  {
    id: 'srv-1',
    name: 'University Main Library & Study Pods',
    category: 'Academic Support',
    location: 'William James Library, Central Campus',
    hours: '24/7 during Midterms & Finals (Standard: 7:00 AM – 1:00 AM)',
    phone: '+1 (555) 019-4820',
    email: 'library-services@campus.edu',
    description: 'Quiet study floors, bookable collaboration rooms, high-speed printing kiosks, and interlibrary loan desks.',
    urgentNote: 'Floors 3 & 4 designated as absolute silent zones.'
  },
  {
    id: 'srv-2',
    name: 'Student Health & Psychological Wellness',
    category: 'Health & Wellness',
    location: 'Health Pavilion, North Quad Room 102',
    hours: 'Mon–Fri 8:30 AM – 5:30 PM (24/7 Crisis Line Available)',
    phone: '+1 (555) 019-4888',
    email: 'wellness@campus.edu',
    description: 'Same-day walk-in clinics, confidential counseling sessions, preventative immunizations, and prescription dispensary.',
    urgentNote: 'For after-hours emergency mental health support, call line extension #9.'
  },
  {
    id: 'srv-3',
    name: 'Academic Advising & Registrar Desk',
    category: 'Administration',
    location: 'Founders Hall, Suite 210',
    hours: 'Mon–Fri 9:00 AM – 4:30 PM',
    phone: '+1 (555) 019-4700',
    email: 'registrar@campus.edu',
    description: 'Degree audits, transcript verifications, course drop/add approvals, and graduation requirement reviews.'
  },
  {
    id: 'srv-4',
    name: 'IT Helpdesk & Device Repair Station',
    category: 'Campus Facilities',
    location: 'Technology Center, Ground Floor B-12',
    hours: 'Mon–Sat 8:00 AM – 8:00 PM',
    phone: '+1 (555) 019-4911',
    email: 'it-support@campus.edu',
    description: 'Campus Wi-Fi connectivity diagnostics, free student software licenses (MATLAB, Office 365, Adobe), laptop loaners.'
  },
  {
    id: 'srv-5',
    name: 'Student Financial Aid & Scholarship Office',
    category: 'Administration',
    location: 'Founders Hall, Room 105',
    hours: 'Mon–Thu 9:00 AM – 4:00 PM',
    phone: '+1 (555) 019-4755',
    email: 'finaid@campus.edu',
    description: 'Tuition installment plans, federal aid assistance, merit-based scholarship appeals, and on-campus work-study placements.'
  },
  {
    id: 'srv-6',
    name: 'Campus Safety, Escort & Emergency Patrol',
    category: 'Campus Facilities',
    location: 'Public Safety Building, Gate 1',
    hours: '24 Hours / 7 Days a week',
    phone: '+1 (555) 019-9111',
    email: 'campus-police@campus.edu',
    description: '24/7 on-campus safety escorts, lost & found registry, bike registration, and campus blue-light emergency response.',
    urgentNote: 'Call dispatch anytime for a safe walking escort to your dorm or parking garage.'
  }
];

export const STUDY_TIPS_GUIDES = [
  {
    id: 'guide-1',
    title: 'The Cornell Note-Taking & Active Recall Framework',
    readTime: '4 min read',
    category: 'Revision Technique',
    summary: 'How to divide lecture pages into cues, notes, and summary sections to increase long-term exam retention by over 40% without passive re-reading.',
    checklist: [
      'Record lecture facts in the right-hand column during class',
      'Formulate question prompts & key terms in the left column within 24 hours',
      'Cover the notes and test yourself using only the left column cues',
      'Synthesize the bottom 2-sentence summary in your own words'
    ]
  },
  {
    id: 'guide-2',
    title: 'High-Yield Past Paper Simulation Strategy',
    readTime: '5 min read',
    category: 'Exam Preparation',
    summary: 'The 3-stage protocol for converting university past exam papers into predictable A-grade examination performance.',
    checklist: [
      'Stage 1: Untimed open-book review identifying recurring core questions',
      'Stage 2: Strict timed exam simulation with zero phone/notes distractions',
      'Stage 3: Red-pen marking using official rubrics + error log notebook',
      'Repeat with papers from 2023, 2024, and 2025'
    ]
  },
  {
    id: 'guide-3',
    title: 'Circadian Rhythm & Final Exam Week Sleep Protocol',
    readTime: '3 min read',
    category: 'Student Wellness',
    summary: 'Why pulling all-nighters degrades working memory by up to 35%, and how to structure 90-minute sleep cycles for peak memory consolidation.',
    checklist: [
      'Aim for 5 sleep cycles (7.5 hours) rather than fragmented naps',
      'Cut caffeine 8 hours before your target bedtime',
      'Review your hardest formula sheet 20 minutes before sleeping',
      'Get 10 minutes of morning sunlight to anchor alertness'
    ]
  }
];
