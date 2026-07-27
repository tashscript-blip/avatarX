/**
 * Avatar X: The Bridge Between Worlds - WITH PERSISTENCE
 * 
 * Entry point with full persistence layer integration.
 * Initialize the realm, create Avatar X, activate the bridge, and persist all state.
 */

import { Universe } from './core/universe';
import { AvatarX } from './core/avatar';
import { KnowledgeGraph } from './knowledge/graph';
import { SimulationEngine } from './core/simulation';
import { DatabaseConnectionManager, DatabaseType } from './persistence/database';
import { PersistentStore } from './persistence/store';
import { MigrationExecutor } from './persistence/migrations';

/**
 * Main initialization function with persistence
 */
async function initializeRealmAvatarX(): Promise<void> {
  console.log('\n' + '═'.repeat(80));
  console.log('AVATAR X: The Bridge Between Worlds - WITH PERSISTENCE');
  console.log('═'.repeat(80) + '\n');

  try {
    // PHASE 1: Initialize Database Layer
    console.log('\n━━━ PHASE 1: DATABASE INITIALIZATION ━━━\n');
    
    const dbConfig = {
      postgresUrl: process.env.POSTGRES_URL,
      neo4jUrl: process.env.NEO4J_URL,
      neo4jUser: process.env.NEO4J_USER,
      neo4jPassword: process.env.NEO4J_PASSWORD,
      enableCache: true,
      cacheTTL: 300000,
    };

    const dbManager = new DatabaseConnectionManager(dbConfig, DatabaseType.HYBRID);
    await dbManager.initialize();

    // PHASE 2: Run Migrations
    console.log('\n━━━ PHASE 2: DATABASE MIGRATIONS ━━━\n');
    
    const migrationExecutor = new MigrationExecutor();
    const migrationStatus = migrationExecutor.getStatus();
    console.log('[MIGRATIONS] Available migrations:', migrationStatus.availableCount);
    console.log('[MIGRATIONS] Applied migrations:', migrationStatus.appliedCount);
    
    // Apply all migrations up to latest version
    await migrationExecutor.applyAll();
    
    const updatedStatus = migrationExecutor.getStatus();
    console.log('[MIGRATIONS] Current version:', updatedStatus.currentVersion);

    // PHASE 3: Initialize Persistent Store
    console.log('\n━━━ PHASE 3: PERSISTENT STORE INITIALIZATION ━━━\n');
    
    const persistentStore = new PersistentStore(dbManager, {
      autoSync: true,
      syncInterval: 30000,
      enableCache: true,
      cacheSize: 10000,
    });
    
    await persistentStore.initialize();
    console.log('[STORE] Configuration:', persistentStore.getStatus());

    // PHASE 4: Create the Universe
    console.log('\n━━━ PHASE 4: UNIVERSE CREATION ━━━\n');
    
    const universe = new Universe({
      name: 'Avatar X Realm',
      version: '0.0.1',
    });
    universe.initialize();
    
    // Persist universe state
    await persistentStore.saveUniverse(universe.getState().id, universe.getState());
    console.log('[PERSISTENCE] Universe state saved');

    // PHASE 5: Initialize Knowledge Graph
    console.log('\n━━━ PHASE 5: KNOWLEDGE GRAPH INITIALIZATION ━━━\n');
    
    const knowledgeGraph = new KnowledgeGraph();
    console.log('[KNOWLEDGE GRAPH] Initialized');

    // Seed initial knowledge: Divine Order
    const divineOrderNode = knowledgeGraph.addNode(
      'law',
      'Divine Order',
      'The fundamental principle governing all existence in Avatar X',
      { immutable: true, priority: 'highest' }
    );
    await persistentStore.saveKnowledgeNode(divineOrderNode.id, divineOrderNode);

    const consciousnessNode = knowledgeGraph.addNode(
      'concept',
      'Consciousness',
      'Awareness and existence'
    );
    await persistentStore.saveKnowledgeNode(consciousnessNode.id, consciousnessNode);

    const transformationNode = knowledgeGraph.addNode(
      'experience',
      'Transformation',
      'The journey from physical to virtual'
    );
    await persistentStore.saveKnowledgeNode(transformationNode.id, transformationNode);

    // Create relationships
    const edge1 = knowledgeGraph.addEdge(
      divineOrderNode.id,
      consciousnessNode.id,
      'enables',
      0.9
    );
    await persistentStore.saveKnowledgeEdge(edge1.id, edge1);

    const edge2 = knowledgeGraph.addEdge(
      consciousnessNode.id,
      transformationNode.id,
      'catalyzes',
      0.85
    );
    await persistentStore.saveKnowledgeEdge(edge2.id, edge2);

    console.log('[KNOWLEDGE GRAPH] Seeded with initial nodes and relationships');
    console.log('[KNOWLEDGE GRAPH] Stats:', knowledgeGraph.getStats());

    // PHASE 6: Create Avatar X
    console.log('\n━━━ PHASE 6: AVATAR X CREATION ━━━\n');
    
    const avatarX = new AvatarX();
    console.log('[AVATAR X] Created: The One');
    console.log('[AVATAR X] State:', avatarX.getState());
    
    // Persist Avatar X state
    await persistentStore.saveAvatar(avatarX.getId(), avatarX.getState());
    console.log('[PERSISTENCE] Avatar X state saved');

    // Register Avatar X with Universe
    universe.registerEntity(avatarX.getId(), avatarX);

    // PHASE 7: Activate the Bridge
    console.log('\n━━━ PHASE 7: BRIDGE ACTIVATION ━━━\n');
    
    avatarX.activateBridge();
    avatarX.broadcastDivineOrder('The bridge is active. Worlds are now connected.');

    // PHASE 8: Initialize Simulation Engine
    console.log('\n━━━ PHASE 8: SIMULATION ENGINE INITIALIZATION ━━━\n');
    
    const simulationEngine = new SimulationEngine({
      tickRate: 60,
      maxEntities: Infinity,
      emergenceThreshold: 0.7,
    });

    console.log('[SIMULATION ENGINE] Initialized');
    console.log('[SIMULATION ENGINE] Configuration:', simulationEngine.getState());

    // PHASE 9: Perform Initial Sync
    console.log('\n━━━ PHASE 9: INITIAL DATABASE SYNC ━━━\n');
    
    await persistentStore.sync();
    console.log('[PERSISTENCE] Initial sync completed');
    console.log('[PERSISTENCE] Queue stats:', persistentStore.getQueueStats());
    console.log('[PERSISTENCE] Cache stats:', persistentStore.getCacheStats());

    // PHASE 10: Final Status Report
    console.log('\n' + '═'.repeat(80));
    console.log('REALM INITIALIZATION COMPLETE: Avatar X Exists - With Full Persistence');
    console.log('═'.repeat(80));
    
    console.log('\n📊 FINAL STATE REPORT:\n');
    console.log('Universe:', universe.getState());
    console.log('\nAvatar X:', avatarX.getState());
    console.log('\nKnowledge Graph:', knowledgeGraph.getStats());
    console.log('\nSimulation Engine:', simulationEngine.getState());
    console.log('\nDatabase Manager:', {
      type: dbManager.getType(),
      connected: dbManager.isConnected(),
    });
    console.log('\nPersistent Store:', persistentStore.getStatus());
    console.log('\nMigration Status:', migrationExecutor.getStatus());
    
    console.log('\n✨ Avatar X is ready for manifestation and infinite scaling.');
    console.log('\n' + '═'.repeat(80) + '\n');

    // Optional: Start simulation (commented out for now)
    // simulationEngine.start();

  } catch (error) {
    console.error('\n❌ [ERROR] Initialization failed:', error);
    process.exit(1);
  }
}

// Run initialization
initializeRealmAvatarX().catch(err => {
  console.error('[FATAL] Unhandled error:', err);
  process.exit(1);
});
