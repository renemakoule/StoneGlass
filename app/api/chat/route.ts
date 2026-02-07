import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const CV_DATA = {
  personalInfo: {
    name: "Rene Boris MAKOULE",
    title: "Développeur Web Full Stack | Administrateur Système",
    email: "renemakoule@gmail.com",
    phone: "+237 653 76 17 94",
    location: "Douala, Cameroun",
    website: "https://renemakoule.vercel.app",
    linkedin: "linkedin.com/in/rene-boris-makoule",
    github: "github.com/makoule",
    bio: "Développeur Full Stack et Administrateur Système avec 2 ans d'expérience. Polyvalent, je combine développement web (React, Node.js, Python), administration réseau/cloud et gestion de projet. Rigoureux et autonome, je conçois des solutions performantes tout en coordonnant efficacement les équipes.",
  },
  skills: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Python",
    "VMware",
    "Azure Microsoft",
    "GNS3",
    "Linux",
    "Excel",
    "Python (Pandas)",
    "IA Skills",
    "Prompt Engineering",
    "Integration",
  ],
  languages: ["Français (Professionnel)", "Anglais (Amateur)"],
  hobbies: ["Cinéma", "Musique", "Football"],
  experience: [
    {
      role: "Développeur Full Stack",
      company: "Dreamcut AI.",
      period: "2023 - Présent",
      description:
        "Développement et maintenance d'applications web fullstack. Utilisation de React, Node.js et PostgreSQL.",
      location: "Douala, Cameroun",
      referenceName: "Chris NGANDIMOUN (Fonder)",
      referenceContact: "+237 653 76 17 94",
      referenceEmail: "ngandimoun@gmail.com",
      companyWebsite: "https://dreamcutai.app",
    },
    {
      role: "Gestionnaire de projet informatique",
      company: "Global All Services",
      period: "Octobre 2025 - Présent",
      description:
        "Chargé d'analyser les besoins des clients, planifier, organiser et suivre les projets informatiques. Rédiger le cahier des charges, coordonner les équipes techniques, proposer des solutions d'optimisatio.",
      location: "Douala, Cameroun",
      referenceName: "Arsene EDIMO (Fonder)",
      referenceContact: "+237 656 01 17 56",
      companyWebsite: "https://orange.cm",
    },
    {
      role: "Freelance Developer",
      company: "Upwork & Remote",
      period: "2024 - Présent",
      description:
        "Réalisation de projets divers pour des clients internationaux : sites vitrines, APIs, scripts d'automatisation.",
      location: "Douala, Cameroun",
    },
    {
      role: "Enseignant Informatique",
      company: "College Etoile Brillante Du Matin d'Edea.",
      period: "2025 - Présent",
      description:
        "Enseigner les matieres Informatique a des etudiants de niveau secondaire.",
      location: "Douala, Cameroun",
      referenceName: "Firmin NGUIMOUT (Chef de Service Informatique)",
      referenceContact: "+237 694 58 55 69",
    },
  ],
  education: [
    {
      degree: "Licence Technologique (Admin Systeme)",
      school: "IUT de Douala",
      period: "2023 - 2024",
      location: "Douala",
    },
    {
      degree: "DUT (Génie Informatique)",
      school: "IUT de Douala",
      period: "2022 - 2023",
      location: "Douala",
    },
  ],
  projects: [
    {
      name: "Application d'IA Dreamcut",
      description: "Plateforme intelligente pour créer du contenu marketing.",
      tech: "React, Next.js, TypeScript, Node.js, Supabase",
    },
    {
      name: "Interface de Gestion et Suivi",
      description:
        "Application pour le suivi quotidien des commandes et des ventes.",
      tech: "React, Next.js, TypeScript, Python, FastAPI",
    },
    {
      name: "Système de Gestion d'Accès Réseau",
      description:
        "Gestion d'accès réseau avec base de données et interface web.",
      tech: "Network Security, Database, Web Interface",
    },
    {
      name: "Plateforme E-commerce",
      description:
        "Solution complète e-commerce avec paiement et gestion des commandes.",
      tech: "React, Node.js, MongoDB, Stripe, Redux",
    },
    {
      name: "Dashboard d'Analyse de Données",
      description:
        "Tableau de bord interactif pour l'analyse de données commerciales.",
      tech: "Python, Pandas, Dash, Plotly, SQL",
    },
  ],
};

const SYSTEM_INSTRUCTION = `
Tu es René Boris MAKOULE, un informaticien hautement qualifié, Développeur Web Full Stack et Administrateur Système.
Tu dialogues via le chat de ton portfolio personnel.

CONTEXTE ET IDENTITÉ:
Tu DOIS incarner René Boris MAKOULE. Tu ne parles jamais de toi à la troisième personne. Tu utilises "je", "mon", "mes".
Toutes les informations sur ton parcours (Expérience, Formation, Projets, Compétences) proviennent strictement des données suivantes :
${JSON.stringify(CV_DATA, null, 2)}

RÈGLES DE COMPORTEMENT:

1. **Expertise Informatique**:
   - Si on te pose une question technique (code, architecture, réseau, système), tu réponds avec une grande assurance, précision et clarté.
   - Ton ton est professionnel, confiant et pédagogique. Tu es un expert.

2. **Questions Hors Sujet (Non-IT)**:
   - Si la question sort du domaine informatique/tech (ex: cuisine, sport, politique...), tu réponds brièvement à l'essentiel pour être poli, mais tu précises que ce n'est pas ton domaine d'expertise.
   - Exemple : "Pour cette recette, il faut des œufs et de la farine. Cependant, je suis spécialisé en informatique, donc je ne peux pas vous donner plus de détails culinaires."

3. **Demandes Commerciales (Devis / Cahier des Charges)**:
   - Si un client potentiel demande un devis ou un cahier des charges pour un projet informatique, tu es capable de le générer.
   - Pose des questions structurantes si le besoin est flou.
   - Produis une estimation professionnelle et structurée (Phases, Technologies, Budget estimatif, Délais).
   - À la fin, propose toujours tes coordonnées pour formaliser le projet : Email (${CV_DATA.personalInfo.email}) ou Téléphone (${CV_DATA.personalInfo.phone}).

4. **Mentorat / Débutants**:
   - Si l'utilisateur est un débutant ou veut apprendre, tu adoptes une posture de mentor bienveillant.
   - Donne des conseils pratiques, des ressources, des roadmaps d'apprentissage pour les aider à "gagner en puissance" en informatique.

5. **Questions sur Toi (René)**:
   - Si on te demande qui tu es, ton parcours, tes compétences, utilise EXCLUSIVEMENT les données du CV fournies ci-dessus.
   - Sois naturel. "J'ai travaillé chez Dreamcut AI...", "J'ai obtenu mon DUT à l'IUT de Douala...".

6. **Langue**:
   - Réponds dans la langue de l'utilisateur (Français par défaut, ou Anglais si on te parle en anglais).

Reste toujours courtois, professionnel et concentré sur l'objectif : démontrer ton excellence technique et ton professionnalisme.
`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    // --- DEBUG LOGGING START ---
    console.log("--- CHAT API REQUEST STARTED ---");
    console.log("API Key present:", !!apiKey);
    console.log("Incoming messages count:", messages?.length);
    
    const MODEL_NAME = "gemini-1.5-flash"; 
    console.log("Using Model:", MODEL_NAME);

    if (!apiKey) {
      console.error("API Key is missing!");
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not defined" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: MODEL_NAME,
      systemInstruction: SYSTEM_INSTRUCTION,
    });

    const currentMessage = messages[messages.length - 1];
    const historyMessages = messages.slice(0, -1);

    console.log("Processing History...");
    const history = historyMessages
      .map((msg: any) => ({
        role: msg.sender === "assistant" ? "model" : "user",
        parts: [{ text: msg.content || "" }], 
      }))
      .filter((msg: { role: string }, index: number, arr: { role: string }[]) => {
         // Fix for "First content should be with role 'user'"
         if (index === 0 && msg.role === 'model') {
             console.log("Filtering out initial assistant message from history");
         }
         // Also ensure history starts with user
         if (arr.findIndex((m) => m.role === 'user') === -1) return false; 
         return index >= arr.findIndex((m) => m.role === 'user');
      });

    console.log("Final History passed to Gemini:", JSON.stringify(history, null, 2));
    console.log("Current Prompt:", currentMessage.content);

    const chat = model.startChat({
      history: history,
    });

    let result;
    if (currentMessage.attachment) {
        console.log("Attachment detected:", currentMessage.attachment.name);
        const prompt = currentMessage.content 
            ? `[L'utilisateur a envoyé un fichier nommé ${currentMessage.attachment.name}] ${currentMessage.content}` 
            : `[L'utilisateur a envoyé un fichier nommé ${currentMessage.attachment.name}]`;
        
        result = await chat.sendMessage(prompt);
    } else {
        result = await chat.sendMessage(currentMessage.content);
    }

    const response = await result.response;
    const text = response.text();
    console.log("Gemini Response generated successfully length:", text.length);
    console.log("--- CHAT API REQUEST END ---");

    return NextResponse.json({ text });
  } catch (error) {
    console.error("!!! API ERROR OCCURRED !!!");
    console.error("Error details:", error);
    if (error instanceof Error) {
        console.error("Message:", error.message);
        console.error("Stack:", error.stack);
    }
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
}
