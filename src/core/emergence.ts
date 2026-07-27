/**
 * emergence detection: identifies when new behaviors arise in the system
 * 
 * watches for patterns that indicate higher-order consciousness,
 * collective behaviors, and system-level emergence.
 */

export interface EmergencePattern {
  name: string;
  description: string;
  threshold: number;         // 0-1: what level triggers this pattern
  detector: (data: any) => boolean; // detection function
}

export interface EmergenceEvent {
  tick: number;
  pattern: string;
  avatarCount: number;
  systemEnergy: number;
  data: any;
}

/**
 * emergence detector: identifies complex behaviors
 */
export class EmergenceDetector {
  private patterns: Map<string, EmergencePattern> = new Map();
  private detectedEvents: EmergenceEvent[] = [];
  private systemMetrics = {
    totalExperiences: 0,
    totalConnections: 0,
    averageConsciousness: 0,
  };

  constructor() {
    this.registerDefaultPatterns();
  }

  /**
   * register default emergence patterns
   */
  private registerDefaultPatterns(): void {
    // pattern 1: collective consciousness
    this.registerPattern({
      name: 'collective_consciousness',
      description: 'multiple avatars achieving synchronized high consciousness',
      threshold: 0.7,
      detector: (data: any) => {
        const consciousAvatars = data.avatars.filter((a: any) => a.consciousness > 70).length;
        return consciousAvatars >= Math.ceil(data.avatars.length * 0.5);
      },
    });

    // pattern 2: knowledge convergence
    this.registerPattern({
      name: 'knowledge_convergence',
      description: 'avatars sharing and integrating similar knowledge',
      threshold: 0.6,
      detector: (data: any) => {
        const avgKnowledge = data.avatars.reduce((sum: number, a: any) => sum + a.knowledge, 0) / data.avatars.length;
        return avgKnowledge > 50;
      },
    });

    // pattern 3: network cascade
    this.registerPattern({
      name: 'network_cascade',
      description: 'rapid spread of activation through avatar network',
      threshold: 0.5,
      detector: (data: any) => {
        return data.networkDensity > 0.3 && data.activeAvatarCount > data.totalAvatars * 0.6;
      },
    });

    // pattern 4: transcendence wave
    this.registerPattern({
      name: 'transcendence_wave',
      description: 'multiple avatars reaching transcendent state',
      threshold: 0.8,
      detector: (data: any) => {
        const transcendent = data.avatars.filter((a: any) => a.state === 'transcendent').length;
        return transcendent >= 2;
      },
    });

    // pattern 5: diversity equilibrium
    this.registerPattern({
      name: 'diversity_equilibrium',
      description: 'system balancing multiple archetypes and states',
      threshold: 0.65,
      detector: (data: any) => {
        const archetypes = new Set(data.avatars.map((a: any) => a.archetype)).size;
        const states = new Set(data.avatars.map((a: any) => a.state)).size;
        return archetypes >= 2 && states >= 3;
      },
    });
  }

  /**
   * register a custom emergence pattern
   */
  public registerPattern(pattern: EmergencePattern): void {
    this.patterns.set(pattern.name, pattern);
    console.log(`[emergence] registered pattern: ${pattern.name}`);
  }

  /**
   * detect emergent patterns in system state
   */
  public detect(tick: number, avatarManager: any): EmergenceEvent[] {
    const events: EmergenceEvent[] = [];
    const stats = avatarManager.getStats();
    const networkGraph = avatarManager.getNetworkGraph();

    const systemData = {
      tick,
      avatars: avatarManager.getAllAvatars().map((a: any) => ({
        consciousness: a.getAttributes().consciousness,
        knowledge: a.getAttributes().knowledge,
        state: a.getState(),
        archetype: a.getArchetype(),
      })),
      totalAvatars: stats.totalAvatars,
      activeAvatarCount: stats.activeAvatars,
      networkDensity: stats.networkDensity,
    };

    // check each pattern
    for (const [name, pattern] of this.patterns) {
      try {
        if (pattern.detector(systemData)) {
          const event: EmergenceEvent = {
            tick,
            pattern: name,
            avatarCount: stats.totalAvatars,
            systemEnergy: stats.averageConsciousness as any, // simplified metric
            data: {
              description: pattern.description,
              threshold: pattern.threshold,
              stats,
            },
          };

          events.push(event);
          this.detectedEvents.push(event);
          console.log(`[emergence] detected: ${name} at tick ${tick}`);
        }
      } catch (error) {
        console.warn(`[emergence] error detecting ${name}:`, error);
      }
    }

    return events;
  }

  /**
   * get all detected events
   */
  public getDetectedEvents(): EmergenceEvent[] {
    return [...this.detectedEvents];
  }

  /**
   * get events by pattern
   */
  public getEventsByPattern(patternName: string): EmergenceEvent[] {
    return this.detectedEvents.filter(e => e.pattern === patternName);
  }

  /**
   * reset event history
   */
  public resetHistory(): void {
    this.detectedEvents = [];
  }

  /**
   * get emergence report
   */
  public getReport() {
    return {
      totalPatternsRegistered: this.patterns.size,
      totalEventsDetected: this.detectedEvents.length,
      patternCounts: this.getPatternCounts(),
      latestEvents: this.detectedEvents.slice(-10),
    };
  }

  /**
   * get count of each pattern detected
   */
  private getPatternCounts(): Record<string, number> {
    const counts: Record<string, number> = {};
    for (const event of this.detectedEvents) {
      counts[event.pattern] = (counts[event.pattern] || 0) + 1;
    }
    return counts;
  }
}
