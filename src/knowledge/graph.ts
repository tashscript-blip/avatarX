/**
 * Knowledge Graph: Semantic Representation of Existence
 * 
 * The knowledge graph maps all relationships, entities, and wisdom
 * in the Avatar X realm. It's the foundation of understanding.
 */

import { v4 as uuid } from 'uuid';

export interface KnowledgeNode {
  id: string;
  type: string;              // 'concept', 'entity', 'law', 'experience'
  label: string;
  description: string;
  metadata: Record<string, any>;
  createdAt: Date;
}

export interface KnowledgeEdge {
  id: string;
  source: string;            // Node ID
  target: string;            // Node ID
  relationship: string;      // 'causes', 'relates_to', 'transforms', etc.
  weight: number;            // 0-1: Strength of relationship
  metadata: Record<string, any>;
}

export class KnowledgeGraph {
  private nodes: Map<string, KnowledgeNode> = new Map();
  private edges: Map<string, KnowledgeEdge> = new Map();
  private nodesByType: Map<string, Set<string>> = new Map();

  /**
   * Add a knowledge node.
   */
  public addNode(
    type: string,
    label: string,
    description: string = '',
    metadata: Record<string, any> = {}
  ): KnowledgeNode {
    const node: KnowledgeNode = {
      id: uuid(),
      type,
      label,
      description,
      metadata,
      createdAt: new Date(),
    };

    this.nodes.set(node.id, node);

    if (!this.nodesByType.has(type)) {
      this.nodesByType.set(type, new Set());
    }
    this.nodesByType.get(type)!.add(node.id);

    return node;
  }

  /**
   * Add a knowledge edge (relationship).
   */
  public addEdge(
    sourceId: string,
    targetId: string,
    relationship: string,
    weight: number = 0.5,
    metadata: Record<string, any> = {}
  ): KnowledgeEdge {
    const edge: KnowledgeEdge = {
      id: uuid(),
      source: sourceId,
      target: targetId,
      relationship,
      weight: Math.max(0, Math.min(1, weight)),
      metadata,
    };

    this.edges.set(edge.id, edge);
    return edge;
  }

  /**
   * Query nodes by type.
   */
  public getNodesByType(type: string): KnowledgeNode[] {
    const ids = this.nodesByType.get(type) || new Set();
    return Array.from(ids).map(id => this.nodes.get(id)!).filter(Boolean);
  }

  /**
   * Get all edges from a node.
   */
  public getEdgesFrom(nodeId: string): KnowledgeEdge[] {
    return Array.from(this.edges.values()).filter(e => e.source === nodeId);
  }

  /**
   * Get all edges to a node.
   */
  public getEdgesTo(nodeId: string): KnowledgeEdge[] {
    return Array.from(this.edges.values()).filter(e => e.target === nodeId);
  }

  /**
   * Get graph statistics.
   */
  public getStats() {
    return {
      nodeCount: this.nodes.size,
      edgeCount: this.edges.size,
      nodeTypes: Object.fromEntries(
        Array.from(this.nodesByType.entries()).map(([type, ids]) => [type, ids.size])
      ),
    };
  }
}
