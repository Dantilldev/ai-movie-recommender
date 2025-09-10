# 🎬 AI Movie Recommender

## 📖 Översikt

En AI-driven webbapplikation byggd med **Next.js** och **TypeScript** som hjälper användare att hitta filmer baserat på naturliga språkprompter.  
Appen använder artificiell intelligens för att analysera användarens preferenser och ge personliga filmrekommendationer.

---

## 🛠 Teknologier

- **Next.js 14** – React-ramverk med App Router
- **TypeScript** – Typsäkerhet genom hela applikationen
- **Google Gemini 1.5 Flash** – För filmrekommendationer
- **Delade TypeScript-typer** – Konsistenta datastrukturer mellan frontend och backend

---

## 📂 Projektstruktur

```bash
/types/
└── shared.ts        # Delade TypeScript-typer

/app/
├── api/generate/
│   └── route.ts     # API-rutter för AI-integration
├── page.tsx         # Huvudsida med sökformulär
└── layout.tsx       # Layout-komponent

/lib/
└── client.ts        # Typade API-anrop

/validation/
└── schemas.ts       # Zod-schema för validering

```

## 📑 TypeScript-typer

Projektet använder starka typer för att säkerställa konsistens:

```
// Filmstruktur
interface Movie {
  title: string;
  year: number;
  genre: string;
}

// API-förfrågan
interface PromptRequest {
  prompt: string;
}

// AI-svar med rekommendationer
interface AIResponse {
  recommendations: Movie[];
  final_recommendation: Movie;
}

// Komplett API-respons med felhantering
interface MovieResponse {
  response: boolean;
  parsedOutPut?: AIResponse;
  error?: string;
}

// OMDB API-svar för filmdetaljer
interface OmdbMovieDetails {
  Poster?: string;
  Plot?: string;
  Director?: string;
  Actors?: string;
  imdbRating?: string;
}

// UI-state hantering med diskriminerad union
type UiState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'error', message: string }
  | { status: 'success', movies: Movie[], finalPick: Movie | null };
```

## ⚙️ Installation

1. Klona projektet

```
git clone https://github.com/Dantilldev/ai-movie-recommender.git
cd ai-movie-finder
```

2. Installera dependencies

```
npm install
```

3. Konfigurera miljövariabler

```
cp .env.example .env.local
```

Fyll i nödvändiga API-nycklar:

```
[AI_API_KEY]=your_api_key_here
```

4. Starta utvecklingsservern

```
npm run dev
```

5. Öppna applikationen
   Navigera till http://localhost:3000

## Användning

1. **Skriv din filmpreferens** - Beskriv vad du är i stämning för (t.ex. "Jag vill se en spännande sci-fi film från 90-talet")
2. **Få rekommendationer** - AI:n analyserar din förfrågan och ger flera filmförslag
3. **Se huvudrekommendationen** - Få en särskilt framhävd film som bäst matchar dina preferenser

## API-endpoints

### POST /api/generate

Skicka en prompt och få filmrekommendationer.

### Request:

```
{
  "prompt": "Jag vill se en rolig komedi för helgmys"
}
```

### Response:

```
{
  "response": true,
  "parsedOutPut": {
    "recommendations": [
      {
        "title": "The Grand Budapest Hotel",
        "year": 2014,
        "genre": "Comedy"
      }
    ],
    "final_recommendation": {
      "title": "The Grand Budapest Hotel",
      "year": 2014,
      "genre": "Comedy"
    }
  }
}
```

## UI-states och användarupplevelse

Applikationen använder en diskriminerad union-typ för att hantera följande UI-tillstånd:

```typescript
// UI-state för applikationen
export type UiState =
  | {status: "idle"}
  | {status: "loading"}
  | {status: "error"; message: string}
  | {status: "success"; movies: Movie[]; finalPick: Movie | null};
```

Detta gör att vi kan hantera alla tillstånd på ett typesäkert sätt:

- **idle** - Starttillstånd med fokuserat textfält och uppmuntrande text
- **loading** - Visar spinner och "Generating..." under AI-bearbetning
- **success** - Visar rekommendationer och final pick
- **error** - Visar felmeddelande med "Try again"-knapp för återhämtning

## UX-funktioner:

- **Automatisk** fokus på textfält när sidan laddas
- **Loading spinner** för visuell feedback
- **Felhantering** med tydliga meddelanden
- **Responsiv design** som fungerar på alla enheter
- **Gradient-bakgrund** för filmtemakänsla

## Utveckling

### Typvalidering

Projektet använder **Zod** för att validera data och säkerställa att inkommande API-förfrågningar matchar de definierade TypeScript-typerna.

Exempel (`schemas.ts`):

```typescript
import {z} from "zod";

// Zod-schema för validering av en film
export const MovieSchema = z.object({
  title: z.string(),
  year: z.number(),
  genre: z.string(),
});

// Zod-schema för validering av prompt
export const PromptRequestSchema = z.object({
  prompt: z.string(),
});

// Zod-schema för validering av API-svar
export const AIResponseSchema = z.object({
  recommendations: z.array(MovieSchema),
  final_recommendation: MovieSchema,
});
```

## Kodkvalitet

```
npm run type-check  # TypeScript-kontroll
npm run lint        # Linting
```

## Gruppmedlemmar och roller

- **Schema/typer: [Namn]** - Definierade delade TypeScript-interfaces
- **API-integratör: [Namn]** - Implementerade Gemini API-integration
- **UI-byggare: [Namn]** - Skapade komponenter och Tailwind-design
- **State/UX: [Namn]** - Implementerade UI-states och användarflöde
- **Test/Docs: [Selena Oerding]** - README, demo-script och dokumentation

## Licens

Detta projekt är skapat som en del av en gruppuppgift i Next.js och TypeScript.

# 🎬 AI Movie Recommender – Demo Script

## 📝 Presentation Overview (5–7 minuter)

- **Intro & Setup (1 min)**
- **Live Demo (3–4 min)**
- **Kodgenomgång (2–3 min)**
- **Q&A (valfritt)**

---

## 1. 🚀 Intro & Setup (1 minut)

### Opening

"Hej! Vi ska presentera vårt AI Movie Finder-projekt – en Next.js-app med TypeScript som använder Google Gemini för att ge personliga filmrekommendationer."

### Snabb projektöversikt

- **Tema:** AI-driven filmrekommenderare
- **Teknologier:** Next.js 14, TypeScript, Google Gemini API, Tailwind CSS
- **Fokus:** Delade typer mellan frontend och backend

### Grupproller

"Vi var 5 personer med olika roller:"

- **Schema/typer:** Definierade våra interfaces
- **API-integratör:** Kopplade upp Gemini
- **UI-byggare:** Skapade den snygga designen
- **State/UX:** Fixade alla UI-states
- **Test/Docs:** README och detta demo

---

## 2. 💻 Live Demo (3–4 minuter)

### A. Startsida & UX

- Öppna `http://localhost:3000`
- Visa UI:
  - "Notera den cinematiska gradient-bakgrunden"
  - "Textfältet får automatiskt fokus för smidig UX"
  - "Vi har en 'Show favorites'-knapp för sparade filmer"

### B. Demo-scenario 1: Enkel sökning

- Skriv: `"Jag vill se en rolig komedi för helgmys"`
- Klicka **Get**
- Visa **loading state**:
  - "Notera loading spinner och 'Generating...'-texten"
- Visa resultat:
  - "Vi får flera rekommendationer i listan"
  - "Plus en 'Final Pick' som AI:n anser bäst matchar"
  - "Varje film har titel, år och genre – våra TypeScript-typer"

### C. Demo-scenario 2: Mer specifik sökning

- Skriv: `"En mörk thriller från 2000-talet som utspelar sig i framtiden"`
- Visa process och diskutera resultat:
  - "AI:n förstår flera kriterier samtidigt – genre, tidsperiod, setting"

### D. Favorit-funktionalitet

- Klicka hjärt-ikonen på en film
- Gå till **Show favorites ✅**
- Visa favoritlistan

### E. Felhantering

- Simulera fel (koppla ner internet eller ogiltig API-nyckel)
- Visa **error state**:
  - "Tydligt felmeddelande med 'Try again'-knapp"

---

## 3. ⚙️ Kodgenomgång (2–3 minuter)

### A. TypeScript-typer (30 sek)

Visa `/types/shared.ts`:

```typescript
// Filmstruktur
export interface Movie {
  title: string;
  year: number;
  genre: string;
}

// API-strukturer
export interface PromptRequest {
  prompt: string;
}

export interface AIResponse {
  recommendations: Movie[];
  final_recommendation: Movie;
}

export interface MovieResponse {
  response: boolean;
  parsedOutPut?: AIResponse;
  error?: string;
}

// OMDB API respons
export interface OmdbMovieDetails {
  Poster?: string;
  Plot?: string;
  Director?: string;
  Actors?: string;
  imdbRating?: string;
}

// UI-state hantering
export type UiState =
  | {status: "idle"}
  | {status: "loading"}
  | {status: "error"; message: string}
  | {status: "success"; movies: Movie[]; finalPick: Movie | null};
```

### B. API-rutt (45 sek)

Visa `/app/api/movieRec/route.ts` (om möjligt):

- **POST-rutt** som tar `PromptRequest`
- **Validering** av input
- **Anrop** till Gemini API
- **Returnerar** typad `MovieResponse`

```typescript
// Exempel på API-rutt (förenklad)
import {NextResponse} from "next/server";
import {promptSchema} from "../../../validation/schemas";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = promptSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({response: false, error: "Invalid prompt"});
  }

  // Anrop till Google Gemini API...
  const aiResponse = await callGeminiAPI(parsed.data.prompt);

  return NextResponse.json({
    response: true,
    parsedOutPut: aiResponse,
  });
}
```

### C. Frontend med States (45 sek)

Visa huvuddelar av `/app/page.tsx`:

```typescript
// State management med ui state union
const [prompt, setPrompt] = useState("");
const [uiState, setUiState] = useState<UiState>({status: "idle"});

// Hantering av UI-state vid API-anrop
const handleGenerate = async () => {
  setUiState({status: "loading"});

  try {
    const response = await fetchMovieRec(prompt);

    if (!response.response) {
      setUiState({
        status: "error",
        message: response.error || "Something went wrong",
      });
      return;
    }

    setUiState({
      status: "success",
      movies: response.parsedOutPut.recommendations,
      finalPick: response.parsedOutPut.final_recommendation,
    });
  } catch (err) {
    setUiState({
      status: "error",
      message: "Something went wrong. Please try again.",
    });
  }
};
```

"Typad UI-state med diskriminerad union för säkerhet"

### D. UI States (30 sek)

Genom att använda diskriminerad union för UI-states får vi en tydlig och typesäker hantering:

```tsx
{/* Idle state */}
{uiState.status === 'idle' && (
  <p>Enter your preferences above to get movie recommendations!</p>
)}

{/* Loading state */}
{uiState.status === 'loading' && (
  <span className="loading-spinner"></span>
)}

{/* Error state */}
{uiState.status === 'error' && (
  <div className="error-message">
    <span>{uiState.message}</span>
    <button>Try again</button>
  </div>
)}

{/* Success state */}
{uiState.status === 'success' && (
  <>
    <div className="movies-list">
      {uiState.movies.map(movie => (/* Movie rendering */)}
    </div>

    {uiState.finalPick && (/* Final pick rendering */)}
  </>
)}
```

---

### 4. ✨ Tekniska Highlights (30 sek)

"Vad gjorde vi bra med TypeScript?"

- ✅ **Delade typer** – Samma interfaces används i frontend och backend.
- ✅ **Zod runtime-validering** – `PromptRequestSchema` och `AIResponseSchema` säkerställer korrekt data.
- ✅ **Diskriminerad union** – UiState-typen ger typsäker hantering av applikationens tillstånd.
- ✅ **Props typing** – Komponenter som MovieDetails har typade props (MovieDetailsProps).
- ✅ **Typade API-anrop** – Typsäker kommunikation med både Gemini och OMDB API.
- ✅ **Eliminering av any** – OmdbMovieDetails-interfacet ersätter `any` för bättre typsäkerhet.
