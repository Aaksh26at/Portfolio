/** Static, token-driven stand-in for the interactive WebGL lattice. */
export function SceneFallback() {
  return (
    <div className="scene-fallback" aria-hidden="true">
      <span className="scene-fallback__ring scene-fallback__ring--outer" />
      <span className="scene-fallback__ring scene-fallback__ring--inner" />
      <span className="scene-fallback__axis scene-fallback__axis--one" />
      <span className="scene-fallback__axis scene-fallback__axis--two" />
      <span className="scene-fallback__core" />
      <span className="scene-fallback__node scene-fallback__node--one" />
      <span className="scene-fallback__node scene-fallback__node--two" />
      <span className="scene-fallback__node scene-fallback__node--three" />
    </div>
  )
}
