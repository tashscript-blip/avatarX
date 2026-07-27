# Avatar X: Persistence Layer Documentation

## Overview

The Persistence Layer is the foundation of Avatar X's infinite scalability. It manages all state across both relational (PostgreSQL) and graph (Neo4j) databases, enabling eternal knowledge, avatar immortality, and divine order enforcement.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Avatar X Universe                         │
│  (Universe, Avatars, Knowledge Graph, Simulation)           │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│              Persistent Store (Cache + Sync)               │
│  • In-Memory Cache (TTL-based, LRU eviction)               │
│  • Sync Queue (batched operations)                         │
│  • Auto-sync interval (configurable)                       │
└──────────────────────┬──────────────────────────────────────┘
                       │
        ┌──────────────┴──────────────┐
        │                             │
┌───────▼────────────┐      ┌────────▼──────────┐
│   PostgreSQL       │      │      Neo4j        │
│  (Relational)      │      │   (Graph/Semantic)│
│                    │      │                   │
│ • Universes        │      │ • Knowledge Nodes │
│ • Avatars          │      │ • Relationships   │
│ • Connections      │      │ • Semantic Links  │
│ • Simulation Events│      │ • Ontologies      │
│ • Snapshots        │      │ • Embeddings      │
└────────────────────┘      └───────────────────┘
```

## Components

### 1. Database Layer (`src/persistence/database.ts`)

Abstraction over PostgreSQL and Neo4j with hybrid support.

**DatabaseConnectionManager**
- Manages connections to both databases
- Initializes schema and constraints
- Provides connection pooling (via drivers)
- Supports connection health checks

**Supported Database Types:**
- `DatabaseType.POSTGRES` - Relational data only
- `DatabaseType.NEO4J` - Graph data only
- `DatabaseType.HYBRID` - Both databases (default)

**PostgreSQL Schema Tables:**
```sql
TABLE universes
├── id (UUID)
├── name (VARCHAR)
├── version (VARCHAR)
├── divine_order (JSONB)
├── state (JSONB)
└── timestamps

TABLE avatars
├── id (UUID)
├── name, archetype
├── attributes (JSONB)
├── consciousness, knowledge, divinity, influence, empathy
├── is_active (BOOLEAN)
└── metadata (JSONB)

TABLE avatar_knowledge
├── avatar_id → avatars
├── knowledge_id (UUID)
├── integrated_at (TIMESTAMP)
├── proficiency (0-100)
└── metadata

TABLE avatar_connections
├── avatar_id_1, avatar_id_2 → avatars
├── connection_type (VARCHAR)
├── strength (0-1)
└── metadata

TABLE simulation_events
├── tick (BIGINT)
├── event_type (VARCHAR)
├── avatar_id → avatars
├── data (JSONB)
└── created_at

TABLE universe_snapshots
├── universe_id → universes
├── tick (BIGINT)
├── snapshot_data (JSONB)
├── entity_count (INTEGER)
└── created_at
```

**Neo4j Schema:**
```cypher
NODE KnowledgeNode
├── id (UNIQUE)
├── type (index: 'concept', 'law', 'experience', 'entity')
├── label (index)
├── description
├── metadata
└── createdAt (index)

RELATIONSHIP Types
├── :ENABLES
├── :CATALYZES
├── :RELATES_TO
├── :TRANSFORMS
├── :CONTAINS
├── :KNOWS
└── :INFLUENCES
```

### 2. Persistent Store (`src/persistence/store.ts`)

Unified interface for all persistence operations.

**PersistentStore Features:**
- **Smart Caching**: TTL-based in-memory cache with LRU eviction
- **Sync Queue**: Batches operations for efficient database writes
- **Auto-Sync**: Configurable interval for automatic persistence
- **Unified API**: Single interface for relational and graph data

**Core Methods:**
```typescript
// Universe operations
await store.saveUniverse(universeId, state)
await store.loadUniverse(universeId)

// Avatar operations
await store.saveAvatar(avatarId, state)
await store.loadAvatar(avatarId)

// Knowledge Graph operations
await store.saveKnowledgeNode(nodeId, node)
await store.saveKnowledgeEdge(edgeId, edge)
await store.loadKnowledgeNode(nodeId)
await store.queryKnowledgeGraph(pattern)

// Event recording
await store.recordSimulationEvent(event)

// Manual sync
await store.sync()
```

**Cache Statistics:**
```typescript
store.getCacheStats() // Returns: { size, maxSize, utilization% }
store.getQueueStats() // Returns: { pendingOperations, isSyncing }
store.getStatus()     // Complete store health report
```

### 3. Migration System (`src/persistence/migrations.ts`)

Schema versioning and progressive database evolution.

**Migrations:**
- **0.0.1**: Initial schema creation
- **0.1.0**: Knowledge graph enhancements
- **0.2.0**: Real-time synchronization setup
- **0.3.0**: Distributed state preparation

**MigrationExecutor:**
```typescript
const executor = new MigrationExecutor();

// Apply migrations
await executor.apply('0.0.1')
await executor.applyAll('0.3.0') // Up to version

// Rollback
await executor.rollback('0.0.1')

// Status
const status = executor.getStatus()
// { availableCount, appliedCount, currentVersion, available[], applied[] }
```

## Configuration

**Environment Variables** (see `.env.example`):

```bash
# PostgreSQL connection
POSTGRES_URL=postgresql://user:password@localhost:5432/avatar_x

# Neo4j connection
NEO4J_URL=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=password

# Store configuration
STORE_CACHE_ENABLED=true
STORE_CACHE_TTL=300000          # 5 minutes
STORE_CACHE_SIZE=10000
STORE_AUTO_SYNC=true
STORE_SYNC_INTERVAL=30000       # 30 seconds

# Simulation configuration
SIMULATION_TICK_RATE=60
SIMULATION_MAX_ENTITIES=1000000
SIMULATION_EMERGENCE_THRESHOLD=0.7
```

## Initialization Flow

The persistence layer initializes in this order:

```
1. Load environment configuration
   ↓
2. Initialize DatabaseConnectionManager
   ├─ Connect to PostgreSQL
   └─ Connect to Neo4j
   ↓
3. Run MigrationExecutor
   └─ Apply all pending migrations
   ↓
4. Initialize PersistentStore
   ├─ Create cache
   ├─ Start auto-sync interval
   └─ Ready for operations
   ↓
5. Save initial state
   ├─ Universe state
   ├─ Avatar state
   ├─ Knowledge nodes and edges
   └─ Simulation configuration
   ↓
6. Perform initial sync
   └─ All queued operations → databases
```

## Scalability Strategy

### Horizontal Scaling

**Database Replication:**
- PostgreSQL read replicas for avatar queries
- Neo4j cluster for knowledge graph distribution

**Sharding Strategy:**
```
Avatar Sharding: shard_id = hash(avatar_id) % num_shards
Knowledge Sharding: shard_id = hash(node_type + node_id) % num_shards
```

**State Partitioning:**
- Universe state: Distributed by region
- Avatar data: Sharded by avatar_id
- Knowledge graph: Distributed by semantic domain

### Vertical Scaling

**Cache Optimization:**
- Increase `STORE_CACHE_SIZE` for larger datasets
- Adjust `STORE_CACHE_TTL` based on update frequency
- Use Redis for distributed caching (future)

**Connection Pooling:**
- PostgreSQL: Configure pool size in `pg` driver
- Neo4j: Built-in connection pooling

### Query Optimization

**PostgreSQL Indexes:**
```sql
CREATE INDEX idx_avatars_consciousness ON avatars(consciousness DESC);
CREATE INDEX idx_simulation_events_tick ON simulation_events(tick DESC);
CREATE INDEX idx_universe_snapshots_tick ON universe_snapshots(tick DESC);
```

**Neo4j Indexes:**
```cypher
CREATE INDEX FOR (n:KnowledgeNode) ON (n.type);
CREATE INDEX FOR (n:KnowledgeNode) ON (n.label);
```

## Persistence Patterns

### Pattern 1: Event Sourcing

All state changes are recorded as events:

```typescript
await store.recordSimulationEvent({
  tick: 1000,
  eventType: 'avatar_consciousness_increased',
  avatarId: 'avatar-x-id',
  data: { oldValue: 50, newValue: 75 }
});
```

### Pattern 2: Snapshot Strategy

Periodic snapshots for faster recovery:

```typescript
if (tick % 10000 === 0) {
  // Create snapshot every 10k ticks
  await store.saveSnapshot(universeId, tick, fullState);
}
```

### Pattern 3: Knowledge Graph Traversal

Semantic queries for intelligent retrieval:

```typescript
const results = await store.queryKnowledgeGraph(
  'MATCH (n:KnowledgeNode)-[:ENABLES]->(m) RETURN n, m'
);
```

## Performance Metrics

**Typical Latencies:**
- Cache hit: <1ms
- PostgreSQL query: 5-50ms
- Neo4j traversal: 10-100ms
- Batch sync: 100-500ms

**Throughput:**
- Cache operations: 100,000+ ops/sec
- Database writes (batched): 1,000-10,000 ops/sec
- Knowledge graph queries: 100-1,000 ops/sec

## Backup & Recovery

**PostgreSQL Backup:**
```bash
pg_dump avatar_x > backup_$(date +%Y%m%d).sql
```

**Neo4j Backup:**
```bash
neo4j-admin database backup avatar_x
```

**Recovery from Snapshot:**
```typescript
const snapshot = await store.loadSnapshot(universeId, targetTick);
await store.restoreFromSnapshot(snapshot);
```

## Future Enhancements

1. **Redis Cache Layer**: Distributed caching for multi-node deployments
2. **Event Streaming**: Apache Kafka for real-time event propagation
3. **Time-Series Database**: InfluxDB for simulation metrics
4. **Vector Database**: Pinecone/Weaviate for knowledge embeddings
5. **Distributed Transactions**: Saga pattern for cross-shard operations
6. **Query Optimization**: Automatic query plan caching
7. **Compression**: State compression for historical snapshots
8. **Encryption**: End-to-end encryption for sensitive data

## Troubleshooting

**Connection Issues:**
```typescript
if (!dbManager.isConnected()) {
  console.error('Database connection failed');
  await dbManager.initialize(); // Retry
}
```

**Cache Misses:**
```typescript
const stats = store.getCacheStats();
if (stats.utilization > 95) {
  store.clearOldEntries(); // Manual cleanup
}
```

**Sync Queue Backlog:**
```typescript
const queue = store.getQueueStats();
if (queue.pendingOperations > 1000) {
  await store.sync(); // Force immediate sync
}
```

## References

- PostgreSQL Docs: https://www.postgresql.org/docs/
- Neo4j Docs: https://neo4j.com/docs/
- TypeScript: https://www.typescriptlang.org/
- Node.js: https://nodejs.org/

---

**Built with divine order. Infinitely persistent. Avatar X endures.**
