import type { Locale } from "@/i18n/locales";

export type IndustryContent = {
  key: string;
  title: string;
  description: string;
  developmentAreas: string[];
  deliveryScope: string[];
  projectModels: string[];
};

export type PublicContent = {
  meta: {
    homeTitle: string;
    homeDescription: string;
    configureTitle: string;
    configureDescription: string;
  };
  navigation: {
    capabilities: string;
    industries: string;
    delivery: string;
    experience: string;
    about: string;
    insights: string;
    configurator: string;
    start: string;
    menu: string;
    language: string;
    skip: string;
  };
  hero: {
    eyebrow: string;
    lead: string;
    accent: string;
    description: string;
    primary: string;
    secondary: string;
    bullets: string[];
    operations: string;
    imageAlt: string;
  };
  trust: string[];
  capabilities: {
    eyebrow: string;
    title: string;
    description: string;
    items: Array<{ title: string; text: string }>;
  };
  industries: {
    eyebrow: string;
    title: string;
    cta: string;
    development: string;
    scope: string;
    models: string;
    items: IndustryContent[];
  };
  delivery: {
    eyebrow: string;
    title: string;
    description: string;
    items: Array<{ title: string; text: string }>;
  };
  experience: {
    eyebrow: string;
    title: string;
    description: string;
    items: Array<{ title: string; location: string; scope: string; note: string }>;
  };
  supply: {
    eyebrow: string;
    title: string;
    description: string;
    claims: string[];
    mapLabel: string;
    mapTags: string[];
  };
  technology: {
    eyebrow: string;
    title: string;
    description: string;
    points: string[];
  };
  faq: {
    eyebrow: string;
    title: string;
    items: Array<{ question: string; answer: string }>;
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    notice: string;
    labels: Record<string, string>;
    financingOptions: string[];
    select: string;
    file: string;
    meeting: string;
    submit: string;
    backendNotice: string;
    required: string;
    emailError: string;
    successEyebrow: string;
    successTitle: string;
    successDescription: string;
    reset: string;
  };
  footer: {
    tagline: string;
    mission: string;
    parent: string;
    operations: string;
    privacy: string;
    terms: string;
    compliance: string;
    pending: string;
  };
  configurator: {
    eyebrow: string;
    title: string;
    description: string;
    factoryLabel: string;
    marketLabel: string;
    capacityLabel: string;
    energyLabel: string;
    fundingLabel: string;
    modelLabel: string;
    investment: string;
    land: string;
    window: string;
    jobs: string;
    months: string;
    scale: string;
    readiness: string;
    readinessNote: string;
    checklist: string[];
    generate: string;
    disclaimer: string;
    resultEyebrow: string;
    resultTitle: string;
    resultDescription: string;
    gateLabel: string;
    gateTitle: string;
    gateDescription: string;
    resultSteps: string[];
    next: string;
    edit: string;
    factories: Array<{ id: string; name: string; description: string; tag: string }>;
    countries: string[];
    capacities: Array<{ id: string; label: string; subtitle: string }>;
    energyOptions: Array<{ id: string; label: string }>;
    financeOptions: Array<{ id: string; label: string }>;
  };
  system: {
    notFoundTitle: string;
    notFoundText: string;
    backHome: string;
  };
};

const en: PublicContent = {
  meta: {
    homeTitle: "Novertra Industrial | Industrial Project Development & Delivery",
    homeDescription: "Türkiye-based project leadership for industrial development, global supplier integration and regional delivery across international markets.",
    configureTitle: "Industrial Project Configurator | Novertra Industrial",
    configureDescription: "Prepare an indicative industrial project brief for early opportunity screening. Figures are non-binding and require technical validation.",
  },
  navigation: {
    capabilities: "Capabilities", industries: "Industries", delivery: "Delivery Model", experience: "Experience",
    about: "About", insights: "Insights", configurator: "Project Configurator", start: "Start a Project",
    menu: "Toggle menu", language: "Language", skip: "Skip to main content",
  },
  hero: {
    eyebrow: "INDUSTRIAL PROJECT DEVELOPMENT & DELIVERY",
    lead: "From Industrial Vision",
    accent: "to Operational Reality",
    description: "Novertra structures industrial opportunities from early concept to operational readiness through Türkiye-based project leadership, international sourcing, engineering coordination and local execution planning.",
    primary: "Start an Industrial Project", secondary: "Explore Our Capabilities",
    bullets: [
      "Project development before procurement.",
      "Global technology and supplier integration.",
      "Regional delivery shaped around local operating conditions.",
    ],
    operations: "Türkiye-rooted. Globally connected. Delivery-focused.",
    imageAlt: "Industrial facility representing coordinated project development and delivery",
  },
  trust: ["Türkiye-Based Project Leadership", "Industrial Project Development", "Global Supplier Integration", "Regional Delivery Capability"],
  capabilities: {
    eyebrow: "What We Coordinate",
    title: "One accountable path from project opportunity to operational readiness.",
    description: "Each mandate is structured around the project's technical, commercial and delivery requirements rather than a fixed contracting model.",
    items: [
      { title: "Feasibility & Project Structuring", text: "We test the opportunity, define the project basis and coordinate evidence needed before major commitments are made." },
      { title: "Industrial Concept & Engineering Coordination", text: "Process, layout, utilities and operating requirements are aligned with qualified engineering specialists." },
      { title: "Technology & Equipment Sourcing", text: "Equipment and production systems are compared across Türkiye and international markets for technical and commercial fit." },
      { title: "Civil Works & Utility Coordination", text: "Site infrastructure, buildings, power, water and support systems are integrated into the project delivery plan." },
      { title: "Installation & Commissioning Support", text: "Supplier, contractor and local execution interfaces are sequenced for installation, testing and start-up." },
      { title: "Operational Readiness", text: "Documentation, training, handover and early operating requirements are prepared before production begins." },
    ],
  },
  industries: {
    eyebrow: "Industries We Support",
    title: "Industrial systems shaped around demand, resources, infrastructure and operating capability.",
    cta: "Discuss This Capability", development: "Development Areas", scope: "Typical Delivery Scope", models: "Suitable Project Models",
    items: [
      { key: "infrastructure", title: "Industrial Infrastructure", description: "Site access, utilities and logistics systems that enable productive industrial operations.", developmentAreas: ["Industrial access and circulation", "Utility and service networks", "Logistics support facilities"], deliveryScope: ["Site and infrastructure planning", "Civil and utility coordination", "Implementation oversight"], projectModels: ["Greenfield industrial sites", "Production campuses", "Factory-linked infrastructure"] },
      { key: "energy", title: "Industrial Energy Systems", description: "Conventional, renewable and hybrid power systems configured around facility demand and operating continuity.", developmentAreas: ["Captive and backup power", "Solar and hybrid systems", "Plant distribution infrastructure"], deliveryScope: ["Demand assessment", "Technology configuration", "Installation and commissioning coordination"], projectModels: ["Industrial captive power", "Plant hybridisation", "Remote-site energy systems"] },
      { key: "agro-industry", title: "Agro-Industry", description: "Integrated production, storage and processing systems that connect agricultural resources with viable markets.", developmentAreas: ["Irrigated production systems", "Crop and feed processing", "Storage and packaging"], deliveryScope: ["Value-chain configuration", "Water and utility planning", "Equipment integration and training"], projectModels: ["Commercial farming and processing", "Rural production campuses", "Food-security programmes"] },
      { key: "mining-processing", title: "Mineral Processing", description: "Material handling and processing facilities designed for defined ore characteristics, throughput and recovery objectives.", developmentAreas: ["Crushing and screening", "Concentration and recovery", "Material handling and utilities"], deliveryScope: ["Process configuration", "Equipment qualification", "Installation and commissioning support"], projectModels: ["New processing facilities", "Plant expansions", "Modular processing systems"] },
      { key: "industrial-manufacturing", title: "Industrial Manufacturing", description: "Scalable production environments for fabrication, assembly and manufacturing programmes.", developmentAreas: ["Assembly and production lines", "Fabrication workshops", "Factory utilities and logistics"], deliveryScope: ["Capacity and product definition", "Factory engineering coordination", "Equipment installation support"], projectModels: ["Local manufacturing", "Import substitution", "Technology localisation"] },
      { key: "strategic-facilities", title: "Mission-Critical Facilities", description: "Operational and institutional facilities requiring controlled delivery, continuity and dependable support infrastructure.", developmentAreas: ["Operational compounds", "Critical service buildings", "Special-purpose public facilities"], deliveryScope: ["Functional requirements", "Facility and systems coordination", "Controlled commissioning"], projectModels: ["Institutional facilities", "Operating centres", "Special-purpose infrastructure"] },
      { key: "textile-manufacturing", title: "Textile Manufacturing", description: "New-build and rehabilitation programmes for spinning, weaving, finishing and supporting utilities.", developmentAreas: ["Spinning and weaving", "Finishing lines", "Factory rehabilitation"], deliveryScope: ["Condition and capacity assessment", "Line configuration", "Restart and commissioning support"], projectModels: ["New textile plants", "Idle-facility rehabilitation", "Capacity expansion"] },
      { key: "food-processing-cold-chain", title: "Food Processing & Cold Chain", description: "Hygienic processing, packaging, controlled storage and temperature-managed logistics.", developmentAreas: ["Food processing and packaging", "Refrigerated storage", "Cold-chain logistics"], deliveryScope: ["Hygiene-flow planning", "Line and utility integration", "Operational preparation"], projectModels: ["Produce processing", "Dairy and packaged foods", "Regional storage programmes"] },
      { key: "poultry-production-processing", title: "Poultry Production & Processing", description: "Integrated poultry systems connecting feed, farming, processing, packaging and cold distribution.", developmentAreas: ["Poultry farms", "Processing and packaging", "Feed and cold-chain systems"], deliveryScope: ["Capacity and biosecurity planning", "Equipment configuration", "Training and commissioning"], projectModels: ["Broiler value chains", "Layer programmes", "Poultry processing facilities"] },
      { key: "cattle-beef-processing", title: "Cattle Production & Beef Processing", description: "Livestock production, modern slaughtering, meat processing and refrigerated distribution planned as distinct but connected operations.", developmentAreas: ["Livestock and feed systems", "Modern abattoirs", "Meat processing and cold chain"], deliveryScope: ["Throughput and welfare planning", "Hygienic process configuration", "Waste, utility and cold-chain integration"], projectModels: ["Cattle production projects", "Integrated meat complexes", "Regional slaughter and processing facilities"] },
      { key: "small-factories-industrial-park", title: "Small Factory Clusters & Industrial Parks", description: "Planned production clusters where independent manufacturers can share infrastructure, logistics and common services.", developmentAreas: ["SME factory units", "Shared utilities", "Warehousing and common services"], deliveryScope: ["Master planning", "Modular facility design", "Tenant-readiness coordination"], projectModels: ["SME industrial parks", "Manufacturing clusters", "Specialised production campuses"] },
      { key: "tractor-assembly", title: "Tractor Assembly", description: "CKD or SKD assembly operations with component logistics, testing, quality control and after-sales preparation.", developmentAreas: ["Assembly lines", "Component logistics", "Testing and training areas"], deliveryScope: ["Line and tooling configuration", "Facility workflow planning", "Installation and workforce training"], projectModels: ["CKD and SKD plants", "Mechanisation programmes", "Regional assembly hubs"] },
      { key: "agricultural-equipment-manufacturing", title: "Agricultural Equipment Manufacturing", description: "Fabrication and manufacturing systems for implements such as ploughs, seeders, cultivators and trailers.", developmentAreas: ["Implements and attachments", "Trailers and transport equipment", "Spare-parts workshops"], deliveryScope: ["Product-family definition", "Cutting, forming and welding systems", "Assembly and quality-control launch"], projectModels: ["Local implement production", "Import substitution", "Tractor-linked manufacturing"] },
    ],
  },
  delivery: {
    eyebrow: "Project-Specific Delivery Model", title: "From Opportunity to Operation",
    description: "Novertra coordinates the delivery structure appropriate to each mandate; it does not present every project as a fixed EPC or financing commitment.",
    items: [
      { title: "Opportunity Assessment", text: "Demand, resources, site and operating need are tested." },
      { title: "Feasibility Coordination", text: "Technical, commercial and evidence requirements are defined." },
      { title: "Concept & Engineering", text: "Process, layout and utility choices are aligned." },
      { title: "Supplier Qualification", text: "Technology, equipment and vendors are compared." },
      { title: "Delivery Coordination", text: "Procurement, civil works and local interfaces are sequenced." },
      { title: "Commissioning Support", text: "Testing, training and handover readiness are coordinated." },
      { title: "Operational Readiness", text: "Open actions are closed before stable production." },
    ],
  },
  experience: {
    eyebrow: "Selected Project Experience", title: "Experience stated with clear provenance.",
    description: "The following work reflects verified Bewell Global / Deltayapı experience available to the Novertra team; it is not presented as a list of new Novertra contracts.",
    items: [
      { title: "Hasahisa Textile Complex", location: "Sudan", scope: "Construction, rehabilitation and industrial facility works.", note: "Bewell Global / Deltayapı project experience" },
      { title: "Additional Textile Facilities", location: "Kosti, Shendi and other Sudan locations", scope: "Factory renovation and electro-mechanical works.", note: "Bewell Global / Deltayapı project experience" },
      { title: "150 MW Mobile Power Project", location: "Khartoum, Sudan", scope: "Industrial construction and power infrastructure implementation experience.", note: "Bewell Global / Deltayapı project experience" },
      { title: "Mining Facility Installation", location: "Northern Sudan", scope: "Construction and machinery installation for gold-processing operations.", note: "Bewell Global / Deltayapı project experience" },
      { title: "Industrial & Public Projects", location: "Sudan", scope: "Industrial buildings, administrative facilities, parks and municipal works.", note: "Bewell Global / Deltayapı project experience" },
    ],
  },
  supply: {
    eyebrow: "Global Industrial Supply Network", title: "Türkiye-rooted, globally connected.",
    description: "Türkiye is our home base and a priority source of engineering and manufacturing capability. Each project can also integrate qualified technology, equipment and specialists from international markets.",
    claims: ["Türkiye-based project leadership and priority manufacturing relationships.", "Global supplier, technology and equipment sourcing based on project fit.", "Regional partners and local execution planning for the destination market."],
    mapLabel: "Worldwide supplier and delivery network", mapTags: ["Türkiye project leadership", "Global supplier integration", "Regional & local delivery"],
  },
  technology: {
    eyebrow: "Technology-Enabled Project Intelligence", title: "Digital tools support analysis. People remain accountable.",
    description: "Internal tools can support evidence review, supplier comparison, cost scenarios and project documentation without replacing professional judgement or executive approval.",
    points: ["Early Feasibility", "Production System Comparison", "Cost Scenario Development", "Supplier Evaluation", "Project Risk Review", "Proposal & Document Preparation"],
  },
  faq: {
    eyebrow: "Direct Answers", title: "How Novertra approaches industrial projects.",
    items: [
      { question: "What does Novertra do?", answer: "Novertra develops and structures industrial projects, coordinates engineering and suppliers, and supports delivery through commissioning and operational readiness." },
      { question: "Where does Novertra source equipment?", answer: "Türkiye is a priority engineering and manufacturing base, while qualified equipment and technology can be sourced internationally according to project requirements." },
      { question: "Does Novertra work only with Turkish manufacturers?", answer: "No. Supplier selection is based on technical fit, commercial terms, delivery capability, compliance and lifecycle support." },
      { question: "Which regions does Novertra serve?", answer: "Novertra is Türkiye-based and evaluates mandates across Africa and other international markets where local execution can be responsibly structured." },
      { question: "What industrial projects does Novertra support?", answer: "The current scope covers 13 sectors including manufacturing, agro-industry, energy, processing, industrial infrastructure and production clusters." },
      { question: "Does Novertra provide financing?", answer: "Novertra does not guarantee funding or act as a direct financier. For suitable projects, it can support financing-structure preparation and coordination with financial institutions." },
      { question: "How does project development work?", answer: "Work starts with opportunity and evidence review, then moves through feasibility, industrial concept, supplier qualification, delivery coordination and operational readiness." },
    ],
  },
  contact: {
    eyebrow: "Start a Project", title: "Describe the industrial need, not just the equipment list.",
    description: "Share the operating objective, target market, available evidence and delivery constraints so the opportunity can be screened responsibly.",
    notice: "This form prepares a local project brief only. It does not create a binding technical, commercial or financing commitment.",
    labels: { fullName: "Full Name", company: "Company / Institution", country: "Country", email: "Email", phone: "Phone / WhatsApp", product: "Product or Industrial Output", capacity: "Target Capacity", land: "Available Land", rawMaterial: "Raw Material Availability", budget: "Budget Range", financing: "Financing Status", timeline: "Desired Timeline", notes: "Additional Notes" },
    financingOptions: ["Own capital available", "Bank process in progress", "Financing structure required", "Publicly supported project", "Not yet defined"],
    select: "Select", file: "Document upload will be available with the secure project backend.", meeting: "Request a project qualification meeting", submit: "Validate project brief",
    backendNotice: "No online submission is made yet. Information remains in this browser session.", required: "Required", emailError: "Enter a valid email address",
    successEyebrow: "Local validation complete", successTitle: "Your project brief is ready for an initial discussion.",
    successDescription: "No external submission has been sent. Contact integration will be enabled only with a secure project backend.", reset: "Reset form",
  },
  footer: {
    tagline: "Industrial Project Development & Delivery", mission: "Industrial opportunities structured for credible execution.", parent: "A Bewell Global Company",
    operations: "Türkiye-rooted. Globally connected. Delivery-focused.", privacy: "Privacy", terms: "Terms", compliance: "Compliance", pending: "information page pending",
  },
  configurator: {
    eyebrow: "Industrial Project Configurator", title: "Turn an early idea into an indicative project brief.",
    description: "This screening tool compares preliminary scenarios. Figures are non-binding and require site, market, engineering and supplier validation.",
    factoryLabel: "1. Select industrial system", marketLabel: "2. Target market", capacityLabel: "3. Capacity band", energyLabel: "4. Energy model", fundingLabel: "5. Funding position",
    modelLabel: "Indicative project model", investment: "Indicative investment", land: "Indicative land", window: "Indicative delivery window", jobs: "Indicative direct jobs", months: "months", scale: "scale", readiness: "Project readiness",
    readinessNote: "Readiness reflects the selected funding position only. Land, demand, raw materials, permits and technical evidence still require validation.",
    checklist: ["Country opportunity review", "Raw material and demand validation", "Supplier configuration", "Financing pathway assessment"],
    generate: "Generate indicative brief", disclaimer: "No commercial commitment. Values are for early qualification only.",
    resultEyebrow: "Indicative assessment", resultTitle: "Preliminary project configuration prepared.", resultDescription: "The selected scenario is ready for opportunity validation.",
    gateLabel: "Next decision gate", gateTitle: "Opportunity Assessment", gateDescription: "Verify land, demand, raw material, local delivery and funding evidence before detailed engineering.",
    resultSteps: ["Configuration reviewed locally", "Indicative scenario prepared", "Country checklist outlined", "Development mandate pending"], next: "Review next steps", edit: "Edit configuration",
    factories: [
      { id: "feed", name: "Feed & Grain Hub", description: "Feed production, grain intake, silos, laboratory and packaging.", tag: "Value-chain system" },
      { id: "cold", name: "Cold Chain Centre", description: "Cold storage, packhouse, reefer handling and food logistics.", tag: "Temperature-controlled logistics" },
      { id: "dairy", name: "Dairy Processing", description: "Milk collection, pasteurisation, cultured products, cheese and cold chain.", tag: "Food processing" },
      { id: "flour", name: "Flour Mill", description: "Grain cleaning, milling, packaging and finished-goods storage.", tag: "Staple processing" },
      { id: "solar", name: "Industrial Utility Module", description: "Solar, battery, generator, water treatment and plant controls.", tag: "Supporting utility system" },
    ],
    countries: ["Sudan", "South Sudan", "Burkina Faso", "Cameroon", "Uganda", "Nigeria", "Zambia", "Other international market"],
    capacities: [{ id: "small", label: "Small", subtitle: "Entry / pilot" }, { id: "medium", label: "Medium", subtitle: "Commercial scale" }, { id: "large", label: "Large", subtitle: "Regional supply" }],
    energyOptions: [{ id: "grid", label: "Grid + backup" }, { id: "hybrid", label: "Solar hybrid" }, { id: "offgrid", label: "Fully off-grid" }],
    financeOptions: [{ id: "secured", label: "Capital secured" }, { id: "structured", label: "Needs structuring" }, { id: "early", label: "Early-stage concept" }],
  },
  system: { notFoundTitle: "Page not found", notFoundText: "The requested public page is unavailable.", backHome: "Return to home" },
};

const tr: PublicContent = {
  ...en,
  meta: {
    homeTitle: "Novertra Industrial | Endüstriyel Proje Geliştirme ve Teslimat",
    homeDescription: "Türkiye merkezli proje liderliği, küresel tedarikçi entegrasyonu ve uluslararası pazarlarda bölgesel uygulama kabiliyeti.",
    configureTitle: "Endüstriyel Proje Yapılandırıcı | Novertra Industrial",
    configureDescription: "Erken aşama fırsat değerlendirmesi için bağlayıcı olmayan, gösterge niteliğinde endüstriyel proje özeti hazırlayın.",
  },
  navigation: { capabilities: "Kabiliyetler", industries: "Sektörler", delivery: "Teslimat Modeli", experience: "Deneyim", about: "Hakkımızda", insights: "İçgörüler", configurator: "Proje Yapılandırıcı", start: "Proje Başlat", menu: "Menüyü aç veya kapat", language: "Dil", skip: "Ana içeriğe geç" },
  hero: {
    eyebrow: "ENDÜSTRİYEL PROJE GELİŞTİRME VE TESLİMAT", lead: "Endüstriyel Vizyondan", accent: "Operasyonel Gerçekliğe",
    description: "Novertra; Türkiye merkezli proje liderliği, uluslararası tedarik, mühendislik koordinasyonu ve yerel uygulama planlamasıyla endüstriyel fırsatları erken fikir aşamasından operasyonel hazırlığa taşır.",
    primary: "Endüstriyel Proje Başlat", secondary: "Kabiliyetlerimizi İncele",
    bullets: ["Satın alma öncesi proje geliştirme.", "Küresel teknoloji ve tedarikçi entegrasyonu.", "Yerel işletme koşullarına uygun bölgesel teslimat."],
    operations: "Türkiye kökenli. Küresel bağlantılı. Teslimat odaklı.", imageAlt: "Koordineli endüstriyel proje geliştirme ve teslimatı temsil eden üretim tesisi",
  },
  trust: ["Türkiye Merkezli Proje Liderliği", "Endüstriyel Proje Geliştirme", "Küresel Tedarikçi Entegrasyonu", "Bölgesel Teslimat Kabiliyeti"],
  capabilities: {
    eyebrow: "Neleri Koordine Ediyoruz", title: "Proje fırsatından operasyonel hazırlığa uzanan tek ve sorumlu yol.",
    description: "Her çalışma, sabit bir sözleşme modeli yerine projenin teknik, ticari ve teslimat gereksinimlerine göre yapılandırılır.",
    items: [
      { title: "Fizibilite ve Proje Yapılandırma", text: "Büyük taahhütlerden önce fırsatı test eder, proje temelini ve gerekli kanıtları tanımlarız." },
      { title: "Endüstriyel Konsept ve Mühendislik Koordinasyonu", text: "Proses, yerleşim, yardımcı tesis ve işletme gereksinimlerini yetkin mühendislik uzmanlarıyla uyumlandırırız." },
      { title: "Teknoloji ve Ekipman Tedariki", text: "Üretim sistemlerini teknik ve ticari uygunluğa göre Türkiye ve uluslararası pazarlarda karşılaştırırız." },
      { title: "İnşaat ve Yardımcı Tesis Koordinasyonu", text: "Saha altyapısı, yapılar, enerji, su ve destek sistemlerini teslimat planına entegre ederiz." },
      { title: "Kurulum ve Devreye Alma Desteği", text: "Tedarikçi, yüklenici ve yerel uygulama arayüzlerini kurulum, test ve başlangıç için sıralarız." },
      { title: "Operasyonel Hazırlık", text: "Üretim başlamadan dokümantasyon, eğitim, devir ve ilk işletme gereksinimlerini hazırlarız." },
    ],
  },
  industries: {
    eyebrow: "Desteklediğimiz Sektörler", title: "Talep, kaynak, altyapı ve işletme kabiliyetine göre şekillenen endüstriyel sistemler.",
    cta: "Bu Kabiliyeti Görüşelim", development: "Geliştirme Alanları", scope: "Tipik Teslimat Kapsamı", models: "Uygun Proje Modelleri",
    items: [
      { key: "infrastructure", title: "Endüstriyel Altyapı", description: "Verimli sanayi operasyonlarını mümkün kılan saha erişimi, yardımcı tesis ve lojistik sistemleri.", developmentAreas: ["Endüstriyel erişim ve saha dolaşımı", "Yardımcı tesis ve servis ağları", "Lojistik destek tesisleri"], deliveryScope: ["Saha ve altyapı planlama", "İnşaat ve yardımcı tesis koordinasyonu", "Uygulama gözetimi"], projectModels: ["Yeni endüstriyel sahalar", "Üretim kampüsleri", "Fabrika bağlantılı altyapı"] },
      { key: "energy", title: "Endüstriyel Enerji Sistemleri", description: "Tesis talebi ve işletme sürekliliğine göre yapılandırılan konvansiyonel, yenilenebilir ve hibrit enerji sistemleri.", developmentAreas: ["İç tüketim ve yedek güç", "Güneş ve hibrit sistemler", "Tesis dağıtım altyapısı"], deliveryScope: ["Talep değerlendirmesi", "Teknoloji yapılandırması", "Kurulum ve devreye alma koordinasyonu"], projectModels: ["Endüstriyel iç tüketim santralleri", "Tesis hibritleştirme", "Uzak saha enerji sistemleri"] },
      { key: "agro-industry", title: "Agro-Endüstri", description: "Tarımsal kaynakları sürdürülebilir pazarlarla buluşturan üretim, depolama ve işleme sistemleri.", developmentAreas: ["Sulamalı üretim sistemleri", "Ürün ve yem işleme", "Depolama ve ambalajlama"], deliveryScope: ["Değer zinciri yapılandırması", "Su ve yardımcı tesis planlama", "Ekipman entegrasyonu ve eğitim"], projectModels: ["Ticari tarım ve işleme", "Kırsal üretim kampüsleri", "Gıda güvenliği programları"] },
      { key: "mining-processing", title: "Maden İşleme", description: "Tanımlı cevher özellikleri, kapasite ve geri kazanım hedeflerine göre tasarlanan malzeme taşıma ve işleme tesisleri.", developmentAreas: ["Kırma ve eleme", "Zenginleştirme ve geri kazanım", "Malzeme taşıma ve yardımcı tesisler"], deliveryScope: ["Proses yapılandırması", "Ekipman yeterlilik değerlendirmesi", "Kurulum ve devreye alma desteği"], projectModels: ["Yeni işleme tesisleri", "Tesis kapasite artışları", "Modüler işleme sistemleri"] },
      { key: "industrial-manufacturing", title: "Endüstriyel Üretim", description: "İmalat, montaj ve üretim programları için ölçeklenebilir üretim ortamları.", developmentAreas: ["Montaj ve üretim hatları", "İmalat atölyeleri", "Fabrika yardımcı tesisleri ve lojistik"], deliveryScope: ["Kapasite ve ürün tanımı", "Fabrika mühendisliği koordinasyonu", "Ekipman kurulum desteği"], projectModels: ["Yerel üretim", "İthal ikamesi", "Teknoloji yerelleştirme"] },
      { key: "strategic-facilities", title: "Kritik Operasyon Tesisleri", description: "Kontrollü teslimat, süreklilik ve güvenilir destek altyapısı gerektiren operasyonel ve kurumsal tesisler.", developmentAreas: ["Operasyon yerleşkeleri", "Kritik hizmet yapıları", "Özel amaçlı kamu tesisleri"], deliveryScope: ["Fonksiyonel gereksinimler", "Tesis ve sistem koordinasyonu", "Kontrollü devreye alma"], projectModels: ["Kurumsal tesisler", "Operasyon merkezleri", "Özel amaçlı altyapı"] },
      { key: "textile-manufacturing", title: "Tekstil Üretimi", description: "İplik, dokuma, terbiye ve yardımcı tesisler için yeni yatırım ve rehabilitasyon programları.", developmentAreas: ["İplik ve dokuma", "Terbiye hatları", "Fabrika rehabilitasyonu"], deliveryScope: ["Durum ve kapasite değerlendirmesi", "Hat yapılandırması", "Yeniden devreye alma desteği"], projectModels: ["Yeni tekstil tesisleri", "Atıl tesis rehabilitasyonu", "Kapasite artışı"] },
      { key: "food-processing-cold-chain", title: "Gıda İşleme ve Soğuk Zincir", description: "Hijyenik işleme, ambalajlama, kontrollü depolama ve sıcaklık kontrollü lojistik.", developmentAreas: ["Gıda işleme ve ambalajlama", "Soğuk depolama", "Soğuk zincir lojistiği"], deliveryScope: ["Hijyenik akış planlama", "Hat ve yardımcı tesis entegrasyonu", "Operasyonel hazırlık"], projectModels: ["Meyve-sebze işleme", "Süt ve ambalajlı gıda", "Bölgesel depolama programları"] },
      { key: "poultry-production-processing", title: "Kanatlı Üretimi ve İşleme", description: "Yem, yetiştiricilik, işleme, ambalajlama ve soğuk dağıtımı bağlayan entegre kanatlı sistemleri.", developmentAreas: ["Kanatlı çiftlikleri", "İşleme ve ambalajlama", "Yem ve soğuk zincir sistemleri"], deliveryScope: ["Kapasite ve biyogüvenlik planlama", "Ekipman yapılandırması", "Eğitim ve devreye alma"], projectModels: ["Etlik piliç değer zincirleri", "Yumurtacı programları", "Kanatlı işleme tesisleri"] },
      { key: "cattle-beef-processing", title: "Sığır Yetiştiriciliği ve Et İşleme", description: "Hayvan yetiştiriciliği, modern kesim, et işleme ve soğuk dağıtımın ayrı ancak bağlantılı operasyonlar olarak planlanması.", developmentAreas: ["Hayvancılık ve yem sistemleri", "Modern mezbahaneler", "Et işleme ve soğuk zincir"], deliveryScope: ["Kapasite ve hayvan refahı planlama", "Hijyenik proses yapılandırması", "Atık, yardımcı tesis ve soğuk zincir entegrasyonu"], projectModels: ["Sığır yetiştirme projeleri", "Entegre et kompleksleri", "Bölgesel kesim ve işleme tesisleri"] },
      { key: "small-factories-industrial-park", title: "Küçük Fabrika Kümeleri ve Sanayi Parkları", description: "Bağımsız üreticilerin altyapı, lojistik ve ortak hizmetleri paylaşabildiği planlı üretim kümeleri.", developmentAreas: ["KOBİ fabrika birimleri", "Ortak yardımcı tesisler", "Depolama ve ortak hizmetler"], deliveryScope: ["Master planlama", "Modüler tesis tasarımı", "Kiracı hazırlık koordinasyonu"], projectModels: ["KOBİ sanayi parkları", "Üretim kümeleri", "Uzmanlaşmış üretim kampüsleri"] },
      { key: "tractor-assembly", title: "Traktör Montajı", description: "Parça lojistiği, test, kalite kontrol ve satış sonrası hazırlığı içeren CKD veya SKD montaj operasyonları.", developmentAreas: ["Montaj hatları", "Parça lojistiği", "Test ve eğitim alanları"], deliveryScope: ["Hat ve takım yapılandırması", "Tesis iş akışı planlama", "Kurulum ve iş gücü eğitimi"], projectModels: ["CKD ve SKD tesisleri", "Mekanizasyon programları", "Bölgesel montaj merkezleri"] },
      { key: "agricultural-equipment-manufacturing", title: "Tarım Ekipmanları Üretimi", description: "Pulluk, mibzer, kültivatör ve römork gibi ekipmanlar için imalat ve üretim sistemleri.", developmentAreas: ["Tarım aletleri ve ataşmanlar", "Römork ve taşıma ekipmanları", "Yedek parça atölyeleri"], deliveryScope: ["Ürün ailesi tanımı", "Kesme, şekillendirme ve kaynak sistemleri", "Montaj ve kalite kontrol başlangıcı"], projectModels: ["Yerel ekipman üretimi", "İthal ikamesi", "Traktör bağlantılı üretim"] },
    ],
  },
  delivery: {
    eyebrow: "Projeye Özel Teslimat Modeli", title: "Fırsattan Operasyona",
    description: "Novertra her göreve uygun teslimat yapısını koordine eder; her projeyi sabit bir EPC veya finansman taahhüdü olarak sunmaz.",
    items: [{ title: "Fırsat Değerlendirmesi", text: "Talep, kaynaklar, saha ve işletme ihtiyacı test edilir." }, { title: "Fizibilite Koordinasyonu", text: "Teknik, ticari ve kanıt gereksinimleri tanımlanır." }, { title: "Konsept ve Mühendislik", text: "Proses, yerleşim ve yardımcı tesis tercihleri uyumlandırılır." }, { title: "Tedarikçi Yeterliliği", text: "Teknoloji, ekipman ve tedarikçiler karşılaştırılır." }, { title: "Teslimat Koordinasyonu", text: "Satın alma, inşaat ve yerel arayüzler sıralanır." }, { title: "Devreye Alma Desteği", text: "Test, eğitim ve devir hazırlığı koordine edilir." }, { title: "Operasyonel Hazırlık", text: "Kararlı üretim öncesi açık işler kapatılır." }],
  },
  experience: {
    eyebrow: "Seçilmiş Proje Deneyimi", title: "Kaynağı açıkça belirtilen saha deneyimi.",
    description: "Aşağıdaki işler, Novertra ekibinin erişebildiği doğrulanmış Bewell Global / Deltayapı deneyimini yansıtır; yeni Novertra sözleşmeleri olarak sunulmaz.",
    items: en.experience.items.map((item) => ({ ...item, note: "Bewell Global / Deltayapı proje deneyimi" })),
  },
  supply: {
    eyebrow: "Küresel Endüstriyel Tedarik Ağı", title: "Türkiye kökenli, küresel bağlantılı.",
    description: "Türkiye ana merkezimiz ve mühendislik ile üretim için öncelikli kaynağımızdır. Her proje, ihtiyaca göre uluslararası pazarlardan yetkin teknoloji, ekipman ve uzmanları da entegre edebilir.",
    claims: ["Türkiye merkezli proje liderliği ve öncelikli üretim ilişkileri.", "Proje uygunluğuna göre küresel tedarikçi, teknoloji ve ekipman kaynağı.", "Hedef pazar için bölgesel ortaklar ve yerel uygulama planlaması."],
    mapLabel: "Küresel tedarikçi ve teslimat ağı", mapTags: ["Türkiye proje liderliği", "Küresel tedarikçi entegrasyonu", "Bölgesel ve yerel teslimat"],
  },
  technology: {
    eyebrow: "Teknoloji Destekli Proje İçgörüsü", title: "Dijital araçlar analizi destekler. Sorumluluk insanda kalır.",
    description: "Dahili araçlar profesyonel muhakeme veya yönetici onayının yerini almadan kanıt inceleme, tedarikçi karşılaştırma, maliyet senaryoları ve proje dokümantasyonunu destekleyebilir.",
    points: ["Erken Fizibilite", "Üretim Sistemi Karşılaştırması", "Maliyet Senaryosu Geliştirme", "Tedarikçi Değerlendirmesi", "Proje Risk İncelemesi", "Teklif ve Doküman Hazırlığı"],
  },
  faq: {
    eyebrow: "Net Yanıtlar", title: "Novertra endüstriyel projelere nasıl yaklaşır?",
    items: [
      { question: "Novertra ne yapar?", answer: "Endüstriyel projeleri geliştirir ve yapılandırır; mühendislik ile tedarikçileri koordine eder; devreye alma ve operasyonel hazırlığa kadar teslimatı destekler." },
      { question: "Novertra ekipmanı nereden tedarik eder?", answer: "Türkiye öncelikli mühendislik ve üretim üssüdür; proje gereksinimlerine göre uluslararası pazarlardan uygun ekipman ve teknoloji de tedarik edilebilir." },
      { question: "Novertra yalnız Türk üreticilerle mi çalışır?", answer: "Hayır. Tedarikçi seçimi teknik uygunluk, ticari şartlar, teslimat kabiliyeti, uyum ve yaşam döngüsü desteğine dayanır." },
      { question: "Novertra hangi bölgelerde çalışır?", answer: "Novertra Türkiye merkezlidir; yerel uygulamanın sorumlu biçimde yapılandırılabildiği Afrika ve diğer uluslararası pazarlardaki görevleri değerlendirir." },
      { question: "Hangi endüstriyel projeleri destekler?", answer: "Mevcut kapsam; üretim, agro-endüstri, enerji, işleme, endüstriyel altyapı ve üretim kümeleri dahil 13 sektörü kapsar." },
      { question: "Novertra finansman sağlar mı?", answer: "Novertra fon garantisi vermez ve doğrudan finansör değildir. Uygun projelerde finansman yapısının hazırlanmasını ve finans kuruluşlarıyla koordinasyonu destekleyebilir." },
      { question: "Proje geliştirme süreci nasıl işler?", answer: "Süreç fırsat ve kanıt incelemesiyle başlar; fizibilite, endüstriyel konsept, tedarikçi yeterliliği, teslimat koordinasyonu ve operasyonel hazırlıkla ilerler." },
    ],
  },
  contact: {
    eyebrow: "Proje Başlat", title: "Yalnız ekipman listesini değil, endüstriyel ihtiyacı anlatın.",
    description: "Fırsatın sorumlu biçimde incelenebilmesi için işletme hedefini, pazarı, mevcut kanıtları ve teslimat kısıtlarını paylaşın.",
    notice: "Bu form yalnızca yerel bir proje özeti hazırlar; bağlayıcı teknik, ticari veya finansman taahhüdü oluşturmaz.",
    labels: { fullName: "Ad Soyad", company: "Şirket / Kurum", country: "Ülke", email: "E-posta", phone: "Telefon / WhatsApp", product: "Ürün veya Endüstriyel Çıktı", capacity: "Hedef Kapasite", land: "Mevcut Arazi", rawMaterial: "Hammadde Durumu", budget: "Bütçe Aralığı", financing: "Finansman Durumu", timeline: "Hedef Takvim", notes: "Ek Notlar" },
    financingOptions: ["Öz kaynak hazır", "Banka süreci devam ediyor", "Finansman yapısı gerekli", "Kamu destekli proje", "Henüz tanımlanmadı"],
    select: "Seçin", file: "Belge yükleme, güvenli proje backend'i ile etkinleştirilecektir.", meeting: "Proje ön değerlendirme toplantısı talep et", submit: "Proje özetini doğrula",
    backendNotice: "Henüz çevrimiçi gönderim yapılmaz. Bilgiler bu tarayıcı oturumunda kalır.", required: "Zorunlu", emailError: "Geçerli bir e-posta adresi girin",
    successEyebrow: "Yerel doğrulama tamamlandı", successTitle: "Proje özetiniz ilk görüşme için hazır.", successDescription: "Harici gönderim yapılmadı. İletişim entegrasyonu yalnız güvenli proje backend'i ile etkinleştirilecektir.", reset: "Formu sıfırla",
  },
  footer: { tagline: "Endüstriyel Proje Geliştirme ve Teslimat", mission: "Güvenilir uygulama için yapılandırılan endüstriyel fırsatlar.", parent: "Bir Bewell Global Şirketi", operations: "Türkiye kökenli. Küresel bağlantılı. Teslimat odaklı.", privacy: "Gizlilik", terms: "Koşullar", compliance: "Uyum", pending: "bilgi sayfası hazırlanıyor" },
  configurator: {
    ...en.configurator,
    eyebrow: "Endüstriyel Proje Yapılandırıcı", title: "Erken aşama fikrini gösterge niteliğinde proje özetine dönüştürün.", description: "Bu ön değerlendirme aracı ilk senaryoları karşılaştırır. Değerler bağlayıcı değildir; saha, pazar, mühendislik ve tedarikçi doğrulaması gerekir.",
    factoryLabel: "1. Endüstriyel sistemi seçin", marketLabel: "2. Hedef pazar", capacityLabel: "3. Kapasite aralığı", energyLabel: "4. Enerji modeli", fundingLabel: "5. Finansman durumu", modelLabel: "Gösterge proje modeli", investment: "Gösterge yatırım", land: "Gösterge arazi", window: "Gösterge teslimat süresi", jobs: "Gösterge doğrudan istihdam", months: "ay", scale: "ölçek", readiness: "Proje hazırlığı",
    readinessNote: "Hazırlık yalnız seçilen finansman durumunu yansıtır. Arazi, talep, hammadde, izin ve teknik kanıtlar ayrıca doğrulanmalıdır.", checklist: ["Ülke fırsat incelemesi", "Hammadde ve talep doğrulaması", "Tedarikçi yapılandırması", "Finansman yolu değerlendirmesi"], generate: "Gösterge özeti oluştur", disclaimer: "Ticari taahhüt değildir. Değerler yalnız erken ön değerlendirme içindir.", resultEyebrow: "Gösterge değerlendirme", resultTitle: "Ön proje yapılandırması hazırlandı.", resultDescription: "Seçilen senaryo fırsat doğrulamasına hazırdır.", gateLabel: "Sonraki karar kapısı", gateTitle: "Fırsat Değerlendirmesi", gateDescription: "Detay mühendislik öncesi arazi, talep, hammadde, yerel teslimat ve finansman kanıtlarını doğrulayın.", resultSteps: ["Yapılandırma yerel olarak incelendi", "Gösterge senaryo hazırlandı", "Ülke kontrol listesi oluşturuldu", "Geliştirme yetkilendirmesi bekleniyor"], next: "Sonraki adımları incele", edit: "Yapılandırmayı düzenle",
    factories: [{ id: "feed", name: "Yem ve Tahıl Merkezi", description: "Yem üretimi, tahıl kabulü, silolar, laboratuvar ve ambalajlama.", tag: "Değer zinciri sistemi" }, { id: "cold", name: "Soğuk Zincir Merkezi", description: "Soğuk depolama, paketleme, frigorifik araç elleçleme ve gıda lojistiği.", tag: "Sıcaklık kontrollü lojistik" }, { id: "dairy", name: "Süt İşleme", description: "Süt toplama, pastörizasyon, fermente ürünler, peynir ve soğuk zincir.", tag: "Gıda işleme" }, { id: "flour", name: "Un Değirmeni", description: "Tahıl temizleme, öğütme, ambalajlama ve ürün depolama.", tag: "Temel gıda işleme" }, { id: "solar", name: "Endüstriyel Yardımcı Tesis Modülü", description: "Güneş, batarya, jeneratör, su arıtma ve tesis kontrolleri.", tag: "Destek sistemi" }],
    countries: ["Sudan", "Güney Sudan", "Burkina Faso", "Kamerun", "Uganda", "Nijerya", "Zambiya", "Diğer uluslararası pazar"], capacities: [{ id: "small", label: "Küçük", subtitle: "Başlangıç / pilot" }, { id: "medium", label: "Orta", subtitle: "Ticari ölçek" }, { id: "large", label: "Büyük", subtitle: "Bölgesel tedarik" }], energyOptions: [{ id: "grid", label: "Şebeke + yedek" }, { id: "hybrid", label: "Güneş hibrit" }, { id: "offgrid", label: "Tam bağımsız" }], financeOptions: [{ id: "secured", label: "Sermaye hazır" }, { id: "structured", label: "Yapılandırma gerekli" }, { id: "early", label: "Erken aşama fikir" }],
  },
  system: { notFoundTitle: "Sayfa bulunamadı", notFoundText: "İstenen public sayfaya ulaşılamıyor.", backHome: "Ana sayfaya dön" },
};

const fr: PublicContent = {
  ...en,
  meta: {
    homeTitle: "Novertra Industrial | Développement et réalisation de projets industriels",
    homeDescription: "Pilotage de projets depuis la Türkiye, intégration mondiale des fournisseurs et réalisation régionale sur les marchés internationaux.",
    configureTitle: "Configurateur de projet industriel | Novertra Industrial",
    configureDescription: "Préparez une note de projet industrielle indicative pour l'évaluation initiale d'une opportunité, sans engagement commercial.",
  },
  navigation: { capabilities: "Compétences", industries: "Secteurs", delivery: "Modèle de réalisation", experience: "Expérience", about: "À propos", insights: "Analyses", configurator: "Configurateur", start: "Lancer un projet", menu: "Ouvrir ou fermer le menu", language: "Langue", skip: "Aller au contenu principal" },
  hero: {
    eyebrow: "DÉVELOPPEMENT ET RÉALISATION DE PROJETS INDUSTRIELS", lead: "De la vision industrielle", accent: "à la réalité opérationnelle",
    description: "Novertra structure les opportunités industrielles, du concept initial à la préparation opérationnelle, grâce à un pilotage basé en Türkiye, au sourcing international, à la coordination de l'ingénierie et à la planification de l'exécution locale.",
    primary: "Lancer un projet industriel", secondary: "Découvrir nos compétences",
    bullets: ["Développement du projet avant les achats.", "Intégration mondiale des technologies et fournisseurs.", "Réalisation régionale adaptée aux conditions locales."],
    operations: "Ancrée en Türkiye. Connectée au monde. Orientée réalisation.", imageAlt: "Installation industrielle illustrant le développement et la réalisation coordonnés d'un projet",
  },
  trust: ["Pilotage basé en Türkiye", "Développement de projets industriels", "Intégration mondiale des fournisseurs", "Capacité de réalisation régionale"],
  capabilities: {
    eyebrow: "Ce que nous coordonnons", title: "Un parcours responsable, de l'opportunité à la préparation opérationnelle.",
    description: "Chaque mission est structurée selon les exigences techniques, commerciales et de réalisation du projet, plutôt que selon un modèle contractuel imposé.",
    items: [
      { title: "Faisabilité et structuration", text: "Nous évaluons l'opportunité, définissons les bases du projet et les preuves nécessaires avant tout engagement majeur." },
      { title: "Concept industriel et coordination de l'ingénierie", text: "Les procédés, implantations, utilités et besoins d'exploitation sont alignés avec des spécialistes qualifiés." },
      { title: "Sourcing de technologies et d'équipements", text: "Les systèmes de production sont comparés en Türkiye et sur les marchés internationaux selon leur adéquation technique et commerciale." },
      { title: "Coordination du génie civil et des utilités", text: "L'infrastructure du site, les bâtiments, l'énergie, l'eau et les systèmes auxiliaires sont intégrés au plan de réalisation." },
      { title: "Appui à l'installation et à la mise en service", text: "Les interfaces entre fournisseurs, entreprises et équipes locales sont séquencées pour l'installation, les essais et le démarrage." },
      { title: "Préparation opérationnelle", text: "La documentation, la formation, la remise et les besoins du démarrage sont préparés avant la production." },
    ],
  },
  industries: {
    eyebrow: "Secteurs accompagnés", title: "Des systèmes industriels conçus selon la demande, les ressources, les infrastructures et les capacités d'exploitation.",
    cta: "Discuter de cette compétence", development: "Domaines de développement", scope: "Périmètre type", models: "Modèles de projet adaptés",
    items: [
      { key: "infrastructure", title: "Infrastructures industrielles", description: "Accès, utilités et logistique indispensables à des opérations industrielles productives.", developmentAreas: ["Accès et circulation industriels", "Réseaux d'utilités et de services", "Installations logistiques"], deliveryScope: ["Planification du site", "Coordination génie civil et utilités", "Supervision de la mise en œuvre"], projectModels: ["Sites industriels nouveaux", "Campus de production", "Infrastructure liée à une usine"] },
      { key: "energy", title: "Systèmes énergétiques industriels", description: "Solutions conventionnelles, renouvelables et hybrides configurées selon la demande et la continuité d'exploitation.", developmentAreas: ["Production captive et secours", "Solaire et systèmes hybrides", "Distribution électrique du site"], deliveryScope: ["Évaluation de la demande", "Configuration technologique", "Coordination installation et mise en service"], projectModels: ["Énergie captive industrielle", "Hybridation d'usines", "Énergie pour sites isolés"] },
      { key: "agro-industry", title: "Agro-industrie", description: "Systèmes intégrés de production, stockage et transformation reliant les ressources agricoles aux marchés viables.", developmentAreas: ["Production irriguée", "Transformation des cultures et aliments", "Stockage et conditionnement"], deliveryScope: ["Configuration de la chaîne de valeur", "Planification eau et utilités", "Intégration des équipements et formation"], projectModels: ["Agriculture et transformation commerciales", "Campus ruraux", "Programmes de sécurité alimentaire"] },
      { key: "mining-processing", title: "Traitement des minerais", description: "Installations de manutention et de traitement adaptées au minerai, au débit et aux objectifs de récupération.", developmentAreas: ["Concassage et criblage", "Concentration et récupération", "Manutention et utilités"], deliveryScope: ["Configuration des procédés", "Qualification des équipements", "Appui installation et mise en service"], projectModels: ["Nouvelles unités de traitement", "Extensions d'usine", "Systèmes modulaires"] },
      { key: "industrial-manufacturing", title: "Production industrielle", description: "Environnements évolutifs pour la fabrication, l'assemblage et les programmes manufacturiers.", developmentAreas: ["Lignes d'assemblage et de production", "Ateliers de fabrication", "Utilités et logistique"], deliveryScope: ["Définition produits et capacités", "Coordination de l'ingénierie", "Appui à l'installation"], projectModels: ["Production locale", "Substitution aux importations", "Localisation technologique"] },
      { key: "strategic-facilities", title: "Installations critiques", description: "Installations opérationnelles et institutionnelles exigeant maîtrise de la réalisation, continuité et infrastructures fiables.", developmentAreas: ["Complexes opérationnels", "Bâtiments de services critiques", "Installations publiques spécialisées"], deliveryScope: ["Exigences fonctionnelles", "Coordination des systèmes", "Mise en service contrôlée"], projectModels: ["Installations institutionnelles", "Centres opérationnels", "Infrastructures spécialisées"] },
      { key: "textile-manufacturing", title: "Industrie textile", description: "Programmes neufs ou de réhabilitation pour la filature, le tissage, la finition et les utilités.", developmentAreas: ["Filature et tissage", "Lignes de finition", "Réhabilitation d'usines"], deliveryScope: ["Évaluation de l'état et des capacités", "Configuration des lignes", "Appui au redémarrage"], projectModels: ["Nouvelles usines textiles", "Réhabilitation d'unités arrêtées", "Extension de capacité"] },
      { key: "food-processing-cold-chain", title: "Transformation alimentaire et chaîne du froid", description: "Transformation hygiénique, conditionnement, stockage contrôlé et logistique sous température dirigée.", developmentAreas: ["Transformation et conditionnement", "Stockage frigorifique", "Logistique du froid"], deliveryScope: ["Planification des flux hygiéniques", "Intégration lignes et utilités", "Préparation opérationnelle"], projectModels: ["Transformation des produits agricoles", "Produits laitiers et emballés", "Programmes régionaux de stockage"] },
      { key: "poultry-production-processing", title: "Production et transformation avicoles", description: "Systèmes intégrés reliant alimentation, élevage, transformation, conditionnement et distribution frigorifique.", developmentAreas: ["Élevages avicoles", "Transformation et conditionnement", "Aliments et chaîne du froid"], deliveryScope: ["Planification capacité et biosécurité", "Configuration des équipements", "Formation et mise en service"], projectModels: ["Chaînes de valeur poulet de chair", "Programmes de ponte", "Unités de transformation"] },
      { key: "cattle-beef-processing", title: "Élevage bovin et transformation de la viande", description: "Élevage, abattage moderne, transformation et distribution frigorifique planifiés comme opérations distinctes mais intégrées.", developmentAreas: ["Élevage et alimentation", "Abattoirs modernes", "Transformation et froid"], deliveryScope: ["Planification débit et bien-être animal", "Configuration hygiénique", "Intégration déchets, utilités et froid"], projectModels: ["Projets d'élevage bovin", "Complexes viande intégrés", "Unités régionales d'abattage et transformation"] },
      { key: "small-factories-industrial-park", title: "Grappes de petites usines et parcs industriels", description: "Ensembles planifiés où des producteurs indépendants partagent infrastructures, logistique et services communs.", developmentAreas: ["Unités pour PME", "Utilités partagées", "Entrepôts et services communs"], deliveryScope: ["Plan directeur", "Conception modulaire", "Préparation des occupants"], projectModels: ["Parcs industriels pour PME", "Grappes manufacturières", "Campus spécialisés"] },
      { key: "tractor-assembly", title: "Assemblage de tracteurs", description: "Opérations CKD ou SKD avec logistique des composants, essais, contrôle qualité et préparation après-vente.", developmentAreas: ["Lignes d'assemblage", "Logistique des composants", "Zones d'essais et formation"], deliveryScope: ["Configuration lignes et outillages", "Planification des flux", "Installation et formation"], projectModels: ["Usines CKD et SKD", "Programmes de mécanisation", "Pôles régionaux d'assemblage"] },
      { key: "agricultural-equipment-manufacturing", title: "Fabrication d'équipements agricoles", description: "Systèmes de fabrication pour charrues, semoirs, cultivateurs, remorques et autres outils agricoles.", developmentAreas: ["Outils et accessoires", "Remorques et transport", "Ateliers de pièces"], deliveryScope: ["Définition des gammes", "Découpe, formage et soudage", "Lancement assemblage et qualité"], projectModels: ["Production locale d'outils", "Substitution aux importations", "Fabrication liée aux tracteurs"] },
    ],
  },
  delivery: {
    eyebrow: "Modèle adapté à chaque projet", title: "De l'opportunité à l'exploitation",
    description: "Novertra coordonne la structure de réalisation adaptée à chaque mandat, sans présenter systématiquement le projet comme un contrat EPC ou un engagement de financement.",
    items: [{ title: "Évaluation de l'opportunité", text: "La demande, les ressources, le site et le besoin sont testés." }, { title: "Coordination de la faisabilité", text: "Les exigences techniques, commerciales et documentaires sont définies." }, { title: "Concept et ingénierie", text: "Les choix de procédés, implantation et utilités sont alignés." }, { title: "Qualification des fournisseurs", text: "Technologies, équipements et fournisseurs sont comparés." }, { title: "Coordination de la réalisation", text: "Achats, travaux et interfaces locales sont séquencés." }, { title: "Appui à la mise en service", text: "Essais, formation et remise sont coordonnés." }, { title: "Préparation opérationnelle", text: "Les actions ouvertes sont closes avant la production stable." }],
  },
  experience: {
    eyebrow: "Expérience de projets sélectionnée", title: "Une expérience dont la provenance est clairement indiquée.",
    description: "Les travaux suivants reflètent l'expérience vérifiée de Bewell Global / Deltayapı accessible à l'équipe Novertra; ils ne sont pas présentés comme de nouveaux contrats Novertra.",
    items: [
      { title: "Complexe textile de Hasahisa", location: "Soudan", scope: "Construction, réhabilitation et travaux d'installations industrielles.", note: "Expérience de projet Bewell Global / Deltayapı" },
      { title: "Autres installations textiles", location: "Kosti, Shendi et autres sites au Soudan", scope: "Rénovation d'usines et travaux électromécaniques.", note: "Expérience de projet Bewell Global / Deltayapı" },
      { title: "Projet mobile de 150 MW", location: "Khartoum, Soudan", scope: "Expérience de construction industrielle et d'infrastructure énergétique.", note: "Expérience de projet Bewell Global / Deltayapı" },
      { title: "Installation minière", location: "Nord du Soudan", scope: "Construction et installation d'équipements pour des opérations de traitement aurifère.", note: "Expérience de projet Bewell Global / Deltayapı" },
      { title: "Projets industriels et publics", location: "Soudan", scope: "Bâtiments industriels, installations administratives, parcs et travaux municipaux.", note: "Expérience de projet Bewell Global / Deltayapı" },
    ],
  },
  supply: {
    eyebrow: "Réseau mondial d'approvisionnement industriel", title: "Ancrée en Türkiye, connectée au monde.",
    description: "La Türkiye est notre base et une source prioritaire d'ingénierie et de production. Chaque projet peut aussi intégrer des technologies, équipements et spécialistes qualifiés issus des marchés internationaux.",
    claims: ["Pilotage depuis la Türkiye et relations industrielles prioritaires.", "Sourcing mondial des fournisseurs, technologies et équipements selon le projet.", "Partenaires régionaux et planification de l'exécution locale sur le marché cible."],
    mapLabel: "Réseau mondial de fournisseurs et de réalisation", mapTags: ["Pilotage depuis la Türkiye", "Intégration mondiale", "Réalisation régionale et locale"],
  },
  technology: { eyebrow: "Intelligence de projet assistée par la technologie", title: "Les outils numériques appuient l'analyse. La responsabilité reste humaine.", description: "Les outils internes peuvent soutenir l'examen des preuves, la comparaison des fournisseurs, les scénarios de coûts et la documentation sans remplacer le jugement professionnel ni l'approbation de la direction.", points: ["Faisabilité initiale", "Comparaison des systèmes", "Scénarios de coûts", "Évaluation des fournisseurs", "Revue des risques", "Préparation des offres et documents"] },
  faq: {
    eyebrow: "Réponses directes", title: "L'approche de Novertra pour les projets industriels.",
    items: [
      { question: "Que fait Novertra ?", answer: "Novertra développe et structure des projets industriels, coordonne l'ingénierie et les fournisseurs, puis appuie la réalisation jusqu'à la mise en service et la préparation opérationnelle." },
      { question: "Où Novertra source-t-elle les équipements ?", answer: "La Türkiye est une base prioritaire d'ingénierie et de production; les équipements et technologies adaptés peuvent aussi provenir des marchés internationaux." },
      { question: "Novertra travaille-t-elle uniquement avec des fabricants turcs ?", answer: "Non. La sélection repose sur l'adéquation technique, les conditions commerciales, la capacité de livraison, la conformité et le support sur le cycle de vie." },
      { question: "Dans quelles régions Novertra intervient-elle ?", answer: "Basée en Türkiye, Novertra étudie des mandats en Afrique et sur d'autres marchés internationaux lorsque l'exécution locale peut être structurée de façon responsable." },
      { question: "Quels projets industriels sont accompagnés ?", answer: "Le périmètre actuel couvre 13 secteurs, dont l'industrie manufacturière, l'agro-industrie, l'énergie, la transformation, les infrastructures et les grappes de production." },
      { question: "Novertra fournit-elle un financement ?", answer: "Novertra ne garantit pas les fonds et n'est pas un financeur direct. Pour les projets adaptés, elle peut appuyer la préparation de la structure financière et la coordination avec des institutions financières." },
      { question: "Comment se déroule le développement d'un projet ?", answer: "Le travail commence par l'examen de l'opportunité et des preuves, puis avance par la faisabilité, le concept industriel, la qualification des fournisseurs, la coordination de la réalisation et la préparation opérationnelle." },
    ],
  },
  contact: {
    eyebrow: "Lancer un projet", title: "Décrivez le besoin industriel, pas seulement la liste d'équipements.", description: "Partagez l'objectif d'exploitation, le marché cible, les preuves disponibles et les contraintes de réalisation afin d'évaluer l'opportunité de manière responsable.",
    notice: "Ce formulaire prépare uniquement une note locale; il ne crée aucun engagement technique, commercial ou financier.",
    labels: { fullName: "Nom complet", company: "Entreprise / Institution", country: "Pays", email: "E-mail", phone: "Téléphone / WhatsApp", product: "Produit ou résultat industriel", capacity: "Capacité cible", land: "Terrain disponible", rawMaterial: "Disponibilité des matières premières", budget: "Fourchette budgétaire", financing: "Situation du financement", timeline: "Calendrier souhaité", notes: "Informations complémentaires" },
    financingOptions: ["Fonds propres disponibles", "Processus bancaire en cours", "Structuration financière nécessaire", "Projet soutenu par le secteur public", "Non défini"], select: "Sélectionner", file: "Le chargement de documents sera activé avec le backend sécurisé.", meeting: "Demander une réunion de qualification", submit: "Valider la note de projet", backendNotice: "Aucun envoi en ligne n'est effectué. Les informations restent dans cette session.", required: "Obligatoire", emailError: "Saisissez une adresse e-mail valide", successEyebrow: "Validation locale terminée", successTitle: "Votre note de projet est prête pour un premier échange.", successDescription: "Aucun envoi externe n'a été effectué. L'intégration sera activée uniquement avec un backend sécurisé.", reset: "Réinitialiser le formulaire",
  },
  footer: { tagline: "Développement et réalisation de projets industriels", mission: "Des opportunités industrielles structurées pour une exécution crédible.", parent: "Une société Bewell Global", operations: "Ancrée en Türkiye. Connectée au monde. Orientée réalisation.", privacy: "Confidentialité", terms: "Conditions", compliance: "Conformité", pending: "page d'information en préparation" },
  configurator: {
    ...en.configurator,
    eyebrow: "Configurateur de projet industriel", title: "Transformez une idée initiale en note de projet indicative.", description: "Cet outil compare des scénarios préliminaires. Les valeurs ne sont pas contractuelles et exigent une validation du site, du marché, de l'ingénierie et des fournisseurs.", factoryLabel: "1. Choisir le système industriel", marketLabel: "2. Marché cible", capacityLabel: "3. Niveau de capacité", energyLabel: "4. Modèle énergétique", fundingLabel: "5. Situation du financement", modelLabel: "Modèle de projet indicatif", investment: "Investissement indicatif", land: "Terrain indicatif", window: "Délai indicatif", jobs: "Emplois directs indicatifs", months: "mois", scale: "échelle", readiness: "Maturité du projet", readinessNote: "La maturité reflète uniquement la situation financière choisie. Le terrain, la demande, les matières premières, les autorisations et les données techniques doivent être validés.", checklist: ["Revue de l'opportunité pays", "Validation matières premières et demande", "Configuration des fournisseurs", "Évaluation du parcours de financement"], generate: "Générer la note indicative", disclaimer: "Aucun engagement commercial. Valeurs réservées à l'évaluation initiale.", resultEyebrow: "Évaluation indicative", resultTitle: "Configuration préliminaire préparée.", resultDescription: "Le scénario sélectionné est prêt pour la validation de l'opportunité.", gateLabel: "Prochaine décision", gateTitle: "Évaluation de l'opportunité", gateDescription: "Valider le terrain, la demande, les matières premières, l'exécution locale et le financement avant l'ingénierie détaillée.", resultSteps: ["Configuration examinée localement", "Scénario indicatif préparé", "Liste pays définie", "Mandat de développement en attente"], next: "Examiner les prochaines étapes", edit: "Modifier la configuration",
    factories: [{ id: "feed", name: "Pôle aliments et céréales", description: "Aliments du bétail, réception des céréales, silos, laboratoire et emballage.", tag: "Système de chaîne de valeur" }, { id: "cold", name: "Centre de chaîne du froid", description: "Stockage frigorifique, station de conditionnement et logistique alimentaire.", tag: "Logistique sous température" }, { id: "dairy", name: "Transformation laitière", description: "Collecte, pasteurisation, produits fermentés, fromage et froid.", tag: "Transformation alimentaire" }, { id: "flour", name: "Minoterie", description: "Nettoyage, mouture, emballage et stockage des produits finis.", tag: "Transformation de base" }, { id: "solar", name: "Module d'utilités industrielles", description: "Solaire, batteries, groupe électrogène, traitement d'eau et contrôle.", tag: "Système auxiliaire" }],
    countries: ["Soudan", "Soudan du Sud", "Burkina Faso", "Cameroun", "Ouganda", "Nigeria", "Zambie", "Autre marché international"], capacities: [{ id: "small", label: "Petite", subtitle: "Entrée / pilote" }, { id: "medium", label: "Moyenne", subtitle: "Échelle commerciale" }, { id: "large", label: "Grande", subtitle: "Approvisionnement régional" }], energyOptions: [{ id: "grid", label: "Réseau + secours" }, { id: "hybrid", label: "Hybride solaire" }, { id: "offgrid", label: "Autonome" }], financeOptions: [{ id: "secured", label: "Capital disponible" }, { id: "structured", label: "Structuration nécessaire" }, { id: "early", label: "Concept initial" }],
  },
  system: { notFoundTitle: "Page introuvable", notFoundText: "La page publique demandée n'est pas disponible.", backHome: "Retour à l'accueil" },
};

const ar: PublicContent = {
  ...en,
  meta: {
    homeTitle: "Novertra Industrial | تطوير وتسليم المشاريع الصناعية",
    homeDescription: "قيادة للمشاريع من Türkiye، ودمج عالمي للموردين، وقدرة على التنفيذ الإقليمي في الأسواق الدولية.",
    configureTitle: "أداة إعداد المشروع الصناعي | Novertra Industrial",
    configureDescription: "أعد موجزاً استرشادياً لمشروع صناعي من أجل التقييم الأولي للفرصة، من دون أي التزام تجاري.",
  },
  navigation: { capabilities: "القدرات", industries: "القطاعات", delivery: "نموذج التنفيذ", experience: "الخبرة", about: "من نحن", insights: "الرؤى", configurator: "إعداد المشروع", start: "ابدأ مشروعاً", menu: "فتح القائمة أو إغلاقها", language: "اللغة", skip: "الانتقال إلى المحتوى الرئيسي" },
  hero: {
    eyebrow: "تطوير وتسليم المشاريع الصناعية", lead: "من الرؤية الصناعية", accent: "إلى الجاهزية التشغيلية",
    description: "تعمل Novertra على هيكلة الفرص الصناعية من الفكرة الأولية إلى الجاهزية التشغيلية، عبر قيادة المشاريع من Türkiye، والتوريد الدولي، وتنسيق الهندسة، والتخطيط للتنفيذ المحلي.",
    primary: "ابدأ مشروعاً صناعياً", secondary: "استكشف قدراتنا",
    bullets: ["تطوير المشروع قبل الشراء.", "دمج عالمي للتقنيات والموردين.", "تنفيذ إقليمي ملائم لظروف التشغيل المحلية."],
    operations: "جذورنا في Türkiye. شبكة عالمية. تركيز على التنفيذ.", imageAlt: "منشأة صناعية تمثل التطوير المنسق للمشاريع وتسليمها",
  },
  trust: ["قيادة المشاريع من Türkiye", "تطوير المشاريع الصناعية", "دمج الموردين عالمياً", "قدرة على التنفيذ الإقليمي"],
  capabilities: {
    eyebrow: "ما الذي ننسقه", title: "مسار واحد بمسؤولية واضحة من الفرصة إلى الجاهزية التشغيلية.",
    description: "تُبنى كل مهمة وفق المتطلبات الفنية والتجارية والتنفيذية للمشروع، لا وفق نموذج تعاقدي ثابت.",
    items: [
      { title: "دراسة الجدوى وهيكلة المشروع", text: "نختبر الفرصة ونحدد أسس المشروع والأدلة المطلوبة قبل تقديم التزامات رئيسية." },
      { title: "المفهوم الصناعي وتنسيق الهندسة", text: "نوائم العمليات والمخططات والمرافق ومتطلبات التشغيل مع خبرات هندسية مؤهلة." },
      { title: "توريد التقنيات والمعدات", text: "نقارن أنظمة الإنتاج في Türkiye والأسواق الدولية وفق الملاءمة الفنية والتجارية." },
      { title: "تنسيق الأعمال المدنية والمرافق", text: "ندمج البنية التحتية والمباني والطاقة والمياه والأنظمة المساندة ضمن خطة التنفيذ." },
      { title: "دعم التركيب والتشغيل التجريبي", text: "ننسق واجهات الموردين والمقاولين والتنفيذ المحلي لأعمال التركيب والاختبار وبدء التشغيل." },
      { title: "الجاهزية التشغيلية", text: "نُعد الوثائق والتدريب والتسليم ومتطلبات التشغيل الأولي قبل بدء الإنتاج." },
    ],
  },
  industries: {
    eyebrow: "القطاعات التي ندعمها", title: "أنظمة صناعية تُصمم وفق الطلب والموارد والبنية التحتية والقدرة التشغيلية.",
    cta: "ناقش هذه القدرة", development: "مجالات التطوير", scope: "نطاق التنفيذ المعتاد", models: "نماذج المشاريع المناسبة",
    items: [
      { key: "infrastructure", title: "البنية التحتية الصناعية", description: "أنظمة الوصول والمرافق والخدمات اللوجستية اللازمة لعمليات صناعية منتجة.", developmentAreas: ["الوصول والحركة داخل المواقع", "شبكات المرافق والخدمات", "مرافق الدعم اللوجستي"], deliveryScope: ["تخطيط الموقع والبنية التحتية", "تنسيق الأعمال المدنية والمرافق", "الإشراف على التنفيذ"], projectModels: ["مواقع صناعية جديدة", "مجمعات إنتاج", "بنية تحتية مرتبطة بالمصانع"] },
      { key: "energy", title: "أنظمة الطاقة الصناعية", description: "حلول تقليدية ومتجددة وهجينة تُهيأ حسب طلب المنشأة واستمرارية التشغيل.", developmentAreas: ["التوليد الذاتي والاحتياطي", "الطاقة الشمسية والأنظمة الهجينة", "شبكات التوزيع داخل المنشأة"], deliveryScope: ["تقييم الطلب", "اختيار التكوين التقني", "تنسيق التركيب والتشغيل"], projectModels: ["طاقة ذاتية للمنشآت", "تهجين المصانع", "أنظمة طاقة للمواقع النائية"] },
      { key: "agro-industry", title: "الصناعات الزراعية", description: "أنظمة متكاملة للإنتاج والتخزين والتصنيع تربط الموارد الزراعية بأسواق قابلة للاستمرار.", developmentAreas: ["الإنتاج الزراعي المروي", "معالجة المحاصيل والأعلاف", "التخزين والتعبئة"], deliveryScope: ["هيكلة سلسلة القيمة", "تخطيط المياه والمرافق", "دمج المعدات والتدريب"], projectModels: ["الزراعة والتصنيع التجاري", "مجمعات الإنتاج الريفي", "برامج الأمن الغذائي"] },
      { key: "mining-processing", title: "معالجة المعادن", description: "منشآت لمناولة المواد ومعالجتها وفق خصائص الخام والطاقة الإنتاجية وأهداف الاستخلاص.", developmentAreas: ["التكسير والغربلة", "التركيز والاستخلاص", "مناولة المواد والمرافق"], deliveryScope: ["تكوين العملية", "تأهيل المعدات", "دعم التركيب والتشغيل"], projectModels: ["منشآت معالجة جديدة", "توسعة المصانع", "أنظمة معالجة معيارية"] },
      { key: "industrial-manufacturing", title: "التصنيع الصناعي", description: "بيئات إنتاج قابلة للتوسع لأعمال التصنيع والتجميع وبرامج الإنتاج.", developmentAreas: ["خطوط التجميع والإنتاج", "ورش التصنيع", "مرافق المصنع والخدمات اللوجستية"], deliveryScope: ["تعريف المنتج والطاقة", "تنسيق هندسة المصنع", "دعم تركيب المعدات"], projectModels: ["التصنيع المحلي", "إحلال الواردات", "توطين التقنية"] },
      { key: "strategic-facilities", title: "المنشآت الحيوية", description: "منشآت تشغيلية ومؤسسية تتطلب تنفيذاً منضبطاً واستمرارية وبنية مساندة موثوقة.", developmentAreas: ["المجمعات التشغيلية", "مباني الخدمات الحيوية", "المنشآت العامة المتخصصة"], deliveryScope: ["المتطلبات الوظيفية", "تنسيق المنشأة والأنظمة", "تشغيل تجريبي منضبط"], projectModels: ["المنشآت المؤسسية", "مراكز العمليات", "البنية التحتية المتخصصة"] },
      { key: "textile-manufacturing", title: "صناعة النسيج", description: "مشاريع جديدة وبرامج تأهيل للغزل والنسيج والتجهيز والمرافق المساندة.", developmentAreas: ["الغزل والنسيج", "خطوط التجهيز", "تأهيل المصانع"], deliveryScope: ["تقييم الحالة والطاقة", "تكوين خطوط الإنتاج", "دعم إعادة التشغيل"], projectModels: ["مصانع نسيج جديدة", "تأهيل المنشآت المتوقفة", "زيادة الطاقة الإنتاجية"] },
      { key: "food-processing-cold-chain", title: "تصنيع الأغذية وسلسلة التبريد", description: "تصنيع صحي وتعبئة وتخزين محكوم ولوجستيات مضبوطة الحرارة.", developmentAreas: ["تصنيع الأغذية وتعبئتها", "التخزين المبرد", "لوجستيات سلسلة التبريد"], deliveryScope: ["تخطيط التدفقات الصحية", "دمج الخطوط والمرافق", "الجاهزية التشغيلية"], projectModels: ["معالجة المنتجات الزراعية", "الألبان والأغذية المعبأة", "برامج التخزين الإقليمية"] },
      { key: "poultry-production-processing", title: "إنتاج الدواجن وتصنيعها", description: "أنظمة متكاملة تربط الأعلاف والتربية والتصنيع والتعبئة والتوزيع المبرد.", developmentAreas: ["مزارع الدواجن", "التصنيع والتعبئة", "الأعلاف وسلسلة التبريد"], deliveryScope: ["تخطيط الطاقة والأمن الحيوي", "تكوين المعدات", "التدريب والتشغيل"], projectModels: ["سلاسل قيمة دجاج التسمين", "برامج إنتاج البيض", "منشآت تصنيع الدواجن"] },
      { key: "cattle-beef-processing", title: "تربية الأبقار وتصنيع اللحوم", description: "تخطيط التربية والذبح الحديث وتصنيع اللحوم والتوزيع المبرد كعمليات مستقلة ومترابطة.", developmentAreas: ["أنظمة التربية والأعلاف", "المسالخ الحديثة", "تصنيع اللحوم وسلسلة التبريد"], deliveryScope: ["تخطيط الطاقة والرفق بالحيوان", "تكوين العمليات الصحية", "دمج النفايات والمرافق والتبريد"], projectModels: ["مشاريع تربية الأبقار", "مجمعات لحوم متكاملة", "مرافق إقليمية للذبح والتصنيع"] },
      { key: "small-factories-industrial-park", title: "تجمعات المصانع الصغيرة والمدن الصناعية", description: "تجمعات إنتاج مخططة تتيح للمصنعين المستقلين مشاركة البنية التحتية واللوجستيات والخدمات.", developmentAreas: ["وحدات مصانع للمنشآت الصغيرة", "مرافق مشتركة", "مخازن وخدمات مشتركة"], deliveryScope: ["المخطط العام", "تصميم وحدات معيارية", "تنسيق جاهزية المستفيدين"], projectModels: ["مدن صناعية للمنشآت الصغيرة", "تجمعات تصنيع", "مجمعات إنتاج متخصصة"] },
      { key: "tractor-assembly", title: "تجميع الجرارات", description: "عمليات تجميع CKD أو SKD تشمل لوجستيات المكونات والاختبار وضبط الجودة والاستعداد لخدمات ما بعد البيع.", developmentAreas: ["خطوط التجميع", "لوجستيات المكونات", "مناطق الاختبار والتدريب"], deliveryScope: ["تكوين الخطوط والعدد", "تخطيط تدفق المنشأة", "التركيب وتدريب العاملين"], projectModels: ["مصانع CKD وSKD", "برامج الميكنة", "مراكز تجميع إقليمية"] },
      { key: "agricultural-equipment-manufacturing", title: "تصنيع المعدات الزراعية", description: "أنظمة تصنيع للمحاريث والبذارات والعزاقات والمقطورات وغيرها من الأدوات الزراعية.", developmentAreas: ["الأدوات والملحقات", "المقطورات ومعدات النقل", "ورش قطع الغيار"], deliveryScope: ["تعريف عائلات المنتجات", "القطع والتشكيل واللحام", "بدء التجميع وضبط الجودة"], projectModels: ["إنتاج الأدوات محلياً", "إحلال الواردات", "تصنيع مرتبط بالجرارات"] },
    ],
  },
  delivery: {
    eyebrow: "نموذج تنفيذ خاص بكل مشروع", title: "من الفرصة إلى التشغيل",
    description: "تنسق Novertra هيكل التنفيذ الملائم لكل مهمة، ولا تقدم كل مشروع باعتباره عقد EPC ثابتاً أو التزاماً بالتمويل.",
    items: [{ title: "تقييم الفرصة", text: "يُختبر الطلب والموارد والموقع والحاجة التشغيلية." }, { title: "تنسيق الجدوى", text: "تُحدد المتطلبات الفنية والتجارية والأدلة." }, { title: "المفهوم والهندسة", text: "تُوائم خيارات العمليات والمخططات والمرافق." }, { title: "تأهيل الموردين", text: "تُقارن التقنيات والمعدات والموردون." }, { title: "تنسيق التنفيذ", text: "تُرتب المشتريات والأعمال والواجهات المحلية." }, { title: "دعم التشغيل التجريبي", text: "تُنسق الاختبارات والتدريب والتسليم." }, { title: "الجاهزية التشغيلية", text: "تُغلق الإجراءات المفتوحة قبل استقرار الإنتاج." }],
  },
  experience: {
    eyebrow: "خبرات مختارة في المشاريع", title: "خبرة موضحة المصدر بوضوح.",
    description: "تعكس الأعمال التالية خبرة Bewell Global / Deltayapı الموثقة والمتاحة لفريق Novertra، ولا تُعرض باعتبارها عقوداً جديدة لـ Novertra.",
    items: [
      { title: "مجمع الحصاحيصا للنسيج", location: "السودان", scope: "أعمال إنشاء وتأهيل ومنشآت صناعية.", note: "خبرة مشاريع Bewell Global / Deltayapı" },
      { title: "منشآت نسيج إضافية", location: "كوستي وشندي ومواقع أخرى في السودان", scope: "تجديد مصانع وأعمال كهروميكانيكية.", note: "خبرة مشاريع Bewell Global / Deltayapı" },
      { title: "مشروع طاقة متنقل بقدرة 150 ميغاواط", location: "الخرطوم، السودان", scope: "خبرة في الإنشاء الصناعي وتنفيذ بنية الطاقة.", note: "خبرة مشاريع Bewell Global / Deltayapı" },
      { title: "تركيب منشأة لمعالجة المعادن", location: "شمال السودان", scope: "إنشاء وتركيب معدات لعمليات معالجة الذهب.", note: "خبرة مشاريع Bewell Global / Deltayapı" },
      { title: "مشاريع صناعية وعامة", location: "السودان", scope: "مبانٍ صناعية ومنشآت إدارية وحدائق وأعمال بلدية.", note: "خبرة مشاريع Bewell Global / Deltayapı" },
    ],
  },
  supply: {
    eyebrow: "شبكة توريد صناعي عالمية", title: "جذور في Türkiye واتصال بالعالم.",
    description: "Türkiye هي مقرنا ومصدر ذو أولوية للهندسة والتصنيع. ويمكن لكل مشروع أيضاً دمج تقنيات ومعدات وخبرات مؤهلة من الأسواق الدولية وفق احتياجاته.",
    claims: ["قيادة المشاريع من Türkiye وعلاقات تصنيع ذات أولوية.", "توريد عالمي للموردين والتقنيات والمعدات وفق ملاءمة المشروع.", "شركاء إقليميون وتخطيط للتنفيذ المحلي في السوق المستهدف."],
    mapLabel: "شبكة عالمية للموردين والتنفيذ", mapTags: ["قيادة من Türkiye", "دمج الموردين عالمياً", "تنفيذ إقليمي ومحلي"],
  },
  technology: { eyebrow: "رؤى للمشاريع مدعومة بالتقنية", title: "الأدوات الرقمية تدعم التحليل، والمسؤولية تبقى بشرية.", description: "يمكن للأدوات الداخلية دعم مراجعة الأدلة ومقارنة الموردين وسيناريوهات التكلفة ووثائق المشروع من دون أن تحل محل الحكم المهني أو موافقة الإدارة.", points: ["الجدوى الأولية", "مقارنة أنظمة الإنتاج", "تطوير سيناريوهات التكلفة", "تقييم الموردين", "مراجعة مخاطر المشروع", "إعداد العروض والوثائق"] },
  faq: {
    eyebrow: "إجابات مباشرة", title: "كيف تتعامل Novertra مع المشاريع الصناعية؟",
    items: [
      { question: "ما الذي تقوم به Novertra؟", answer: "تطور Novertra المشاريع الصناعية وتهيكلها، وتنسق الهندسة والموردين، وتدعم التنفيذ حتى التشغيل التجريبي والجاهزية التشغيلية." },
      { question: "من أين تورد Novertra المعدات؟", answer: "Türkiye قاعدة ذات أولوية للهندسة والتصنيع، ويمكن أيضاً توريد المعدات والتقنيات المناسبة من الأسواق الدولية وفق متطلبات المشروع." },
      { question: "هل تعمل Novertra فقط مع المصنعين الأتراك؟", answer: "لا. يعتمد اختيار الموردين على الملاءمة الفنية والشروط التجارية والقدرة على التسليم والامتثال ودعم دورة الحياة." },
      { question: "ما المناطق التي تخدمها Novertra؟", answer: "Novertra مقرها Türkiye وتقيّم المهام في أفريقيا وأسواق دولية أخرى عندما يمكن هيكلة التنفيذ المحلي بمسؤولية." },
      { question: "ما أنواع المشاريع الصناعية التي تدعمها؟", answer: "يشمل النطاق الحالي 13 قطاعاً، منها التصنيع والصناعات الزراعية والطاقة والمعالجة والبنية الصناعية وتجمعات الإنتاج." },
      { question: "هل توفر Novertra التمويل؟", answer: "لا تضمن Novertra التمويل وليست جهة ممولة مباشرة. ويمكنها في المشاريع المناسبة دعم إعداد هيكل التمويل والتنسيق مع المؤسسات المالية." },
      { question: "كيف تسير عملية تطوير المشروع؟", answer: "تبدأ بمراجعة الفرصة والأدلة، ثم تنتقل إلى الجدوى والمفهوم الصناعي وتأهيل الموردين وتنسيق التنفيذ والجاهزية التشغيلية." },
    ],
  },
  contact: {
    eyebrow: "ابدأ مشروعاً", title: "اشرح الحاجة الصناعية، لا قائمة المعدات فقط.", description: "شارك الهدف التشغيلي والسوق المستهدف والأدلة المتاحة وقيود التنفيذ حتى يمكن تقييم الفرصة بمسؤولية.",
    notice: "يُعد هذا النموذج موجزاً محلياً فقط، ولا ينشئ التزاماً فنياً أو تجارياً أو تمويلياً.",
    labels: { fullName: "الاسم الكامل", company: "الشركة / المؤسسة", country: "الدولة", email: "البريد الإلكتروني", phone: "الهاتف / WhatsApp", product: "المنتج أو المخرج الصناعي", capacity: "الطاقة المستهدفة", land: "الأرض المتاحة", rawMaterial: "توافر المواد الخام", budget: "نطاق الميزانية", financing: "وضع التمويل", timeline: "الجدول المطلوب", notes: "ملاحظات إضافية" },
    financingOptions: ["رأس المال متاح", "إجراءات مصرفية جارية", "هيكلة التمويل مطلوبة", "مشروع بدعم عام", "غير محدد بعد"], select: "اختر", file: "سيتاح رفع الوثائق عند ربط النظام الخلفي الآمن.", meeting: "طلب اجتماع لتقييم المشروع", submit: "تحقق من موجز المشروع", backendNotice: "لا يتم إرسال أي بيانات عبر الإنترنت حالياً. تبقى المعلومات في جلسة المتصفح.", required: "مطلوب", emailError: "أدخل بريداً إلكترونياً صالحاً", successEyebrow: "اكتمل التحقق المحلي", successTitle: "موجز مشروعك جاهز للنقاش الأولي.", successDescription: "لم يتم إرسال أي بيانات خارجية. لن يُفعّل الربط إلا مع نظام خلفي آمن.", reset: "إعادة ضبط النموذج",
  },
  footer: { tagline: "تطوير وتسليم المشاريع الصناعية", mission: "فرص صناعية مهيكلة لتنفيذ موثوق.", parent: "إحدى شركات Bewell Global", operations: "جذورنا في Türkiye. شبكة عالمية. تركيز على التنفيذ.", privacy: "الخصوصية", terms: "الشروط", compliance: "الامتثال", pending: "صفحة المعلومات قيد الإعداد" },
  configurator: {
    ...en.configurator,
    eyebrow: "أداة إعداد المشروع الصناعي", title: "حوّل الفكرة الأولية إلى موجز مشروع استرشادي.", description: "تقارن هذه الأداة سيناريوهات أولية. القيم غير ملزمة وتتطلب التحقق من الموقع والسوق والهندسة والموردين.", factoryLabel: "1. اختر النظام الصناعي", marketLabel: "2. السوق المستهدف", capacityLabel: "3. فئة الطاقة", energyLabel: "4. نموذج الطاقة", fundingLabel: "5. وضع التمويل", modelLabel: "نموذج مشروع استرشادي", investment: "استثمار استرشادي", land: "مساحة استرشادية", window: "مدة تنفيذ استرشادية", jobs: "وظائف مباشرة استرشادية", months: "شهراً", scale: "حجم", readiness: "جاهزية المشروع", readinessNote: "تعكس الجاهزية وضع التمويل المختار فقط. لا تزال الأرض والطلب والمواد الخام والتراخيص والأدلة الفنية بحاجة إلى تحقق.", checklist: ["مراجعة فرصة الدولة", "التحقق من المواد الخام والطلب", "تكوين الموردين", "تقييم مسار التمويل"], generate: "إنشاء الموجز الاسترشادي", disclaimer: "لا يوجد التزام تجاري. القيم للتقييم الأولي فقط.", resultEyebrow: "تقييم استرشادي", resultTitle: "تم إعداد التكوين الأولي للمشروع.", resultDescription: "السيناريو المختار جاهز للتحقق من الفرصة.", gateLabel: "بوابة القرار التالية", gateTitle: "تقييم الفرصة", gateDescription: "تحقق من الأرض والطلب والمواد الخام والتنفيذ المحلي والتمويل قبل الهندسة التفصيلية.", resultSteps: ["تمت مراجعة التكوين محلياً", "أُعد السيناريو الاسترشادي", "حُددت قائمة تحقق الدولة", "تفويض التطوير قيد الانتظار"], next: "مراجعة الخطوات التالية", edit: "تعديل التكوين",
    factories: [{ id: "feed", name: "مركز الأعلاف والحبوب", description: "إنتاج الأعلاف واستلام الحبوب والصوامع والمختبر والتعبئة.", tag: "نظام سلسلة قيمة" }, { id: "cold", name: "مركز سلسلة التبريد", description: "تخزين مبرد ومحطة تعبئة ومناولة مبردة ولوجستيات غذائية.", tag: "لوجستيات مضبوطة الحرارة" }, { id: "dairy", name: "تصنيع الألبان", description: "جمع الحليب والبسترة والمنتجات المخمرة والجبن وسلسلة التبريد.", tag: "تصنيع غذائي" }, { id: "flour", name: "مطحنة دقيق", description: "تنظيف الحبوب والطحن والتعبئة وتخزين المنتج النهائي.", tag: "معالجة أغذية أساسية" }, { id: "solar", name: "وحدة مرافق صناعية", description: "طاقة شمسية وبطاريات ومولد ومعالجة مياه وأنظمة تحكم.", tag: "نظام مرافق مساند" }],
    countries: ["السودان", "جنوب السودان", "بوركينا فاسو", "الكاميرون", "أوغندا", "نيجيريا", "زامبيا", "سوق دولي آخر"], capacities: [{ id: "small", label: "صغيرة", subtitle: "بداية / تجريبي" }, { id: "medium", label: "متوسطة", subtitle: "نطاق تجاري" }, { id: "large", label: "كبيرة", subtitle: "إمداد إقليمي" }], energyOptions: [{ id: "grid", label: "الشبكة + احتياطي" }, { id: "hybrid", label: "هجين شمسي" }, { id: "offgrid", label: "مستقل بالكامل" }], financeOptions: [{ id: "secured", label: "رأس المال متاح" }, { id: "structured", label: "بحاجة إلى هيكلة" }, { id: "early", label: "فكرة أولية" }],
  },
  system: { notFoundTitle: "الصفحة غير موجودة", notFoundText: "الصفحة العامة المطلوبة غير متاحة.", backHome: "العودة إلى الرئيسية" },
};

export const publicContent: Record<Locale, PublicContent> = { en, ar, fr, tr };

export function getPublicContent(locale: Locale) {
  return publicContent[locale];
}
