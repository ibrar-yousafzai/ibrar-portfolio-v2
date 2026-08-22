// A quiet, deliberate signature element: a scatter of nodes with a few
// connecting edges, styled like an EDA correlation plot, drifting gently.
// Pure SVG + CSS so it costs nothing at runtime.

const NODES = [
  { x: 60, y: 80, r: 3, delay: "0s" },
  { x: 140, y: 40, r: 2, delay: "1.2s" },
  { x: 220, y: 110, r: 4, delay: "0.4s" },
  { x: 90, y: 180, r: 2.5, delay: "2s" },
  { x: 300, y: 60, r: 3, delay: "0.8s" },
  { x: 260, y: 200, r: 2, delay: "1.6s" },
  { x: 360, y: 150, r: 3.5, delay: "0.2s" },
  { x: 400, y: 70, r: 2, delay: "2.4s" },
  { x: 180, y: 240, r: 3, delay: "1s" },
  { x: 40, y: 260, r: 2, delay: "1.8s" },
];

const EDGES = [
  [0, 1], [1, 2], [2, 4], [0, 3], [3, 8], [4, 6], [6, 7], [5, 6], [8, 9],
];

export default function DataField({ className = "" }) {
  return (
    <svg
      viewBox="0 0 420 300"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g stroke="var(--border)" strokeWidth="1" opacity="0.6">
        {EDGES.map(([a, b], i) => (
          <line
            key={i}
            x1={NODES[a].x}
            y1={NODES[a].y}
            x2={NODES[b].x}
            y2={NODES[b].y}
          />
        ))}
      </g>
      <g>
        {NODES.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill={i % 3 === 0 ? "var(--accent-2)" : "var(--accent)"}
            className="data-node"
            style={{ animationDelay: n.delay, transformOrigin: `${n.x}px ${n.y}px` }}
          />
        ))}
      </g>
    </svg>
  );
}
