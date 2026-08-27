const defaultTypes = [
  { name: "Naive RAG", description: "Retrieve relevant chunks, then generate a grounded answer." },
  { name: "Advanced RAG", description: "Improve retrieval with query rewriting, reranking, and hybrid search." },
  { name: "Graph RAG", description: "Use entities and relationships to answer questions across connected data." },
  { name: "Multimodal RAG", description: "Retrieve and reason over text, images, tables, and documents together." },
];

const defaultIndustries = [
  { name: "Healthcare", description: "Search clinical knowledge and policy documents with traceable answers." },
  { name: "Finance", description: "Query reports, regulations, and internal research with better control." },
  { name: "Education", description: "Build learning assistants grounded in courses and institutional content." },
  { name: "Legal", description: "Find clauses, precedents, and case evidence across large document sets." },
  { name: "E-commerce", description: "Power product discovery and support from live catalog and policy data." },
  { name: "Manufacturing", description: "Give teams fast access to manuals, maintenance, and safety knowledge." },
];

function RAGCard({ item, index }) {
  return (
    <article className="rounded-lg border border-border bg-panel p-5 transition-colors hover:border-accent/60">
      <div className="flex items-start gap-3">
        <span className="font-mono-tag flex h-8 w-8 shrink-0 items-center justify-center rounded border border-accent/40 bg-panel-2 text-xs text-accent">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div>
          <h3 className="font-display text-base font-semibold text-text">{item.name}</h3>
          <p className="mt-2 text-sm leading-6 text-text-muted">{item.description}</p>
        </div>
      </div>
    </article>
  );
}

export default function RAGModels({ settings }) {
  const types = settings.ragModelTypes?.length ? settings.ragModelTypes : defaultTypes;
  const industries = settings.ragIndustries?.length ? settings.ragIndustries : defaultIndustries;

  return (
    <section id="rag-models" className="border-b border-border bg-panel/30">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-3xl">
          <p className="font-mono-tag text-xs uppercase tracking-[0.2em] text-accent">Applied AI</p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">RAG Models</h2>
            <span className="font-mono-tag text-sm text-accent">{types.length} model types</span>
          </div>
          <p className="mt-5 text-base leading-7 text-text-muted">
            {settings.ragIntro || "Retrieval-Augmented Generation connects language models to trusted business data, making answers more accurate, current, and useful."}
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {types.map((item, index) => (
            <RAGCard key={`${item.name}-${index}`} item={item} index={index} />
          ))}
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="font-mono-tag text-xs uppercase tracking-[0.2em] text-accent-2">Where it matters</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight">Industries that benefit from RAG</h3>
            <p className="mt-4 max-w-md text-sm leading-6 text-text-muted">
              RAG is useful wherever teams need reliable answers from private, changing, or domain-specific information.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {industries.map((item, index) => (
              <div key={`${item.name}-${index}`} className="border-l-2 border-accent/50 pl-4">
                <h4 className="font-display text-sm font-semibold text-text">{item.name}</h4>
                <p className="mt-1 text-sm leading-6 text-text-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
