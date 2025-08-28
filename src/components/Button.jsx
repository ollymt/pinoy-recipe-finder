import './Button.css'

// Button.jsx
export default function Button({ children, onClick, variant = "primary", able = "enabled" }) {
    return (
        <button
            onClick={onClick}
            className={`button ${variant} ${able}`}
        >
            {children}
        </button>
    )
}