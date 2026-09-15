/**
 * knowledgeBase.ts
 * Deterministic Knowledge Engine using keyword scoring.
 */

export interface KnowledgeEntry {
  id: string;
  category: string;
  question: string;
  answer: string;
  keywords: string[];
}

export class KnowledgeBaseEngine {
  private entries: KnowledgeEntry[] = [];

  constructor(initialEntries: KnowledgeEntry[]) {
    this.entries = initialEntries;
  }

  public search(query: string): { entry: KnowledgeEntry; score: number } | null {
    const q = query.toLowerCase();
    let bestMatch: { entry: KnowledgeEntry; score: number } | null = null;

    for (const entry of this.entries) {
      let score = 0;
      
      // Exact match on question (high weight)
      if (entry.question.toLowerCase() === q) score += 100;
      
      // Keyword matches
      for (const keyword of entry.keywords) {
        if (q.includes(keyword.toLowerCase())) {
          score += 10;
        }
      }

      // Check if query contains question words (lower weight)
      const queryWords = q.split(/\s+/);
      const questionWords = entry.question.toLowerCase().split(/\s+/);
      const intersection = queryWords.filter(w => questionWords.includes(w) && w.length > 3);
      score += intersection.length * 5;

      if (score > 0 && (!bestMatch || score > bestMatch.score)) {
        bestMatch = { entry, score };
      }
    }

    // Return only if score is high enough to avoid false positives
    return (bestMatch && bestMatch.score >= 10) ? bestMatch : null;
  }

  public getAll(): KnowledgeEntry[] {
    return this.entries;
  }

  public addEntry(entry: KnowledgeEntry) {
    this.entries.push(entry);
  }

  public updateEntry(id: string, updated: Partial<KnowledgeEntry>) {
    const index = this.entries.findIndex(e => e.id === id);
    if (index !== -1) {
      this.entries[index] = { ...this.entries[index], ...updated };
    }
  }

  public deleteEntry(id: string) {
    this.entries = this.entries.filter(e => e.id !== id);
  }
}
