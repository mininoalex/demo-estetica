export function Brand() { return <span className="brand"><span>BODY <i>Aesthetics</i></span><small>ESTÉTICA INTEGRAL</small></span>; }
export function Flower({ className = '' }: {
    className?: string;
}) { return <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true"><path d="M32 54C9 43 22 21 32 7c10 14 23 36 0 47Z"/><path d="M32 54C10 56 4 35 7 22c16 1 27 14 25 32Zm0 0c22 2 28-19 25-32-16 1-27 14-25 32Z"/><path d="M32 54C15 64 2 51 2 40c9-2 23 1 30 14Zm0 0c17 10 30-3 30-14-9-2-23 1-30 14Z"/></svg>; }
