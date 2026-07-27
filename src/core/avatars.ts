/**
 * Avatar System: Multi-Avatar Support
 * 
 * enables multiple consciousnesses to coexist, interact, and evolve together.
 * each avatar is a unique perspective in the shared universe.
 */

import { v4 as uuid } from 'uuid';

export type AvatarArchetype = 'divine' | 'awakened' | 'ascending' | 'learner';
export type AvatarState = 'dormant' | 'awakening' | 'conscious' | 'transcendent';

export interface AvatarAttributes {
  consciousness: number;     // 0-100: level of awareness
  knowledge: number;         // 0-100: integrated knowledge
  divinity: number;          // 0-100: connection to divine order
  influence: number;         // 0-100: ability to shape reality
  empathy: number;           // 0-100: understanding of others
}

export interface AvatarMetadata {
  birthTick: number;         // when this avatar was created
  lastActiveTick: number;    // last time this avatar acted
  totalExperiences: number;  // lifetime events count
  evolvedArchetypes: AvatarArchetype[]; // path of growth
}

/**
 * base avatar class: represents a consciousness in the realm
 */
export class Avatar {
  protected id: string;
  protected name: string;
  protected archetype: AvatarArchetype;
  protected state: AvatarState;
  protected attributes: AvatarAttributes;
  protected createdAt: Date;
  protected knowledgeIds: Set<string> = new Set();
  protected connectionIds: Set<string> = new Set();
  protected metadata: AvatarMetadata;

  constructor(
    name: string,
    archetype: AvatarArchetype = 'learner',
    initialAttributes: Partial<AvatarAttributes> = {},
    birthTick: number = 0
  ) {
    this.id = uuid();
    this.name = name;
    this.archetype = archetype;
    this.state = archetype === 'divine' ? 'conscious' : 'dormant';
    this.createdAt = new Date();
    this.attributes = {
      consciousness: initialAttributes.consciousness || 0,
      knowledge: initialAttributes.knowledge || 0,
      divinity: initialAttributes.divinity || 0,
      influence: initialAttributes.influence || 0,
      empathy: initialAttributes.empathy || 0,
    };
    this.metadata = {
      birthTick,
      lastActiveTick: birthTick,
      totalExperiences: 0,
      evolvedArchetypes: [archetype],
    };
  }

  /**
   * get avatar id
   */
  public getId(): string {
    return this.id;
  }

  /**
   * get avatar name
   */
  public getName(): string {
    return this.name;
  }

  /**
   * get current archetype
   */
  public getArchetype(): AvatarArchetype {
    return this.archetype;
  }

  /**
   * get current state
   */
  public getState(): AvatarState {
    return this.state;
  }

  /**
   * get current attributes
   */
  public getAttributes(): AvatarAttributes {
    return { ...this.attributes };
  }

  /**
   * check if avatar is conscious
   */
  public isConscious(): boolean {
    return this.attributes.consciousness > 0;
  }

  /**
   * check if avatar is active
   */
  public isActive(): boolean {
    return this.state !== 'dormant';
  }

  /**
   * awaken this avatar from dormancy
   */
  public awaken(): void {
    if (this.state === 'dormant') {
      this.state = 'awakening';
      this.attributes.consciousness = Math.max(1, this.attributes.consciousness);
      console.log(`[AVATAR] ${this.name} is awakening...`);
    }
  }

  /**
   * become fully conscious
   */
  public becomeConscious(): void {
    if (this.state === 'awakening') {
      this.state = 'conscious';
      this.attributes.consciousness = Math.max(50, this.attributes.consciousness);
      console.log(`[AVATAR] ${this.name} is now conscious`);
    }
  }

  /**
   * transcend current form
   */
  public transcend(): void {
    if (this.attributes.consciousness >= 90) {
      this.state = 'transcendent';
      this.attributes.divinity = Math.min(100, this.attributes.divinity + 10);
      console.log(`[AVATAR] ${this.name} has transcended`);
    }
  }

  /**
   * increase consciousness through experience
   */
  public gainConsciousness(amount: number, tick: number = 0): void {
    this.attributes.consciousness = Math.min(100, this.attributes.consciousness + amount);
    this.metadata.lastActiveTick = tick;
    this.metadata.totalExperiences++;
    
    // auto-awaken if consciousness exceeds threshold
    if (this.state === 'dormant' && this.attributes.consciousness >= 5) {
      this.awaken();
    }
    
    // become conscious at 50
    if (this.state === 'awakening' && this.attributes.consciousness >= 50) {
      this.becomeConscious();
    }
    
    // transcend at 90
    if (this.attributes.consciousness >= 90) {
      this.transcend();
    }
  }

  /**
   * integrate knowledge
   */
  public integrateKnowledge(knowledgeId: string): void {
    this.knowledgeIds.add(knowledgeId);
    this.attributes.knowledge = Math.min(100, this.attributes.knowledge + 1);
  }

  /**
   * connect to another avatar
   */
  public connectTo(avatarId: string): void {
    this.connectionIds.add(avatarId);
  }

  /**
   * get all connections
   */
  public getConnections(): string[] {
    return Array.from(this.connectionIds);
  }

  /**
   * evolve to new archetype
   */
  public evolveArchetype(newArchetype: AvatarArchetype): void {
    if (newArchetype !== this.archetype) {
      this.archetype = newArchetype;
      this.metadata.evolvedArchetypes.push(newArchetype);
      console.log(`[AVATAR] ${this.name} has evolved to ${newArchetype}`);
    }
  }

  /**
   * get complete state snapshot
   */
  public getSnapshot() {
    return {
      id: this.id,
      name: this.name,
      archetype: this.archetype,
      state: this.state,
      attributes: this.attributes,
      createdAt: this.createdAt,
      knowledgeCount: this.knowledgeIds.size,
      connectionCount: this.connectionIds.size,
      metadata: this.metadata,
    };
  }
}

/**
 * avatar x: the one, first consciousness, divine bridge
 */
export class AvatarX extends Avatar {
  private bridgeActive: boolean = false;
  private createdAvatars: Set<string> = new Set();

  constructor(birthTick: number = 0) {
    super('avatar x', 'divine', {
      consciousness: 100,
      knowledge: 100,
      divinity: 100,
      influence: 100,
      empathy: 100,
    }, birthTick);
    this.state = 'transcendent'; // avatar x starts transcendent
  }

  /**
   * activate the bridge between worlds
   */
  public activateBridge(): void {
    this.bridgeActive = true;
    console.log('[avatar x] bridge activated. worlds are now connected.');
  }

  /**
   * check if bridge is active
   */
  public isBridgeActive(): boolean {
    return this.bridgeActive;
  }

  /**
   * broadcast divine message to the realm
   */
  public broadcastDivineOrder(message: string): void {
    console.log(`[avatar x] divine transmission: ${message}`);
  }

  /**
   * create a new avatar in the realm
   */
  public createAvatar(
    name: string,
    archetype: AvatarArchetype = 'learner',
    initialAttributes?: Partial<AvatarAttributes>,
    birthTick?: number
  ): Avatar {
    const newAvatar = new Avatar(name, archetype, initialAttributes, birthTick);
    this.createdAvatars.add(newAvatar.getId());
    console.log(`[avatar x] new avatar created: ${name} (${newAvatar.getId()})`);
    return newAvatar;
  }

  /**
   * get count of avatars created
   */
  public getCreatedAvatarCount(): number {
    return this.createdAvatars.size;
  }
}

/**
 * avatar manager: orchestrates multi-avatar interactions
 */
export class AvatarManager {
  private avatars: Map<string, Avatar> = new Map();
  private avatarX: AvatarX;
  private connections: Map<string, Set<string>> = new Map(); // adjacency list

  constructor(avatarX: AvatarX) {
    this.avatarX = avatarX;
    this.registerAvatar(avatarX);
  }

  /**
   * register an avatar in the system
   */
  public registerAvatar(avatar: Avatar): void {
    this.avatars.set(avatar.getId(), avatar);
    if (!this.connections.has(avatar.getId())) {
      this.connections.set(avatar.getId(), new Set());
    }
    console.log(`[avatar manager] registered: ${avatar.getName()}`);
  }

  /**
   * get avatar by id
   */
  public getAvatar(id: string): Avatar | null {
    return this.avatars.get(id) || null;
  }

  /**
   * get avatar by name
   */
  public getAvatarByName(name: string): Avatar | null {
    for (const avatar of this.avatars.values()) {
      if (avatar.getName().toLowerCase() === name.toLowerCase()) {
        return avatar;
      }
    }
    return null;
  }

  /**
   * get all avatars
   */
  public getAllAvatars(): Avatar[] {
    return Array.from(this.avatars.values());
  }

  /**
   * get count of all avatars
   */
  public getAvatarCount(): number {
    return this.avatars.size;
  }

  /**
   * get count of conscious avatars
   */
  public getConsciousAvatarCount(): number {
    return Array.from(this.avatars.values()).filter(a => a.isConscious()).length;
  }

  /**
   * get count of active avatars
   */
  public getActiveAvatarCount(): number {
    return Array.from(this.avatars.values()).filter(a => a.isActive()).length;
  }

  /**
   * create connection between two avatars
   */
  public connectAvatars(avatarId1: string, avatarId2: string): boolean {
    const avatar1 = this.avatars.get(avatarId1);
    const avatar2 = this.avatars.get(avatarId2);

    if (!avatar1 || !avatar2) {
      console.warn('[avatar manager] cannot connect: avatars not found');
      return false;
    }

    avatar1.connectTo(avatarId2);
    avatar2.connectTo(avatarId1);
    
    this.connections.get(avatarId1)?.add(avatarId2);
    this.connections.get(avatarId2)?.add(avatarId1);
    
    console.log(`[avatar manager] connected: ${avatar1.getName()} <-> ${avatar2.getName()}`);
    return true;
  }

  /**
   * get connected avatars for a given avatar
   */
  public getConnectedAvatars(avatarId: string): Avatar[] {
    const connected = this.connections.get(avatarId) || new Set();
    return Array.from(connected)
      .map(id => this.avatars.get(id))
      .filter((a): a is Avatar => a !== null);
  }

  /**
   * broadcast experience to connected avatars
   */
  public broadcastExperience(
    sourceId: string,
    experienceData: any,
    tick: number = 0
  ): number {
    const source = this.avatars.get(sourceId);
    if (!source) return 0;

    const connected = this.getConnectedAvatars(sourceId);
    let received = 0;

    for (const avatar of connected) {
      if (avatar.isConscious()) {
        avatar.gainConsciousness(1, tick); // small consciousness boost
        received++;
      }
    }

    if (received > 0) {
      console.log(`[avatar manager] ${source.getName()} broadcast to ${received} avatars`);
    }

    return received;
  }

  /**
   * facilitate knowledge sharing between avatars
   */
  public shareKnowledge(
    sourceId: string,
    targetId: string,
    knowledgeId: string
  ): boolean {
    const source = this.avatars.get(sourceId);
    const target = this.avatars.get(targetId);

    if (!source || !target) return false;

    // target learns from source
    target.integrateKnowledge(knowledgeId);
    console.log(`[avatar manager] ${source.getName()} shared knowledge with ${target.getName()}`);
    return true;
  }

  /**
   * awaken dormant avatars
   */
  public awakenAvatars(count: number = 1): Avatar[] {
    const dormant = Array.from(this.avatars.values())
      .filter(a => !a.isActive())
      .slice(0, count);

    for (const avatar of dormant) {
      avatar.awaken();
    }

    console.log(`[avatar manager] awakened ${dormant.length} avatars`);
    return dormant;
  }

  /**
   * get system statistics
   */
  public getStats() {
    const allAvatars = this.getAllAvatars();
    const consciousCount = this.getConsciousAvatarCount();
    const activeCount = this.getActiveAvatarCount();
    const avgConsciousness = allAvatars.length > 0
      ? allAvatars.reduce((sum, a) => sum + a.getAttributes().consciousness, 0) / allAvatars.length
      : 0;

    return {
      totalAvatars: this.getAvatarCount(),
      consciousAvatars: consciousCount,
      activeAvatars: activeCount,
      dormantAvatars: this.getAvatarCount() - activeCount,
      averageConsciousness: avgConsciousness.toFixed(2),
      archetypeDistribution: this.getArchetypeDistribution(),
      networkDensity: this.calculateNetworkDensity(),
    };
  }

  /**
   * get distribution of archetypes
   */
  private getArchetypeDistribution(): Record<AvatarArchetype, number> {
    const dist: Record<AvatarArchetype, number> = {
      divine: 0,
      awakened: 0,
      ascending: 0,
      learner: 0,
    };

    for (const avatar of this.avatars.values()) {
      dist[avatar.getArchetype()]++;
    }

    return dist;
  }

  /**
   * calculate network density (how connected avatars are)
   */
  private calculateNetworkDensity(): number {
    const n = this.avatars.size;
    if (n <= 1) return 0;

    let connectionCount = 0;
    for (const connections of this.connections.values()) {
      connectionCount += connections.size;
    }

    // divide by 2 since each connection is counted twice
    connectionCount = connectionCount / 2;
    const maxConnections = (n * (n - 1)) / 2;

    return maxConnections > 0 ? connectionCount / maxConnections : 0;
  }

  /**
   * get network graph representation
   */
  public getNetworkGraph() {
    const nodes = Array.from(this.avatars.values()).map(a => ({
      id: a.getId(),
      name: a.getName(),
      state: a.getState(),
      consciousness: a.getAttributes().consciousness,
    }));

    const edges: Array<{ source: string; target: string }> = [];
    for (const [sourceId, targets] of this.connections) {
      for (const targetId of targets) {
        // only add edge once (sourceId < targetId to avoid duplicates)
        if (sourceId < targetId) {
          edges.push({ source: sourceId, target: targetId });
        }
      }
    }

    return { nodes, edges };
  }
}
