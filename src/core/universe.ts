/**
 * Universe: The Persistent World Engine
 * 
 * The foundation of all existence in Avatar X.
 * Laws, constants, and the fabric of reality are defined here.
 */

import { v4 as uuid } from 'uuid';

export interface UniverseConfig {
  name: string;
  createdAt: Date;
  version: string;
  divineOrder: DivineOrder;
}

export interface DivineOrder {
  entropy: number;           // Chaos/order balance (0-1, 0=pure order)
  timeFlow: number;          // Relative speed of time
  gravityConstant: number;   // Physics constant
  lightSpeed: number;        // Information propagation limit
  dimensionality: number;    // Spatial dimensions
}

export class Universe {
  private id: string;
  private config: UniverseConfig;
  private createdEntities: Map<string, any> = new Map();
  private simulationTick: number = 0;

  constructor(config: Partial<UniverseConfig> = {}) {
    this.id = uuid();
    this.config = {
      name: config.name || 'Avatar X Realm',
      createdAt: config.createdAt || new Date(),
      version: config.version || '0.0.1',
      divineOrder: config.divineOrder || this.initializeDivineOrder(),
    };
  }

  private initializeDivineOrder(): DivineOrder {
    return {
      entropy: 0.1,              // Highly ordered
      timeFlow: 1.0,             // Standard flow
      gravityConstant: 0.00000000006674,
      lightSpeed: 299792458,     // m/s
      dimensionality: 3,         // 3D + time
    };
  }

  /**
   * Initialize the universe.
   * This is called once at creation.
   */
  public initialize(): void {
    console.log(`[UNIVERSE] Initializing: ${this.config.name}`);
    console.log(`[UNIVERSE] Divine Order initialized with entropy: ${this.config.divineOrder.entropy}`);
    console.log(`[UNIVERSE] ID: ${this.id}`);
  }

  /**
   * Register an entity as part of this universe.
   */
  public registerEntity(id: string, entity: any): void {
    this.createdEntities.set(id, entity);
    console.log(`[UNIVERSE] Entity registered: ${id}`);
  }

  /**
   * Advance simulation by one tick.
   */
  public tick(): void {
    this.simulationTick++;
    // Physics updates, emergence calculations, state propagation
  }

  /**
   * Get current state of the universe.
   */
  public getState() {
    return {
      id: this.id,
      config: this.config,
      tick: this.simulationTick,
      entityCount: this.createdEntities.size,
    };
  }
}
