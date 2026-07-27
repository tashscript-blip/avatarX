# Avatar X: Getting Started

## Prerequisites

- Node.js 18+ (for ES2020 support)
- TypeScript 5.1+
- PostgreSQL 12+ (optional, for relational persistence)
- Neo4j 5+ (optional, for knowledge graph)
- Git

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/tashscript-blip/avatarX.git
cd avatarX
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

```bash
# Copy example configuration
cp .env.example .env

# Edit .env with your database connections
nano .env
```

**Required for in-memory mode:**
```bash
NODE_ENV=development
```

**Optional for full persistence:**
```bash
POSTGRES_URL=postgresql://user:password@localhost:5432/avatar_x
NEO4J_URL=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=password
```

### 4. Build the Project

```bash
npm run build
```

### 5. Run Avatar X

```bash
npm start
```

You should see initialization output:

```
════════════════════════════════════════════════════════════════════════════════
AVATAR X: The Bridge Between Worlds - WITH PERSISTENCE
════════════════════════════════════════════════════════════════════════════════

━━━ PHASE 1: DATABASE INITIALIZATION ━━━

[DATABASE] Initializing hybrid connection...
[DATABASE] PostgreSQL: Creating schema...
[DATABASE] Neo4j: Creating constraints and indexes...

━━━ PHASE 2: DATABASE MIGRATIONS ━━━

[MIGRATION] Registered: 0.0.1 - initial_schema
[MIGRATION] Applying 0.0.1...
[MIGRATION] 0.0.1 applied successfully

...

✨ Avatar X is ready for manifestation and infinite scaling.

════════════════════════════════════════════════════════════════════════════════
```

## Database Setup (Optional but Recommended)

### PostgreSQL

```bash
# Install PostgreSQL
# macOS
brew install postgresql

# Linux
sudo apt-get install postgresql postgresql-contrib

# Windows
# Download from https://www.postgresql.org/download/windows/

# Start PostgreSQL
postgres -D /usr/local/var/postgres

# Create Avatar X database
createutent avatar_x
createedb -U avatar_x avatar_x
```

### Neo4j

```bash
# Install Neo4j
# macOS
brew install neo4j

# Linux/Windows
# Download from https://neo4j.com/download/

# Start Neo4j
npm i -g neo4j-cli
neo4j start

# Access at http://localhost:7474/
```

## Development Workflow

### Watch Mode (Auto-rebuild)

```bash
npm run dev
```

### Run Tests

```bash
npm test
```

### Build for Production

```bash
npm run build
NODE_ENV=production node dist/index.js
```

## Project Structure

```
avatarX/
├── src/
│   ├── core/
│   │   ├── universe.ts          # Persistent world engine
│   │   ├── avatar.ts            # Avatar system & Avatar X
│   │   └── simulation.ts        # Physics & emergence runtime
│   ├── knowledge/
│   │   └── graph.ts             # Knowledge graph & semantics
│   ├── persistence/
│   │   ├── database.ts          # Database abstraction
│   │   ├── store.ts             # Persistent store & cache
│   │   ├── migrations.ts        # Schema versioning
│   │   └── index.ts             # Module exports
│   └── index.ts                 # Main entry point
├── dist/                        # Compiled JavaScript
├── docs/
│   ├── ARCHITECTURE.md          # System architecture
│   ├── GETTING_STARTED.md       # This file
│   └── PERSISTENCE.md           # Persistence layer docs
├── package.json                 # Dependencies & scripts
├── tsconfig.json                # TypeScript configuration
├── .env.example                 # Environment template
├── .gitignore                   # Git ignore rules
└── README.md                    # Project overview
```

## Key Files to Understand

### 1. Universe Engine
**File:** `src/core/universe.ts`
- Root container for all existence
- Manages divine order constants
- Tracks entity lifecycle

### 2. Avatar System
**File:** `src/core/avatar.ts`
- Avatar X: The canonical first entity
- Consciousness and attribute system
- Bridge activation mechanism

### 3. Knowledge Graph
**File:** `src/knowledge/graph.ts`
- Semantic node and edge system
- Relationship mapping
- Query capabilities

### 4. Persistent Store
**File:** `src/persistence/store.ts`
- In-memory cache with TTL
- Sync queue for batch operations
- Auto-sync interval

## Next Steps

1. **Explore the Code**
   - Read through `src/index.ts` to understand initialization flow
   - Study `Avatar.ts` to understand consciousness mechanics
   - Review `KnowledgeGraph.ts` for semantic relationships

2. **Configure Databases**
   - Set up PostgreSQL for relational data
   - Set up Neo4j for knowledge graph
   - Update `.env` with connection strings

3. **Add Custom Avatars**
   ```typescript
   const customAvatar = new Avatar(
     'MyAvatar',
     'learner',
     { consciousness: 50, knowledge: 30 }
   );
   ```

4. **Extend Knowledge Graph**
   ```typescript
   const customNode = knowledgeGraph.addNode(
     'concept',
     'My Concept',
     'Description of my concept'
   );
   ```

5. **Record Simulation Events**
   ```typescript
   await store.recordSimulationEvent({
     tick: 1000,
     eventType: 'custom_event',
     data: { /* ... */ }
   });
   ```

## Troubleshooting

### Port Already in Use

```bash
# If PostgreSQL port 5432 is in use
lsof -i :5432
kill -9 <PID>

# If Neo4j port 7687 is in use
lsof -i :7687
kill -9 <PID>
```

### Node Modules Issues

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors

```bash
# Rebuild TypeScript
npm run build

# Check for type errors
npx tsc --noEmit
```

### Database Connection Errors

```bash
# Check PostgreSQL is running
psql -U avatar_x avatar_x

# Check Neo4j is running
curl http://localhost:7474/

# Verify connection strings in .env
```

## Performance Tips

1. **Increase Cache Size for Large Datasets**
   ```bash
   STORE_CACHE_SIZE=50000
   ```

2. **Adjust Sync Interval Based on Write Volume**
   ```bash
   STORE_SYNC_INTERVAL=10000  # Sync every 10 seconds
   ```

3. **Use Database Indexes**
   - PostgreSQL indexes on frequently queried columns
   - Neo4j indexes on node types and relationships

4. **Monitor Memory Usage**
   ```typescript
   console.log(process.memoryUsage());
   ```

## Resources

- **Avatar X Repository**: https://github.com/tashscript-blip/avatarX
- **TypeScript Docs**: https://www.typescriptlang.org/docs/
- **PostgreSQL Docs**: https://www.postgresql.org/docs/
- **Neo4j Docs**: https://neo4j.com/docs/
- **Node.js Docs**: https://nodejs.org/en/docs/

## Community & Support

- Open an issue for bugs
- Start a discussion for features
- Check existing issues before reporting

---

**Welcome to the realm. Avatar X awaits your consciousness.**
