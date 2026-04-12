import { useState, useCallback } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  Handle,
  Position,
  useNodesState,
  useEdgesState,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { nodes as rawNodes, edges as rawEdges } from '../../data/architecture'
import { glass, semantic } from '../../tokens/colors'
import { useFadeIn } from '../../hooks/useFadeIn'

const CATEGORY_COLOR: Record<string, string> = {
  'data-source':    '#2563EB',
  'processing':     '#059669',
  'mode':           '#7C3AED',
  'visualization':  '#D97706',
  'output':         '#16A34A',
}

const STATUS_DOT: Record<string, { color: string; glow: string; pulse: boolean }> = {
  running:      { color: '#22C55E', glow: 'rgba(34,197,94,0.6)',  pulse: true },
  connected:    { color: '#22C55E', glow: 'rgba(34,197,94,0.6)',  pulse: true },
  idle:         { color: '#1A1A2E', glow: 'none',                  pulse: false },
  disconnected: { color: '#EF4444', glow: 'rgba(239,68,68,0.5)',  pulse: false },
  degraded:     { color: '#F59E0B', glow: 'rgba(245,158,11,0.5)', pulse: false },
}

function StatusDot({ status }: { status: string }) {
  const cfg = STATUS_DOT[status] ?? STATUS_DOT.idle
  return (
    <span
      className={cfg.pulse ? 'live-pulse' : ''}
      style={{
        display: 'inline-block',
        width: 7,
        height: 7,
        borderRadius: '50%',
        backgroundColor: cfg.color,
        boxShadow: cfg.glow !== 'none' ? `0 0 6px ${cfg.glow}` : 'none',
        flexShrink: 0,
      }}
    />
  )
}

function GlassNode({ data }: { data: any }) {
  const accent = CATEGORY_COLOR[data.category] ?? '#3B82F6'
  return (
    <div
      style={{
        width: 178,
        background: 'rgba(255, 255, 255, 0.95)',
        border: `1px solid ${glass.cardBorder}`,
        borderLeft: `3px solid ${accent}`,
        borderRadius: 10,
        padding: '10px 12px',
        cursor: 'pointer',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
      }}
    >
      <Handle type="target" position={Position.Left} style={{ background: accent, width: 6, height: 6, border: 'none' }} />
      <Handle type="source" position={Position.Right} style={{ background: accent, width: 6, height: 6, border: 'none' }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
        <StatusDot status={data.status} />
        <span style={{ color: '#1A1A2E', fontSize: 12, fontWeight: 600, lineHeight: 1.2 }}>{data.label}</span>
      </div>

      <p style={{ color: semantic.muted, fontSize: 10, lineHeight: 1.35, margin: 0 }}>
        {data.description}
      </p>

      <span
        style={{
          display: 'inline-block',
          marginTop: 6,
          fontSize: 9,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: accent,
          background: `${accent}22`,
          padding: '2px 6px',
          borderRadius: 4,
        }}
      >
        {data.category}
      </span>
    </div>
  )
}

const nodeTypes = { custom: GlassNode }

const defaultEdgeOptions = {
  style: { stroke: 'rgba(0,0,0,0.15)', strokeWidth: 1.5 },
  labelStyle: { fill: '#1A1A2E', fontSize: 9, fontWeight: 500 },
  labelBgStyle: { fill: '#FFFFFF', fillOpacity: 0.9 },
  labelBgPadding: [6, 3] as [number, number],
  labelBgBorderRadius: 4,
}

function DetailPanel({ node, onClose }: { node: any; onClose: () => void }) {
  if (!node) return null
  const d = node.data
  const accent = CATEGORY_COLOR[d.category] ?? '#3B82F6'

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: 300,
        height: '100%',
        background: 'rgba(255, 255, 255, 0.95)',
        borderLeft: `1px solid rgba(0, 0, 0, 0.06)`,
        boxShadow: '-2px 0 8px rgba(0, 0, 0, 0.06)',
        padding: '24px 20px',
        zIndex: 20,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h3 style={{ color: '#1A1A2E', fontSize: 16, fontWeight: 700, margin: 0 }}>{d.label}</h3>
        <button
          onClick={onClose}
          style={{
            background: 'rgba(0,0,0,0.05)',
            border: 'none',
            color: '#1A1A2E',
            width: 28,
            height: 28,
            borderRadius: 6,
            cursor: 'pointer',
            fontSize: 14,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          X
        </button>
      </div>

      <p style={{ color: semantic.muted, fontSize: 13, lineHeight: 1.5, margin: 0 }}>{d.description}</p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <StatusDot status={d.status} />
        <span style={{ color: '#1A1A2E', fontSize: 12, textTransform: 'capitalize' }}>{d.status}</span>
      </div>

      <span
        style={{
          display: 'inline-block',
          width: 'fit-content',
          fontSize: 10,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: accent,
          background: `${accent}22`,
          padding: '3px 8px',
          borderRadius: 4,
        }}
      >
        {d.category}
      </span>

      {d.tools && d.tools.length > 0 && (
        <div>
          <h4 style={{ color: '#1A1A2E', fontSize: 11, fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tools</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {d.tools.map((t: string) => (
              <span
                key={t}
                style={{
                  fontSize: 10,
                  color: '#1A1A2E',
                  background: 'rgba(0,0,0,0.04)',
                  border: '1px solid rgba(0,0,0,0.08)',
                  padding: '3px 7px',
                  borderRadius: 4,
                  fontFamily: 'monospace',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      {d.connections && d.connections.length > 0 && (
        <div>
          <h4 style={{ color: '#1A1A2E', fontSize: 11, fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Connections</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {d.connections.map((c: string) => (
              <span key={c} style={{ fontSize: 11, color: semantic.muted }}>
                {'\u2192'} {c}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function ArchitectureView() {
  const [nodes] = useNodesState(rawNodes)
  const [edges] = useEdgesState(rawEdges)
  const [selectedNode, setSelectedNode] = useState<any>(null)
  const fade = useFadeIn()

  const handleNodeClick = useCallback((_event: any, node: any) => {
    setSelectedNode(node)
  }, [])

  const handlePaneClick = useCallback(() => {
    setSelectedNode(null)
  }, [])

  return (
    <div ref={fade.ref} className={fade.className} style={{ position: 'relative', height: 'calc(100vh - 80px)' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        onNodeClick={handleNodeClick}
        onPaneClick={handlePaneClick}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        proOptions={{ hideAttribution: true }}
        minZoom={0.3}
        maxZoom={2}
      >
        <Background color="rgba(0,0,0,0.03)" gap={20} size={1} />
        <Controls
          showInteractive={false}
          style={{
            background: 'rgba(255,255,255,0.95)',
            border: `1px solid rgba(0,0,0,0.06)`,
            borderRadius: 8,
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          }}
        />
      </ReactFlow>
      <DetailPanel node={selectedNode} onClose={() => setSelectedNode(null)} />
    </div>
  )
}
