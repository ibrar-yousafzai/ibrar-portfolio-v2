export default function DemoCard({ demo, onRun }) {
  return <button type="button" className="iy-demo-card" onClick={() => onRun(demo)}><span className="iy-demo-icon">{demo.icon}</span><span><strong>{demo.title}</strong><small>{demo.description}</small><small>{demo.bestFor}</small><em>{demo.live ? "Live demo" : "Sample conversation"}</em></span><b aria-hidden="true">→</b></button>;
}
